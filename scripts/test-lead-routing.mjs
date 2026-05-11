import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { buildLeadRoutingMeta, leadRoutingHint, leadTriageLabel, normalizeLeadRoutingValue } from '../src/lib/lead-routing.ts'

const rootDir = path.resolve(new URL('..', import.meta.url).pathname)

assert.equal(normalizeLeadRoutingValue('Open Plan'), 'open-plan')
assert.equal(normalizeLeadRoutingValue('pilot_updates'), 'pilot-updates')

assert.equal(leadRoutingHint({ topic: 'openplan', intent: 'updates' }), 'openplan-pilot-updates')
assert.equal(leadRoutingHint({ topic: 'openplan', intent: 'fit' }), 'openplan-fit-conversation')
assert.equal(leadRoutingHint({ product: 'openplan', intent: 'discovery' }), 'openplan-fit-conversation')
assert.equal(leadRoutingHint({ topic: 'funding-readiness-scorecard' }), 'funding-readiness-review')
assert.equal(leadRoutingHint({ topic: 'gis-mapping' }), 'service-gis-mapping')
assert.equal(leadTriageLabel('service-aerial-mapping'), 'Service · aerial mapping')

const openPlanFit = buildLeadRoutingMeta({
  ip: '203.0.113.10',
  userAgent: 'test-agent',
  topic: 'openplan',
  intent: 'fit',
  product: 'openplan',
  tier: 'Managed deployment',
  budgetRange: '$8.5K – $18K',
})

assert.deepEqual(openPlanFit, {
  ip: '203.0.113.10',
  user_agent: 'test-agent',
  topic: 'openplan',
  intent: 'fit',
  product: 'openplan',
  tier: 'Managed deployment',
  budget_range: '$8.5K – $18K',
  project_geography: null,
  desired_start_date: null,
  routing_hint: 'openplan-fit-conversation',
  triage_label: 'OpenPlan · Fit conversation',
  triage_priority: 'high',
  triage_reason: 'Captured from contact routing context: openplan / fit / openplan.',
})

const apiRoute = fs.readFileSync(path.join(rootDir, 'src/app/api/leads/route.ts'), 'utf8')
assert.match(apiRoute, /buildLeadRoutingMeta\(/, 'Lead API must use centralized routing metadata builder.')
assert.doesNotMatch(apiRoute, /sendMail|resend|stripe|checkout|SUPABASE_SERVICE_ROLE_KEY.*update/si, 'Lead API routing proof should not add outbound sends, billing mutation, or unrelated service-role updates.')

const inboxPage = fs.readFileSync(path.join(rootDir, 'src/app/(marketing)/lead-inbox/page.tsx'), 'utf8')
for (const text of ['Topic:', 'Intent:', 'Product:', 'High triage', 'triage_reason']) {
  assert.ok(inboxPage.includes(text), `Lead inbox is missing visible triage context: ${text}`)
}

const exportRoute = fs.readFileSync(path.join(rootDir, 'src/app/api/lead-inbox/export/route.ts'), 'utf8')
for (const column of ['triage_label', 'triage_priority', 'triage_reason']) {
  assert.ok(exportRoute.includes(column), `Lead export is missing ${column}`)
}

console.log('lead routing metadata proof: ok')
