#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const routes = [
  { route: '/', file: 'src/app/(marketing)/page.tsx' },
  { route: '/services', file: 'src/app/(marketing)/services/page.tsx' },
  { route: '/openplan', file: 'src/app/(marketing)/openplan/page.tsx' },
  { route: '/contact', file: 'src/app/(marketing)/contact/page.tsx' },
  { route: '/open-source', file: 'src/app/(marketing)/open-source/page.tsx' },
]

const sharedLandmarkFiles = [
  'src/app/(marketing)/layout.tsx',
  'src/components/layout/header.tsx',
  'src/components/layout/footer.tsx',
]

function readRel(relPath) {
  return fs.readFileSync(path.join(root, relPath), 'utf8')
}

function fileExists(relPath) {
  return fs.existsSync(path.join(root, relPath))
}

function stripComments(source) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/^\s*\/\/.*$/gm, '')
}

function resolveImport(specifier) {
  if (!specifier.startsWith('@/')) return null

  const base = specifier.replace('@/', 'src/')
  const candidates = [
    `${base}.tsx`,
    `${base}.ts`,
    `${base}.jsx`,
    `${base}.js`,
    `${base}/index.tsx`,
    `${base}/index.ts`,
  ]

  return candidates.find(fileExists) || null
}

function collectStaticSource(entryRelPath, seen = new Set()) {
  if (seen.has(entryRelPath)) return ''
  seen.add(entryRelPath)

  const source = readRel(entryRelPath)
  const importRegex = /import\s+(?:type\s+)?(?:[^'";]+?\s+from\s+)?['"]([^'"]+)['"]/g
  let combined = `\n/* ${entryRelPath} */\n${source}`
  let match

  while ((match = importRegex.exec(source))) {
    const resolved = resolveImport(match[1])
    if (resolved) combined += collectStaticSource(resolved, seen)
  }

  return combined
}

function countH1(source) {
  return (stripComments(source).match(/<h1\b/g) || []).length
}

function hasLandmarks(source) {
  const clean = stripComments(source)
  return {
    main: /<main\b|role=['"]main['"]/.test(clean),
    header: /<header\b|role=['"]banner['"]/.test(clean),
    footer: /<footer\b|role=['"]contentinfo['"]/.test(clean),
  }
}

function listFiles(dirRelPath) {
  const dir = path.join(root, dirRelPath)
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const rel = path.join(dirRelPath, entry.name)
    if (entry.isDirectory()) return listFiles(rel)
    return rel
  })
}

const failures = []

const sharedSource = sharedLandmarkFiles.map(readRel).join('\n')
const sharedLandmarks = hasLandmarks(sharedSource)
for (const [name, present] of Object.entries(sharedLandmarks)) {
  if (!present) failures.push(`Missing shared public ${name} landmark in marketing layout/header/footer source.`)
}

for (const { route, file } of routes) {
  const source = collectStaticSource(file)
  const h1s = countH1(source)
  if (h1s !== 1) failures.push(`${route} should expose exactly one static <h1>; found ${h1s}.`)
}

const searchableFiles = ['src', 'public']
  .filter(fileExists)
  .flatMap(listFiles)
  .filter((file) => /\.(tsx?|jsx?|mdx?|html?|json|css)$/.test(file))

for (const file of searchableFiles) {
  const source = readRel(file)
  if (/perfect app/i.test(source)) failures.push(`Risky phrase "perfect app" found in ${file}.`)
}

const contactSource = collectStaticSource('src/app/(marketing)/contact/page.tsx')
const contactHasAnchor = /id=['"]contact-form['"]/.test(contactSource) || /href=['"]#contact-form['"]/.test(contactSource)
const contactHasAboveFoldCta = /(Start intake form|Schedule discovery|Start a focused intake)/i.test(contactSource)
if (!contactHasAnchor && !contactHasAboveFoldCta) {
  failures.push('Contact page should keep a form anchor or above-fold intake CTA.')
}

if (failures.length) {
  console.error('Public accessibility/mobile smoke regression check failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log('Public accessibility/mobile smoke regression check passed:')
console.log(`- Routes checked: ${routes.map(({ route }) => route).join(', ')}`)
console.log('- Exactly one static H1 per checked route')
console.log('- Shared marketing landmarks present')
console.log('- Risky phrase absent: "perfect app"')
console.log('- Contact page intake anchor/CTA present')
