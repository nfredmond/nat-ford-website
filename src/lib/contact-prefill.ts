export const inquiryTypes = [
  'Open-source software support',
  'Custom software development',
  'Planning support',
  'GIS / mapping',
  'Grant strategy',
  'OpenPlan product',
  'Ads automation product',
  'General inquiry',
]

export const timelines = ['Immediate (0-30 days)', 'Near-term (1-3 months)', 'Planning horizon (3+ months)']

export const budgetRanges = ['$3.5K – $8.5K', '$8.5K – $18K', '$18K +', 'Not sure yet']

const checkoutInquiryByProduct: Record<string, string> = {
  openplan: 'OpenPlan product',
  'ads-automation': 'Ads automation product',
  'drone-ops': 'General inquiry',
  'planner-ai-workflow-guide-v2': 'General inquiry',
}

const checkoutProductLabel: Record<string, string> = {
  openplan: 'OpenPlan Software',
  'ads-automation': 'Marketing & Planning Analytics Software',
  'drone-ops': 'DroneOps Intelligence',
  'planner-ai-workflow-guide-v2': 'AI-Assisted Planning Workflows',
}

const supportProductLabel: Record<string, string> = {
  openplan: 'OpenPlan',
  opengeo: 'OpenGeo',
  'aerial-intel-platform': 'Aerial Intel Platform',
  clawmodeler: 'ClawModeler',
  'ads-chatbot': 'Marketing & Planning Analytics Software',
  clawchat: 'ClawChat',
  'planner-ai-workflow-guide-v2': 'AI-Assisted Planning Workflows',
}

const topicAliases: Record<string, string> = {
  aerial: 'aerial-mapping',
  'aerial-scope': 'aerial-mapping',
  'aerial-mapping': 'aerial-mapping',
  ai: 'ai-documentation',
  'ai-documentation': 'ai-documentation',
  'custom-ai': 'custom-software',
  'custom-grant-ai': 'custom-software',
  'custom-software': 'custom-software',
  drone: 'aerial-mapping',
  gis: 'gis-mapping',
  'gis-analysis': 'gis-mapping',
  'gis-mapping': 'gis-mapping',
  grant: 'grant-strategy',
  grants: 'grant-strategy',
  'grant-strategy': 'grant-strategy',
  'funding-readiness': 'funding-readiness-scorecard',
  'funding-readiness-scorecard': 'funding-readiness-scorecard',
  openplan: 'openplan',
  'open-source': 'open-source-support',
  'open-source-support': 'open-source-support',
  planning: 'planning-support',
  'planning-support': 'planning-support',
  'transportation-planning': 'planning-support',
  portal: 'portal-support',
  'portal-support': 'portal-support',
}

const serviceLabelByTopic: Record<string, string> = {
  'aerial-mapping': 'Aerial mapping / photogrammetry',
  'ai-documentation': 'AI-enabled documentation',
  'custom-software': 'Custom software / AI implementation',
  'gis-mapping': 'GIS / spatial analysis',
  'grant-strategy': 'Funding and grant strategy',
  'planning-support': 'Urban and transportation planning',
  'portal-support': 'Customer portal support',
}

const serviceDescriptionByTopic: Record<string, string> = {
  'aerial-mapping': [
    'Aerial mapping / photogrammetry request',
    '',
    'Site or corridor to capture:',
    'Output needed: orthomosaic, terrain model, photos, GIS layer, or evidence packet?',
    'Known access, airspace, or timing constraints:',
    'How the deliverable will be used:',
  ].join('\n'),
  'ai-documentation': [
    'AI-enabled documentation / workflow audit request',
    '',
    'Document, report, or workflow to improve:',
    'Current tools or templates involved:',
    'Human review / approval requirements:',
    'What would make the next production cycle measurably better?',
  ].join('\n'),
  'custom-software': [
    'Custom software / AI implementation request',
    '',
    'Workflow or problem to solve:',
    'Current tools or systems involved:',
    'Users / roles who need access:',
    'What would make this successful in the next 30-90 days?',
  ].join('\n'),
  'gis-mapping': [
    'GIS / spatial analysis request',
    '',
    'Geography or service area:',
    'Datasets already available:',
    'Maps, analysis, dashboard, or database output needed:',
    'Decision or deadline this needs to support:',
  ].join('\n'),
  'grant-strategy': [
    'Funding / grant strategy request',
    '',
    'Project or program seeking funding:',
    'Target grant program or funding window:',
    'Current readiness status:',
    'Where help is most needed: fit, narrative, scoring, exhibits, or package QA?',
  ].join('\n'),
  'planning-support': [
    'Urban / transportation planning request',
    '',
    'Plan, corridor, project list, or policy question:',
    'Community / agency / service area:',
    'Known deadline or board action:',
    'What decision should the work help clarify?',
  ].join('\n'),
  'portal-support': [
    'Customer portal support / scope-change request',
    '',
    'Product or engagement involved:',
    'Support need or requested change:',
    'Timing / urgency:',
  ].join('\n'),
}

function normalizeRoutingValue(value?: string) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
}

function normalizeTopic(topic?: string, inquiry?: string) {
  const normalized = normalizeRoutingValue(topic || inquiry)
  return topicAliases[normalized] || normalized
}

export type ContactPrefillInput = {
  initialIntent?: string
  initialTopic?: string
  initialInquiry?: string
  initialProduct?: string
  initialTier?: string
}

export type ContactContextNotice = {
  title: string
  body: string
}

export function buildContactPrefill({
  initialIntent = '',
  initialTopic = '',
  initialInquiry = '',
  initialProduct = '',
  initialTier = '',
}: ContactPrefillInput) {
  const requestIntent = normalizeRoutingValue(initialIntent)
  const requestTopic = normalizeTopic(initialTopic, initialInquiry)
  const checkoutProduct = normalizeRoutingValue(initialProduct)
  const checkoutTier = String(initialTier || '').trim()

  const checkoutIntent = ['subscription', 'checkout', 'purchase'].includes(requestIntent)
  const pilotUpdatesIntent = ['updates', 'pilot-updates', 'waitlist-updates'].includes(requestIntent)
  const discoveryIntent = requestIntent === 'discovery' || Boolean(requestTopic || checkoutProduct)
  const fitConversationIntent = ['fit', 'discuss-fit'].includes(requestIntent)
  const fundingReadinessIntent =
    ['scorecard-review', 'funding-readiness-review'].includes(requestIntent) ||
    requestTopic === 'funding-readiness-scorecard'
  const openSourceSupportIntent = requestTopic === 'open-source-support'
  const openPlanProductContext = requestTopic === 'openplan' || checkoutProduct === 'openplan'
  const customSoftwareIntent = requestTopic === 'custom-software'
  const serviceLabel = serviceLabelByTopic[requestTopic] || ''

  const defaultInquiryType = fundingReadinessIntent
    ? 'Grant strategy'
    : requestTopic === 'grant-strategy'
      ? 'Grant strategy'
      : ['gis-mapping', 'aerial-mapping'].includes(requestTopic)
        ? 'GIS / mapping'
        : requestTopic === 'planning-support'
          ? 'Planning support'
          : requestTopic === 'portal-support'
            ? 'General inquiry'
            : customSoftwareIntent || requestTopic === 'ai-documentation'
            ? 'Custom software development'
            : openSourceSupportIntent
              ? 'Open-source software support'
              : checkoutInquiryByProduct[checkoutProduct] || (openPlanProductContext ? 'OpenPlan product' : '')

  const defaultTimeline = checkoutIntent
    ? timelines[0]
    : pilotUpdatesIntent
      ? timelines[2]
      : discoveryIntent || fitConversationIntent || fundingReadinessIntent
        ? timelines[1]
        : ''

  const checkoutLabel = checkoutProductLabel[checkoutProduct] || checkoutProduct
  const supportLabel = supportProductLabel[checkoutProduct] || checkoutLabel || checkoutProduct
  const defaultDescription = checkoutIntent
    ? ['Access/support request', `Product: ${checkoutLabel}`, checkoutTier ? `Prior selected tier: ${checkoutTier}` : null, '', 'Please share the right open-source setup, managed deployment, support, or access next step.']
        .filter(Boolean)
        .join('\n')
    : pilotUpdatesIntent && openPlanProductContext
      ? ['OpenPlan updates request', 'Product: OpenPlan Software', '', 'Please keep me informed about open-source releases, managed deployment availability, pilot timing, and major product updates.']
          .filter(Boolean)
          .join('\n')
      : fitConversationIntent && openPlanProductContext
        ? ['OpenPlan / open-source support request', 'Product: OpenPlan Software', '', 'Please help me assess whether OpenPlan, a custom fork, or managed open-source deployment is the right fit for our workflow.']
            .filter(Boolean)
            .join('\n')
        : openSourceSupportIntent
          ? [
              'Open-source deployment/support request',
              '',
              `Project or repo of interest: ${supportLabel || ''}`,
              'Do you need hosting, custom fork, onboarding, support, or all of the above?',
              'Current data/systems involved:',
              'Timeline or urgency:',
            ].join('\n')
          : fundingReadinessIntent
            ? [
                'Funding readiness review request',
                '',
                'If available, include your score band or current score from the Funding Readiness Scorecard.',
                'Target funding window / program:',
                'Top readiness gaps or concerns:',
                'What outcome would be most helpful from a review?',
              ].join('\n')
            : serviceDescriptionByTopic[requestTopic] || ''

  const contextNotice: ContactContextNotice | null = checkoutIntent
    ? {
        title: 'Access/support request detected',
        body: `We captured your selected product context${checkoutTier ? ` (${checkoutTier})` : ''}. Complete the form and we’ll send the right open-source setup, managed deployment, or support next step.`,
      }
    : pilotUpdatesIntent && openPlanProductContext
      ? {
          title: 'OpenPlan pilot updates request',
          body: 'This intake will be labeled for OpenPlan update follow-up so it can be separated from immediate managed-support requests.',
        }
      : fitConversationIntent && openPlanProductContext
        ? {
            title: 'OpenPlan / open-source support request',
            body: 'We captured that you want a fit discussion first, not a forced checkout path.',
          }
        : fundingReadinessIntent
          ? {
              title: 'Funding readiness review request',
              body: 'Use this intake to share your score, timeline, and the main gaps you want help prioritizing. This is a scoped review request, not a guarantee of funding success.',
            }
          : serviceLabel
            ? {
                title: `${serviceLabel} context prefilled`,
                body: 'The form is already routed from the page you came from. Add only the missing essentials; budget, dates, and geography can wait until discovery if needed.',
              }
            : openSourceSupportIntent
              ? {
                  title: 'Open-source support context prefilled',
                  body: 'The form is already labeled for implementation support, custom forks, managed deployment, or support planning.',
                }
              : null

  const submitLabel = pilotUpdatesIntent && openPlanProductContext
    ? 'Request OpenPlan updates'
    : fitConversationIntent && openPlanProductContext
      ? 'Request OpenPlan fit review'
      : fundingReadinessIntent
        ? 'Request funding readiness review'
        : serviceLabel
          ? `Request ${serviceLabel} intake`
          : 'Request discovery'

  const successTitle = pilotUpdatesIntent && openPlanProductContext
    ? 'OpenPlan update request received'
    : fitConversationIntent && openPlanProductContext
      ? 'OpenPlan fit request received'
      : fundingReadinessIntent
        ? 'Funding readiness request received'
        : 'Inquiry received'

  const successMessage = pilotUpdatesIntent && openPlanProductContext
    ? 'Thanks — your request is now labeled for OpenPlan pilot-update follow-up. We typically respond within 1–2 business days.'
    : fitConversationIntent && openPlanProductContext
      ? 'Thanks — your request is now labeled for OpenPlan fit follow-up. We typically respond within 1–2 business days.'
      : fundingReadinessIntent
        ? 'Thanks — your request is now labeled for funding-readiness follow-up. We typically respond within 1–2 business days.'
        : 'Thanks — your message is now in our intake pipeline. We typically respond within 1–2 business days.'

  return {
    requestIntent,
    requestTopic,
    checkoutProduct,
    checkoutTier,
    checkoutIntent,
    pilotUpdatesIntent,
    fitConversationIntent,
    fundingReadinessIntent,
    openPlanProductContext,
    defaultInquiryType,
    defaultTimeline,
    defaultDescription,
    contextNotice,
    submitLabel,
    successTitle,
    successMessage,
  }
}
