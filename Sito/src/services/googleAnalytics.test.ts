import { afterEach, expect, it, vi } from 'vitest'
import type { GoogleTagCommand } from '../types/analytics'
import { createGoogleAnalyticsTransport } from './googleAnalytics'

afterEach(() => vi.unstubAllGlobals())

it('loads only when asked, sends manual views and strips destinations, advertising, and credentials from commands', async () => {
  const id = 'G-' + 'T'.repeat(10)
  const browser = { lgeAnalyticsLayer: [] as IArguments[] }
  const script = { src: '', referrerPolicy: '', onload: () => {}, remove: vi.fn() }
  const append = vi.fn()
  const cookieDeletes: string[] = []
  vi.stubGlobal('window', browser)
  vi.stubGlobal('document', {
    createElement: () => script,
    head: { append },
    get cookie() {
      return 'lge_ga=123; lge_ga_TTT=456; preference=abc'
    },
    set cookie(value: string) {
      cookieDeletes.push(value)
    },
  })
  const transport = createGoogleAnalyticsTransport(id)
  expect(append).not.toHaveBeenCalled()
  const ready = transport.load()
  expect(append).toHaveBeenCalledOnce()
  expect(script.referrerPolicy).toBe('no-referrer')
  expect(new URL(script.src).searchParams.get('id')).toBe(id)
  script.onload()
  await ready
  const page = { page_location: 'https://showroom.example/', page_title: 'Home', page_referrer: '' }
  transport.enable(page)
  transport.pageView(page)
  transport.interaction('click_whatsapp', 'content', page)
  transport.disable()
  const commands = browser.lgeAnalyticsLayer.map((args) => Array.from(args))
  expect(commands[0]).toEqual([
    'consent',
    'default',
    expect.objectContaining({ analytics_storage: 'denied' }),
  ])
  expect(commands).toContainEqual([
    'config',
    id,
    expect.objectContaining({ send_page_view: false, allow_google_signals: false }),
  ])
  expect(commands).toContainEqual([
    'event',
    'click_whatsapp',
    { ...page, send_to: id, link_placement: 'content' },
  ] satisfies GoogleTagCommand)
  expect(commands.filter(([name]) => name === 'event')).toHaveLength(2)
  expect(commands.at(-1)).toEqual([
    'consent',
    'update',
    expect.objectContaining({ analytics_storage: 'denied' }),
  ])
  expect(window[`ga-disable-${id}`]).toBe(true)
  expect(cookieDeletes.map((item) => item.split('=')[0])).toEqual(['lge_ga', 'lge_ga_TTT'])
  transport.enable(page)
  expect(
    browser.lgeAnalyticsLayer.map((args) => args[0]).filter((name) => name === 'config'),
  ).toHaveLength(1)
})
