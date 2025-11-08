import './ARButton.css'

export default function ARButton({ isAthleteInfoExpanded = false, onClick }) {
  return (
    <button
      className={`ar-button ${isAthleteInfoExpanded ? 'shifted' : ''}`}
      onClick={onClick}
      aria-label="Toggle AR view"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6" />
        <line x1="2" y1="20" x2="2.01" y2="20" />
      </svg>
    </button>
  )
}
