import type { AnalyticsTransport, GoogleTagCommand } from '../types/analytics'

export function createGoogleAnalyticsTransport(id: string): AnalyticsTransport {
  let configured = false
  const disabled = `ga-disable-${id}` as const
  const consent = {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  } as const
  const deniedConsent = { ...consent, analytics_storage: 'denied' } as const

  function tag(...command: GoogleTagCommand): void
  function tag() {
    // eslint-disable-next-line prefer-rest-params -- gtag consumes native Arguments objects.
    window.lgeAnalyticsLayer?.push(arguments)
  }

  return {
    load() {
      window[disabled] = true
      if (!window.lgeAnalyticsLayer?.length) {
        window.lgeAnalyticsLayer = []
        tag('consent', 'default', deniedConsent)
      }
      return new Promise<void>((resolve, reject) => {
        const script = document.createElement('script')
        script.async = true
        script.referrerPolicy = 'no-referrer'
        script.src = `https://www.googletagmanager.com/gtag/js?id=${id}&l=lgeAnalyticsLayer`
        script.onload = () => resolve()
        script.onerror = () => {
          script.remove()
          reject(new Error('Analytics script unavailable'))
        }
        document.head.append(script)
      })
    },
    enable(page) {
      window[disabled] = false
      tag('consent', 'update', consent)
      tag('set', page)
      if (!configured) {
        tag('js', new Date())
        tag('config', id, {
          send_page_view: false,
          allow_google_signals: false,
          allow_ad_personalization_signals: false,
          cookie_domain: 'none',
          cookie_path: '/',
          cookie_prefix: 'lge',
        })
        configured = true
      }
    },
    disable() {
      window[disabled] = true
      if (configured) {
        tag('consent', 'update', deniedConsent)
        // The tag owns only these host-scoped, root-path cookies.
        for (const name of document.cookie.split(';').map((item) => item.trim().split('=')[0])) {
          if (name && /^lge_ga(?:_|$)/.test(name)) {
            document.cookie = `${name}=; Max-Age=0; Path=/; Secure; SameSite=Lax`
          }
        }
      }
    },
    pageView(page) {
      tag('set', page)
      tag('event', 'page_view', { ...page, send_to: id })
    },
    interaction(event, placement, page) {
      tag('event', event, { ...page, send_to: id, link_placement: placement })
    },
  }
}
