import { readFileSync } from 'node:fs'

const files = [
  'src/app/(marketing)/openplan/page.tsx',
  'src/data/open-source-projects.ts',
]

const combined = files.map((file) => readFileSync(file, 'utf8')).join('\n')

const bannedPatterns = [
  /24-hour/i,
  /24 hour/i,
  /enterprise\s+SSO/i,
  /planning operating system/i,
  /self-serve/i,
  /automatic provisioning/i,
  /grant award prediction/i,
  /autonomous AI/i,
]

const failures = bannedPatterns.filter((pattern) => pattern.test(combined))

if (failures.length) {
  console.error('OpenPlan claim guardrail failed:')
  for (const pattern of failures) console.error(`- ${pattern}`)
  process.exit(1)
}

const requiredPhrases = [
  'free, open-source',
  'paid work is deployment',
  'support',
  '/contact/openplan-fit',
]

const missing = requiredPhrases.filter((phrase) => !combined.includes(phrase))

if (missing.length) {
  console.error('OpenPlan claim guardrail missing expected positioning:')
  for (const phrase of missing) console.error(`- ${phrase}`)
  process.exit(1)
}

console.log('OpenPlan claim guardrail passed')
