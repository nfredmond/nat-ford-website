#!/usr/bin/env node
// Every internal link in a page or shared layout component must resolve to
// a real app route or a configured redirect. Catches links left behind when
// a page is retired.

import fs from 'node:fs'
import path from 'node:path'

const repoRoot = process.cwd()
const appRoot = path.join(repoRoot, 'src/app')

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full, out)
    else out.push(full)
  }
  return out
}

function routeFromPageFile(file) {
  const relative = path.relative(appRoot, path.dirname(file))
  const segments = relative
    .split(path.sep)
    .filter((segment) => segment && !segment.startsWith('(') && !segment.startsWith('@'))
  const route = `/${segments.join('/')}`
  return route === '/' ? '/' : route.replace(/\/$/, '')
}

const routes = new Set(
  walk(appRoot)
    .filter((file) => path.basename(file) === 'page.tsx')
    .map(routeFromPageFile)
)

// Redirect sources count as valid targets (e.g. the /openplan placeholder).
const nextConfig = fs.readFileSync(path.join(repoRoot, 'next.config.ts'), 'utf8')
for (const match of nextConfig.matchAll(/source:\s*'([^':]+)/g)) routes.add(match[1].replace(/\/$/, '') || '/')
for (const match of nextConfig.matchAll(/\['(\/[^']*)',\s*'/g)) routes.add(match[1])

const publicFiles = new Set(walk(path.join(repoRoot, 'public')).map((f) => '/' + path.relative(path.join(repoRoot, 'public'), f)))

const sources = [
  ...walk(path.join(appRoot, '(marketing)')).filter((f) => f.endsWith('.tsx')),
  ...walk(path.join(repoRoot, 'src/components/layout')).filter((f) => f.endsWith('.tsx')),
]

const missing = []
let checked = 0
for (const file of sources) {
  const source = fs.readFileSync(file, 'utf8')
  const hrefs = new Set()
  for (const match of source.matchAll(/href:\s*'([^']+)'/g)) hrefs.add(match[1])
  for (const match of source.matchAll(/href="([^"]+)"/g)) hrefs.add(match[1])
  for (const href of hrefs) {
    if (!href.startsWith('/') || href.startsWith('//')) continue
    const target = href.split('#')[0].split('?')[0] || '/'
    checked++
    if (!routes.has(target) && !publicFiles.has(target)) missing.push(`${path.relative(repoRoot, file)}: ${href}`)
  }
}

if (missing.length > 0) {
  console.error('Internal links without a matching route, redirect, or public file:')
  for (const line of missing) console.error(`- ${line}`)
  process.exit(1)
}

console.log(`Internal links resolve to known routes (${checked} checked across ${sources.length} files).`)
