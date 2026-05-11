#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'

const repoRoot = process.cwd()
const servicesPage = path.join(repoRoot, 'src/app/(marketing)/services/page.tsx')
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

const source = fs.readFileSync(servicesPage, 'utf8')
const hrefs = new Set()

for (const match of source.matchAll(/href:\s*'([^']+)'/g)) hrefs.add(match[1])
for (const match of source.matchAll(/href="([^"]+)"/g)) hrefs.add(match[1])

const internalLinks = [...hrefs]
  .filter((href) => href.startsWith('/') && !href.startsWith('//'))
  .map((href) => href.split('#')[0].split('?')[0] || '/')

const missing = [...new Set(internalLinks)].filter((href) => !routes.has(href))

if (missing.length > 0) {
  console.error('Services page has internal links without matching app routes:')
  for (const href of missing) console.error(`- ${href}`)
  console.error('\nKnown routes include:')
  for (const route of [...routes].sort()) console.error(`- ${route}`)
  process.exit(1)
}

console.log(`Services page internal links resolve to known app routes (${internalLinks.length} checked).`)
