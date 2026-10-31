import React, { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { ARCH_MATERIALS } from './materials';
import { Vehicle } from './InstancedVehicles';

/* =========================================================================
   BLOCK A DETAILED ARCHITECTURAL FLOOR COMPONENT
   ========================================================================= */

function BlockAFloor({
  floorNumber,
  buildingCode = 'A',
  selectedFloorNumber,
  selectedApartmentId,
  isIsolated,
  isNight,
  onSelectFloor,
  onSelectApartment,
  floorHeight = 3.2,
  groundFloorHeight = 4.2,
}) {
  const groupRef = useRef();
  const [hoveredUnit, setHoveredUnit] = useState(null);

  const isCurrentFloorSelected = selectedFloorNumber === floorNumber;
  const isFloorHidden =
    isIsolated && selectedFloorNumber !== null && floorNumber > selectedFloorNumber;
  const isFloorGhosted =
    isIsolated && selectedFloorNumber !== null && floorNumber < selectedFloorNumber;

  const baseY = groundFloorHeight + (floorNumber - 1) * floorHeight;

  // Smooth exploded floor isolation animation
  useFrame((_, delta) => {
    if (!groupRef.current) return;
    let targetY = baseY;
    if (isIsolated && selectedFloorNumber !== null) {
      if (floorNumber > selectedFloorNumber) {
        targetY = baseY + 18 + (floorNumber - selectedFloorNumber) * 1.5;
      }
    }
    groupRef.current.position.y = THREE.MathUtils.damp(
      groupRef.current.position.y,
      targetY,
      8,
      delta
    );
  });

  // Determine occupied & lit state for realistic lived-in feel (~30% occupied windows)
  const isLitUnit1 = useMemo(() => (floorNumber * 7 + 13) % 3 === 0, [floorNumber]);
  const isLitUnit2 = useMemo(() => (floorNumber * 11 + 17) % 3 === 0, [floorNumber]);
  const isLitUnit3 = useMemo(() => (floorNumber * 5 + 19) % 3 === 0, [floorNumber]);

  const getGlassMat = (isLit) => {
    if (isNight) return isLit ? ARCH_MATERIALS.glassNight : ARCH_MATERIALS.windowFrame;
    return isLit ? ARCH_MATERIALS.glassLit : ARCH_MATERIALS.glassDay;
  };

  const aptId1 = `${buildingCode}-${floorNumber * 100 + 1}`;
  const aptId2 = `${buildingCode}-${floorNumber * 100 + 2}`;
  const aptId3 = `${buildingCode}-${floorNumber * 100 + 3}`;

  if (isFloorHidden) return null;

  return (
    <group
      ref={groupRef}
      position={[0, baseY, 0]}
      onClick={(e) => {
        e.stopPropagation();
        onSelectFloor(floorNumber);
      }}
    >
      {/* ===================================================================
          1. CONTINUOUS HORIZONTAL FLOOR SLAB WITH PRECAST CONCRETE EDGE
          =================================================================== */}
      {/* Bottom Concrete Slab with subtle shadow reveal groove */}
      <mesh
        position={[0, 0.13, 0]}
        receiveShadow
        material={
          isCurrentFloorSelected
            ? ARCH_MATERIALS.floorGlow
            : isFloorGhosted
            ? ARCH_MATERIALS.ghostedFloor
            : ARCH_MATERIALS.slabEdge
        }
      >
        <boxGeometry args={[28.2, 0.26, 18.8]} />
      </mesh>

      {/* Shadow reveal groove under slab */}
      <mesh position={[0, -0.01, 0]} material={ARCH_MATERIALS.windowFrame}>
        <boxGeometry args={[28.0, 0.03, 18.6]} />
      </mesh>

      {/* Top Ceiling Slab */}
      <mesh
        position={[0, floorHeight - 0.13, 0]}
        material={
          isCurrentFloorSelected
            ? ARCH_MATERIALS.floorGlow
            : isFloorGhosted
            ? ARCH_MATERIALS.ghostedFloor
            : ARCH_MATERIALS.slabEdge
        }
      >
        <boxGeometry args={[28.2, 0.26, 18.8]} />
      </mesh>

      {isFloorGhosted ? (
        <mesh position={[0, floorHeight / 2, 0]} material={ARCH_MATERIALS.ghostedFloor}>
          <boxGeometry args={[28.0, floorHeight - 0.28, 18.6]} />
        </mesh>
      ) : (
        <>
          {/* =================================================================
              2. CENTRAL RECESSED STAIRCASE / CIRCULATION LIGHTWELL
              (Deep vertical shadow slot between wings matching floor-detail.png)
              ================================================================= */}
          <group position={[0, floorHeight / 2, 6.2]}>
            {/* Recessed Back Wall */}
            <mesh position={[0, 0, -2.2]} castShadow receiveShadow material={ARCH_MATERIALS.wallStairCore}>
              <boxGeometry args={[2.8, floorHeight - 0.28, 0.25]} />
            </mesh>
            {/* Flanking Side Walls of the slot */}
            <mesh position={[-1.4, 0, -1.1]} castShadow receiveShadow material={ARCH_MATERIALS.wallStairCore}>
              <boxGeometry args={[0.2, floorHeight - 0.28, 2.3]} />
            </mesh>
            <mesh position={[1.4, 0, -1.1]} castShadow receiveShadow material={ARCH_MATERIALS.wallStairCore}>
              <boxGeometry args={[0.2, floorHeight - 0.28, 2.3]} />
            </mesh>
            {/* Horizontal Structural Concrete Tie Beams / Parapet */}
            <mesh position={[0, -0.7, 0.2]} castShadow material={ARCH_MATERIALS.slabEdge}>
              <boxGeometry args={[2.8, 0.45, 0.25]} />
            </mesh>
            <mesh position={[0, 0.95, 0.2]} castShadow material={ARCH_MATERIALS.slabEdge}>
              <boxGeometry args={[2.8, 0.35, 0.25]} />
            </mesh>
            {/* Open Staircase Safety Balustrade */}
            <mesh position={[0, -0.15, 0.2]} material={ARCH_MATERIALS.railingDark}>
              <boxGeometry args={[2.7, 0.65, 0.04]} />
            </mesh>
          </group>

          {/* Central Elevator & Corridor Core Structure */}
          <mesh position={[0, floorHeight / 2, -1.5]} material={ARCH_MATERIALS.wallSand}>
            <boxGeometry args={[6.8, floorHeight - 0.28, 10.5]} />
          </mesh>

          {/* =================================================================
              3. UNIT 1: LEFT WING (3 BHK LUXURY) - CLICKABLE & INTERACTIVE
              ================================================================= */}
          <group
            position={[-8.4, 0, 0]}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredUnit(1);
            }}
            onPointerOut={(e) => {
              e.stopPropagation();
              setHoveredUnit(null);
            }}
            onClick={(e) => {
              e.stopPropagation();
              onSelectApartment(aptId1);
            }}
          >
            {/* Clickable Unit Selection Invisible Shell */}
            <mesh visible={false} position={[0, floorHeight / 2, 0]}>
              <boxGeometry args={[8.8, floorHeight, 18.0]} />
            </mesh>

            {/* Main Outer Structural Wall (Warm Ivory Limestone) */}
            <mesh
              position={[0, floorHeight / 2, 0]}
              castShadow
              receiveShadow
              material={
                selectedApartmentId === aptId1
                  ? ARCH_MATERIALS.floorGlow
                  : hoveredUnit === 1
                  ? ARCH_MATERIALS.wallAccent
                  : ARCH_MATERIALS.wallIvory
              }
            >
              <boxGeometry args={[8.6, floorHeight - 0.28, 17.5]} />
            </mesh>

            {/* Far-Left Vertical Corner Structural Pier with Shadow Reveal */}
            <mesh position={[-4.25, floorHeight / 2, 0]} castShadow material={ARCH_MATERIALS.wallIvory}>
              <boxGeometry args={[0.5, floorHeight - 0.26, 18.0]} />
            </mesh>
            {/* Horizontal Stucco Expansion Joint Grooves */}
            <mesh position={[-4.28, floorHeight * 0.5, 0]} material={ARCH_MATERIALS.windowFrame}>
              <boxGeometry args={[0.52, 0.03, 18.02]} />
            </mesh>

            {/* -------------------------------------------------------------
                UNIT 1 FRONT BALCONY (Deep Recessed Cavity & Glass Railing)
                ------------------------------------------------------------- */}
            <group position={[1.4, 0, 8.8]}>
              {/* Projecting Balcony Floor Slab with Precast Edge */}
              <mesh position={[0, 0.13, 0.85]} receiveShadow material={ARCH_MATERIALS.slabEdge}>
                <boxGeometry args={[4.2, 0.26, 1.8]} />
              </mesh>
              {/* Teak Wood Balcony Floor Deck */}
              <mesh position={[0, 0.26, 0.85]} receiveShadow material={ARCH_MATERIALS.teakWood}>
                <boxGeometry args={[4.1, 0.02, 1.7]} />
              </mesh>

              {/* RECESSED BACK WALL (Mocha/Taupe Finish, matching reference) */}
              <mesh position={[0, floorHeight / 2, -0.05]} castShadow material={ARCH_MATERIALS.wallMocha}>
                <boxGeometry args={[4.2, floorHeight - 0.28, 0.2]} />
              </mesh>

              {/* Large Sliding Patio Glass Doors (3 Panels with Charcoal Frames) */}
              <mesh position={[0, floorHeight * 0.48, -0.02]} material={getGlassMat(isLitUnit1)}>
                <boxGeometry args={[3.8, floorHeight * 0.72, 0.05]} />
              </mesh>
              {/* Interior Linen Drapes */}
              <mesh position={[0, floorHeight * 0.48, -0.07]} material={ARCH_MATERIALS.windowCurtains}>
                <boxGeometry args={[3.7, floorHeight * 0.7, 0.02]} />
              </mesh>
              {/* Door Perimeter Charcoal Frame */}
              <mesh position={[0, floorHeight * 0.48, 0.01]} material={ARCH_MATERIALS.windowFrame}>
                <boxGeometry args={[3.84, floorHeight * 0.74, 0.03]} />
              </mesh>
              {/* Sliding Interlock Mullions */}
              {[-1.25, 0, 1.25].map((xMul, idx) => (
                <mesh key={idx} position={[xMul, floorHeight * 0.48, 0.02]} material={ARCH_MATERIALS.windowFrame}>
                  <boxGeometry args={[0.06, floorHeight * 0.72, 0.04]} />
                </mesh>
              ))}

              {/* Laminated Glass Front Balustrade */}
              <mesh position={[0, 0.7, 1.7]} material={ARCH_MATERIALS.balconyGlass}>
                <boxGeometry args={[4.1, 0.9, 0.04]} />
              </mesh>
              {/* Top Charcoal Metal Handrail */}
              <mesh position={[0, 1.15, 1.7]} material={ARCH_MATERIALS.railingDark}>
                <boxGeometry args={[4.2, 0.06, 0.08]} />
              </mesh>
              {/* Balcony Metal Stanchions */}
              {[-1.9, -0.65, 0.65, 1.9].map((xSt, idx) => (
                <mesh key={idx} position={[xSt, 0.7, 1.7]} material={ARCH_MATERIALS.railingDark}>
                  <boxGeometry args={[0.04, 0.9, 0.04]} />
                </mesh>
              ))}

              {/* Left & Right Side Return Glass Railings */}
              <mesh position={[-2.05, 0.7, 0.85]} material={ARCH_MATERIALS.balconyGlass}>
                <boxGeometry args={[0.04, 0.9, 1.65]} />
              </mesh>
              <mesh position={[-2.05, 1.15, 0.85]} material={ARCH_MATERIALS.railingDark}>
                <boxGeometry args={[0.06, 0.06, 1.7]} />
              </mesh>
              <mesh position={[2.05, 0.7, 0.85]} material={ARCH_MATERIALS.balconyGlass}>
                <boxGeometry args={[0.04, 0.9, 1.65]} />
              </mesh>
              <mesh position={[2.05, 1.15, 0.85]} material={ARCH_MATERIALS.railingDark}>
                <boxGeometry args={[0.06, 0.06, 1.7]} />
              </mesh>

              {/* Balcony Soffit Warm Downlight Puck */}
              <mesh position={[0, floorHeight - 0.26, 0.85]}>
                <cylinderGeometry args={[0.16, 0.16, 0.04, 12]} />
                <meshStandardMaterial
                  color="#fff2d6"
                  emissive="#ffcc66"
                  emissiveIntensity={isLitUnit1 ? 1.4 : 0.2}
                />
              </mesh>

              {/* Modern Balcony Cafe Chairs on select floors */}
              {floorNumber % 2 === 1 && (
                <group position={[-1.1, 0.28, 0.8]}>
                  {/* Small Cafe Table */}
                  <mesh position={[0.5, 0.26, 0]} material={ARCH_MATERIALS.railingDark}>
                    <cylinderGeometry args={[0.22, 0.22, 0.52, 12]} />
                  </mesh>
                  {/* Chair */}
                  <mesh position={[0, 0.35, 0]} material={ARCH_MATERIALS.railingDark}>
                    <boxGeometry args={[0.42, 0.7, 0.42]} />
                  </mesh>
                </group>
              )}

              {/* Planter Box on select lived-in balconies */}
              {floorNumber % 3 === 0 && (
                <group position={[1.4, 0.38, 1.45]}>
                  <mesh material={ARCH_MATERIALS.wallSand} castShadow>
                    <boxGeometry args={[0.9, 0.24, 0.32]} />
                  </mesh>
                  <mesh position={[0, 0.16, 0]} material={ARCH_MATERIALS.foliageCard}>
                    <boxGeometry args={[0.85, 0.2, 0.28]} />
                  </mesh>
                </group>
              )}
            </group>

            {/* -------------------------------------------------------------
                UNIT 1 FRONT BEDROOM WINDOW (Recessed Bay with Spandrel)
                ------------------------------------------------------------- */}
            <group position={[-2.2, floorHeight / 2, 8.8]}>
              {/* Flanking Vertical Sand Pilasters */}
              <mesh position={[-1.4, 0, 0.06]} castShadow material={ARCH_MATERIALS.wallSand}>
                <boxGeometry args={[0.3, floorHeight - 0.26, 0.32]} />
              </mesh>
              <mesh position={[1.4, 0, 0.06]} castShadow material={ARCH_MATERIALS.wallSand}>
                <boxGeometry args={[0.3, floorHeight - 0.26, 0.32]} />
              </mesh>

              {/* Upper Precast Header */}
              <mesh position={[0, floorHeight * 0.42, 0.06]} castShadow material={ARCH_MATERIALS.wallSand}>
                <boxGeometry args={[2.5, 0.24, 0.3]} />
              </mesh>
              {/* Projecting Precast Concrete Sill */}
              <mesh position={[0, -0.15, 0.14]} castShadow material={ARCH_MATERIALS.slabEdge}>
                <boxGeometry args={[2.5, 0.09, 0.34]} />
              </mesh>

              {/* Recessed Vision Window Opening */}
              <mesh position={[0, 0.46, -0.04]} material={getGlassMat(isLitUnit1)}>
                <boxGeometry args={[2.3, floorHeight * 0.46, 0.04]} />
              </mesh>
              {/* Curtains */}
              <mesh position={[0, 0.46, -0.08]} material={ARCH_MATERIALS.windowCurtains}>
                <boxGeometry args={[2.24, floorHeight * 0.44, 0.02]} />
              </mesh>
              {/* Window Frame */}
              <mesh position={[0, 0.46, -0.01]} material={ARCH_MATERIALS.windowFrame}>
                <boxGeometry args={[2.34, floorHeight * 0.48, 0.03]} />
              </mesh>
              {/* Center Mullion */}
              <mesh position={[0, 0.46, 0.01]} material={ARCH_MATERIALS.windowFrame}>
                <boxGeometry args={[0.06, floorHeight * 0.46, 0.04]} />
              </mesh>
              {/* Fixed Upper Transom Bar */}
              <mesh position={[0, 0.68, 0.01]} material={ARCH_MATERIALS.windowFrame}>
                <boxGeometry args={[2.3, 0.05, 0.04]} />
              </mesh>

              {/* Lower Ribbed Dark Charcoal Spandrel Panel */}
              <mesh position={[0, -0.62, -0.02]} material={ARCH_MATERIALS.spandrelDark}>
                <boxGeometry args={[2.3, 0.72, 0.08]} />
              </mesh>
              {/* Horizontal Spandrel Relief Grooves */}
              {[-0.82, -0.62, -0.42].map((yG, idx) => (
                <mesh key={idx} position={[0, yG, 0.03]} material={ARCH_MATERIALS.windowFrame}>
                  <boxGeometry args={[2.28, 0.03, 0.03]} />
                </mesh>
              ))}
            </group>

            {/* -------------------------------------------------------------
                UNIT 1 SIDE WINDOWS (West Elevation) & CONCRETE SUNSHADES (CHAJJAS)
                ------------------------------------------------------------- */}
            {[-4.2, 0, 4.2].map((zW, idx) => (
              <group key={idx} position={[-4.3, floorHeight / 2, zW]} rotation={[0, -Math.PI / 2, 0]}>
                {/* Window */}
                <mesh position={[0, 0.2, 0]} material={getGlassMat(isLitUnit1)}>
                  <boxGeometry args={[1.8, floorHeight * 0.48, 0.04]} />
                </mesh>
                <mesh position={[0, 0.2, 0.01]} material={ARCH_MATERIALS.windowFrame}>
                  <boxGeometry args={[1.84, floorHeight * 0.5, 0.02]} />
                </mesh>
                <mesh position={[0, 0.2, 0.02]} material={ARCH_MATERIALS.windowFrame}>
                  <boxGeometry args={[0.05, floorHeight * 0.48, 0.03]} />
                </mesh>
                {/* Projecting Architectural Concrete Sunshade (Chajja) */}
                <mesh position={[0, floorHeight * 0.48, 0.22]} castShadow material={ARCH_MATERIALS.slabEdge}>
                  <boxGeometry args={[2.1, 0.08, 0.45]} />
                </mesh>
                {/* Lower Spandrel */}
                <mesh position={[0, -0.58, 0]} material={ARCH_MATERIALS.spandrelDark}>
                  <boxGeometry args={[1.8, 0.64, 0.04]} />
                </mesh>
              </group>
            ))}

            {/* -------------------------------------------------------------
                UNIT 1 REAR WINDOWS & KITCHEN UTILITY BALCONY (North Elevation)
                ------------------------------------------------------------- */}
            <group position={[0, floorHeight / 2, -8.8]}>
              <mesh position={[0, 0.3, 0]} material={getGlassMat(isLitUnit1)}>
                <boxGeometry args={[4.2, floorHeight * 0.46, 0.04]} />
              </mesh>
              <mesh position={[0, 0.3, 0.01]} material={ARCH_MATERIALS.windowFrame}>
                <boxGeometry args={[4.26, floorHeight * 0.48, 0.02]} />
              </mesh>
              <mesh position={[0, 0.3, 0.02]} material={ARCH_MATERIALS.windowFrame}>
                <boxGeometry args={[0.06, floorHeight * 0.46, 0.04]} />
              </mesh>
              {/* Utility Drying Balcony with Dark Louver Grille */}
              <mesh position={[0, -0.6, 0.08]} material={ARCH_MATERIALS.railingDark}>
                <boxGeometry args={[4.2, 0.72, 0.15]} />
              </mesh>
            </group>
          </group>

          {/* =================================================================
              4. UNIT 2: CENTER-RIGHT WING (3 BHK GRAND ROYAL) - CLICKABLE
              ================================================================= */}
          <group
            position={[3.8, 0, 0]}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredUnit(2);
            }}
            onPointerOut={(e) => {
              e.stopPropagation();
              setHoveredUnit(null);
            }}
            onClick={(e) => {
              e.stopPropagation();
              onSelectApartment(aptId2);
            }}
          >
            {/* Clickable Unit Selection Invisible Shell */}
            <mesh visible={false} position={[0, floorHeight / 2, 0]}>
              <boxGeometry args={[7.6, floorHeight, 18.0]} />
            </mesh>

            {/* Main Outer Wall */}
            <mesh
              position={[0, floorHeight / 2, 0]}
              castShadow
              receiveShadow
              material={
                selectedApartmentId === aptId2
                  ? ARCH_MATERIALS.floorGlow
                  : hoveredUnit === 2
                  ? ARCH_MATERIALS.wallAccent
                  : ARCH_MATERIALS.wallIvory
              }
            >
              <boxGeometry args={[7.4, floorHeight - 0.28, 17.5]} />
            </mesh>

            {/* Prominent Vertical Sand Framing Pilaster between Unit 2 & Unit 3 */}
            <mesh position={[3.6, floorHeight / 2, 8.85]} castShadow material={ARCH_MATERIALS.wallSand}>
              <boxGeometry args={[0.5, floorHeight - 0.26, 0.45]} />
            </mesh>

            {/* -------------------------------------------------------------
                UNIT 2 BALCONY STACK (Center Balcony matching floor-detail.png)
                ------------------------------------------------------------- */}
            <group position={[-0.4, 0, 8.8]}>
              {/* Projecting Slab with Teak Flooring */}
              <mesh position={[0, 0.13, 0.85]} receiveShadow material={ARCH_MATERIALS.slabEdge}>
                <boxGeometry args={[4.0, 0.26, 1.8]} />
              </mesh>
              <mesh position={[0, 0.26, 0.85]} receiveShadow material={ARCH_MATERIALS.teakWood}>
                <boxGeometry args={[3.9, 0.02, 1.7]} />
              </mesh>

              {/* Recessed Mocha Back Wall */}
              <mesh position={[0, floorHeight / 2, -0.05]} castShadow material={ARCH_MATERIALS.wallMocha}>
                <boxGeometry args={[4.0, floorHeight - 0.28, 0.2]} />
              </mesh>

              {/* Sliding Glass Patio Door */}
              <mesh position={[0, floorHeight * 0.48, -0.02]} material={getGlassMat(isLitUnit2)}>
                <boxGeometry args={[3.6, floorHeight * 0.72, 0.05]} />
              </mesh>
              <mesh position={[0, floorHeight * 0.48, -0.07]} material={ARCH_MATERIALS.windowCurtains}>
                <boxGeometry args={[3.5, floorHeight * 0.7, 0.02]} />
              </mesh>
              <mesh position={[0, floorHeight * 0.48, 0.01]} material={ARCH_MATERIALS.windowFrame}>
                <boxGeometry args={[3.64, floorHeight * 0.74, 0.03]} />
              </mesh>
              {[-1.15, 0, 1.15].map((xMul, idx) => (
                <mesh key={idx} position={[xMul, floorHeight * 0.48, 0.02]} material={ARCH_MATERIALS.windowFrame}>
                  <boxGeometry args={[0.06, floorHeight * 0.72, 0.04]} />
                </mesh>
              ))}

              {/* Glass Balustrade */}
              <mesh position={[0, 0.7, 1.7]} material={ARCH_MATERIALS.balconyGlass}>
                <boxGeometry args={[3.9, 0.9, 0.04]} />
              </mesh>
              <mesh position={[0, 1.15, 1.7]} material={ARCH_MATERIALS.railingDark}>
                <boxGeometry args={[4.0, 0.06, 0.08]} />
              </mesh>
              {[-1.8, -0.6, 0.6, 1.8].map((xSt, idx) => (
                <mesh key={idx} position={[xSt, 0.7, 1.7]} material={ARCH_MATERIALS.railingDark}>
                  <boxGeometry args={[0.04, 0.9, 0.04]} />
                </mesh>
              ))}

              {/* Side Return Railings */}
              <mesh position={[-1.95, 0.7, 0.85]} material={ARCH_MATERIALS.balconyGlass}>
                <boxGeometry args={[0.04, 0.9, 1.65]} />
              </mesh>
              <mesh position={[-1.95, 1.15, 0.85]} material={ARCH_MATERIALS.railingDark}>
                <boxGeometry args={[0.06, 0.06, 1.7]} />
              </mesh>
              <mesh position={[1.95, 0.7, 0.85]} material={ARCH_MATERIALS.balconyGlass}>
                <boxGeometry args={[0.04, 0.9, 1.65]} />
              </mesh>
              <mesh position={[1.95, 1.15, 0.85]} material={ARCH_MATERIALS.railingDark}>
                <boxGeometry args={[0.06, 0.06, 1.7]} />
              </mesh>

              {/* Soffit Downlight Puck */}
              <mesh position={[0, floorHeight - 0.26, 0.85]}>
                <cylinderGeometry args={[0.16, 0.16, 0.04, 12]} />
                <meshStandardMaterial
                  color="#fff2d6"
                  emissive="#ffcc66"
                  emissiveIntensity={isLitUnit2 ? 1.4 : 0.2}
                />
              </mesh>

              {/* Lived-in Balcony Elements */}
              {floorNumber % 2 === 0 && (
                <group position={[1.1, 0.35, 1.2]}>
                  <mesh material={ARCH_MATERIALS.wallSand} castShadow>
                    <boxGeometry args={[0.8, 0.25, 0.3]} />
                  </mesh>
                  <mesh position={[0, 0.15, 0]} material={ARCH_MATERIALS.foliageCard}>
                    <boxGeometry args={[0.75, 0.2, 0.26]} />
                  </mesh>
                </group>
              )}
            </group>

            {/* Rear Window for Unit 2 */}
            <group position={[0, floorHeight / 2, -8.8]}>
              <mesh position={[0, 0.3, 0]} material={getGlassMat(isLitUnit2)}>
                <boxGeometry args={[3.8, floorHeight * 0.46, 0.04]} />
              </mesh>
              <mesh position={[0, 0.3, 0.01]} material={ARCH_MATERIALS.windowFrame}>
                <boxGeometry args={[3.86, floorHeight * 0.48, 0.02]} />
              </mesh>
              <mesh position={[0, 0.3, 0.02]} material={ARCH_MATERIALS.windowFrame}>
                <boxGeometry args={[0.06, floorHeight * 0.46, 0.04]} />
              </mesh>
              <mesh position={[0, -0.6, 0.08]} material={ARCH_MATERIALS.railingDark}>
                <boxGeometry args={[3.8, 0.72, 0.15]} />
              </mesh>
            </group>
          </group>

          {/* =================================================================
              5. UNIT 3: RIGHT WING (3 BHK ELITE) - CLICKABLE & INTERACTIVE
              ================================================================= */}
          <group
            position={[10.5, 0, 0]}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredUnit(3);
            }}
            onPointerOut={(e) => {
              e.stopPropagation();
              setHoveredUnit(null);
            }}
            onClick={(e) => {
              e.stopPropagation();
              onSelectApartment(aptId3);
            }}
          >
            {/* Clickable Unit Selection Invisible Shell */}
            <mesh visible={false} position={[0, floorHeight / 2, 0]}>
              <boxGeometry args={[6.8, floorHeight, 18.0]} />
            </mesh>

            {/* Main Outer Wall */}
            <mesh
              position={[0, floorHeight / 2, 0]}
              castShadow
              receiveShadow
              material={
                selectedApartmentId === aptId3
                  ? ARCH_MATERIALS.floorGlow
                  : hoveredUnit === 3
                  ? ARCH_MATERIALS.wallAccent
                  : ARCH_MATERIALS.wallIvory
              }
            >
              <boxGeometry args={[6.6, floorHeight - 0.28, 17.5]} />
            </mesh>

            {/* Far-Right Vertical Corner Shear Wall Pier */}
            <mesh position={[3.25, floorHeight / 2, 0]} castShadow material={ARCH_MATERIALS.wallIvory}>
              <boxGeometry args={[0.5, floorHeight - 0.26, 18.0]} />
            </mesh>
            {/* Horizontal Expansion Joint */}
            <mesh position={[3.28, floorHeight * 0.5, 0]} material={ARCH_MATERIALS.windowFrame}>
              <boxGeometry args={[0.52, 0.03, 18.02]} />
            </mesh>

            {/* -------------------------------------------------------------
                UNIT 3 FRONT BEDROOM WINDOW BAY (Punched fenestration)
                ------------------------------------------------------------- */}
            <group position={[-1.2, floorHeight / 2, 8.8]}>
              {/* Projecting Precast Concrete Sill */}
              <mesh position={[0, -0.15, 0.14]} castShadow material={ARCH_MATERIALS.slabEdge}>
                <boxGeometry args={[2.5, 0.09, 0.34]} />
              </mesh>
              {/* Upper Precast Header */}
              <mesh position={[0, floorHeight * 0.42, 0.06]} castShadow material={ARCH_MATERIALS.wallSand}>
                <boxGeometry args={[2.5, 0.24, 0.3]} />
              </mesh>

              {/* Vision Window */}
              <mesh position={[0, 0.46, -0.04]} material={getGlassMat(isLitUnit3)}>
                <boxGeometry args={[2.3, floorHeight * 0.46, 0.04]} />
              </mesh>
              <mesh position={[0, 0.46, -0.08]} material={ARCH_MATERIALS.windowCurtains}>
                <boxGeometry args={[2.24, floorHeight * 0.44, 0.02]} />
              </mesh>
              <mesh position={[0, 0.46, -0.01]} material={ARCH_MATERIALS.windowFrame}>
                <boxGeometry args={[2.34, floorHeight * 0.48, 0.03]} />
              </mesh>
              <mesh position={[0, 0.46, 0.01]} material={ARCH_MATERIALS.windowFrame}>
                <boxGeometry args={[0.06, floorHeight * 0.46, 0.04]} />
              </mesh>
              <mesh position={[0, 0.68, 0.01]} material={ARCH_MATERIALS.windowFrame}>
                <boxGeometry args={[2.3, 0.05, 0.04]} />
              </mesh>

              {/* Lower Ribbed Spandrel Panel */}
              <mesh position={[0, -0.62, -0.02]} material={ARCH_MATERIALS.spandrelDark}>
                <boxGeometry args={[2.3, 0.72, 0.08]} />
              </mesh>
              {[-0.82, -0.62, -0.42].map((yG, idx) => (
                <mesh key={idx} position={[0, yG, 0.03]} material={ARCH_MATERIALS.windowFrame}>
                  <boxGeometry args={[2.28, 0.03, 0.03]} />
                </mesh>
              ))}
            </group>

            {/* -------------------------------------------------------------
                UNIT 3 CORNER BALCONY (Front-Right Corner)
                ------------------------------------------------------------- */}
            <group position={[1.4, 0, 8.8]}>
              <mesh position={[0, 0.13, 0.7]} receiveShadow material={ARCH_MATERIALS.slabEdge}>
                <boxGeometry args={[2.5, 0.26, 1.5]} />
              </mesh>
              <mesh position={[0, 0.26, 0.7]} receiveShadow material={ARCH_MATERIALS.teakWood}>
                <boxGeometry args={[2.4, 0.02, 1.4]} />
              </mesh>

              {/* Recessed Sliding Patio Door */}
              <mesh position={[0, floorHeight * 0.48, -0.02]} material={getGlassMat(isLitUnit3)}>
                <boxGeometry args={[2.2, floorHeight * 0.72, 0.05]} />
              </mesh>
              <mesh position={[0, floorHeight * 0.48, 0.01]} material={ARCH_MATERIALS.windowFrame}>
                <boxGeometry args={[2.24, floorHeight * 0.74, 0.03]} />
              </mesh>

              {/* Glass Balustrade */}
              <mesh position={[0, 0.7, 1.4]} material={ARCH_MATERIALS.balconyGlass}>
                <boxGeometry args={[2.4, 0.9, 0.04]} />
              </mesh>
              <mesh position={[0, 1.15, 1.4]} material={ARCH_MATERIALS.railingDark}>
                <boxGeometry args={[2.5, 0.06, 0.08]} />
              </mesh>
              <mesh position={[1.2, 0.7, 0.7]} material={ARCH_MATERIALS.balconyGlass}>
                <boxGeometry args={[0.04, 0.9, 1.35]} />
              </mesh>
              <mesh position={[1.2, 1.15, 0.7]} material={ARCH_MATERIALS.railingDark}>
                <boxGeometry args={[0.06, 0.06, 1.4]} />
              </mesh>
            </group>

            {/* -------------------------------------------------------------
                UNIT 3 SIDE WINDOWS (East Elevation) & CONCRETE SUNSHADES (CHAJJAS)
                ------------------------------------------------------------- */}
            {[-4.2, 0, 4.2].map((zW, idx) => (
              <group key={idx} position={[3.3, floorHeight / 2, zW]} rotation={[0, Math.PI / 2, 0]}>
                <mesh position={[0, 0.2, 0]} material={getGlassMat(isLitUnit3)}>
                  <boxGeometry args={[1.8, floorHeight * 0.48, 0.04]} />
                </mesh>
                <mesh position={[0, 0.2, 0.01]} material={ARCH_MATERIALS.windowFrame}>
                  <boxGeometry args={[1.84, floorHeight * 0.5, 0.02]} />
                </mesh>
                <mesh position={[0, 0.2, 0.02]} material={ARCH_MATERIALS.windowFrame}>
                  <boxGeometry args={[0.05, floorHeight * 0.48, 0.03]} />
                </mesh>
                <mesh position={[0, floorHeight * 0.48, 0.22]} castShadow material={ARCH_MATERIALS.slabEdge}>
                  <boxGeometry args={[2.1, 0.08, 0.45]} />
                </mesh>
                <mesh position={[0, -0.58, 0]} material={ARCH_MATERIALS.spandrelDark}>
                  <boxGeometry args={[1.8, 0.64, 0.04]} />
                </mesh>
              </group>
            ))}

            {/* Rear Window for Unit 3 */}
            <group position={[0, floorHeight / 2, -8.8]}>
              <mesh position={[0, 0.3, 0]} material={getGlassMat(isLitUnit3)}>
                <boxGeometry args={[3.2, floorHeight * 0.46, 0.04]} />
              </mesh>
              <mesh position={[0, 0.3, 0.01]} material={ARCH_MATERIALS.windowFrame}>
                <boxGeometry args={[3.26, floorHeight * 0.48, 0.02]} />
              </mesh>
              <mesh position={[0, -0.6, 0.08]} material={ARCH_MATERIALS.railingDark}>
                <boxGeometry args={[3.2, 0.72, 0.15]} />
              </mesh>
            </group>
          </group>
        </>
      )}
    </group>
  );
}

/* =========================================================================
   BLOCK A MASTER RESIDENTIAL TOWER
   ========================================================================= */

export default function TowerBlockA({
  buildingData,
  selectedBuildingId,
  selectedFloorNumber,
  selectedApartmentId,
  isFloorIsolated,
  isNight,
  onSelectBuilding,
  onSelectFloor,
  onSelectApartment,
}) {
  const groupRef = useRef();
  const [isHovered, setIsHovered] = useState(false);

  const isTowerSelected = selectedBuildingId === buildingData.id;
  const floorHeight = 3.2;
  const groundHeight = 4.2;
  const totalFloors = buildingData.floorsCount; // 15

  const floors = Array.from({ length: totalFloors }, (_, i) => i + 1);

  return (
    <group
      ref={groupRef}
      position={buildingData.position}
      rotation={buildingData.rotation}
    >
      {/* 3D Floating Tower Header Tag */}
      <Html
        position={[0, groundHeight + totalFloors * floorHeight + 7.5, 0]}
        center
        distanceFactor={60}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
            onSelectBuilding(buildingData.id);
          }}
          className={`cursor-pointer transition-all duration-300 pointer-events-auto select-none ${
            isTowerSelected
              ? 'scale-110 opacity-100'
              : isHovered
              ? 'scale-105 opacity-100'
              : 'opacity-85 hover:opacity-100'
          }`}
        >
          <div
            className={`px-3.5 py-1.5 rounded-full flex items-center gap-2 border shadow-lg backdrop-blur-md transition-all ${
              isTowerSelected
                ? 'bg-amber-900/90 border-amber-400 text-amber-100 shadow-amber-500/30'
                : 'bg-charcoal-800/85 border-white/20 text-white/90 hover:border-amber-400/60'
            }`}
          >
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isTowerSelected ? 'bg-amber-400 animate-ping' : 'bg-amber-500'
              }`}
            />
            <span className="font-semibold text-xs tracking-wider uppercase">
              {buildingData.name}
            </span>
            <span className="text-[10px] text-amber-200/70 border-l border-white/10 pl-2">
              15 Flrs • 45 Apts
            </span>
          </div>
        </div>
      </Html>

      {/* ===================================================================
          TOWER BASE: GROUND STILT PARKING WITH PILOTIS & FRONT ENTRANCE LOBBY
          =================================================================== */}
      <group position={[0, 0, 0]}>
        {/* Asphalt Driveway & Apron Base Slab */}
        <mesh position={[0, -0.2, 0]} receiveShadow material={ARCH_MATERIALS.roadAsphalt}>
          <boxGeometry args={[32.5, 0.4, 24]} />
        </mesh>

        {/* Concrete Transfer Podium Slab at top of stilt level (Y = 4.2m) */}
        <mesh position={[0, groundHeight - 0.24, 0]} receiveShadow castShadow material={ARCH_MATERIALS.slabEdge}>
          <boxGeometry args={[28.6, 0.48, 19.4]} />
        </mesh>
        <mesh position={[0, groundHeight - 0.48, 0]} material={ARCH_MATERIALS.windowFrame}>
          <boxGeometry args={[28.4, 0.04, 19.2]} />
        </mesh>

        {/* REINFORCED CONCRETE STILT COLUMNS (Pilotis Grid matching reference block-a.png) */}
        {[
          // Left Wing Columns
          [-12.2, -6.5], [-12.2, 0], [-12.2, 6.5],
          [-8.4, -6.5], [-8.4, 0], [-8.4, 6.5],
          [-4.8, -6.5], [-4.8, 6.5],
          // Right Wing Columns
          [4.8, -6.5], [4.8, 6.5],
          [8.4, -6.5], [8.4, 0], [8.4, 6.5],
          [12.2, -6.5], [12.2, 0], [12.2, 6.5],
          // Rear Center Columns
          [-2.2, -6.5], [2.2, -6.5],
        ].map(([cx, cz], idx) => (
          <mesh
            key={`col-${idx}`}
            position={[cx, (groundHeight - 0.48) / 2, cz]}
            castShadow
            receiveShadow
            material={ARCH_MATERIALS.stiltColumn}
          >
            <boxGeometry args={[0.78, groundHeight - 0.48, 0.78]} />
          </mesh>
        ))}

        {/* White Painted Stilt Parking Stalls Under Wings */}
        {[-9.5, 9.5].map((xBase) =>
          [-4.5, -0.5, 3.5].map((zBase) => (
            <group key={`stall-${xBase}-${zBase}`} position={[xBase, 0.02, zBase]}>
              <mesh rotation={[-Math.PI / 2, 0, 0]} material={ARCH_MATERIALS.roadMarking}>
                <planeGeometry args={[5.0, 0.12]} />
              </mesh>
            </group>
          ))
        )}

        {/* Parked Resident Cars Under Stilts */}
        <Vehicle
          position={[-9.5, 0, -2.5]}
          rotation={[0, 0, 0]}
          colorMaterial={ARCH_MATERIALS.carWhite}
          type="sedan"
        />
        <Vehicle
          position={[9.5, 0, 2.5]}
          rotation={[0, Math.PI, 0]}
          colorMaterial={ARCH_MATERIALS.carCharcoal}
          type="suv"
        />

        {/* Central Entrance Double-Height Glass Lobby Core */}
        <group position={[0, 0, 2.2]}>
          {/* Lobby Structural Core Walls */}
          <mesh
            position={[0, (groundHeight - 0.48) / 2, 0]}
            castShadow
            receiveShadow
            material={ARCH_MATERIALS.wallIvory}
          >
            <boxGeometry args={[10.8, groundHeight - 0.48, 8.5]} />
          </mesh>

          {/* Lobby Large Glass Storefront Frontage with Warm Glow */}
          <mesh
            position={[0, (groundHeight - 0.48) / 2, 4.3]}
            material={ARCH_MATERIALS.glassLit}
          >
            <boxGeometry args={[9.8, (groundHeight - 0.48) * 0.92, 0.1]} />
          </mesh>
          {/* Lobby Storefront Mullions */}
          {[-3.6, -1.2, 1.2, 3.6].map((xMul, idx) => (
            <mesh
              key={idx}
              position={[xMul, (groundHeight - 0.48) / 2, 4.36]}
              material={ARCH_MATERIALS.windowFrame}
            >
              <boxGeometry args={[0.08, groundHeight - 0.48, 0.1]} />
            </mesh>
          ))}

          {/* Lobby Entrance Columns with Sand Finish */}
          <mesh position={[-5.1, (groundHeight - 0.48) / 2, 4.38]} castShadow material={ARCH_MATERIALS.wallSand}>
            <boxGeometry args={[0.85, groundHeight - 0.48, 0.65]} />
          </mesh>
          <mesh position={[5.1, (groundHeight - 0.48) / 2, 4.38]} castShadow material={ARCH_MATERIALS.wallSand}>
            <boxGeometry args={[0.85, groundHeight - 0.48, 0.65]} />
          </mesh>

          {/* Cantilevered Drop-off Canopy (Porte-Cochère) */}
          <group position={[0, 3.7, 7.5]}>
            <mesh castShadow receiveShadow material={ARCH_MATERIALS.wallWarmBronze}>
              <boxGeometry args={[12.2, 0.38, 5.8]} />
            </mesh>
            {/* Canopy Soffit Warm Downlights */}
            {[-3.6, 0, 3.6].map((xSpot, idx) => (
              <mesh key={idx} position={[xSpot, -0.2, 0]}>
                <cylinderGeometry args={[0.22, 0.22, 0.04, 12]} />
                <meshStandardMaterial
                  color="#fff5dd"
                  emissive="#ffcc66"
                  emissiveIntensity={isNight ? 2.5 : 0.8}
                />
              </mesh>
            ))}
            {/* Canopy Dark Stainless Support Columns */}
            <mesh position={[-5.4, -1.85, 2.4]} castShadow material={ARCH_MATERIALS.railingDark}>
              <cylinderGeometry args={[0.16, 0.16, 3.7, 16]} />
            </mesh>
            <mesh position={[5.4, -1.85, 2.4]} castShadow material={ARCH_MATERIALS.railingDark}>
              <cylinderGeometry args={[0.16, 0.16, 3.7, 16]} />
            </mesh>
          </group>
        </group>

        {/* Entrance Podium Planter Boxes with Lush Architectural Foliage */}
        <group position={[-10.5, 0.45, 10.2]}>
          <mesh castShadow material={ARCH_MATERIALS.wallSand}>
            <boxGeometry args={[3.4, 0.9, 1.4]} />
          </mesh>
          <mesh position={[0, 0.5, 0]} material={ARCH_MATERIALS.grassTurf}>
            <boxGeometry args={[3.2, 0.2, 1.2]} />
          </mesh>
          <mesh position={[0, 0.72, 0]} castShadow receiveShadow material={ARCH_MATERIALS.hedgeBoxwood}>
            <boxGeometry args={[2.9, 0.42, 0.95]} />
          </mesh>
        </group>

        <group position={[10.5, 0.45, 10.2]}>
          <mesh castShadow material={ARCH_MATERIALS.wallSand}>
            <boxGeometry args={[3.4, 0.9, 1.4]} />
          </mesh>
          <mesh position={[0, 0.5, 0]} material={ARCH_MATERIALS.grassTurf}>
            <boxGeometry args={[3.2, 0.2, 1.2]} />
          </mesh>
          <mesh position={[0, 0.72, 0]} castShadow receiveShadow material={ARCH_MATERIALS.hedgeBoxwood}>
            <boxGeometry args={[2.9, 0.42, 0.95]} />
          </mesh>
        </group>
      </group>

      {/* ===================================================================
          15 DETAILED RESIDENTIAL FLOORS (Floors 1 to 15)
          =================================================================== */}
      {floors.map((floorNum) => (
        <BlockAFloor
          key={floorNum}
          floorNumber={floorNum}
          buildingCode={buildingData.code}
          selectedFloorNumber={isTowerSelected ? selectedFloorNumber : null}
          selectedApartmentId={selectedApartmentId}
          isIsolated={isFloorIsolated && isTowerSelected}
          isNight={isNight}
          onSelectFloor={(fn) => {
            if (!isTowerSelected) onSelectBuilding(buildingData.id);
            onSelectFloor(fn);
          }}
          onSelectApartment={onSelectApartment}
          floorHeight={floorHeight}
          groundFloorHeight={groundHeight}
        />
      ))}

      {/* ===================================================================
          ROOFTOP ARCHITECTURAL CROWN (Matching block-a.png & masterplan.png)
          =================================================================== */}
      {(!isFloorIsolated || !isTowerSelected || selectedFloorNumber === null) && (
        <group position={[0, groundHeight + totalFloors * floorHeight, 0]}>
          {/* Main Roof Paved Slab */}
          <mesh position={[0, 0.16, 0]} castShadow receiveShadow material={ARCH_MATERIALS.slabEdge}>
            <boxGeometry args={[28.4, 0.32, 19.0]} />
          </mesh>

          {/* Roof Perimeter Parapet Walls with Sand Coping Cap */}
          <mesh position={[0, 0.8, 9.35]} castShadow material={ARCH_MATERIALS.wallSand}>
            <boxGeometry args={[28.4, 1.28, 0.3]} />
          </mesh>
          <mesh position={[0, 0.8, -9.35]} castShadow material={ARCH_MATERIALS.wallSand}>
            <boxGeometry args={[28.4, 1.28, 0.3]} />
          </mesh>
          <mesh position={[-14.05, 0.8, 0]} castShadow material={ARCH_MATERIALS.wallSand}>
            <boxGeometry args={[0.3, 1.28, 19.0]} />
          </mesh>
          <mesh position={[14.05, 0.8, 0]} castShadow material={ARCH_MATERIALS.wallSand}>
            <boxGeometry args={[0.3, 1.28, 19.0]} />
          </mesh>

          {/* Vertical Corner Framing Piers Extending 3.6m Above Roof Slab */}
          {[-13.8, 13.8].map((xP, idx) => (
            <mesh key={`pier-${idx}`} position={[xP, 1.8, 0]} castShadow material={ARCH_MATERIALS.wallIvory}>
              <boxGeometry args={[0.7, 3.6, 18.8]} />
            </mesh>
          ))}

          {/* 4 CORNER PENTHOUSE PAVILIONS WITH CANTILEVERED CANOPY CROWNS */}
          {[
            { pos: [-9.5, 1.7, 5.5], size: [6.8, 3.0, 5.5] },
            { pos: [9.5, 1.7, 5.5], size: [6.8, 3.0, 5.5] },
            { pos: [-9.5, 1.7, -5.5], size: [6.8, 3.0, 5.5] },
            { pos: [9.5, 1.7, -5.5], size: [6.8, 3.0, 5.5] },
          ].map((ph, idx) => (
            <group key={`ph-${idx}`} position={ph.pos}>
              <mesh castShadow receiveShadow material={ARCH_MATERIALS.wallIvory}>
                <boxGeometry args={[ph.size[0], ph.size[1], ph.size[2]]} />
              </mesh>
              {/* Cantilevered Bronze/Warm Roof Canopy */}
              <mesh position={[0, ph.size[1] / 2 + 0.18, 0]} castShadow material={ARCH_MATERIALS.rooftopCrown}>
                <boxGeometry args={[ph.size[0] + 0.9, 0.36, ph.size[2] + 0.9]} />
              </mesh>
              {/* Louver Vent Grille */}
              <mesh position={[0, 0.2, ph.size[2] / 2 + 0.02]} material={ARCH_MATERIALS.railingDark}>
                <boxGeometry args={[ph.size[0] * 0.65, 1.0, 0.05]} />
              </mesh>
            </group>
          ))}

          {/* Central Lift Machine Room & Overhead Core Overrun */}
          <group position={[0, 2.3, 0]}>
            <mesh castShadow receiveShadow material={ARCH_MATERIALS.wallSand}>
              <boxGeometry args={[7.4, 4.2, 7.0]} />
            </mesh>
            <mesh position={[0, 2.25, 0]} castShadow material={ARCH_MATERIALS.rooftopCrown}>
              <boxGeometry args={[8.2, 0.36, 7.8]} />
            </mesh>
          </group>

          {/* Overhead Water Storage Tanks (Sintex Cylinders matching aerial view) */}
          {[-1.6, 1.6].map((xOffset) => (
            <group key={xOffset} position={[xOffset, 1.3, -6.2]}>
              <mesh castShadow material={ARCH_MATERIALS.carWhite}>
                <cylinderGeometry args={[0.75, 0.75, 1.7, 16]} />
              </mesh>
              <mesh position={[0, 0.9, 0]} material={ARCH_MATERIALS.carWhite}>
                <cylinderGeometry args={[0.78, 0.78, 0.12, 16]} />
              </mesh>
            </group>
          ))}

          {/* Modern Rooftop Concrete Pergola Louver Beams (Casting Striped Shadows) */}
          <group position={[0, 3.2, 5.5]}>
            {[-2.4, -1.2, 0, 1.2, 2.4].map((zPos, idx) => (
              <mesh key={idx} position={[0, 0, zPos]} castShadow material={ARCH_MATERIALS.pergolaBeam}>
                <boxGeometry args={[7.8, 0.18, 0.32]} />
              </mesh>
            ))}
          </group>

          {/* Aviation Warning Beacon Mast & Red Pulsing Light */}
          <group position={[0, 5.4, -2]}>
            <mesh material={ARCH_MATERIALS.railingDark}>
              <cylinderGeometry args={[0.06, 0.08, 2.4, 8]} />
            </mesh>
            <mesh position={[0, 1.3, 0]}>
              <sphereGeometry args={[0.18, 12, 12]} />
              <meshStandardMaterial
                color="#ff1111"
                emissive="#ff0000"
                emissiveIntensity={isNight ? 2.5 : 1.2}
              />
            </mesh>
          </group>
        </group>
      )}

      {/* Building Click Raycast Catcher for Masterplan View */}
      <mesh
        visible={false}
        position={[0, (groundHeight + totalFloors * floorHeight) / 2, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectBuilding(buildingData.id);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setIsHovered(true);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setIsHovered(false);
        }}
      >
        <boxGeometry args={[30.5, groundHeight + totalFloors * floorHeight + 2, 22.5]} />
      </mesh>
    </group>
  );
}
