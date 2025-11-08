import Map from '../components/Map'

function Home() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <h1 style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        zIndex: 1000,
        margin: 0,
        color: 'white',
        textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
        fontSize: '2rem',
        fontWeight: 'bold'
      }}>
        Sport Radar
      </h1>
      <Map />
    </div>
  )
}

export default Home
