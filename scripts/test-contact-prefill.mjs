import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { buildContactPrefill } from '../src/lib/contact-prefill.ts'

function assertIncludes(haystack, needle, label) {
  assert.ok(haystack.includes(needle), `${label}: expected to include ${needle}`)
}

const nearTerm = 'Near-term (1-3 months)'

{
  const prefill = buildContactPrefill({ initialIntent: 'discovery', initialTopic: 'gis-analysis' })
  assert.equal(prefill.requestTopic, 'gis-mapping')
  assert.equal(prefill.defaultInquiryType, 'GIS / mapping')
  assert.equal(prefill.defaultTimeline, nearTerm)
  assertIncludes(prefill.defaultDescription, 'GIS / spatial analysis request', 'gis description')
  assertIncludes(prefill.contextNotice?.title ?? '', 'GIS / spatial analysis', 'gis notice')
}

{
  const prefill = buildContactPrefill({ initialIntent: 'discovery', initialTopic: 'aerial-mapping' })
  assert.equal(prefill.defaultInquiryType, 'GIS / mapping')
  assertIncludes(prefill.defaultDescription, 'Aerial mapping / photogrammetry request', 'aerial description')
}

{
  const prefill = buildContactPrefill({ initialIntent: 'discovery', initialInquiry: 'custom-grant-ai' })
  assert.equal(prefill.requestTopic, 'custom-software')
  assert.equal(prefill.defaultInquiryType, 'Custom software development')
  assertIncludes(prefill.defaultDescription, 'Custom software / AI implementation request', 'legacy inquiry description')
}

{
  const prefill = buildContactPrefill({ initialIntent: 'subscription', initialProduct: 'openplan', initialTier: 'Managed deployment' })
  assert.equal(prefill.defaultInquiryType, 'OpenPlan product')
  assert.equal(prefill.defaultTimeline, 'Immediate (0-30 days)')
  assertIncludes(prefill.defaultDescription, 'Product: OpenPlan Software', 'checkout product label')
  assertIncludes(prefill.defaultDescription, 'Prior selected tier: Managed deployment', 'checkout tier')
  assertIncludes(prefill.contextNotice?.title ?? '', 'Access/support request detected', 'checkout notice')
}

{
  const prefill = buildContactPrefill({ initialIntent: 'discovery', initialTopic: 'open-source-support', initialProduct: 'opengeo' })
  assert.equal(prefill.defaultInquiryType, 'Open-source software support')
  assert.equal(prefill.defaultTimeline, nearTerm)
  assertIncludes(prefill.defaultDescription, 'Project or repo of interest: OpenGeo', 'open-source product label')
}

{
  const prefill = buildContactPrefill({ initialIntent: 'discovery', initialTopic: 'portal-support' })
  assert.equal(prefill.defaultInquiryType, 'General inquiry')
  assertIncludes(prefill.defaultDescription, 'Customer portal support / scope-change request', 'portal support description')
}

const expectedCtaTargets = [
  ['src/app/(marketing)/services/aerial/page.tsx', '/contact?intent=discovery&topic=aerial-mapping'],
  ['src/app/(marketing)/services/ai/page.tsx', '/contact?intent=discovery&topic=ai-documentation'],
  ['src/app/(marketing)/services/gis/page.tsx', '/contact?intent=discovery&topic=gis-mapping'],
  ['src/app/(marketing)/services/grants/page.tsx', '/contact?intent=discovery&topic=grant-strategy'],
  ['src/app/(marketing)/services/planning/page.tsx', '/contact?intent=discovery&topic=planning-support'],
  ['src/app/(marketing)/grant-lab/page.tsx', '/contact?intent=discovery&topic=custom-software&inquiry=custom-grant-ai'],
  ['src/app/(marketing)/portal/page.tsx', '/contact?intent=discovery&topic=portal-support'],
]

for (const [path, expected] of expectedCtaTargets) {
  const source = readFileSync(path, 'utf8')
  assertIncludes(source, expected, path)
}

console.log('contact prefill query behavior: ok')
