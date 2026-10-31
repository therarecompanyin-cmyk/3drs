import React from 'react';
import * as THREE from 'three';
import { ARCH_MATERIALS } from './materials';

export default function Roads() {
  return (
    <group position={[0, 0.01, 0]}>
      {/* =========================================================
          MAIN EXTERNAL PUBLIC BOULEVARD (Z = 68)
      ========================================================== */}
      {/* =========================================================
          MAIN EXTERNAL PUBLIC BOULEVARD (Divided 4-Lane with Green Median)
      ========================================================== */}
      <group position={[0, 0, 70]}>
        {/* Full Boulevard Asphalt Deck */}
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          receiveShadow
          material={ARCH_MATERIALS.roadAsphalt}
        >
          <planeGeometry args={[280, 26]} />
        </mesh>

        {/* Central Raised Landscaped Green Median Strips (West & East of Entrance Plaza) */}
        {/* West Median Island */}
        <group position={[-75, 0.12, 0]}>
          <mesh castShadow receiveShadow material={ARCH_MATERIALS.roadMedian}>
            <boxGeometry args={[105, 0.24, 2.8]} />
          </mesh>
          <mesh material={ARCH_MATERIALS.slabEdge}>
            <boxGeometry args={[105.4, 0.22, 3.2]} />
          </mesh>
          {/* Manicured continuous boxwood hedges along boulevard median */}
          {[-42, -26, -10, 6, 22, 38].map((xOffset) => (
            <mesh
              key={xOffset}
              position={[xOffset, 0.38, 0]}
              castShadow
              material={ARCH_MATERIALS.hedgeBoxwood}
            >
              <boxGeometry args={[12.5, 0.48, 1.4]} />
            </mesh>
          ))}
        </group>

        {/* East Median Island */}
        <group position={[75, 0.12, 0]}>
          <mesh castShadow receiveShadow material={ARCH_MATERIALS.roadMedian}>
            <boxGeometry args={[105, 0.24, 2.8]} />
          </mesh>
          <mesh material={ARCH_MATERIALS.slabEdge}>
            <boxGeometry args={[105.4, 0.22, 3.2]} />
          </mesh>
          {/* Manicured continuous boxwood hedges along boulevard median */}
          {[-42, -26, -10, 6, 22, 38].map((xOffset) => (
            <mesh
              key={xOffset}
              position={[xOffset, 0.38, 0]}
              castShadow
              material={ARCH_MATERIALS.hedgeBoxwood}
            >
              <boxGeometry args={[12.5, 0.48, 1.4]} />
            </mesh>
          ))}
        </group>

        {/* Boulevard Lane Markings */}
        {/* Northbound Lane Divider (Z = -5.8) */}
        {Array.from({ length: 28 }, (_, i) => -130 + i * 10).map((xPos) => (
          <mesh
            key={`ln-n-${xPos}`}
            position={[xPos, 0.02, -6]}
            rotation={[-Math.PI / 2, 0, 0]}
            material={ARCH_MATERIALS.roadMarking}
          >
            <planeGeometry args={[4.2, 0.22]} />
          </mesh>
        ))}

        {/* Southbound Lane Divider (Z = 6) */}
        {Array.from({ length: 28 }, (_, i) => -130 + i * 10).map((xPos) => (
          <mesh
            key={`ln-s-${xPos}`}
            position={[xPos, 0.02, 6]}
            rotation={[-Math.PI / 2, 0, 0]}
            material={ARCH_MATERIALS.roadMarking}
          >
            <planeGeometry args={[4.2, 0.22]} />
          </mesh>
        ))}

        {/* Solid Outer Shoulder Lines */}
        <mesh
          position={[0, 0.02, 11.5]}
          rotation={[-Math.PI / 2, 0, 0]}
          material={ARCH_MATERIALS.roadMarking}
        >
          <planeGeometry args={[280, 0.25]} />
        </mesh>
        <mesh
          position={[0, 0.02, -11.5]}
          rotation={[-Math.PI / 2, 0, 0]}
          material={ARCH_MATERIALS.roadMarking}
        >
          <planeGeometry args={[280, 0.25]} />
        </mesh>
      </group>

      {/* =========================================================
          DUAL ENTRANCE & EXIT ACCESS PLAZAS & ZEBRA CROSSINGS
      ========================================================== */}
      {/* 1. Main Entrance Road (Left) */}
      <mesh
        position={[-14, 0.01, 53]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
        material={ARCH_MATERIALS.roadAsphalt}
      >
        <planeGeometry args={[16, 20]} />
      </mesh>

      {/* Entrance Zebra Pedestrian Crossing */}
      <group position={[-14, 0.02, 44]}>
        {[-6, -4.5, -3, -1.5, 0, 1.5, 3, 4.5, 6].map((xOffset) => (
          <mesh
            key={`z-in-${xOffset}`}
            position={[xOffset, 0, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            material={ARCH_MATERIALS.roadMarking}
          >
            <planeGeometry args={[0.9, 3.2]} />
          </mesh>
        ))}
      </group>

      {/* 2. Secondary Exit Road (Right) */}
      <mesh
        position={[18, 0.01, 53]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
        material={ARCH_MATERIALS.roadAsphalt}
      >
        <planeGeometry args={[12, 20]} />
      </mesh>

      {/* Exit Zebra Pedestrian Crossing */}
      <group position={[18, 0.02, 44]}>
        {[-4.5, -3, -1.5, 0, 1.5, 3, 4.5].map((xOffset) => (
          <mesh
            key={`z-out-${xOffset}`}
            position={[xOffset, 0, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            material={ARCH_MATERIALS.roadMarking}
          >
            <planeGeometry args={[0.9, 3.2]} />
          </mesh>
        ))}
      </group>

      {/* =========================================================
          INTERNAL RESIDENTIAL ACCESS LOOP ROAD
      ========================================================== */}
      {/* South Crossroad (Linking Block A, Central park, and Clubhouse) */}
      <mesh
        position={[0, 0.01, 38]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
        material={ARCH_MATERIALS.roadAsphalt}
      >
        <planeGeometry args={[122, 9.5]} />
      </mesh>

      {/* West Driveway (serving Block A) */}
      <mesh
        position={[-48, 0.01, -4]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
        material={ARCH_MATERIALS.roadAsphalt}
      >
        <planeGeometry args={[10.5, 78]} />
      </mesh>

      {/* East Driveway (serving Block C and Clubhouse) */}
      <mesh
        position={[48, 0.01, 4]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
        material={ARCH_MATERIALS.roadAsphalt}
      >
        <planeGeometry args={[10.5, 70]} />
      </mesh>

      {/* North Driveway (Front of Block B) */}
      <mesh
        position={[0, 0.01, -22]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
        material={ARCH_MATERIALS.roadAsphalt}
      >
        <planeGeometry args={[98, 9.5]} />
      </mesh>

      {/* Rear Service Road */}
      <mesh
        position={[0, 0.01, -54]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
        material={ARCH_MATERIALS.roadAsphalt}
      >
        <planeGeometry args={[102, 8.5]} />
      </mesh>

      {/* Central Park Walkway Zebra Crossing */}
      <group position={[0, 0.02, 38]}>
        {[-3.5, -2.1, -0.7, 0.7, 2.1, 3.5].map((xOffset) => (
          <mesh
            key={xOffset}
            position={[xOffset, 0, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            material={ARCH_MATERIALS.roadMarking}
          >
            <planeGeometry args={[0.8, 3.6]} />
          </mesh>
        ))}
      </group>

      {/* =========================================================
          SURFACE PARKING BAYS & STOPPERS
      ========================================================== */}
      {/* West Parking Bay (adjacent to Block A) */}
      <group position={[-58, 0.02, -10]}>
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          receiveShadow
          material={ARCH_MATERIALS.roadAsphalt}
        >
          <planeGeometry args={[9.5, 45]} />
        </mesh>
        {[-18, -14, -10, -6, -2, 2, 6, 10, 14, 18].map((z) => (
          <React.Fragment key={z}>
            {/* White divider lines */}
            <mesh
              position={[0, 0.01, z]}
              rotation={[-Math.PI / 2, 0, 0]}
              material={ARCH_MATERIALS.roadMarking}
            >
              <planeGeometry args={[8.8, 0.18]} />
            </mesh>
            {/* Wheel Stopper Curb Block */}
            <mesh
              position={[-3.8, 0.08, z + 2]}
              material={ARCH_MATERIALS.wallAccent}
            >
              <boxGeometry args={[0.3, 0.16, 2.0]} />
            </mesh>
          </React.Fragment>
        ))}
      </group>

      {/* East Parking Bay (near Sports Court & Block C) */}
      <group position={[58, 0.02, 12]}>
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          receiveShadow
          material={ARCH_MATERIALS.roadAsphalt}
        >
          <planeGeometry args={[9.5, 42]} />
        </mesh>
        {[-16, -12, -8, -4, 0, 4, 8, 12, 16].map((z) => (
          <React.Fragment key={z}>
            <mesh
              position={[0, 0.01, z]}
              rotation={[-Math.PI / 2, 0, 0]}
              material={ARCH_MATERIALS.roadMarking}
            >
              <planeGeometry args={[8.8, 0.18]} />
            </mesh>
            <mesh
              position={[3.8, 0.08, z + 2]}
              material={ARCH_MATERIALS.wallAccent}
            >
              <boxGeometry args={[0.3, 0.16, 2.0]} />
            </mesh>
          </React.Fragment>
        ))}
      </group>

      {/* =========================================================
          PAVED SIDEWALKS & CONCRETE CURBS
      ========================================================== */}
      {/* West Paved Sidewalk */}
      <mesh
        position={[-41.5, 0.08, -4]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
        material={ARCH_MATERIALS.concretePaving}
      >
        <planeGeometry args={[2.5, 78]} />
      </mesh>
      {/* West Beveled Road Curb */}
      <mesh
        position={[-42.7, 0.12, -4]}
        material={ARCH_MATERIALS.slabEdge}
      >
        <boxGeometry args={[0.35, 0.22, 78]} />
      </mesh>

      {/* East Paved Sidewalk */}
      <mesh
        position={[41.5, 0.08, 4]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
        material={ARCH_MATERIALS.concretePaving}
      >
        <planeGeometry args={[2.5, 70]} />
      </mesh>
      {/* East Beveled Road Curb */}
      <mesh
        position={[42.7, 0.12, 4]}
        material={ARCH_MATERIALS.slabEdge}
      >
        <boxGeometry args={[0.35, 0.22, 70]} />
      </mesh>

      {/* South Crossroad Curbs */}
      <mesh
        position={[0, 0.12, 42.9]}
        material={ARCH_MATERIALS.slabEdge}
      >
        <boxGeometry args={[98, 0.22, 0.35]} />
      </mesh>
      <mesh
        position={[0, 0.12, 33.1]}
        material={ARCH_MATERIALS.slabEdge}
      >
        <boxGeometry args={[98, 0.22, 0.35]} />
      </mesh>

      {/* North Driveway Curbs */}
      <mesh
        position={[0, 0.12, -17.1]}
        material={ARCH_MATERIALS.slabEdge}
      >
        <boxGeometry args={[86, 0.22, 0.35]} />
      </mesh>
      <mesh
        position={[0, 0.12, -26.9]}
        material={ARCH_MATERIALS.slabEdge}
      >
        <boxGeometry args={[86, 0.22, 0.35]} />
      </mesh>
    </group>
  );
}
