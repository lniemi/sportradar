# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Sport Radar is an ultra-trail event spectator application that displays participant locations on a map in real-time. The app allows spectators to follow specific participants, track their progress, and use AR technology to locate nearby participants when viewing events physically along the route.

## Tech Stack

- **Frontend**: React 19 with Vite
- **Styling**: Tailwind CSS v4
- **Mapping**: Mapbox GL JS
- **Routing**: React Router v7
- **Backend** (planned): Supabase (config present but not yet integrated)

## Development Commands

```bash
npm run dev      # Start development server with hot reload
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Environment Configuration

The application requires a Mapbox access token. Copy [.env.example](.env.example) to `.env` and add your Mapbox token:

```
VITE_MAPBOX_ACCESS_TOKEN=your_token_here
```

## Application Architecture

### Route Structure

- **Entry point**: [src/main.jsx](src/main.jsx) - Sets up React, Router, and Mapbox CSS
- **Router**: [src/App.jsx](src/App.jsx) - Defines application routes
- **Pages**:
  - [src/pages/Home.jsx](src/pages/Home.jsx) - Main map view with race UI components (timer, leaderboard, athlete info)
  - [src/pages/SimulationManager.jsx](src/pages/SimulationManager.jsx) - Control panel for athlete simulation (separate window)

### Cross-Window Communication Pattern

The app uses a **localStorage-based message passing system** for communication between the Home (map) window and SimulationManager window:

**SimulationManager → Home (commands)**:
- Writes to `localStorage.setItem('simulation_command', JSON.stringify({ command, data }))`
- Commands: `start_single_athlete`, `start`, `pause`, `resume`, `stop`, `reset`, `set_speed`
- Home listens via `storage` event handler

**Home → SimulationManager (state updates)**:
- Writes to `localStorage.setItem('simulation_state', JSON.stringify(state))`
- Broadcasts simulation state every 100ms (position, distance, progress, speed, etc.)
- SimulationManager listens via `storage` event handler

This pattern enables real-time synchronization between windows without a backend.

### Map Component

[src/components/Map.jsx](src/components/Map.jsx) is the core component that:
- Initializes Mapbox GL with globe projection and terrain (DEM exaggeration: 1.5)
- Loads the TOR330 route from [public/TOR330.geojson](public/TOR330.geojson)
- Renders the route as a yellow line layer
- Auto-fits the map bounds to the route extent
- Exposes `updateAthletePosition(lng, lat)` and `removeAthleteMarker()` methods via ref

### Athlete Simulation System

The simulation system allows virtual athletes to traverse routes for testing and development:

**Core module**: [src/simulations/athleteSimulation.js](src/simulations/athleteSimulation.js)
- `AthleteSimulation` class manages simulated athlete movement along the route
- Loads route coordinates from GeoJSON and calculates total distance
- Supports initial positioning (athletes can start at any distance along route)
- Provides controls: start, pause, resume, stop, reset, and speed adjustment
- Returns current state including position (lng/lat/elevation), distance covered, progress %, elapsed time, and finish status

**Utilities**: [src/simulations/utils.js](src/simulations/utils.js)
- `haversineDistance()` - Calculates distance between two geographic points
- `calculateTotalDistance()` - Sums distances along an entire route
- `getPositionAtDistance()` - Interpolates position at a specific distance along the route

**Key pattern**: Home page maintains multiple athlete states, but only one is actively simulated. Non-simulated athletes display static distance/position from mock data. When simulation runs, that athlete's data updates in real-time.

### UI Components

All spectator UI components use fixed positioning to overlay the map with semi-transparent backgrounds and backdrop blur:

**RaceTimer**: [src/components/RaceTimer.jsx](src/components/RaceTimer.jsx)
- Live race timer with pulsing "LIVE" indicator
- Displays elapsed time in HH:MM:SS or MM:SS format
- Fixed position top-left, below navbar

**Leaderboard**: [src/components/Leaderboard.jsx](src/components/Leaderboard.jsx)
- Toggle button with star icon (fixed position below race timer)
- Expandable side panel that slides in from the left
- Shows ranked list of athletes sorted by distance covered
- Top 3 positions have medal-colored position badges

**AthleteInfoSheet**: [src/components/AthleteInfoSheet.jsx](src/components/AthleteInfoSheet.jsx)
- Search bar positioned at bottom center of screen
- Search functionality by athlete name or bib number
- Selected athlete info panel displays distance, position, speed, and checkpoint
- Auto-selects simulated athlete when simulation starts

### Data Files

Route data is stored in [public/](public/):
- `TOR330.geojson` - Full race route (converted from GPX)
- `TOR330_waypoints.geojson` - Key waypoints along the route

The root directory contains source files including `TOR330-CERT-2025.gpx` (original GPX route file).

## Code Patterns

- All components use functional React with hooks
- Map state managed via refs to prevent re-renders
- Route coordinates format: `[longitude, latitude, elevation]`
- GeoJSON features use MultiLineString geometry (access via `features[0].geometry.coordinates[0]`)
