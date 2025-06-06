# HKS Growth Lab Code Sample

This project demonstrates two front-end development challenges:
1. An autocomplete component implementation with hierarchical data
2. A product space graph visualization using D3.js force simulation

## Quick Start

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the demo.

- **Autocomplete Component**: [http://localhost:3000/](http://localhost:3000/)
- **Product Space Graph**: [http://localhost:3000/product-space](http://localhost:3000/product-space)

## Tech Stack

- [Vite](https://vite.dev/) (v6.3.5) - Build tool and development server
- TypeScript (v5.8.3) - Type-safe JavaScript
- [React](https://react.dev/) (v19.1.0) - UI library
- [Tailwind CSS](https://tailwindcss.com/) (v3.4.17) - Utility-first CSS framework
- [@heroui/autocomplete](https://www.heroui.com/docs/components/autocomplete) (v2.3.21) - Autocomplete component library
- [D3.js](http://d3js.org/) (v7.9.0) - Data visualization library

## Implementation Decisions & Trade-offs

### Autocomplete Component

#### Component Library vs. Custom Implementation

**Decision: Used @heroui/autocomplete component library**

**Pros:**
- Pre-built accessibility features
- Reduced development time
- Robust functionality out of the box

**Cons:**
- Steeper learning curve due to high customization options
- Potential conflicts with other component libraries
- Less control over implementation details

**Alternatives Considered:**
1. **Building from scratch**
   - **Pros:** Complete control over implementation, no external dependencies
   - **Cons:** Time-consuming to build and test all features:
     - Custom input component with clear search functionality
     - Popover dropdown component
     - Dropdown item grouping
     - Accessibility (keyboard navigation + screen reader support)
     - Search functionality
     - Edge case handling

2. **Other component libraries**
   - **MaterialUI:** Limited dropdown item customization compared to @heroui
   - **TWElements:** Paid solution, not open-source

#### Data Structure & Implementation

- **Hierarchical Data Model:** Implemented a three-level hierarchy (region → state → county) using nested objects
- **Type Safety:** Created custom Entity interface to ensure type safety across the application
- **Component State Management:** Used React useState for managing selection, input value, and filtered items
- **Keyboard Navigation:** Implemented auto-scrolling to selected items when dropdown opens

#### Optimizations

- **Caching:** Implemented a cache (`processDataCache`) to store processed data for repeated search queries
- **Data Transformation:** Pre-processed census data into separate metadata objects for regions, states, and counties
- **Efficient Filtering:** Optimized search by filtering at the county level and reconstructing the hierarchy
- **Concurrently:** Used npm package to run Vite and Tailwind processes simultaneously

### Product Space Graph

#### Technology Choice: D3.js

**Pros:**
- Lightweight library
- Native support for the provided metadata format
- Built-in force simulation capabilities

**Cons:**
- Steeper learning curve
- More manual implementation required compared to higher-level libraries

#### Implementation Details

- **Force Simulation:** Used D3's force simulation with fixed node positions
- **Responsive Design:** Scaled node positions based on viewport dimensions
- **Interactive Elements:**
  - Tooltips showing product name and code on hover
  - Dynamic styling of nodes and edges on interaction
  - Visual highlighting of connections between products

#### Data Visualization Techniques

- **Color Coding:** Used a color map to visually distinguish between different product sectors
- **Interactive Highlighting:** Implemented hover states that change stroke width and color
- **Dynamic Edge Styling:** Edges connected to hovered nodes change appearance to highlight relationships

#### Performance Considerations

- **Fixed Node Positions:** Used pre-calculated positions (`fx` and `fy`) to avoid expensive force calculations
- **Minimal DOM Updates:** Optimized D3 selections to reduce unnecessary DOM manipulations
- **Efficient Event Handling:** Used D3's event system for hover interactions