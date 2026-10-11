import { Container } from '@/components/layout/container'
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
    <section className="py-16 md:py-24">
      <Container size="xl">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:gap-20">
          <div>
            <h1 className="display-1 text-[color:var(--ink)]">{title}</h1>
            <p className="lead measure mt-6 text-[color:var(--muted)]">{subtitle}</p>

            <dl className="mt-10 space-y-5 border-t-[3px] border-[color:var(--ink)] pt-6 font-ui">
              <div>
                <dt className="label">Email</dt>
                <dd className="mt-0.5 text-lg">
                  <a href="mailto:nathaniel@natfordplanning.com" className="prose-link font-semibold">
                    nathaniel@natfordplanning.com
                  </a>
                </dd>
              </div>
              <div>
                <dt className="label">Phone</dt>
                <dd className="mt-0.5 text-lg">
                  <a href="tel:+15304929775" className="prose-link font-semibold">
                    (530) 492-9775
                  </a>
                </dd>
              </div>
              <div>
                <dt className="label">LinkedIn</dt>
                <dd className="mt-0.5 text-lg">
                  <a
                    href="https://www.linkedin.com/in/nfredmond"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="prose-link font-semibold"
                  >
                    linkedin.com/in/nfredmond
                  </a>
                </dd>
              </div>
              <div>
                <dt className="label">Location</dt>
                <dd className="mt-0.5 text-lg text-[color:var(--ink)]">Grass Valley, California</dd>
              </div>
            </dl>
          </div>

          <div
            id="contact-form"
            className="surface-card scroll-mt-24 font-ui border-t-[6px] border-t-[color:var(--sign)] p-5 sm:p-8"
          >
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
  )
}
