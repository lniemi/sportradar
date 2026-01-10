# LOS Module - CLAUDE.md

This file provides guidance for working with the Line of Sight (LOS) research module.

## Purpose

This is a **research-only** module for developing and testing Line of Sight calculations. The code here is exploratory and will eventually be integrated into the main Sport Radar application's ARView component.

**Important**: This folder is completely separate from the main React application. It uses Python with its own virtual environment.

## Environment Setup

### Virtual Environment

The virtual environment should be created in this folder (not at the project root):

```bash
cd los_module
python -m venv venv

# Activate (Windows)
venv\Scripts\activate

# Activate (Unix/macOS)
source venv/bin/activate
```

### Dependencies

Expected libraries (install with pip after activating venv):
- `rasterio` - Reading GeoTIFF DEM files
- `numpy` - Array operations
- `matplotlib` - Visualization
- `pyproj` - Coordinate transformations (if needed)

## File Structure

```
los_module/
├── CLAUDE.md              # This file - detailed instructions
├── readme.md              # Project overview and research notes
├── los_module_research.ipynb  # Jupyter notebook for exploration
├── venv/                  # Python virtual environment (gitignored)
└── data/                  # DEM files and other data (gitignored)
```

## Research Phases

### Phase 1: Copernicus DEM (Current)

Working with raw GeoTIFF DEM files from Copernicus GLO-30 dataset.

**Key tasks:**
1. Load DEM tiles covering the TOR330 route area
2. Implement coordinate-to-elevation lookup
3. Develop LOS calculation algorithm
4. Visualize results (elevation profiles, 2D maps)

**Study area bounds (TOR330 route):**
- Latitude: ~45.5°N to ~46.0°N
- Longitude: ~6.8°E to ~7.5°E

### Phase 2: MapBox terrain-rgb (Future)

Align with the main application's terrain data source.

**Elevation decoding formula:**
```python
height = -10000 + ((R * 256 * 256 + G * 256 + B) * 0.1)
```

## LOS Algorithm Overview

The basic Line of Sight algorithm:

1. **Input**: Observer position (lat, lng, height), Target position (lat, lng, height)
2. **Sample points**: Generate intermediate points along the line between observer and target
3. **Elevation lookup**: For each sample point, get terrain elevation from DEM
4. **Sightline calculation**: Calculate expected sightline height at each point (linear interpolation)
5. **Visibility check**: If terrain elevation > sightline height at any point, view is blocked

**Accuracy considerations:**
- Earth curvature correction: `curvature_drop = distance² / (2 * earth_radius)`
- Observer height offset (e.g., 1.7m for eye level)
- DEM resolution limitations (30m may miss small obstacles)

## Integration with Main App

The eventual integration target is `src/components/ARView.jsx`. The LOS module should produce output compatible with ARView's coordinate system:

- Coordinates in WGS84 (lat/lng)
- Elevation in meters
- Output format: JSON with observer, target, visibility status, and optionally blocked points

## Data Sources

### Copernicus DEM
- **GLO-30**: 30m resolution, freely available
- **GLO-90**: 90m resolution, freely available
- Download from: Copernicus Open Access Hub, OpenTopography, or AWS Open Data

### Main App Route Data
- Route GeoJSON: `../public/TOR330.geojson`
- Format: `[longitude, latitude, elevation]` coordinates
- Can be used to validate elevation lookups

## Code Style

- This is exploratory research code - prioritize clarity over optimization
- Document findings and decisions in markdown cells
- Keep the notebook runnable from top to bottom
- Use descriptive variable names
