// Preview hosts and special-use names must never become the site's public identity.
const reservedHost =
  /(?:^|\.)(?:example\.(?:com|net|org)|github\.io|localhost|example|invalid|test|local|internal|home\.arpa)$/i
const domainName =
  /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+(?:[a-z]{2,63}|xn--[a-z0-9-]{1,59})$/i

export function getPublicSiteBase(
  preview: string | undefined,
  origin: string | undefined,
  basePath: string,
): URL | null {
  if (preview !== 'false' || !origin || !/^https:\/\/[^/\\?#@%\s]+\/?$/i.test(origin)) return null
  // Accept directory paths only. Do not let URL normalization hide a host or dot segment.
  if (!basePath.startsWith('/') || /\/\/|[\\?#\s]/.test(basePath)) return null
  try {
    for (const segment of basePath.split('/')) {
      const decoded = decodeURIComponent(segment)
      if (decoded === '.' || decoded === '..' || /[/\\%?#\p{Cc}]/u.test(decoded)) return null
    }
    const url = new URL(origin)
    if (
      !domainName.test(url.hostname) ||
      reservedHost.test(url.hostname) ||
      url.hostname.length > 253
    )
      return null
    url.pathname = basePath.replace(/\/*$/, '/')
    return url
  } catch {
    return null
  }
}
