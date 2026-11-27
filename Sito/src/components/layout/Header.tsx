import { useLocation } from 'react-router-dom'
import { PageLink } from '../ui/PageLink'
import { site } from '../../config/site'
import { navigation } from '../../data/navigation'
import { products } from '../../data/products'
import { useHeaderNavigation } from '../../hooks/useHeaderNavigation'
import { useHomeSectionInView } from '../../hooks/useHomeSectionInView'
import { useScrollThreshold } from '../../hooks/useScrollThreshold'
import { MobileMenu } from './MobileMenu'
import styles from './Header.module.css'

export function Header() {
  const { hash, pathname: routePath } = useLocation()
  const pathname = routePath.replace(/\/+$/, '') || '/'
  const homeSection =
    pathname === '/'
      ? [navigation.reviews, navigation.contact].find(({ path }) => path === `/${hash}`)
      : undefined
  const homeSectionInView = useHomeSectionInView(homeSection ? hash.slice(1) : undefined)
  const activeHomePath = (homeSectionInView && homeSection?.path) || navigation.home.path
  const activePath = pathname === '/' ? activeHomePath : pathname
  const solutionsActive = products.some((product) => product.path === pathname)
  const scrolled = useScrollThreshold(24)
  const {
    rootRef,
    sectionsRef,
    sectionsButtonRef,
    menuButtonRef,
    sectionsOpen,
    mobileOpen,
    mobileSectionsOpen,
    toggleSections,
    toggleMobile,
    toggleMobileSections,
    closeSections,
    closeNavigation,
  } = useHeaderNavigation()
  const overVideo = pathname === '/' && !scrolled && !mobileOpen
  return (
    <header
      ref={rootRef}
      className={`${styles.header} ${scrolled ? styles.scrolled : ''} ${mobileOpen ? styles.menuOpen : ''} ${overVideo ? styles.overVideo : ''}`}
      role={mobileOpen ? 'dialog' : undefined}
      aria-modal={mobileOpen || undefined}
      aria-label={mobileOpen ? 'Menu di navigazione' : undefined}
    >
      <div className={styles.surface} data-header-chrome aria-hidden="true" />
      <div className={styles.bar}>
        <nav className={styles.desktopNav} aria-label="Navigazione principale" data-header-chrome>
          <PageLink
            to={navigation.home.path}
            className={styles.navigationLink}
            aria-current={activePath === navigation.home.path ? 'location' : undefined}
            onClick={closeNavigation}
          >
            {navigation.home.label}
          </PageLink>
          <div
            className={styles.sections}
            ref={sectionsRef}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) closeSections()
            }}
          >
            <button
              ref={sectionsButtonRef}
              className={styles.navigationLink}
              type="button"
              onClick={toggleSections}
              aria-expanded={sectionsOpen}
              aria-controls="desktop-sections"
              aria-current={solutionsActive ? 'location' : undefined}
            >
              Soluzioni <span className={styles.chevron} aria-hidden="true" />
            </button>
            <ul
              className={`${styles.dropdown} ${sectionsOpen ? styles.dropdownOpen : ''}`}
              id="desktop-sections"
              inert={!sectionsOpen}
              aria-hidden={!sectionsOpen}
            >
              {products.map((product) => (
                <li key={product.id}>
                  <PageLink to={product.path} onClick={closeNavigation}>
                    {product.title}
                  </PageLink>
                </li>
              ))}
            </ul>
          </div>
          <PageLink
            to={navigation.work.path}
            className={styles.navigationLink}
            aria-current={activePath === navigation.work.path ? 'location' : undefined}
            onClick={closeNavigation}
          >
            {navigation.work.label}
          </PageLink>
          <PageLink
            to={navigation.blog.path}
            className={styles.navigationLink}
            aria-current={
              pathname === navigation.blog.path || pathname.startsWith(`${navigation.blog.path}/`)
                ? 'location'
                : undefined
            }
            onClick={closeNavigation}
          >
            {navigation.blog.label}
          </PageLink>
        </nav>
        <PageLink
          to={navigation.home.path}
          className={styles.brand}
          aria-label="LGE, homepage"
          onClick={closeNavigation}
        >
          <img
            src={site.logo}
            alt=""
            width="2172"
            height="724"
            data-logo
            data-critical
            fetchPriority="high"
          />
        </PageLink>
        <div className={styles.right} data-header-chrome>
          {[navigation.competencies, navigation.reviews, navigation.contact].map((item) => (
            <PageLink
              key={item.path}
              to={item.path}
              className={`${styles.contactLink} ${styles.navigationLink}`}
              aria-current={activePath === item.path ? 'location' : undefined}
              onClick={closeNavigation}
            >
              {item.label}
            </PageLink>
          ))}
          <button
            ref={menuButtonRef}
            type="button"
            className={styles.menuToggle}
            onClick={toggleMobile}
            aria-label={mobileOpen ? 'Chiudi menu' : 'Apri menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </div>
      <MobileMenu
        open={mobileOpen}
        activePath={activePath}
        solutionsActive={solutionsActive}
        sectionsOpen={mobileSectionsOpen}
        onToggleSections={toggleMobileSections}
        onNavigate={closeNavigation}
      />
    </header>
  )
}
