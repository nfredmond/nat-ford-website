type DataDeletionStatusPageProps = {
  searchParams: Promise<{
    code?: string
  }>
}

export const metadata = {
  title: 'Facebook Data Deletion Request Status',
}

export default async function DataDeletionStatusPage({ searchParams }: DataDeletionStatusPageProps) {
  const params = await searchParams
  const code = params.code || 'pending'

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="surface-card p-8">
        <p className="index-label">Nat Ford Planning &amp; Analysis</p>
        <h1 className="mt-3 font-display text-3xl font-semibold text-[color:var(--ink)]">
          Facebook Data Deletion Request
        </h1>
        <p className="mt-4 text-sm text-[color:var(--muted)]">
          Your request has been received and logged. I process deletion requests promptly in
          accordance with Meta Platform Terms and applicable privacy requirements.
        </p>

        <div className="surface-inset mt-6 p-4">
          <p className="label">Confirmation code</p>
          <p className="data mt-1 break-all text-base font-semibold text-[color:var(--ink)]">{code}</p>
        </div>

        <div className="mt-6 space-y-2 text-sm text-[color:var(--muted)]">
          <p>
            Status: <span className="font-medium text-[color:var(--ink)]">Received</span>
          </p>
          <p>
            If no Facebook user data is stored for your account context, the request is treated as
            completed with no further action required.
          </p>
          <p>
            Questions:{' '}
            <a
              className="font-medium text-[color:var(--pine)] hover:underline dark:text-[color:var(--pine-soft)]"
              href="mailto:nathaniel@natfordplanning.com"
            >
              nathaniel@natfordplanning.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
