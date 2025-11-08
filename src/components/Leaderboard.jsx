import { useState } from 'react'
import './Leaderboard.css'

export default function Leaderboard({ athletes = [] }) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleLeaderboard = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Leaderboard Button */}
      <button
        className="leaderboard-button"
        onClick={toggleLeaderboard}
        aria-label="Toggle leaderboard"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
      </button>

      {/* Leaderboard Panel */}
      <div className={`leaderboard-panel ${isOpen ? 'open' : ''}`}>
        <div className="leaderboard-header">
          <h3>Leaderboard</h3>
          <button
            className="close-button"
            onClick={toggleLeaderboard}
            aria-label="Close leaderboard"
          >
            ×
          </button>
        </div>
        <div className="leaderboard-content">
          {athletes.length === 0 ? (
            <div className="no-athletes">
              No athletes in the race yet
            </div>
          ) : (
            <div className="athlete-list">
              {athletes
                .sort((a, b) => b.distance - a.distance)
                .map((athlete, index) => (
                  <div key={athlete.id} className="athlete-item">
                    <span className="position">{index + 1}</span>
                    <div className="athlete-info">
                      <div className="athlete-name">{athlete.name}</div>
                      <div className="athlete-distance">
                        {athlete.distance.toFixed(1)} km
                      </div>
                    </div>
                    {athlete.bib && (
                      <span className="athlete-bib">{athlete.bib}</span>
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}