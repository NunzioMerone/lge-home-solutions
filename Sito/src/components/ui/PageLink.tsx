import { Link, useResolvedPath } from 'react-router-dom'
import type { LinkProps } from 'react-router-dom'
import { pagePathname } from '../../utils/pagePath'

/** Internal page navigation, including relative links, filters and in-page anchors. */
export function PageLink({ to, ...props }: LinkProps) {
  const destination = useResolvedPath(to, { relative: props.relative ?? 'route' })
  return <Link {...props} to={{ ...destination, pathname: pagePathname(destination.pathname) }} />
}
