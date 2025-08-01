# Philosophical Nexus

## Overview

The Philosophical Nexus is an interactive 3D web application that visualizes the interconnected world of philosophical thought across 2,500+ years of history. Built as a Streamlit application, it transforms complex philosophical relationships into an explorable spatial universe through a 3D orb visualization. The platform enables users to discover connections between philosophers, explore their ideas through different lenses (domains, eras, influence networks), and understand how philosophical thought has evolved over time. The application serves university students, educators, and curious generalists who want to explore philosophy through immersive visual experiences rather than traditional text-based approaches.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The application uses **Streamlit** as the primary web framework, providing a Python-based approach to building interactive web applications. The architecture follows a modular design pattern with separate modules handling different concerns:

- **app.py**: Main application entry point that orchestrates the user interface and coordinates between different modules
- **data_processor.py**: Handles all data loading and processing operations, implementing caching for performance
- **visualization.py**: Contains the PhilosophicalOrb class responsible for creating 3D visualizations using Plotly
- **styles.py**: Manages the retro/cassette-futurism visual theme with custom CSS

The chosen Streamlit framework enables rapid prototyping and deployment while providing built-in state management and caching capabilities. This approach prioritizes development speed and ease of maintenance over complex frontend frameworks.

### Data Processing Layer
The system implements a **PhilosopherDataProcessor** class that handles JSON data loading and transformation. The processor converts raw philosopher data into pandas DataFrames for efficient manipulation and visualization. It includes error handling for missing data files and creates fallback empty structures to maintain application stability.

The data structure supports rich philosophical metadata including:
- Biographical information (birth/death years, locations)
- Philosophical domains and expertise levels
- Spiral Dynamics developmental stages
- Philosophical genome characteristics
- Influence relationships and connections

### 3D Visualization Engine
The visualization layer uses **Plotly Graph Objects** to create interactive 3D scenes. The PhilosophicalOrb class implements:
- Wireframe sphere representations for the orb structure
- Philosopher nodes positioned in 3D space
- Domain-based color coding and filtering
- Interactive hover effects and selection mechanisms

This approach was chosen over WebGL-based solutions like Three.js to maintain consistency with the Python ecosystem and leverage Plotly's built-in interactivity features.

### State Management
The application uses Streamlit's native session state for managing user interactions and filters. Key state variables include:
- Selected philosopher tracking
- Domain and era filtering preferences
- View mode settings

### Styling and Theme System
A custom CSS injection system creates the retro-futuristic aesthetic featuring:
- Scanline effects and CRT monitor styling
- Monospace fonts (VT323, Press Start 2P)
- Phosphor green color scheme (#00FF00)
- Grid overlay backgrounds and visual noise effects

## External Dependencies

### Core Framework Dependencies
- **Streamlit**: Primary web application framework for Python-based interactive applications
- **Pandas**: Data manipulation and analysis library for handling philosopher datasets
- **NumPy**: Numerical computing library for mathematical operations in visualizations

### Visualization Libraries
- **Plotly**: Interactive graphing library providing 3D visualization capabilities through Graph Objects and Express modules
- **NetworkX**: Graph theory library for analyzing philosopher relationship networks (imported but not fully implemented in current codebase)

### Data Storage
- **JSON Files**: Local file-based storage for philosopher data located in `/data/philosophers.json`
- No external database dependencies in current implementation
- File system-based data loading with fallback mechanisms for missing data

### Development Tools
- **Pathlib**: Standard library for cross-platform file path handling
- **JSON**: Built-in Python module for data serialization/deserialization

The application is designed to run as a standalone Streamlit application without external service dependencies, making it suitable for local development and simple deployment scenarios. The modular architecture allows for future expansion to include database backends, API integrations, or more sophisticated 3D rendering engines.