/**
 * Latest OpenPlan release from the GitHub API, refreshed at most hourly.
 * Returns null on any failure so the page simply omits the line.
 */
export type OpenPlanRelease = { tag: string; date: string; url: string }

export async function getLatestOpenPlanRelease(): Promise<OpenPlanRelease | null> {
  try {
    const res = await fetch('https://api.github.com/repos/nfredmond/openplan/releases/latest', {
      headers: { Accept: 'application/vnd.github+json' },
      next: { revalidate: 3600 },
    })
    if (!res.ok) return null
    const data = (await res.json()) as { tag_name?: string; published_at?: string; html_url?: string }
    if (!data.tag_name || !data.published_at || !data.html_url) return null
    const date = new Date(data.published_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'America/Los_Angeles',
    })
    return { tag: data.tag_name, date, url: data.html_url }
  } catch {
    return null
  }
}
