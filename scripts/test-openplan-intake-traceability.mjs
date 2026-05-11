import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { buildContactPrefill } from '../src/lib/contact-prefill.ts'
import { buildLeadRoutingMeta } from '../src/lib/lead-routing.ts'

const rootDir = path.resolve(new URL('..', import.meta.url).pathname)
const read = (relativePath) => fs.readFileSync(path.join(rootDir, relativePath), 'utf8')

const openPlanPage = read('src/app/(marketing)/openplan/page.tsx')
const ctaHref = '/contact/openplan-fit?tier=Open-source%20fit%20audit'
const openPlanFitLinks = [...openPlanPage.matchAll(/<Link\s+href="([^"]+)"/g)]
  .map((match) => match[1])
  .filter((href) => href.startsWith('/contact/openplan-fit'))
assert.deepEqual(openPlanFitLinks, [ctaHref, ctaHref], 'Every OpenPlan fit CTA must use the same routed fit-audit URL.')

const fitPage = read('src/app/(marketing)/contact/openplan-fit/page.tsx')
for (const required of [
  'searchParams',
  'initialIntent="fit"',
  'initialTopic="openplan"',
  'initialProduct="openplan"',
  'initialTier={safeTier(params.tier)}',
  "if (!value) return 'Open-source fit audit'",
  'return value.slice(0, 80)',
]) {
  assert.ok(fitPage.includes(required), `OpenPlan fit page is missing bounded routed context: ${required}`)
}

const contactShell = read('src/components/features/contact-page-shell.tsx')
for (const required of [
  'initialIntent?: string',
  'initialTopic?: string',
  'initialProduct?: string',
  'initialTier?: string',
  'initialIntent={initialIntent}',
  'initialTopic={initialTopic}',
  'initialProduct={initialProduct}',
  'initialTier={initialTier}',
]) {
  assert.ok(contactShell.includes(required), `Contact shell must preserve context through to intake form: ${required}`)
}

const prefill = buildContactPrefill({
  initialIntent: 'fit',
  initialTopic: 'openplan',
  initialProduct: 'openplan',
  initialTier: 'Open-source fit audit',
})
assert.equal(prefill.requestIntent, 'fit')
assert.equal(prefill.requestTopic, 'openplan')
assert.equal(prefill.checkoutProduct, 'openplan')
assert.equal(prefill.checkoutTier, 'Open-source fit audit')
assert.equal(prefill.defaultInquiryType, 'OpenPlan product')
assert.equal(prefill.defaultTimeline, 'Near-term (1-3 months)')
assert.ok(prefill.defaultDescription.includes('Product: OpenPlan Software'))
assert.ok(prefill.defaultDescription.includes('managed open-source deployment'))
assert.equal(prefill.submitLabel, 'Request OpenPlan fit review')

const formSource = read('src/components/features/contact-intake-form.tsx')
for (const required of ['topic: requestTopic', 'intent: requestIntent', 'product: checkoutProduct', 'tier: checkoutTier', 'sourcePath: typeof window']) {
  assert.ok(formSource.includes(required), `Contact form payload must include ${required}`)
}

const routeMeta = buildLeadRoutingMeta({
  ip: '203.0.113.20',
  userAgent: 'traceability-test',
  topic: prefill.requestTopic,
  intent: prefill.requestIntent,
  product: prefill.checkoutProduct,
  tier: prefill.checkoutTier,
  budgetRange: '$8.5K – $18K',
  projectGeography: 'Nevada County / RTPA test corridor',
  desiredStartDate: '2026-06-01',
})
assert.deepEqual(routeMeta, {
  ip: '203.0.113.20',
  user_agent: 'traceability-test',
  topic: 'openplan',
  intent: 'fit',
  product: 'openplan',
  tier: 'Open-source fit audit',
  budget_range: '$8.5K – $18K',
  project_geography: 'Nevada County / RTPA test corridor',
  desired_start_date: '2026-06-01',
  routing_hint: 'openplan-fit-conversation',
  triage_label: 'OpenPlan · Fit conversation',
  triage_priority: 'high',
  triage_reason: 'Captured from contact routing context: openplan / fit / openplan.',
})

const apiRoute = read('src/app/api/leads/route.ts')
for (const required of ['topic = normalizeLeadRoutingValue(payload.topic)', 'intent = normalizeLeadRoutingValue(payload.intent)', 'product = normalizeLeadRoutingValue(payload.product)', 'tier = normalize(payload.tier)', 'meta: buildLeadRoutingMeta']) {
  assert.ok(apiRoute.includes(required), `Lead API must preserve routed field: ${required}`)
}
assert.doesNotMatch(apiRoute, /sendMail|resend|stripe|checkout|SUPABASE_SERVICE_ROLE_KEY.*update/si)

const inboxPage = read('src/app/(marketing)/lead-inbox/page.tsx')
for (const visibleText of ['OpenPlan: Fit conversation', 'Topic:', 'Intent:', 'Product:', 'Tier:', 'High triage', 'triage_reason']) {
  assert.ok(inboxPage.includes(visibleText), `Lead inbox must show routed context: ${visibleText}`)
}

const exportRoute = read('src/app/api/lead-inbox/export/route.ts')
for (const column of ['routing_hint', 'topic', 'intent', 'product', 'tier', 'triage_label', 'triage_priority', 'triage_reason']) {
  assert.ok(exportRoute.includes(column), `Lead export is missing ${column}`)
}

console.log('openplan intake traceability proof: ok')
