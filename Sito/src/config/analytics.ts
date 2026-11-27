import type { AnalyticsConfig } from '../types/analytics'
import { publicBase } from '../utils/siteSeo'

export function getAnalyticsConfig(
  production: boolean,
  authorized: string | undefined,
  measurementId: string | undefined,
  base: URL | null,
): AnalyticsConfig | null {
  const id = measurementId?.trim()
  if (!production || authorized !== 'true' || !base || !id || !/^G-[A-Z0-9]{10}$/.test(id)) {
    return null
  }
  return { measurementId: id, base }
}

// The build can remove the tag loader entirely from the default preview and commercial bundles.
export const analyticsConfig =
  import.meta.env.PROD &&
  import.meta.env.VITE_PUBLIC_PREVIEW === 'false' &&
  import.meta.env.VITE_GA4_AUTHORIZED === 'true'
    ? getAnalyticsConfig(true, 'true', import.meta.env.VITE_GA4_MEASUREMENT_ID, publicBase)
    : null
