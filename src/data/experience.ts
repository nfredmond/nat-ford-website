/**
 * Planning experience shown on the home, about, and experience pages.
 * All of it predates Nat Ford Planning & Analysis: the projects were
 * delivered on staff at Green DOT Transportation Solutions, 2021–2025.
 * Keep the attribution wherever this data renders.
 */

export const experienceCounties = [
  'Alpine',
  'Butte',
  'Calaveras',
  'Colusa',
  'Del Norte',
  'El Dorado',
  'Humboldt',
  'Placer',
  'Plumas',
  'Shasta',
  'Sierra',
  'Siskiyou',
  'Tehama',
  'Trinity',
] as const

export type ExperienceProject = {
  slug: string
  title: string
  county: string
  year: string
  type: string
  summary: string
  work?: string[]
}

export const experienceProjects: ExperienceProject[] = [
  {
    slug: 'sierra-rtp',
    title: 'Sierra County Regional Transportation Plan',
    county: 'Sierra',
    year: '2024',
    type: 'Regional transportation plan',
    summary:
      'Performance targets and a fiscally constrained 10-year project list for a high-elevation rural county.',
    work: [
      'Combined SWITRS collisions, HPMS traffic volumes, ACS and Department of Finance growth trends, and the maintenance backlog in one PostGIS model.',
      'Built web maps so county staff could test targets and funding scenarios before the board hearing.',
      'Matched each project to SB 1, IIJA, or SHOPP funding and a safety, preservation, or access outcome.',
    ],
  },
  {
    slug: 'del-norte-atp',
    title: 'Del Norte County Active Transportation Plan',
    county: 'Del Norte',
    year: '2024',
    type: 'Active transportation plan',
    summary:
      'Walking and bicycling network gaps turned into phased projects ready for Active Transportation Program applications.',
    work: [
      'Mapped network gaps across the populated coastal areas, weighted toward routes children use to reach school.',
      'Split a general list of needs into discrete segments, each defined well enough to fund on its own.',
      'Assembled the maps, need statements, and narrative into ATP applications.',
    ],
  },
  {
    slug: 'tehama-vmt',
    title: 'Tehama County VMT Strategy and CIP',
    county: 'Tehama',
    year: '2025',
    type: 'VMT analysis and capital program',
    summary:
      'Vehicle-miles-traveled (VMT) reduction strategies tied to a prioritized capital improvement program (CIP).',
    work: [
      'Assessed which land-use and transportation strategies reduce VMT in a rural county.',
      'Connected each strategy to buildable capital projects and ranked them by cost, readiness, and benefit.',
      'Matched the program to carbon-reduction and active transportation funding the county could pursue.',
    ],
  },
  {
    slug: 'plumas-transit-5339',
    title: 'Plumas Transit FTA 5339 Application',
    county: 'Plumas',
    year: '2024',
    type: 'Federal transit grant',
    summary:
      'Grant narrative for a transit facility under FTA Section 5339, linking site feasibility, fleet transition, and public benefit.',
  },
  {
    slug: 'placer-mias',
    title: 'Placer County MIAS',
    county: 'Placer',
    year: '2024',
    type: 'Countywide screening',
    summary: 'Countywide multimodal screening with planning-level cost ranges and guidance on packaging projects.',
  },
  {
    slug: 'el-dorado-mobility',
    title: 'El Dorado Next Gen Mobility',
    county: 'El Dorado',
    year: '2024',
    type: 'Mobility program',
    summary: 'Phased mobility program options with performance measures and an implementation structure.',
  },
]

export const priorRoles = [
  {
    title: 'Senior Transportation Planner',
    employer: 'Green DOT Transportation Solutions',
    years: '2021–2025',
    summary:
      'Regional and active transportation plans across 14 Northern California counties, VMT analysis, and grant applications including ATP, RAISE, TIRCP, and PROTECT.',
  },
  {
    title: 'Transportation Coordinator',
    employer: 'gRide, Genentech commuter program',
    years: '2018–2021',
    summary:
      'Day-to-day operation of a commuter program spanning transit, shuttle, ferry, and carpool, including an early electric bus deployment.',
  },
  {
    title: 'Planning Intern',
    employer: 'San Francisco County Transportation Authority',
    years: '2017–2018',
    summary: 'ConnectSF long-range planning, Vision Zero safety analysis, surveys, and community workshops.',
  },
]
