import type { IconProps } from '../../types/ui'

export function Icon({ name, className }: IconProps) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {name === 'close' && <path d="m6 6 12 12M18 6 6 18" />}
      {name === 'arrow' && <path d="M4 12h15m-6-6 6 6-6 6" />}
      {name === 'chevron-left' && <path d="m14 5-7 7 7 7" />}
      {name === 'chevron-right' && <path d="m10 5 7 7-7 7" />}
      {name === 'pause' && <path d="M8 5v14M16 5v14" />}
      {name === 'play' && <path d="m8 4 12 8-12 8z" />}
      {name === 'down' && <path d="M12 3v17m-6-6 6 6 6-6" />}
      {name === 'clock' && (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </>
      )}
      {name === 'pin' && (
        <>
          <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
          <circle cx="12" cy="10" r="2.5" />
        </>
      )}
      {name === 'phone' && (
        <path d="m5 3 4 1 1 5-3 2c1.5 3 3 4.5 6 6l2-3 5 1 1 4c-5 7-22-10-16-16Z" />
      )}
      {name === 'mail' && (
        <>
          <rect x="3" y="5" width="18" height="14" rx="1" />
          <path d="m3 6 9 7 9-7" />
        </>
      )}
      {name === 'instagram' && (
        <>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r=".6" />
        </>
      )}
      {name === 'whatsapp' && (
        <>
          <path d="M20.5 11.5A8.5 8.5 0 0 1 8 19l-5 2 1.5-5A8.5 8.5 0 1 1 20.5 11.5Z" />
          <path d="M8 8c1 4 3 6 7 7l1-2-3-1-1 1-2-2 1-1-1-3Z" />
        </>
      )}
      {name === 'craft' && (
        <>
          <path d="m4 20 7-7m2-2 7-7M3 17l4 4M14 3l7 7M7 4l3 3-3 3-3-3Zm8 11 5 5" />
          <path d="m14 17 3-3" />
        </>
      )}
      {name === 'thermal' && (
        <>
          <path d="M9 14V5a3 3 0 0 1 6 0v9a5 5 0 1 1-6 0Z" />
          <path d="M12 8v10m6-12h3m-3 4h2" />
        </>
      )}
      {name === 'shield' && (
        <>
          <path d="m12 2 8 3v6c0 6-8 11-8 11S4 17 4 11V5Z" />
          <path d="m8 11 3 3 5-6" />
        </>
      )}
      {name === 'energy' && (
        <>
          <path d="m3 11 9-8 9 8M6 9v11h12V9" />
          <path d="m13 9-4 6h4l-1 4 4-7h-4Z" />
        </>
      )}
      {name === 'external' && (
        <>
          <path d="M13 3h8v8m0-8L10 14M9 3H3v18h18v-6" />
        </>
      )}
      {name === 'star' && <path d="m12 2 3 6.5 7 1-5 5 1.2 7-6.2-3.3-6.2 3.3 1.2-7-5-5 7-1Z" />}
    </svg>
  )
}
