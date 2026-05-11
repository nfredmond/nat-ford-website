import { Clock, Linkedin, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react'
import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { Card, CardContent } from '@/components/ui/card'
import { ContactIntakeForm } from '@/components/features/contact-intake-form'

type ContactPageShellProps = {
  title: string
  subtitle: string
  initialIntent?: string
  initialTopic?: string
  initialProduct?: string
  initialTier?: string
}

export function ContactPageShell({
  title,
  subtitle,
  initialIntent = '',
  initialTopic = '',
  initialProduct = '',
  initialTier = '',
}: ContactPageShellProps) {
  return (
    <>
      <Section spacing="lg" className="hero-mesh text-white">
        <Container>
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,0.72fr)]">
            <div className="max-w-3xl">
              <span className="pill">Contact</span>
              <h1 className="section-title mt-5 text-[2.75rem] leading-[0.96] text-white sm:text-5xl md:text-6xl">{title}</h1>
              <p className="mt-5 max-w-3xl text-lg text-white/84">{subtitle}</p>

              <div className="mt-8 hidden gap-3 text-sm font-semibold text-white/82 sm:grid sm:grid-cols-2">
                <div className="rounded-2xl border border-white/16 bg-white/[0.07] p-4">Northern California planning practice</div>
                <div className="rounded-2xl border border-white/16 bg-white/[0.07] p-4">FAA Part 107 aerial capture</div>
                <div className="rounded-2xl border border-white/16 bg-white/[0.07] p-4">Open-source implementation support</div>
                <div className="rounded-2xl border border-white/16 bg-white/[0.07] p-4">Board-ready public-sector deliverables</div>
              </div>

              <div className="mt-7 hidden items-start gap-3 rounded-2xl border border-white/16 bg-white/[0.07] p-4 text-sm leading-6 text-white/78 sm:flex">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[color:var(--copper)]" />
                <p>
                  No sales maze. The first response is a practical recommendation: fit audit, scoped sprint, planning support,
                  or a clear no-build/no-fit answer if that is the honest path.
                </p>
              </div>
            </div>

            <Card className="bg-[color:var(--background)] text-[color:var(--foreground)] shadow-2xl">
              <CardContent className="p-5 sm:p-7">
                <ContactIntakeForm
                  initialIntent={initialIntent}
                  initialTopic={initialTopic}
                  initialProduct={initialProduct}
                  initialTier={initialTier}
                />
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      <Section spacing="md">
        <Container>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
              <Card>
                <CardContent className="space-y-4 p-6">
                  <h3 className="text-lg font-semibold text-[color:var(--ink)]">Contact Information</h3>

                  <div className="flex items-start gap-3 text-sm text-[color:var(--foreground)]/78">
                    <MapPin className="mt-0.5 h-4 w-4 text-[color:var(--pine)]" />
                    <span>Sierra Foothills · Near Grass Valley, California</span>
                  </div>

                  <div className="flex items-start gap-3 text-sm text-[color:var(--foreground)]/78">
                    <Mail className="mt-0.5 h-4 w-4 text-[color:var(--pine)]" />
                    <a href="mailto:nathaniel@natfordplanning.com" className="font-semibold text-[color:var(--pine)] hover:underline">
                      nathaniel@natfordplanning.com
                    </a>
                  </div>

                  <div className="flex items-start gap-3 text-sm text-[color:var(--foreground)]/78">
                    <Phone className="mt-0.5 h-4 w-4 text-[color:var(--pine)]" />
                    <div>
                      <a href="tel:+15302648801" className="font-semibold text-[color:var(--pine)] hover:underline">
                        (530) 264-8801
                      </a>
                      <p className="text-xs text-[color:var(--foreground)]/62">Google Voice intake line</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-sm text-[color:var(--foreground)]/78">
                    <Linkedin className="mt-0.5 h-4 w-4 text-[color:var(--pine)]" />
                    <a href="https://linkedin.com/in/nfredmond" target="_blank" rel="noopener noreferrer" className="font-semibold text-[color:var(--pine)] hover:underline">
                      linkedin.com/in/nfredmond
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-lg font-semibold text-[color:var(--ink)]">Response Expectations</h3>
                  <div className="flex items-start gap-3 text-sm text-[color:var(--foreground)]/78">
                    <Clock className="mt-0.5 h-4 w-4 text-[color:var(--pine)]" />
                    <span>Typical response: 1–2 business days. For urgent matters, email directly.</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-[color:var(--line)] bg-[color:var(--fog)]/75 text-[color:var(--ink)] dark:border-white/15 dark:bg-[#101c27] dark:text-white">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-[color:var(--ink)] dark:text-white">Discovery First</h3>
                  <p className="mt-2 text-sm text-[color:var(--foreground)]/78 dark:text-white/78">
                    Every new engagement begins with a scoped intake so recommendations remain realistic, fair, and executable.
                  </p>
                </CardContent>
              </Card>
          </div>
        </Container>
      </Section>
    </>
  )
}
