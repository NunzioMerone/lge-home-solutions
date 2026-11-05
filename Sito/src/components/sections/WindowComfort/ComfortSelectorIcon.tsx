import type { ComfortSelectorIconProps } from '../../../types/windowComfort'

export function ComfortSelectorIcon({ topic }: ComfortSelectorIconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {topic === 'quiet' && (
        <>
          <path d="M13 4h7v16h-7ZM16.5 4v16M3 9c1.8 1.5 1.8 4.5 0 6M7 6c3.3 3.3 3.3 8.7 0 12" />
        </>
      )}
      {topic === 'temperature' && (
        <>
          <path d="M8 14V5a3 3 0 0 1 6 0v9a5 5 0 1 1-6 0ZM11 7v10m6-12h3m-3 4h2" />
          <circle cx="11" cy="18" r="1" />
        </>
      )}
      {topic === 'daylight' && (
        <>
          <path d="M9 9h12v12H9ZM15 9v12M9 15h12M6 2v2M2 6h2m-.8-2.8 1.4 1.4" />
          <path d="M6 10a4 4 0 1 1 4-4" />
        </>
      )}
    </svg>
  )
}
