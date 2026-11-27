import type {
  AnalyticsInteraction,
  AnalyticsPage,
  AnalyticsPageContext,
  AnalyticsPlacement,
  AnalyticsRecord,
  AnalyticsTransport,
} from '../types/analytics'

const maxPendingEvents = 64
const retryDelayMs = 30_000

export function createAnalyticsSession(transport: AnalyticsTransport) {
  let granted = false
  let loading = false
  let loaded = false
  let active = false
  let retryAfter = 0
  let page: AnalyticsPage | undefined
  let context: AnalyticsPageContext | undefined
  const pending: AnalyticsRecord[] = []

  function send(record: AnalyticsRecord) {
    if (!active) {
      transport.enable(record.page)
      active = true
    }
    if (record.event === 'page_view') transport.pageView(record.page)
    else transport.interaction(record.event, record.placement, record.page)
  }

  function record(item: AnalyticsRecord) {
    if (loaded) {
      send(item)
      return
    }
    // Keep the initial view and most recent consented actions if the tag is unusually slow.
    if (pending.length === maxPendingEvents) pending.splice(1, 1)
    pending.push(item)
    if (loading) return
    loading = true
    void transport.load().then(
      () => {
        loaded = true
        loading = false
        if (granted) pending.splice(0).forEach(send)
      },
      () => {
        loading = false
        pending.length = 0
        context = undefined
        retryAfter = Date.now() + retryDelayMs
      },
    )
  }

  function reportPage() {
    if (
      !granted ||
      !page ||
      Date.now() < retryAfter ||
      context?.page_location === page.page_location
    )
      return
    context = { ...page, page_referrer: context?.page_location ?? '' }
    record({ event: 'page_view', page: context })
  }

  return {
    visit(next: AnalyticsPage) {
      page = next
      reportPage()
    },
    consent(allowed: boolean) {
      if (granted === allowed) return
      granted = allowed
      if (allowed) {
        retryAfter = 0
        reportPage()
      } else {
        pending.length = 0
        context = undefined
        active = false
        transport.disable()
      }
    },
    click(event: AnalyticsInteraction, placement: AnalyticsPlacement) {
      if (!granted) return
      // A later user action can retry a failed load, starting with its current page.
      reportPage()
      if (context) record({ event, placement, page: context })
    },
  }
}
