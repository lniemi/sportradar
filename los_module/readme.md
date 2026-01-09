# Line of Sight (LOS) Module

This module provides functionality to calculate and visualize the line of sight between two points.

The exact logic and frameworks used are still to be determined, but the core features will include:

1. Use of Copernicus DEM data
2. Calculation of line of sight between two geographic coordinates
3. Production of an raw output that can be later visualized in the main app

## Research

The logic by which this will be implemented is going to be explored first in a python notebook environment. After that has been done and clear and good practices have been established, the logic will be transferred to the main application.

The way how the environment and required libraries will be set up is at first at least going to be done using virtual environments (venv) and pip. Later if needed and there are e.g. conflict of dependencies other solutions (mainly conda) will be explored. The venv is going to be in the los_module folder, not at the root.

The research will use same data sources as the main application and same study area(s). The main application data currently just uses a gpx file for the race path and the height 

## Integration

There may be multiple ways to integrate this module into the main application. First that comes to mind is this:

**Integration with ARView**. ARView was designed from the beginning to visualize geospatial data in augmented reality. The LOS module can leverage ARView's capabilities to display line of sight results directly within an AR environment, providing users with an immersive experience.