/** Public pages are served from directories. Route IDs stay independent of their URL spelling. */
export function pagePathname(pathname: string) {
  return pathname.replace(/\/*$/, '/')
}
