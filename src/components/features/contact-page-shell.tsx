import { Clock, Linkedin, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react'
import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { ContourField } from '@/components/features/contour-field'
import { ContactIntakeForm } from '@/components/features/contact-intake-form'

type ContactPageShellProps = {
  title: string
  subtitle: string
  initialIntent?: string
  initialTopic?: string
  initialInquiry?: string
  initialProduct?: string
  initialTier?: string
}

const assurances = [
  'Open-source implementation support',
  'Transportation planning & grants',
  'FAA Part 107 aerial capture',
  'Board-ready public-sector deliverables',
]

export function ContactPageShell({
  title,
  subtitle,
  initialIntent = '',
  initialTopic = '',
  initialInquiry = '',
  initialProduct = '',
  initialTier = '',
}: ContactPageShellProps) {
  return (
    <>
      <section className="on-dark relative overflow-hidden bg-[#0b120f] text-white">
        <ContourField className="opacity-55" />
        <Container size="xl" className="relative py-14 md:py-20">
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(400px,0.78fr)]">
            <div>
              <p className="index-label text-[color:var(--copper)]">Contact</p>
              <h1 className="display-2 mt-5 text-white">{title}</h1>
              <p className="lead measure-wide mt-5 text-white/78">{subtitle}</p>

              <ul className="mt-8 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                {assurances.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-white/78">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--copper)]" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex items-start gap-3 rounded-2xl border border-white/12 bg-white/[0.05] p-4 text-sm leading-6 text-white/72">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[color:var(--copper)]" aria-hidden="true" />
                <p>
                  No sales maze. The first reply is a practical recommendation: a fit audit, a
                  scoped sprint, planning support, or an honest no-build answer if that is the right
                  call.
                </p>
              </div>
            </div>

            <div id="contact-form" className="scroll-mt-24 rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface)] p-5 text-[color:var(--foreground)] shadow-2xl shadow-black/25 sm:p-7">
              <ContactIntakeForm
                initialIntent={initialIntent}
                initialTopic={initialTopic}
                initialInquiry={initialInquiry}
                initialProduct={initialProduct}
                initialTier={initialTier}
              />
            </div>
          </div>
        </Container>
      </section>

      <Section spacing="md">
        <Container size="xl">
          <div className="grid gap-5 lg:grid-cols-3">
            <div className="surface-card p-6">
              <h2 className="label">Reach Nat directly</h2>
              <dl className="mt-4 space-y-3.5 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--pine)] dark:text-[color:var(--pine-soft)]" aria-hidden="true" />
                  <dd className="text-[color:var(--muted)]">Sierra foothills · near Grass Valley, California</dd>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--pine)] dark:text-[color:var(--pine-soft)]" aria-hidden="true" />
                  <dd>
                    <a href="mailto:nathaniel@natfordplanning.com" className="font-medium text-[color:var(--pine)] hover:underline dark:text-[color:var(--pine-soft)]">
                      nathaniel@natfordplanning.com
                    </a>
                  </dd>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--pine)] dark:text-[color:var(--pine-soft)]" aria-hidden="true" />
                  <dd>
                    <a href="tel:+15302648801" className="font-medium text-[color:var(--pine)] hover:underline dark:text-[color:var(--pine-soft)]">
                      (530) 264-8801
                    </a>
                    <p className="mt-0.5 font-mono text-xs text-[color:var(--faint)]">Google Voice intake line</p>
                  </dd>
                </div>
                <div className="flex items-start gap-3">
                  <Linkedin className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--pine)] dark:text-[color:var(--pine-soft)]" aria-hidden="true" />
                  <dd>
                    <a href="https://www.linkedin.com/in/nfredmond" target="_blank" rel="noopener noreferrer" className="font-medium text-[color:var(--pine)] hover:underline dark:text-[color:var(--pine-soft)]">
                      linkedin.com/in/nfredmond
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            <div className="surface-card p-6">
              <h2 className="label">Response time</h2>
              <div className="mt-4 flex items-start gap-3 text-sm text-[color:var(--muted)]">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--pine)] dark:text-[color:var(--pine-soft)]" aria-hidden="true" />
                <p>Typically 1–2 business days. For anything urgent, email directly and say so.</p>
              </div>
            </div>

            <div className="surface-inset p-6">
              <h2 className="label">What happens next</h2>
              <p className="mt-4 text-sm leading-6 text-[color:var(--muted)]">
                Every engagement starts with a scoped intake, so the recommendation stays realistic
                and executable before any work begins.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
