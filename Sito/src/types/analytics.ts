export type AnalyticsInteraction =
  'click_whatsapp' | 'click_phone' | 'open_catalog' | 'click_directions'
export type AnalyticsPlacement = 'content' | 'footer'

export interface AnalyticsConfig {
  measurementId: string
  base: URL
}

export interface AnalyticsPage {
  page_location: string
  page_title: string
}

export interface AnalyticsPageContext extends AnalyticsPage {
  page_referrer: string
}

export type AnalyticsRecord =
  | { event: 'page_view'; page: AnalyticsPageContext }
  | { event: AnalyticsInteraction; placement: AnalyticsPlacement; page: AnalyticsPageContext }

export interface AnalyticsTransport {
  load: () => Promise<void>
  enable: (page: AnalyticsPageContext) => void
  disable: () => void
  pageView: (page: AnalyticsPageContext) => void
  interaction: (
    event: AnalyticsInteraction,
    placement: AnalyticsPlacement,
    page: AnalyticsPageContext,
  ) => void
}

export type GoogleTagCommand =
  | ['js', Date]
  | ['consent', 'default' | 'update', Record<string, 'granted' | 'denied'>]
  | ['set', AnalyticsPageContext]
  | ['config', string, Record<string, string | boolean>]
  | [
      'event',
      'page_view' | AnalyticsInteraction,
      AnalyticsPageContext & { send_to: string; link_placement?: AnalyticsPlacement },
    ]

declare global {
  interface Window {
    /** The CMP owns this snapshot and notifies the site on every change. */
    lgeAnalyticsConsent?: boolean
    lgeAnalyticsLayer?: IArguments[]
    [key: `ga-disable-${string}`]: boolean | undefined
  }
}
