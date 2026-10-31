# 3D-RS — 3D Residences Interactive Real Estate Visualizer

A premium, browser-based, interactive 3D residential visualization platform inspired by high-end NAVIGO property experiences. Built with **React 18**, **Three.js**, **React Three Fiber (@react-three/fiber)**, **@react-three/drei**, **Tailwind CSS**, and **Lucide React**.

---

## 🌟 Key Platform Features

### 1. 3D Residential Masterplan
- **3 High-Rise Residential Towers**: Block A (*The Azure Tower*), Block B (*The Bellagio Tower*), and Block C (*The Celestia Tower*), positioned around a central park in a semi-arc formation matching modern Indian premium residential architecture.
- **PBR Architectural Materials**: Poly Haven CC0 white/beige rough plaster textures, dark aluminum mullions, and blue-grey reflective glass with HDRI reflections.
- **Occupied Window Variation**: Scattered warm interior lighting across ~28% of apartments, giving the complex an authentic lived-in residential feel.
- **Articulated Cantilever Balconies**: Structural concrete slabs with visible thickness, dark metal stanchions, and tinted glass balustrades.
- **Double-Height Glazed Lobbies**: Portes-cochères with spot-lit ceilings, warm reception illumination, and planter boxes.
- **15 Residential Floors per Tower**: Structured with reusable procedural geometry where every floor is an independent selectable group.
- **135 Total 3 BHK Apartments**: Exactly 3 apartments per floor (`A-101`–`A-1503`, `B-101`–`B-1503`, `C-101`–`C-1503`).
- **Comprehensive Master Amenities**:
  - Central landscaped garden with manicured emerald lawn, raised stone curbs, park benches, and an 8-post wooden gazebo pavilion.
  - Multi-level luxury clubhouse with swimming pool, teak sun deck, and sun lounger beds with parasols.
  - Regulation championship tennis & pickleball sports court with regulation net, canvas top band, and perimeter wire mesh.
  - Children's adventure play area with rubber safety turf, play towers, wave slides, climbing ladder, and swing sets with suspension chains.
  - 800-meter continuous perimeter walking and jogging track.
  - Monumental grand entrance gateway portal with security guardhouse and RFID boom barriers.
  - Two-lane internal asphalt loop road with textured asphalt, pedestrian zebra crossings, parking bays with wheel stoppers, curbs, and road markings.
  - Realistic vegetation: Curved segmented Royal Palms with arching fronds, multi-branching shade trees with billowy foliage canopies, manicured boxwood hedges, and flowering shrub islands.
  - Modern street lamp posts and pathway bollards.

### 2. Interactive Navigation & Camera Experience
- **OrbitControls**: Mouse rotation, smooth zooming, panning, and automatic floor/building collision protection.
- **Cinematic Camera Transitions**: Smooth lerp interpolation when selecting towers, individual floors, or amenities.
- **HUD Controls**:
  - **Reset Camera**: Returns to master cinematic perspective.
  - **Top View**: Aerial plan view overlooking the entire complex.
  - **Front View**: Direct elevation facing the entrance boulevard.
  - **Zoom In / Out**: Manual stepping controls.
  - **Cinematic Orbit (Auto-Rotate)**: Continuous turntable tour.
- **Atmospheric Lighting Engine**:
  - **Day**: Crisp morning/afternoon sunlight with soft shadows and sky blue reflections.
  - **Sunset (Golden Hour)**: Warm amber glow, rich sunset sky, and long shadows.
  - **Night**: Twilight atmosphere with glowing apartment windows, stars, and outdoor lamp bollards.

### 3. Tower & Floor Selection with Isolation Mode
- Click any tower or use top pills to inspect **Block A**, **Block B**, or **Block C**.
- **Vertical Elevator-Style Floor Selector** (Floors 15 down to 1 + Ground).
- **Floor Isolation Mode**: Instantly hides upper floors and isolates the selected floor for cutaway inspection without reloading the 3D scene.
- Independent apartment selection on any floor with highlighting and floating metadata.

### 4. Interactive 2D Vector Architectural Floor Plan
- CAD-style vector SVG view of the typical residential floor plate:
  - Central common core: Lift lobby, 2 high-speed elevators (passenger & service), fire escape staircase.
  - 3 independent 3 BHK units arranged around the lobby:
    - **Unit 1**: 3 BHK Luxury (1,845 sq.ft.)
    - **Unit 2**: 3 BHK Grand Royal (1,980 sq.ft.)
    - **Unit 3**: 3 BHK Elite (1,875 sq.ft.)
  - Architectural walls, doors swings, balcony decks, modular kitchens, utility yards, en-suite bathrooms, and furniture layouts.
  - Pan & zoom controls, furniture toggle, dimension markers, and unit selection tabs.

### 5. 3D Cutaway Apartment Interior View
- Procedural 3D model of the luxury 3 BHK residence:
  - Sectional modular sofa, coffee table, wall TV console.
  - 6-seater dining suite.
  - Modular kitchen with cooktop hob, sink, and double-door refrigerator.
  - Master suite with king bed, padded headboard, nightstands, and en-suite bathroom.
  - Bedroom 2 (kids/study) with study desk and laptop.
  - Bedroom 3 (guest room).
  - Walk-out balcony with teak deck tiles and lounge seating.
  - Dedicated room camera presets (`Entire 3 BHK`, `Living & Dining`, `Master Suite`, `Kitchen`, `Balcony`).

### 6. Searchable Inventory & Demo Booking
- Filter all 135 units by tower, status (**Available**, **Booked**, **Sold**), and floor.
- Direct 3D camera jump or 2D floor plan launch from directory.
- Demo booking and site tour enquiry form.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: React 18 (`react`, `react-dom`)
- **Bundler & Dev Server**: Vite 5
- **3D Engine**: Three.js (`three`)
- **React 3D Bridge**: React Three Fiber (`@react-three/fiber`)
- **3D Helpers**: `@react-three/drei` (OrbitControls, Sky, Stars, Html)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React (`lucide-react`)

---

## 🚀 Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the local development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. Build for production:
   ```bash
   npm run build
   ```

---

## ☁️ Deploy to Vercel

This repository includes `vercel.json` and standard Vite configuration.

To deploy via Vercel CLI:
```bash
npm install -g vercel
vercel
```
Or connect your GitHub repository directly to [Vercel](https://vercel.com) — it will automatically detect the Vite preset and run `npm run build`.
