import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

const explicitFiles = [
  'src/data/open-source-projects.ts',
]

const marketingRoot = 'src/app/(marketing)'
const marketingPageFiles = collectFiles(marketingRoot).filter((file) => /\/(page|layout)\.tsx$/.test(file))
const files = [...new Set([...marketingPageFiles, ...explicitFiles])].sort()

function collectFiles(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry)
    const stats = statSync(path)
    if (stats.isDirectory()) return collectFiles(path)
    if (stats.isFile()) return [path]
    return []
  })
}

const bannedClaims = [
  {
    label: 'unsupported 24-hour positioning',
    pattern: /24[-\s]?hour/i,
  },
  {
    label: 'unsupported enterprise SSO positioning',
    pattern: /enterprise\s+SSO/i,
  },
  {
    label: 'unsupported planning workbench positioning',
    pattern: /planning\s+workbench/i,
  },
  {
    label: 'perfect-app positioning',
    pattern: /\bperfect\s+(?:app|application|software|platform|product|solution)\b/i,
  },
  {
    label: 'self-serve SaaS positioning',
    pattern: /\bself[-\s]?serve\s+(?:SaaS|software|subscription|platform|account|workspace|signup|sign[-\s]?up)\b/i,
  },
  {
    label: 'automatic workspace provisioning',
    pattern: /\b(?:automatic|automated|instant|one[-\s]?click)\s+(?:workspace|tenant|environment|deployment)\s+provision(?:ing|ed)?\b/i,
  },
  {
    label: 'automatic account provisioning',
    pattern: /\b(?:automatic|automated|instant|one[-\s]?click)\s+(?:account|user|login|access)\s+provision(?:ing|ed)?\b/i,
  },
  {
    label: 'guaranteed grant/award outcome',
    pattern: /\bguarantee(?:d|s)?\s+(?:grant|funding|award|awards|success|win|wins)\b/i,
  },
  {
    label: 'guaranteed grant/award outcome',
    pattern: /\b(?:grant|funding|award|awards)\s+(?:is|are|will be)?\s*guaranteed\b/i,
  },
  {
    label: 'award prediction claim',
    pattern: /\b(?:grant|funding|award)\s+award\s+prediction\b/i,
  },
  {
    label: 'autonomous legal/compliance positioning',
    pattern: /\bautonomous\s+(?:legal|compliance|regulatory|environmental|CEQA|NEPA)\b/i,
  },
  {
    label: 'AI as legal/compliance authority',
    pattern: /\bAI[-\s]?(?:powered\s+)?(?:legal|compliance|regulatory)\s+(?:approval|clearance|certification|determination)\b/i,
  },
  {
    label: 'direct OpenPlan subscription CTA',
    pattern: /href=["'`][^"'`]*(?:intent=subscription|checkout|subscribe)[^"'`]*(?:openplan|OpenPlan)[^"'`]*["'`]/i,
  },
  {
    label: 'direct OpenPlan subscription CTA',
    pattern: /href=["'`][^"'`]*(?:openplan|OpenPlan)[^"'`]*(?:intent=subscription|checkout|subscribe)[^"'`]*["'`]/i,
  },
  {
    label: 'direct OpenPlan subscription CTA',
    pattern: /\b(?:subscribe|buy|purchase|checkout)\s+(?:to\s+)?OpenPlan\b/i,
  },
]

const requiredPhrases = [
  'free, open-source',
  'paid work is deployment',
  'support',
  '/contact/openplan-fit',
]

const failures = []
const combined = files.map((file) => {
  const source = readFileSync(file, 'utf8')

  for (const claim of bannedClaims) {
    const match = source.match(claim.pattern)
    if (match) {
      const line = source.slice(0, match.index).split('\n').length
      const lineText = source.split('\n')[line - 1] || ''
      const isExplicitDisclaimer = /\b(?:do not|does not|cannot|can not|never)\s+guarantee\b/i.test(lineText)
      if (!isExplicitDisclaimer) {
        failures.push(`${claim.label} in ${file}:${line}: ${claim.pattern} matched "${match[0]}"`)
      }
    }
  }

  return source
}).join('\n')

if (failures.length) {
  console.error('OpenPlan public claim guardrail failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

const missing = requiredPhrases.filter((phrase) => !combined.includes(phrase))

if (missing.length) {
  console.error('OpenPlan claim guardrail missing expected positioning:')
  for (const phrase of missing) console.error(`- ${phrase}`)
  process.exit(1)
}

console.log(`OpenPlan public claim guardrail passed (${files.length} files scanned)`)
