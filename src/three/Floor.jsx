import React, { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { ARCH_MATERIALS } from './materials';

function ApartmentWing({
  unitIndex,
  position,
  size,
  isSelected,
  onClick,
  isNight,
  floorNumber,
}) {
  const [hovered, setHovered] = useState(false);

  // Determine whether this apartment has warm interior illumination (~28% lived-in windows)
  const isOccupiedAndLit = useMemo(() => {
    return (floorNumber * 7 + unitIndex * 13) % 3 === 0;
  }, [floorNumber, unitIndex]);

  const activeWindowMat = isNight
    ? isOccupiedAndLit
      ? ARCH_MATERIALS.glassNight
      : ARCH_MATERIALS.windowFrame
    : isOccupiedAndLit
    ? ARCH_MATERIALS.glassLit
    : ARCH_MATERIALS.glassDay;

  return (
    <group position={position}>
      {/* Main Structural Outer Wall Box (Crisp Ivory Exterior) */}
      <mesh
        castShadow
        receiveShadow
        position={[0, size[1] / 2, 0]}
        material={
          isSelected
            ? ARCH_MATERIALS.floorGlow
            : hovered
            ? ARCH_MATERIALS.wallAccent
            : ARCH_MATERIALS.wallIvory
        }
        onClick={(e) => {
          e.stopPropagation();
          onClick(unitIndex);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
        }}
      >
        <boxGeometry args={[size[0], size[1], size[2]]} />
      </mesh>

      {/* Prominent Architectural Sand Pilasters framing the facade */}
      <mesh
        position={[-size[0] * 0.46, size[1] / 2, size[2] * 0.5 + 0.05]}
        castShadow
        material={ARCH_MATERIALS.wallSand}
      >
        <boxGeometry args={[0.55, size[1], 0.22]} />
      </mesh>
      <mesh
        position={[size[0] * 0.46, size[1] / 2, size[2] * 0.5 + 0.05]}
        castShadow
        material={ARCH_MATERIALS.wallSand}
      >
        <boxGeometry args={[0.55, size[1], 0.22]} />
      </mesh>

      {/* Horizontal Sand Architectural Reveal Band across top of floor */}
      <mesh
        position={[0, size[1] - 0.18, size[2] * 0.5 + 0.04]}
        castShadow
        material={ARCH_MATERIALS.wallSand}
      >
        <boxGeometry args={[size[0] * 0.96, 0.32, 0.15]} />
      </mesh>

      {/* RECESSED BALCONY & DECK SLAB */}
      <group position={[unitIndex === 2 ? 0 : unitIndex === 1 ? 0.4 : -0.4, 0, size[2] / 2 + 0.82]}>
        {/* Cantilevered Concrete Balcony Slab with crisp white edge */}
        <mesh position={[0, 0.1, 0]} receiveShadow material={ARCH_MATERIALS.slabEdge}>
          <boxGeometry args={[size[0] * 0.76, 0.22, 1.7]} />
        </mesh>
        {/* Balcony Timber Deck Flooring */}
        <mesh position={[0, 0.22, 0]} receiveShadow material={ARCH_MATERIALS.teakWood}>
          <boxGeometry args={[size[0] * 0.72, 0.02, 1.58]} />
        </mesh>

        {/* Clear Glass Balustrade with subtle tint */}
        <mesh position={[0, 0.68, 0.8]} material={ARCH_MATERIALS.balconyGlass}>
          <boxGeometry args={[size[0] * 0.72, 0.88, 0.04]} />
        </mesh>
        {/* Sleek Top Metal Handrail */}
        <mesh position={[0, 1.12, 0.8]} material={ARCH_MATERIALS.railingDark}>
          <boxGeometry args={[size[0] * 0.74, 0.06, 0.08]} />
        </mesh>

        {/* Balcony Metal Posts / Stanchions */}
        {[-size[0] * 0.34, -size[0] * 0.12, size[0] * 0.12, size[0] * 0.34].map((xPost, idx) => (
          <mesh
            key={idx}
            position={[xPost, 0.68, 0.8]}
            material={ARCH_MATERIALS.railingDark}
          >
            <boxGeometry args={[0.04, 0.88, 0.04]} />
          </mesh>
        ))}

        {/* Balcony Side Glass Railings */}
        <mesh position={[-size[0] * 0.36, 0.68, 0]} material={ARCH_MATERIALS.balconyGlass}>
          <boxGeometry args={[0.04, 0.88, 1.58]} />
        </mesh>
        <mesh position={[-size[0] * 0.36, 1.12, 0]} material={ARCH_MATERIALS.railingDark}>
          <boxGeometry args={[0.06, 0.06, 1.6]} />
        </mesh>
        <mesh position={[size[0] * 0.36, 0.68, 0]} material={ARCH_MATERIALS.balconyGlass}>
          <boxGeometry args={[0.04, 0.88, 1.58]} />
        </mesh>
        <mesh position={[size[0] * 0.36, 1.12, 0]} material={ARCH_MATERIALS.railingDark}>
          <boxGeometry args={[0.06, 0.06, 1.6]} />
        </mesh>

        {/* Sliding Patio Glazing set back into wall */}
        <mesh position={[0, size[1] * 0.48, -0.82]} material={activeWindowMat}>
          <boxGeometry args={[size[0] * 0.68, size[1] * 0.74, 0.05]} />
        </mesh>
        {/* Interior Linen Curtains behind glass */}
        <mesh position={[0, size[1] * 0.48, -0.88]} material={ARCH_MATERIALS.windowCurtains}>
          <boxGeometry args={[size[0] * 0.66, size[1] * 0.72, 0.02]} />
        </mesh>
        {/* Perimeter Patio Door Charcoal Frame */}
        <mesh position={[0, size[1] * 0.48, -0.8]} material={ARCH_MATERIALS.windowFrame}>
          <boxGeometry args={[size[0] * 0.7, size[1] * 0.76, 0.02]} />
        </mesh>
        {/* Vertical Center Mullion Bar */}
        <mesh position={[0, size[1] * 0.48, -0.79]} material={ARCH_MATERIALS.windowFrame}>
          <boxGeometry args={[0.06, size[1] * 0.74, 0.04]} />
        </mesh>

        {/* Balcony Planter Box with Lush Greenery on select lived-in apartments */}
        {(floorNumber * 5 + unitIndex * 7) % 3 === 1 && (
          <group position={[unitIndex === 2 ? 1.6 : 1.2, 0.35, 0.55]}>
            <mesh material={ARCH_MATERIALS.wallSand} castShadow>
              <boxGeometry args={[1.0, 0.3, 0.35]} />
            </mesh>
            <mesh position={[0, 0.2, 0]} material={ARCH_MATERIALS.foliageCard}>
              <boxGeometry args={[0.95, 0.25, 0.3]} />
            </mesh>
          </group>
        )}
      </group>

      {/* FRONT BEDROOM WINDOW BAY WITH ARCHITECTURAL REVEAL & SPANDREL PANEL */}
      {unitIndex !== 2 && (
        <group position={[unitIndex === 1 ? -size[0] * 0.32 : size[0] * 0.32, size[1] * 0.5, size[2] / 2 + 0.05]}>
          {/* Flanking Vertical Sand Pilasters */}
          <mesh position={[-0.98, 0, 0.06]} material={ARCH_MATERIALS.wallSand} castShadow>
            <boxGeometry args={[0.22, size[1] * 0.94, 0.2]} />
          </mesh>
          <mesh position={[0.98, 0, 0.06]} material={ARCH_MATERIALS.wallSand} castShadow>
            <boxGeometry args={[0.22, size[1] * 0.94, 0.2]} />
          </mesh>
          {/* Upper Sand Architrave Header */}
          <mesh position={[0, size[1] * 0.44, 0.06]} material={ARCH_MATERIALS.wallSand} castShadow>
            <boxGeometry args={[2.18, 0.22, 0.2]} />
          </mesh>
          {/* Projecting Window Sill */}
          <mesh position={[0, -0.18, 0.1]} material={ARCH_MATERIALS.wallSand} castShadow>
            <boxGeometry args={[1.96, 0.08, 0.24]} />
          </mesh>

          {/* Upper Window Opening: Vision Glass (Reflecting HDRI Sky) */}
          <mesh position={[0, 0.42, 0.01]} material={activeWindowMat}>
            <boxGeometry args={[1.74, size[1] * 0.46, 0.04]} />
          </mesh>
          {/* Interior Curtains behind glass */}
          <mesh position={[0, 0.42, -0.02]} material={ARCH_MATERIALS.windowCurtains}>
            <boxGeometry args={[1.7, size[1] * 0.44, 0.02]} />
          </mesh>
          {/* Perimeter Window Frame */}
          <mesh position={[0, 0.42, 0.03]} material={ARCH_MATERIALS.windowFrame}>
            <boxGeometry args={[1.76, size[1] * 0.48, 0.03]} />
          </mesh>
          {/* Vertical Center Mullion */}
          <mesh position={[0, 0.42, 0.04]} material={ARCH_MATERIALS.windowFrame}>
            <boxGeometry args={[0.05, size[1] * 0.46, 0.03]} />
          </mesh>
          {/* Horizontal Transom Bar */}
          <mesh position={[0, 0.64, 0.04]} material={ARCH_MATERIALS.windowFrame}>
            <boxGeometry args={[1.74, 0.05, 0.03]} />
          </mesh>

          {/* Lower Architectural Spandrel Panel below sill */}
          <mesh position={[0, -0.62, 0.02]} material={ARCH_MATERIALS.shaftDark}>
            <boxGeometry args={[1.74, 0.68, 0.08]} />
          </mesh>
          {/* Spandrel Horizontal Texture Grooves */}
          {[-0.8, -0.62, -0.44].map((yG, idx) => (
            <mesh key={idx} position={[0, yG, 0.07]} material={ARCH_MATERIALS.windowFrame}>
              <boxGeometry args={[1.72, 0.03, 0.03]} />
            </mesh>
          ))}
        </group>
      )}

      {/* REAR BEDROOM WINDOWS (Recessed with Mullions & Dark Spandrels) */}
      <group position={[0, size[1] * 0.5, -size[2] / 2]}>
        {/* Window Reveal Frame Niche */}
        <mesh position={[0, 0.32, -0.04]} material={activeWindowMat}>
          <boxGeometry args={[size[0] * 0.65, size[1] * 0.48, 0.04]} />
        </mesh>
        {/* Curtains */}
        <mesh position={[0, 0.32, 0.01]} material={ARCH_MATERIALS.windowCurtains}>
          <boxGeometry args={[size[0] * 0.62, size[1] * 0.46, 0.02]} />
        </mesh>
        <mesh position={[0, 0.32, -0.01]} material={ARCH_MATERIALS.windowFrame}>
          <boxGeometry args={[size[0] * 0.68, size[1] * 0.51, 0.03]} />
        </mesh>
        {/* Mullion Grid */}
        <mesh position={[0, 0.32, 0]} material={ARCH_MATERIALS.windowFrame}>
          <boxGeometry args={[0.05, size[1] * 0.48, 0.05]} />
        </mesh>
        <mesh position={[0, 0.52, 0]} material={ARCH_MATERIALS.windowFrame}>
          <boxGeometry args={[size[0] * 0.65, 0.05, 0.05]} />
        </mesh>
        {/* Rear Lower Dark Charcoal Spandrel Panel */}
        <mesh position={[0, -0.58, -0.03]} material={ARCH_MATERIALS.shaftDark}>
          <boxGeometry args={[size[0] * 0.65, 0.64, 0.05]} />
        </mesh>
      </group>

      {/* SIDE CORNER WINDOWS FOR UNITS 1 & 3 */}
      {unitIndex !== 2 && (
        <group
          position={[
            unitIndex === 1 ? -size[0] / 2 - 0.02 : size[0] / 2 + 0.02,
            size[1] * 0.5,
            0,
          ]}
          rotation={[0, Math.PI / 2, 0]}
        >
          <mesh position={[0, 0.2, 0]} material={activeWindowMat}>
            <boxGeometry args={[size[2] * 0.48, size[1] * 0.5, 0.04]} />
          </mesh>
          <mesh position={[0, 0.2, 0.01]} material={ARCH_MATERIALS.windowFrame}>
            <boxGeometry args={[size[2] * 0.5, size[1] * 0.52, 0.02]} />
          </mesh>
          <mesh position={[0, 0.2, 0.02]} material={ARCH_MATERIALS.windowFrame}>
            <boxGeometry args={[0.05, size[1] * 0.5, 0.03]} />
          </mesh>
          {/* Side Spandrel */}
          <mesh position={[0, -0.55, 0]} material={ARCH_MATERIALS.shaftDark}>
            <boxGeometry args={[size[2] * 0.48, 0.6, 0.04]} />
          </mesh>
        </group>
      )}

      {/* AC OUTDOOR UNIT NICHES WITH LOUVER PANELS */}
      <mesh
        position={[
          unitIndex === 1 ? -size[0] * 0.38 : size[0] * 0.38,
          0.45,
          size[2] / 2 + 0.15,
        ]}
        material={ARCH_MATERIALS.railingDark}
      >
        <boxGeometry args={[1.2, 0.7, 0.22]} />
      </mesh>
    </group>
  );
}

export default function Floor({
  floorNumber,
  buildingCode,
  buildingId,
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

  const isCurrentFloorSelected = selectedFloorNumber === floorNumber;
  const isFloorHidden =
    isIsolated && selectedFloorNumber !== null && floorNumber > selectedFloorNumber;
  const isFloorGhosted =
    isIsolated && selectedFloorNumber !== null && floorNumber < selectedFloorNumber;

  const baseY = groundFloorHeight + (floorNumber - 1) * floorHeight;

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

  if (isFloorHidden) {
    return null;
  }

  const aptId1 = `${buildingCode}-${floorNumber * 100 + 1}`;
  const aptId2 = `${buildingCode}-${floorNumber * 100 + 2}`;
  const aptId3 = `${buildingCode}-${floorNumber * 100 + 3}`;

  return (
    <group
      ref={groupRef}
      position={[0, baseY, 0]}
      onClick={(e) => {
        e.stopPropagation();
        onSelectFloor(floorNumber);
      }}
    >
      {/* Floor Bottom Concrete Slab with Cantilevered Edge Band */}
      <mesh
        position={[0, 0.14, 0]}
        receiveShadow
        material={
          isCurrentFloorSelected
            ? ARCH_MATERIALS.floorGlow
            : isFloorGhosted
            ? ARCH_MATERIALS.ghostedFloor
            : ARCH_MATERIALS.slabEdge
        }
      >
        <boxGeometry args={[27.6, 0.28, 18.6]} />
      </mesh>

      {/* Floor Top Ceiling Slab */}
      <mesh
        position={[0, floorHeight - 0.14, 0]}
        material={
          isCurrentFloorSelected
            ? ARCH_MATERIALS.floorGlow
            : isFloorGhosted
            ? ARCH_MATERIALS.ghostedFloor
            : ARCH_MATERIALS.slabEdge
        }
      >
        <boxGeometry args={[27.6, 0.28, 18.6]} />
      </mesh>

      {/* Central Core Elevator & Staircase Shaft */}
      <mesh
        position={[0, floorHeight / 2, -1.8]}
        material={
          isFloorGhosted ? ARCH_MATERIALS.ghostedFloor : ARCH_MATERIALS.wallAccent
        }
      >
        <boxGeometry args={[8.0, floorHeight - 0.28, 11.2]} />
      </mesh>

      {/* Subtle Shadow Reveal Groove beneath slab */}
      <mesh
        position={[0, -0.02, 0]}
        material={ARCH_MATERIALS.windowFrame}
      >
        <boxGeometry args={[27.4, 0.04, 18.4]} />
      </mesh>

      {isFloorGhosted ? (
        <mesh
          position={[0, floorHeight / 2, 0]}
          material={ARCH_MATERIALS.ghostedFloor}
        >
          <boxGeometry args={[27.2, floorHeight - 0.3, 18.2]} />
        </mesh>
      ) : (
        <>
          {/* Unit 1: Left Wing (3 BHK Luxury) */}
          <ApartmentWing
            unitIndex={1}
            position={[-9.2, 0, 0.2]}
            size={[8.4, floorHeight - 0.28, 16.5]}
            isSelected={selectedApartmentId === aptId1}
            onClick={() => onSelectApartment(aptId1)}
            isNight={isNight}
            floorNumber={floorNumber}
          />

          {/* Left Recessed Utility/Service Shaft Slot with Horizontal Lintel Cross-Ties */}
          <group position={[-4.7, floorHeight / 2, 6.4]}>
            <mesh material={ARCH_MATERIALS.shaftDark} castShadow>
              <boxGeometry args={[1.3, floorHeight - 0.28, 2.4]} />
            </mesh>
            {/* Lintel Spanning Beams */}
            <mesh position={[0, floorHeight * 0.34, 1.22]} material={ARCH_MATERIALS.wallSand}>
              <boxGeometry args={[1.34, 0.38, 0.16]} />
            </mesh>
            <mesh position={[0, -floorHeight * 0.34, 1.22]} material={ARCH_MATERIALS.wallSand}>
              <boxGeometry args={[1.34, 0.38, 0.16]} />
            </mesh>
          </group>

          {/* Unit 2: Center Wing (3 BHK Grand Royal) */}
          <ApartmentWing
            unitIndex={2}
            position={[0, 0, 1.2]}
            size={[7.8, floorHeight - 0.28, 15.6]}
            isSelected={selectedApartmentId === aptId2}
            onClick={() => onSelectApartment(aptId2)}
            isNight={isNight}
            floorNumber={floorNumber}
          />

          {/* Right Recessed Utility/Service Shaft Slot with Horizontal Lintel Cross-Ties */}
          <group position={[4.7, floorHeight / 2, 6.4]}>
            <mesh material={ARCH_MATERIALS.shaftDark} castShadow>
              <boxGeometry args={[1.3, floorHeight - 0.28, 2.4]} />
            </mesh>
            {/* Lintel Spanning Beams */}
            <mesh position={[0, floorHeight * 0.34, 1.22]} material={ARCH_MATERIALS.wallSand}>
              <boxGeometry args={[1.34, 0.38, 0.16]} />
            </mesh>
            <mesh position={[0, -floorHeight * 0.34, 1.22]} material={ARCH_MATERIALS.wallSand}>
              <boxGeometry args={[1.34, 0.38, 0.16]} />
            </mesh>
          </group>

          {/* Unit 3: Right Wing (3 BHK Elite) */}
          <ApartmentWing
            unitIndex={3}
            position={[9.2, 0, 0.2]}
            size={[8.4, floorHeight - 0.28, 16.5]}
            isSelected={selectedApartmentId === aptId3}
            onClick={() => onSelectApartment(aptId3)}
            isNight={isNight}
            floorNumber={floorNumber}
          />
        </>
      )}
    </group>
  );
}
