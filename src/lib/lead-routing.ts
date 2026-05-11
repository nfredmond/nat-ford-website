export type LeadRoutingInput = {
  topic?: string
  intent?: string
  product?: string
  tier?: string
  budgetRange?: string
  projectGeography?: string
  desiredStartDate?: string
  userAgent?: string | null
  ip?: string | null
}

export type LeadRoutingMeta = {
  ip: string | null
  user_agent: string | null
  topic: string
  intent: string
  product: string
  tier: string
  budget_range: string | null
  project_geography: string | null
  desired_start_date: string | null
  routing_hint: string | null
  triage_label: string
  triage_priority: 'normal' | 'high'
  triage_reason: string
}

export function normalizeLeadRoutingValue(input: unknown): string {
  return String(input ?? '')
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
}

function cleanDisplayValue(input: unknown): string {
  return String(input ?? '').trim()
}

export function leadRoutingHint({ topic = '', intent = '', product = '' }: Pick<LeadRoutingInput, 'topic' | 'intent' | 'product'>): string | null {
  const normalizedTopic = normalizeLeadRoutingValue(topic)
  const normalizedIntent = normalizeLeadRoutingValue(intent)
  const normalizedProduct = normalizeLeadRoutingValue(product)
  const hasOpenPlanContext = normalizedTopic === 'openplan' || normalizedProduct === 'openplan'

  if (hasOpenPlanContext && ['updates', 'pilot-updates', 'waitlist-updates'].includes(normalizedIntent)) {
    return 'openplan-pilot-updates'
  }

  if (hasOpenPlanContext && ['fit', 'discuss-fit', 'discovery'].includes(normalizedIntent)) {
    return 'openplan-fit-conversation'
  }

  if (hasOpenPlanContext) return 'openplan-general'
  if (normalizedTopic === 'funding-readiness-scorecard') return 'funding-readiness-review'
  if (normalizedTopic === 'open-source-support') return 'open-source-support'
  if (normalizedTopic) return `service-${normalizedTopic}`
  return null
}

export function leadTriageLabel(routingHint: string | null): string {
  switch (routingHint) {
    case 'openplan-pilot-updates':
      return 'OpenPlan · Pilot updates'
    case 'openplan-fit-conversation':
      return 'OpenPlan · Fit conversation'
    case 'openplan-general':
      return 'OpenPlan · General'
    case 'funding-readiness-review':
      return 'Funding readiness review'
    case 'open-source-support':
      return 'Open-source support'
    default:
      return routingHint?.startsWith('service-') ? `Service · ${routingHint.replace(/^service-/, '').replace(/-/g, ' ')}` : 'General intake'
  }
}

export function buildLeadRoutingMeta(input: LeadRoutingInput): LeadRoutingMeta {
  const topic = normalizeLeadRoutingValue(input.topic)
  const intent = normalizeLeadRoutingValue(input.intent)
  const product = normalizeLeadRoutingValue(input.product)
  const tier = cleanDisplayValue(input.tier)
  const routing_hint = leadRoutingHint({ topic, intent, product })
  const triage_label = leadTriageLabel(routing_hint)
  const priorityHints = new Set(['openplan-fit-conversation', 'openplan-general', 'funding-readiness-review'])

  return {
    ip: input.ip || null,
    user_agent: input.userAgent || null,
    topic,
    intent,
    product,
    tier,
    budget_range: cleanDisplayValue(input.budgetRange) || null,
    project_geography: cleanDisplayValue(input.projectGeography) || null,
    desired_start_date: cleanDisplayValue(input.desiredStartDate) || null,
    routing_hint,
    triage_label,
    triage_priority: priorityHints.has(routing_hint || '') ? 'high' : 'normal',
    triage_reason: routing_hint
      ? `Captured from contact routing context: ${[topic, intent, product].filter(Boolean).join(' / ') || routing_hint}.`
      : 'No routed topic, intent, or product context was supplied.',
  }
}
