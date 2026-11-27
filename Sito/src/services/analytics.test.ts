import { describe, expect, it, vi } from 'vitest'
import { analyticsConfig, getAnalyticsConfig } from '../config/analytics'
import { contacts } from '../config/contacts'
import { ipeaCatalogs } from '../data/interiorDoors'
import { shutterCatalogs } from '../data/shutters'
import { getAnalyticsInteraction, getAnalyticsPage } from '../utils/analytics'
import { getContactLinks } from '../utils/contactLinks'
import { createAnalyticsSession } from './analytics'

const base = new URL('https://showroom.example/')
const testId = 'G-' + 'T'.repeat(10)

function delayedTag() {
  let loaded = () => {}
  let fail = () => {}
  const transport = {
    load: vi.fn(
      () =>
        new Promise<void>((resolve, reject) => {
          loaded = resolve
          fail = () => reject(new Error('Blocked'))
        }),
    ),
    enable: vi.fn(),
    disable: vi.fn(),
    pageView: vi.fn(),
    interaction: vi.fn(),
  }
  return {
    transport,
    fail: async () => {
      fail()
      await Promise.resolve()
    },
    session: createAnalyticsSession(transport),
    loaded: async () => {
      loaded()
      await Promise.resolve()
    },
  }
}

describe('optional audience measurement', () => {
  it('requires a production build, a commercial origin, authorization and a measurement ID', () => {
    expect(analyticsConfig).toBeNull()
    expect(getAnalyticsConfig(true, 'true', testId, base)).toEqual({ base, measurementId: testId })
    expect(getAnalyticsConfig(false, 'true', testId, base)).toBeNull()
    expect(getAnalyticsConfig(true, 'true', testId, null)).toBeNull()
    for (const value of [undefined, '', 'false', 'yes'])
      expect(getAnalyticsConfig(true, value, testId, base)).toBeNull()
    for (const id of [undefined, '', 'UA-123', 'GTM-123', testId + '?leak'])
      expect(getAnalyticsConfig(true, 'true', id, base)).toBeNull()
  })

  it('sends only canonical routes and authored page titles, including for a 404 with a private path', () => {
    const url = '/prodotti/infissi/?email=private%40example.org#address'
    expect(getAnalyticsPage(url, base)).toEqual(getAnalyticsPage('/prodotti/infissi', base))
    expect(getAnalyticsPage(url, base).page_location).toBe(new URL('prodotti/infissi/', base).href)
    expect(getAnalyticsPage('/blog/private@example.org/?phone=00000#secret', base)).toEqual({
      page_location: new URL('404.html', base).href,
      page_title: 'Pagina non trovata',
    })
    expect(getAnalyticsPage('/privacy-policy', base).page_location).toBe(
      new URL('privacy-policy/', base).href,
    )
  })

  it('classifies only catalog actions and verified commercial contacts, excluding privacy contacts', () => {
    const commercial = getContactLinks(contacts)
    expect(getAnalyticsInteraction(commercial.whatsapp ?? '', false, false)).toBe('click_whatsapp')
    expect(getAnalyticsInteraction(commercial.phone ?? '', false, false)).toBe('click_phone')
    expect(getAnalyticsInteraction(commercial.phone ?? '', false, true)).toBeNull()
    expect(getAnalyticsInteraction('tel:+0000000000', false, false)).toBeNull()
    expect(getAnalyticsInteraction(contacts.mapUrl, false, false)).toBe('click_directions')
    expect(getAnalyticsInteraction(ipeaCatalogs[0].url, true, false)).toBe('open_catalog')
    expect(getAnalyticsInteraction(shutterCatalogs[0].url, true, false)).toBe('open_catalog')
    expect(
      getAnalyticsInteraction(new URL('documents/test.pdf', base).href, false, false),
    ).toBeNull()
    expect(getAnalyticsInteraction('https://www.google.com/maps/', false, false)).toBeNull()
  })

  it('retains only post-consent navigation and clicks in order while loading, then deduplicates navigation', async () => {
    const { session, transport, loaded } = delayedTag()
    const previous = getAnalyticsPage('/competenze', base)
    const home = getAnalyticsPage('/', base)
    const windows = getAnalyticsPage('/prodotti/infissi', base)
    session.visit(previous)
    session.click('click_whatsapp', 'content')
    session.visit(home)
    expect(transport.load).not.toHaveBeenCalled()
    session.consent(true)
    session.consent(true)
    session.click('open_catalog', 'content')
    session.visit(windows)
    session.visit(getAnalyticsPage('/prodotti/infissi/?x=y#top', base))
    expect(transport.load).toHaveBeenCalledTimes(1)
    expect(transport.interaction).not.toHaveBeenCalled()
    await loaded()
    const initial = { ...home, page_referrer: '' }
    expect(transport.pageView.mock.calls).toEqual([
      [initial],
      [{ ...windows, page_referrer: home.page_location }],
    ])
    expect(transport.interaction).toHaveBeenCalledExactlyOnceWith(
      'open_catalog',
      'content',
      initial,
    )
    const [first, next] = transport.pageView.mock.invocationCallOrder
    expect(transport.interaction.mock.invocationCallOrder[0]).toBeGreaterThan(first ?? Infinity)
    expect(transport.interaction.mock.invocationCallOrder[0]).toBeLessThan(next ?? 0)
    session.visit(home)
    expect(transport.pageView).toHaveBeenCalledTimes(3)
    expect(transport.pageView).toHaveBeenLastCalledWith({
      ...home,
      page_referrer: windows.page_location,
    })
  })

  it('discards a failed load and retries only on a later action after the cooldown', async () => {
    vi.useFakeTimers()
    try {
      const { session, transport, loaded, fail } = delayedTag()
      session.visit(getAnalyticsPage('/', base))
      session.consent(true)
      session.click('open_catalog', 'content')
      await fail()
      session.visit(getAnalyticsPage('/lavori', base))
      session.click('click_phone', 'footer')
      expect(transport.load).toHaveBeenCalledTimes(1)
      vi.advanceTimersByTime(30_000)
      expect(transport.load).toHaveBeenCalledTimes(1)
      session.click('click_directions', 'content')
      expect(transport.load).toHaveBeenCalledTimes(2)
      await loaded()
      const page = { ...getAnalyticsPage('/lavori', base), page_referrer: '' }
      expect(transport.pageView).toHaveBeenCalledExactlyOnceWith(page)
      expect(transport.interaction).toHaveBeenCalledExactlyOnceWith(
        'click_directions',
        'content',
        page,
      )
    } finally {
      vi.useRealTimers()
    }
  })

  it('bounds events kept in memory if the tag does not finish loading', async () => {
    const { session, transport, loaded } = delayedTag()
    session.visit(getAnalyticsPage('/', base))
    session.consent(true)
    for (let index = 0; index < 80; index++) session.click('open_catalog', 'content')
    await loaded()
    expect(transport.pageView).toHaveBeenCalledTimes(1)
    expect(transport.interaction).toHaveBeenCalledTimes(63)
    expect(transport.load).toHaveBeenCalledTimes(1)
  })

  it('honors withdrawal during script loading, and counts only the current view on renewed consent', async () => {
    const { session, transport, loaded } = delayedTag()
    session.visit(getAnalyticsPage('/', base))
    session.consent(true)
    session.click('open_catalog', 'footer')
    session.consent(false)
    await loaded()
    const current = getAnalyticsPage('/lavori', base)
    session.visit(current)
    session.click('click_directions', 'footer')
    expect(transport.enable).not.toHaveBeenCalled()
    expect(transport.pageView).not.toHaveBeenCalled()
    expect(transport.interaction).not.toHaveBeenCalled()
    session.consent(true)
    expect(transport.load).toHaveBeenCalledTimes(1)
    expect(transport.pageView).toHaveBeenCalledExactlyOnceWith({ ...current, page_referrer: '' })
    session.consent(false)
    session.click('click_phone', 'footer')
    expect(transport.disable).toHaveBeenCalledTimes(2)
    expect(transport.interaction).not.toHaveBeenCalled()
  })
})
