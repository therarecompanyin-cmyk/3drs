import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import Floor from './Floor';
import { ARCH_MATERIALS } from './materials';
import { Vehicle } from './InstancedVehicles';

export default function Building({
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
        position={[0, groundHeight + totalFloors * floorHeight + 7, 0]}
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

      {/* TOWER BASE / GROUND LEVEL: STILT PARKING WITH PILOTIS & FRONT ENTRANCE LOBBY */}
      <group position={[0, 0, 0]}>
        {/* Foundation & Ground Stilt Parking Base Slab */}
        <mesh
          position={[0, -0.2, 0]}
          receiveShadow
          material={ARCH_MATERIALS.roadAsphalt}
        >
          <boxGeometry args={[31, 0.4, 23]} />
        </mesh>

        {/* Central Entrance Double-Height Lobby Core */}
        <mesh
          position={[0, groundHeight / 2, 2.5]}
          castShadow
          receiveShadow
          material={ARCH_MATERIALS.wallIvory}
        >
          <boxGeometry args={[11.5, groundHeight, 10.5]} />
        </mesh>

        {/* Lobby Large Glass Curtain Wall Frontage with Warm Glow */}
        <mesh
          position={[0, groundHeight / 2, 7.8]}
          material={ARCH_MATERIALS.glassLit}
        >
          <boxGeometry args={[10.5, groundHeight * 0.88, 0.1]} />
        </mesh>
        {/* Lobby Curtain Wall Mullions */}
        {[-3.6, -1.2, 1.2, 3.6].map((xMul, idx) => (
          <mesh
            key={idx}
            position={[xMul, groundHeight / 2, 7.86]}
            material={ARCH_MATERIALS.windowFrame}
          >
            <boxGeometry args={[0.08, groundHeight * 0.88, 0.1]} />
          </mesh>
        ))}

        {/* Lobby Entrance Columns with Sand Finish */}
        <mesh
          position={[-5.4, groundHeight / 2, 7.88]}
          castShadow
          material={ARCH_MATERIALS.wallSand}
        >
          <boxGeometry args={[0.8, groundHeight, 0.6]} />
        </mesh>
        <mesh
          position={[5.4, groundHeight / 2, 7.88]}
          castShadow
          material={ARCH_MATERIALS.wallSand}
        >
          <boxGeometry args={[0.8, groundHeight, 0.6]} />
        </mesh>

        {/* Grand Cantilevered Drop-off Canopy (Porte-Cochère) */}
        <group position={[0, 3.8, 10.8]}>
          <mesh
            castShadow
            receiveShadow
            material={ARCH_MATERIALS.wallWarmBronze}
          >
            <boxGeometry args={[12.5, 0.4, 5.8]} />
          </mesh>
          {/* Canopy Soffit Downlights */}
          {[-3.5, 0, 3.5].map((xSpot, idx) => (
            <mesh
              key={idx}
              position={[xSpot, -0.21, 0]}
            >
              <cylinderGeometry args={[0.22, 0.22, 0.04, 12]} />
              <meshStandardMaterial
                color="#fff5dd"
                emissive="#ffcc66"
                emissiveIntensity={isNight ? 2.5 : 0.8}
              />
            </mesh>
          ))}
          {/* Canopy Stainless Steel Support Columns */}
          <mesh
            position={[-5.4, -1.9, 2.2]}
            castShadow
            material={ARCH_MATERIALS.railingDark}
          >
            <cylinderGeometry args={[0.18, 0.18, 3.8, 16]} />
          </mesh>
          <mesh
            position={[5.4, -1.9, 2.2]}
            castShadow
            material={ARCH_MATERIALS.railingDark}
          >
            <cylinderGeometry args={[0.18, 0.18, 3.8, 16]} />
          </mesh>
        </group>

        {/* REINFORCED CONCRETE STILT COLUMNS (Pilotis underneath building wings) */}
        {[
          // Left Wing Stilt Columns
          [-12.5, -6.5], [-12.5, 0], [-12.5, 6.5],
          [-8.5, -6.5], [-8.5, 0], [-8.5, 6.5],
          // Right Wing Stilt Columns
          [8.5, -6.5], [8.5, 0], [8.5, 6.5],
          [12.5, -6.5], [12.5, 0], [12.5, 6.5],
          // Rear Center Stilt Columns
          [-3.5, -6.5], [0, -6.5], [3.5, -6.5],
        ].map(([cx, cz], idx) => (
          <mesh
            key={`col-${idx}`}
            position={[cx, groundHeight / 2, cz]}
            castShadow
            receiveShadow
            material={ARCH_MATERIALS.stiltColumn}
          >
            <boxGeometry args={[0.7, groundHeight, 0.7]} />
          </mesh>
        ))}

        {/* White Painted Stilt Parking Stalls Under Wings */}
        {[-10.5, 10.5].map((xBase) =>
          [-5, -1, 3].map((zBase) => (
            <group key={`stall-${xBase}-${zBase}`} position={[xBase, 0.02, zBase]}>
              <mesh rotation={[-Math.PI / 2, 0, 0]} material={ARCH_MATERIALS.roadMarking}>
                <planeGeometry args={[5.2, 0.12]} />
              </mesh>
            </group>
          ))
        )}

        {/* Parked Resident Cars Under Stilts (Realistic 3D Vehicles) */}
        <Vehicle
          position={[-10.5, 0, -2.5]}
          rotation={[0, 0, 0]}
          colorMaterial={ARCH_MATERIALS.carWhite}
          type="sedan"
        />
        <Vehicle
          position={[10.5, 0, 2.5]}
          rotation={[0, Math.PI, 0]}
          colorMaterial={ARCH_MATERIALS.carCharcoal}
          type="suv"
        />

        {/* Entrance Podium Planter Boxes with Lush Architectural Foliage */}
        <group position={[-10.5, 0.45, 9.8]}>
          <mesh castShadow material={ARCH_MATERIALS.wallSand}>
            <boxGeometry args={[3.2, 0.9, 1.4]} />
          </mesh>
          <mesh position={[0, 0.5, 0]} material={ARCH_MATERIALS.grassTurf}>
            <boxGeometry args={[3.0, 0.2, 1.2]} />
          </mesh>
          {/* Manicured Boxwood Shrub Hedge */}
          <mesh position={[0, 0.72, 0]} castShadow receiveShadow material={ARCH_MATERIALS.hedgeBoxwood}>
            <boxGeometry args={[2.7, 0.42, 0.95]} />
          </mesh>
        </group>

        <group position={[10.5, 0.45, 9.8]}>
          <mesh castShadow material={ARCH_MATERIALS.wallSand}>
            <boxGeometry args={[3.2, 0.9, 1.4]} />
          </mesh>
          <mesh position={[0, 0.5, 0]} material={ARCH_MATERIALS.grassTurf}>
            <boxGeometry args={[3.0, 0.2, 1.2]} />
          </mesh>
          {/* Manicured Boxwood Shrub Hedge */}
          <mesh position={[0, 0.72, 0]} castShadow receiveShadow material={ARCH_MATERIALS.hedgeBoxwood}>
            <boxGeometry args={[2.7, 0.42, 0.95]} />
          </mesh>
        </group>
      </group>

      {/* 15 RESIDENTIAL FLOORS */}
      {floors.map((floorNum) => (
        <Floor
          key={floorNum}
          floorNumber={floorNum}
          buildingCode={buildingData.code}
          buildingId={buildingData.id}
          selectedFloorNumber={isTowerSelected ? selectedFloorNumber : null}
          selectedApartmentId={selectedApartmentId}
          isIsolated={isFloorIsolated && isTowerSelected}
          isNight={isNight}
          onSelectFloor={(fn) => {
            if (!isTowerSelected) {
              onSelectBuilding(buildingData.id);
            }
            onSelectFloor(fn);
          }}
          onSelectApartment={onSelectApartment}
          floorHeight={floorHeight}
          groundFloorHeight={groundHeight}
        />
      ))}

      {/* ROOFTOP ARCHITECTURAL CROWN (Matching Reference Aerial Photo) */}
      {(!isFloorIsolated || !isTowerSelected || selectedFloorNumber === null) && (
        <group position={[0, groundHeight + totalFloors * floorHeight, 0]}>
          {/* Main Roof Paved Slab */}
          <mesh
            position={[0, 0.16, 0]}
            castShadow
            receiveShadow
            material={ARCH_MATERIALS.slabEdge}
          >
            <boxGeometry args={[28, 0.32, 19]} />
          </mesh>

          {/* Roof Perimeter Parapet Walls with Sand Coping Cap */}
          <mesh
            position={[0, 0.8, 9.35]}
            castShadow
            material={ARCH_MATERIALS.wallSand}
          >
            <boxGeometry args={[28, 1.2, 0.3]} />
          </mesh>
          <mesh
            position={[0, 0.8, -9.35]}
            castShadow
            material={ARCH_MATERIALS.wallSand}
          >
            <boxGeometry args={[28, 1.2, 0.3]} />
          </mesh>
          <mesh
            position={[-13.85, 0.8, 0]}
            castShadow
            material={ARCH_MATERIALS.wallSand}
          >
            <boxGeometry args={[0.3, 1.2, 19]} />
          </mesh>
          <mesh
            position={[13.85, 0.8, 0]}
            castShadow
            material={ARCH_MATERIALS.wallSand}
          >
            <boxGeometry args={[0.3, 1.2, 19]} />
          </mesh>

          {/* 4 DISTINCT CORNER PENTHOUSE PAVILIONS (As seen in media_1792077127137_6b0bc1b7.jpg) */}
          {[
            // Front-Left Penthouse
            { pos: [-9.5, 1.6, 5.5], size: [6.8, 2.8, 5.5] },
            // Front-Right Penthouse
            { pos: [9.5, 1.6, 5.5], size: [6.8, 2.8, 5.5] },
            // Rear-Left Penthouse
            { pos: [-9.5, 1.6, -5.5], size: [6.8, 2.8, 5.5] },
            // Rear-Right Penthouse
            { pos: [9.5, 1.6, -5.5], size: [6.8, 2.8, 5.5] },
          ].map((ph, idx) => (
            <group key={`ph-${idx}`} position={ph.pos}>
              {/* Penthouse Wall Structure in Ivory */}
              <mesh castShadow receiveShadow material={ARCH_MATERIALS.wallIvory}>
                <boxGeometry args={[ph.size[0], ph.size[1], ph.size[2]]} />
              </mesh>
              {/* Cantilevered Bronze/Brown Roof Canopy (Rooftop Crown) */}
              <mesh
                position={[0, ph.size[1] / 2 + 0.18, 0]}
                castShadow
                material={ARCH_MATERIALS.rooftopCrown}
              >
                <boxGeometry args={[ph.size[0] + 0.9, 0.36, ph.size[2] + 0.9]} />
              </mesh>
              {/* Louver Vent Grille */}
              <mesh
                position={[0, 0.2, ph.size[2] / 2 + 0.02]}
                material={ARCH_MATERIALS.railingDark}
              >
                <boxGeometry args={[ph.size[0] * 0.65, 1.0, 0.05]} />
              </mesh>
            </group>
          ))}

          {/* Central Lift Machine Room & Overhead Core */}
          <group position={[0, 2.2, 0]}>
            <mesh castShadow receiveShadow material={ARCH_MATERIALS.wallSand}>
              <boxGeometry args={[7.2, 4.0, 6.8]} />
            </mesh>
            <mesh
              position={[0, 2.15, 0]}
              castShadow
              material={ARCH_MATERIALS.rooftopCrown}
            >
              <boxGeometry args={[8.0, 0.35, 7.6]} />
            </mesh>
          </group>

          {/* Overhead Water Storage Tanks (Sintex Cylinders visible in aerial view) */}
          {[-1.6, 1.6].map((xOffset) => (
            <group key={xOffset} position={[xOffset, 1.2, -6.2]}>
              <mesh castShadow material={ARCH_MATERIALS.carWhite}>
                <cylinderGeometry args={[0.75, 0.75, 1.6, 16]} />
              </mesh>
              <mesh position={[0, 0.85, 0]} material={ARCH_MATERIALS.carWhite}>
                <cylinderGeometry args={[0.78, 0.78, 0.12, 16]} />
              </mesh>
            </group>
          ))}

          {/* Modern Rooftop Louver Pergola in Front Well */}
          <group position={[0, 2.8, 5.5]}>
            {[-2.2, -1.1, 0, 1.1, 2.2].map((zPos, idx) => (
              <mesh
                key={idx}
                position={[0, 0, zPos]}
                material={ARCH_MATERIALS.wallAccent}
              >
                <boxGeometry args={[7.5, 0.14, 0.28]} />
              </mesh>
            ))}
          </group>

          {/* Aviation Warning Beacon Mast & Light */}
          <group position={[0, 5.2, -2]}>
            <mesh material={ARCH_MATERIALS.railingDark}>
              <cylinderGeometry args={[0.06, 0.08, 2.2, 8]} />
            </mesh>
            <mesh position={[0, 1.2, 0]}>
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

      {/* Building Click Raycast Catcher */}
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
        <boxGeometry args={[30, groundHeight + totalFloors * floorHeight + 2, 22]} />
      </mesh>
    </group>
  );
}
