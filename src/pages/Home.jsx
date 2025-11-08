import { useRef, useState, useEffect } from 'react'
import Map from '../components/Map'
import Navbar from '../components/Navbar'
import RaceTimer from '../components/RaceTimer'
import Leaderboard from '../components/Leaderboard'
import AthleteInfoSheet from '../components/AthleteInfoSheet'
import { createAthleteSimulation } from '../simulations/athleteSimulation'

function Home() {
  const mapRef = useRef(null)
  const [simulation, setSimulation] = useState(null)
  const simulationRef = useRef(null)
  const [raceStartTime, setRaceStartTime] = useState(null)
  const [isRaceRunning, setIsRaceRunning] = useState(false)
  const [athletes, setAthletes] = useState([])
  const [currentAthleteState, setCurrentAthleteState] = useState(null)

  // Listen for commands from SimulationManager window
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'simulation_command' && e.newValue) {
        try {
          const { command, data } = JSON.parse(e.newValue)
          handleCommand(command, data)
        } catch (err) {
          console.error('Failed to parse simulation command:', err)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const handleCommand = async (command, data = {}) => {
    switch (command) {
      case 'start_single_athlete':
        if (!simulationRef.current) {
          const sim = createAthleteSimulation()
          await sim.initialize()
          if (data.speed) {
            sim.setSpeed(data.speed)
          }
          simulationRef.current = sim
          setSimulation(sim)
          setRaceStartTime(Date.now())
          setIsRaceRunning(true)
        }
        break

      case 'start':
        if (simulationRef.current) {
          simulationRef.current.start()
          setRaceStartTime(Date.now())
          setIsRaceRunning(true)
        }
        break

      case 'pause':
        if (simulationRef.current) {
          simulationRef.current.pause()
        }
        break

      case 'resume':
        if (simulationRef.current) {
          simulationRef.current.resume()
        }
        break

      case 'stop':
        if (simulationRef.current) {
          simulationRef.current.stop()
          if (mapRef.current) {
            mapRef.current.removeAthleteMarker()
          }
          simulationRef.current = null
          setSimulation(null)
          setIsRaceRunning(false)
          setRaceStartTime(null)
        }
        break

      case 'reset':
        if (simulationRef.current) {
          simulationRef.current.reset()
        }
        break

      case 'set_speed':
        if (simulationRef.current && data.speed) {
          simulationRef.current.setSpeed(data.speed)
        }
        break
    }
  }

  // Initialize mock athletes
  useEffect(() => {
    const mockAthletes = [
      { id: 1, name: 'Sarah Johnson', bib: '101', distance: 42.5, speed: 12.3, position: 1 },
      { id: 2, name: 'Mike Chen', bib: '102', distance: 41.2, speed: 11.8, position: 2 },
      { id: 3, name: 'Emma Wilson', bib: '103', distance: 39.8, speed: 11.5, position: 3 },
      { id: 4, name: 'Carlos Rodriguez', bib: '104', distance: 38.5, speed: 11.2, position: 4 },
      { id: 5, name: 'Anna Schmidt', bib: '105', distance: 37.2, speed: 10.9, position: 5 },
      { id: 6, name: 'James Park', bib: '106', distance: 35.8, speed: 10.6, position: 6 },
      { id: 7, name: 'Maria Silva', bib: '107', distance: 34.5, speed: 10.3, position: 7 },
      { id: 8, name: 'Tom Anderson', bib: '108', distance: 33.2, speed: 10.0, position: 8 },
      { id: 9, name: 'Lisa Zhang', bib: '109', distance: 31.8, speed: 9.7, position: 9 },
      { id: 10, name: 'David Miller', bib: '110', distance: 30.5, speed: 9.4, position: 10 }
    ]
    setAthletes(mockAthletes)
  }, [])

  // Update map marker and broadcast state
  useEffect(() => {
    if (!simulation || !mapRef.current) return

    const interval = setInterval(() => {
      const state = simulation.getCurrentState()
      if (state) {
        setCurrentAthleteState(state)

        // Update map marker
        if (simulation.isRunning && !state.isPaused) {
          mapRef.current.updateAthletePosition(
            state.position.lng,
            state.position.lat
          )
        }

        // Broadcast state to SimulationManager window
        localStorage.setItem('simulation_state', JSON.stringify({
          ...state,
          isRunning: simulation.isRunning
        }))

        // Update the first athlete in the list with simulation data
        if (state.distance !== undefined) {
          setAthletes(prev => {
            const updated = [...prev]
            if (updated[0]) {
              updated[0] = {
                ...updated[0],
                distance: state.distance,
                speed: state.speed || updated[0].speed
              }
            }
            return updated
          })
        }
      }
    }, 100)

    return () => clearInterval(interval)
  }, [simulation])

  const handleSelectAthlete = (athlete) => {
    // Center map on selected athlete if they have a position
    console.log('Selected athlete:', athlete)
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Navbar />
      <Map ref={mapRef} />
      <RaceTimer startTime={raceStartTime} isRunning={isRaceRunning} />
      <Leaderboard athletes={athletes} />
      <AthleteInfoSheet
        athletes={athletes}
        onSelectAthlete={handleSelectAthlete}
      />
    </div>
  )
}

export default Home
