import { useEffect } from 'react'
import { analyticsConfig } from '../config/analytics'
import { createAnalyticsSession } from '../services/analytics'
import { createGoogleAnalyticsTransport } from '../services/googleAnalytics'
import { getAnalyticsInteraction, getAnalyticsPage } from '../utils/analytics'

let session: ReturnType<typeof createAnalyticsSession> | undefined

function getSession() {
  if (!analyticsConfig || analyticsConfig.base.origin !== window.location.origin) return undefined
  session ??= createAnalyticsSession(createGoogleAnalyticsTransport(analyticsConfig.measurementId))
  return session
}

export function useAnalytics(pathname: string) {
  useEffect(() => {
    if (analyticsConfig) getSession()?.visit(getAnalyticsPage(pathname, analyticsConfig.base))
  }, [pathname])

  useEffect(() => {
    const client = getSession()
    if (!client) return
    const syncConsent = () => client.consent(window.lgeAnalyticsConsent === true)
    const click = (event: MouseEvent) => {
      if (window.lgeAnalyticsConsent !== true || event.defaultPrevented) return
      if (event.button !== (event.type === 'auxclick' ? 1 : 0)) return
      const link = event.target instanceof Element ? event.target.closest('a[href]') : null
      if (!(link instanceof HTMLAnchorElement)) return
      const action = getAnalyticsInteraction(
        link.href,
        link.hasAttribute('data-analytics-catalog'),
        Boolean(link.closest('#informativa')),
      )
      if (action) client.click(action, link.closest('footer') ? 'footer' : 'content')
    }
    window.addEventListener('lge:analytics-consent', syncConsent)
    document.addEventListener('click', click)
    document.addEventListener('auxclick', click)
    syncConsent()
    return () => {
      window.removeEventListener('lge:analytics-consent', syncConsent)
      document.removeEventListener('click', click)
      document.removeEventListener('auxclick', click)
      client.consent(false)
    }
  }, [])
}
