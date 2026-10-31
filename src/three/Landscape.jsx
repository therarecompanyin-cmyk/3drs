import React from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { ARCH_MATERIALS } from './materials';

// Genuine 3D Poly Haven Photorealistic Park Bench
function PolyHavenBench({ position, rotationY = 0 }) {
  const { scene } = useGLTF('/models/bench/painted_wooden_bench_1k.gltf');
  const clone = React.useMemo(() => {
    const c = scene.clone(true);
    c.traverse((node) => {
      if (node.isMesh) {
        node.castShadow = true;
        node.receiveShadow = true;
      }
    });
    return c;
  }, [scene]);

  return (
    <primitive
      object={clone}
      position={position}
      rotation={[0, rotationY, 0]}
      scale={[1.35, 1.35, 1.35]}
    />
  );
}

// Procedural Fallback Park Bench
function ProceduralBench({ position, rotationY = 0 }) {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* 2 Dark Metal Leg Castings */}
      {[-0.8, 0.8].map((x) => (
        <mesh key={x} position={[x, 0.25, 0]} material={ARCH_MATERIALS.railingDark} castShadow>
          <boxGeometry args={[0.08, 0.5, 0.5]} />
        </mesh>
      ))}
      {/* Teak Wood Slats - Seat */}
      {[-0.15, 0, 0.15].map((z, idx) => (
        <mesh key={`s-${idx}`} position={[0, 0.45, z]} material={ARCH_MATERIALS.teakWood} castShadow>
          <boxGeometry args={[1.8, 0.04, 0.1]} />
        </mesh>
      ))}
      {/* Teak Wood Slats - Backrest */}
      {[0.65, 0.8].map((y, idx) => (
        <mesh key={`b-${idx}`} position={[0, y, -0.22]} material={ARCH_MATERIALS.teakWood} castShadow>
          <boxGeometry args={[1.8, 0.08, 0.04]} />
        </mesh>
      ))}
    </group>
  );
}

function ParkBench(props) {
  return (
    <React.Suspense fallback={<ProceduralBench {...props} />}>
      <PolyHavenBench {...props} />
    </React.Suspense>
  );
}

// Pool Sun Lounger with Umbrella
function SunLoungerWithParasol({ position, rotationY = 0 }) {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* Lounger Frame */}
      <mesh position={[0, 0.18, 0]} material={ARCH_MATERIALS.teakWood} castShadow>
        <boxGeometry args={[0.7, 0.2, 1.9]} />
      </mesh>
      {/* White Padded Cushion */}
      <mesh position={[0, 0.32, 0]} material={ARCH_MATERIALS.carWhite} castShadow>
        <boxGeometry args={[0.66, 0.08, 1.85]} />
      </mesh>
      {/* Inclined Headrest */}
      <mesh position={[0, 0.46, -0.65]} rotation={[0.4, 0, 0]} material={ARCH_MATERIALS.carWhite} castShadow>
        <boxGeometry args={[0.66, 0.08, 0.6]} />
      </mesh>

      {/* Sun Parasol / Umbrella */}
      <group position={[0.7, 0, -0.4]}>
        {/* Mast */}
        <mesh position={[0, 1.4, 0]} material={ARCH_MATERIALS.railingDark} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 2.8, 8]} />
        </mesh>
        {/* Umbrella Canopy */}
        <mesh position={[0, 2.6, 0]} material={ARCH_MATERIALS.slabEdge} castShadow>
          <coneGeometry args={[1.4, 0.6, 8]} />
        </mesh>
      </group>
    </group>
  );
}

export default function Landscape({ isNight }) {
  // Contoured Organic Central Lawn Shape (Matching media_1792077127137_6b0bc1b7.jpg)
  const lawnShape = React.useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, -18);
    s.bezierCurveTo(-15, -18, -25, -10, -25, 0);
    s.bezierCurveTo(-25, 10, -23, 20, -12, 22);
    s.bezierCurveTo(-4, 23, 2, 16, 8, 16);
    s.bezierCurveTo(16, 16, 24, 22, 25, 12);
    s.bezierCurveTo(26, 2, 24, -8, 16, -17);
    s.bezierCurveTo(10, -18, 5, -18, 0, -18);
    return s;
  }, []);

  // Outer Terracotta Rubber Jogging Track Ribbon
  const trackShape = React.useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, -20.8);
    s.bezierCurveTo(-17, -20.8, -28.2, -12, -28.2, 0);
    s.bezierCurveTo(-28.2, 12, -26, 23.8, -12, 25.2);
    s.bezierCurveTo(-3, 26.2, 3, 18.8, 9, 18.8);
    s.bezierCurveTo(18, 18.8, 27.2, 25.2, 28.2, 12);
    s.bezierCurveTo(29.2, 1, 27.2, -10, 18.2, -19.8);
    s.bezierCurveTo(11, -20.8, 5, -20.8, 0, -20.8);
    return s;
  }, []);

  return (
    <group position={[0, 0, 0]}>
      {/* BASE GROUND TERRAIN */}
      <mesh
        position={[0, -0.25, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[280, 260]} />
        <meshStandardMaterial
          color={isNight ? '#141f12' : '#314e27'}
          roughness={0.96}
        />
      </mesh>

      {/* =========================================================
          CENTRAL LANDSCAPED GARDEN PARK (Sculpted Contours & Rubber Track)
      ========================================================== */}
      <group position={[0, 0.04, 3]}>
        {/* Outer Continuous Terracotta / Red-Orange Rubber Jogging Track */}
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0.05, 0]}
          receiveShadow
          material={ARCH_MATERIALS.joggingTrack}
        >
          <shapeGeometry args={[trackShape, 64]} />
        </mesh>

        {/* Sculpted Manicured Emerald Central Lawn */}
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0.08, 0]}
          receiveShadow
          material={ARCH_MATERIALS.grassLawnCenter}
        >
          <shapeGeometry args={[lawnShape, 64]} />
        </mesh>

        {/* 4 Architectural Park Benches along the path */}
        <ParkBench position={[-16, 0.1, -10]} rotationY={0.8} />
        <ParkBench position={[16, 0.1, -10]} rotationY={-0.8} />
        <ParkBench position={[-19, 0.1, 10]} rotationY={2.1} />
        <ParkBench position={[19, 0.1, 10]} rotationY={-2.1} />

        {/* Contemporary Architectural Garden Pergola Pavilion */}
        <group position={[0, 0.12, -4]}>
          {/* Stepped Paved Platform */}
          <mesh
            position={[0, 0.12, 0]}
            receiveShadow
            material={ARCH_MATERIALS.concretePaving}
          >
            <boxGeometry args={[8.6, 0.24, 6.2]} />
          </mesh>
          <mesh
            position={[0, 0.26, 0]}
            receiveShadow
            material={ARCH_MATERIALS.teakWood}
          >
            <boxGeometry args={[8.0, 0.06, 5.6]} />
          </mesh>

          {/* 6 Rectilinear Dark Steel & Teak Support Columns */}
          {[-3.6, 0, 3.6].map((xCol) =>
            [-2.4, 2.4].map((zCol) => (
              <group key={`col-${xCol}-${zCol}`} position={[xCol, 1.75, zCol]}>
                <mesh castShadow material={ARCH_MATERIALS.railingDark}>
                  <boxGeometry args={[0.18, 3.1, 0.18]} />
                </mesh>
                <mesh position={[0, 0, 0.1]} material={ARCH_MATERIALS.teakWood}>
                  <boxGeometry args={[0.14, 3.1, 0.03]} />
                </mesh>
              </group>
            ))
          )}

          {/* Longitudinal Header Beams */}
          {[-2.4, 2.4].map((zBm) => (
            <mesh
              key={`bm-${zBm}`}
              position={[0, 3.32, zBm]}
              castShadow
              material={ARCH_MATERIALS.railingDark}
            >
              <boxGeometry args={[8.4, 0.2, 0.18]} />
            </mesh>
          ))}

          {/* Modern Horizontal Slatted Sunscreen Louver Roof */}
          {[-3.6, -3.0, -2.4, -1.8, -1.2, -0.6, 0, 0.6, 1.2, 1.8, 2.4, 3.0, 3.6].map((xLouv, idx) => (
            <mesh
              key={`louv-${idx}`}
              position={[xLouv, 3.46, 0]}
              castShadow
              material={ARCH_MATERIALS.teakWood}
            >
              <boxGeometry args={[0.08, 0.16, 5.6]} />
            </mesh>
          ))}

          {/* Recessed Warm Downlight Spots under Header Beams */}
          {[-2.4, 0, 2.4].map((xSpot, idx) => (
            <mesh key={`ds-${idx}`} position={[xSpot, 3.2, 0]}>
              <cylinderGeometry args={[0.1, 0.1, 0.04, 12]} />
              <meshStandardMaterial
                color="#fff6e5"
                emissive="#ffcc66"
                emissiveIntensity={isNight ? 2.8 : 0.4}
              />
            </mesh>
          ))}

          {/* Built-in Outdoor Lounge Seating */}
          <group position={[0, 0.45, 0]}>
            {/* L-Sofa Base in Teak */}
            <mesh position={[-1.6, 0, -1.2]} material={ARCH_MATERIALS.teakWood} castShadow>
              <boxGeometry args={[3.2, 0.32, 1.1]} />
            </mesh>
            <mesh position={[-2.65, 0, 0.2]} material={ARCH_MATERIALS.teakWood} castShadow>
              <boxGeometry args={[1.1, 0.32, 1.9]} />
            </mesh>
            {/* Charcoal Upholstery Cushions */}
            <mesh position={[-1.6, 0.24, -1.2]} material={ARCH_MATERIALS.railingDark}>
              <boxGeometry args={[3.1, 0.16, 1.0]} />
            </mesh>
            <mesh position={[-2.65, 0.24, 0.2]} material={ARCH_MATERIALS.railingDark}>
              <boxGeometry args={[1.0, 0.16, 1.8]} />
            </mesh>
            {/* Modern Coffee Table */}
            <mesh position={[0.6, -0.05, 0]} material={ARCH_MATERIALS.teakWood} castShadow>
              <boxGeometry args={[1.4, 0.26, 0.8]} />
            </mesh>
            <mesh position={[0.6, 0.1, 0]} material={ARCH_MATERIALS.balconyGlass}>
              <boxGeometry args={[1.42, 0.03, 0.82]} />
            </mesh>
          </group>
        </group>
      </group>

      {/* =========================================================
          CHILDREN'S ADVENTURE PLAY AREA (South-West Garden Pocket)
      ========================================================== */}
      <group position={[-14, 0.06, 18]}>
        {/* Seamless Shock-Absorbing Rubber Play Flooring (Terracotta Safety Tile) */}
        <mesh position={[0, 0.04, 0]} receiveShadow material={ARCH_MATERIALS.playSurfaceRed}>
          <boxGeometry args={[13.5, 0.1, 11.5]} />
        </mesh>
        {/* Slate/Teal Safety Zone Inset */}
        <mesh position={[0, 0.05, 0]} material={ARCH_MATERIALS.playSurfaceBlue}>
          <boxGeometry args={[11.5, 0.11, 9.5]} />
        </mesh>

        {/* Architectural Timber Adventure Play Tower */}
        <group position={[-3.0, 0, 0]}>
          {/* 4 Corner Timber Posts */}
          {[-0.95, 0.95].map((px) =>
            [-0.95, 0.95].map((pz) => (
              <mesh
                key={`post-${px}-${pz}`}
                position={[px, 1.8, pz]}
                castShadow
                material={ARCH_MATERIALS.teakWood}
              >
                <boxGeometry args={[0.15, 3.6, 0.15]} />
              </mesh>
            ))
          )}

          {/* Elevated Play Platform Deck */}
          <mesh position={[0, 1.45, 0]} receiveShadow material={ARCH_MATERIALS.teakWood}>
            <boxGeometry args={[2.0, 0.1, 2.0]} />
          </mesh>

          {/* Slatted Timber Safety Balustrade */}
          {[-0.95, 0.95].map((pz) => (
            <group key={`bal-${pz}`} position={[0, 1.9, pz]}>
              <mesh material={ARCH_MATERIALS.teakWood}>
                <boxGeometry args={[1.8, 0.8, 0.04]} />
              </mesh>
              <mesh position={[0, 0.42, 0]} material={ARCH_MATERIALS.railingDark}>
                <boxGeometry args={[1.85, 0.05, 0.08]} />
              </mesh>
            </group>
          ))}

          {/* Natural Timber Open Gable Roof */}
          <group position={[0, 3.4, 0]}>
            <mesh position={[-0.6, 0.35, 0]} rotation={[0, 0, -0.6]} castShadow material={ARCH_MATERIALS.teakWood}>
              <boxGeometry args={[1.4, 0.06, 2.2]} />
            </mesh>
            <mesh position={[0.6, 0.35, 0]} rotation={[0, 0, 0.6]} castShadow material={ARCH_MATERIALS.teakWood}>
              <boxGeometry args={[1.4, 0.06, 2.2]} />
            </mesh>
          </group>

          {/* Stainless Steel Chute Slide with Safety Railings */}
          <group position={[1.9, 0.8, 0]} rotation={[0, 0, -0.58]}>
            {/* Slide Metallic Chute Bed */}
            <mesh castShadow material={ARCH_MATERIALS.carRim}>
              <boxGeometry args={[3.2, 0.05, 0.72]} />
            </mesh>
            {/* Left and Right Safety Flanges */}
            {[-0.36, 0.36].map((sz) => (
              <mesh key={`flange-${sz}`} position={[0, 0.12, sz]} material={ARCH_MATERIALS.carRim}>
                <boxGeometry args={[3.2, 0.22, 0.04]} />
              </mesh>
            ))}
          </group>

          {/* Timber Access Rung Ladder */}
          <group position={[-1.0, 0.7, 0]} rotation={[0, 0, 0.22]}>
            {[-0.4, 0.4].map((lz) => (
              <mesh key={`stringer-${lz}`} position={[0, 0, lz]} material={ARCH_MATERIALS.teakWood}>
                <boxGeometry args={[0.08, 1.7, 0.08]} />
              </mesh>
            ))}
            {[0.3, 0.6, 0.9, 1.2].map((ry) => (
              <mesh key={`rung-${ry}`} position={[0, ry - 0.75, 0]} material={ARCH_MATERIALS.carRim}>
                <cylinderGeometry args={[0.02, 0.02, 0.8, 8]} />
              </mesh>
            ))}
          </group>
        </group>

        {/* Natural Timber A-Frame Dual Swing Set */}
        <group position={[2.8, 0, -0.4]}>
          {/* A-Frame Left Legs */}
          <mesh position={[-2.1, 1.6, 0.6]} rotation={[0.26, 0, 0]} castShadow material={ARCH_MATERIALS.teakWood}>
            <cylinderGeometry args={[0.07, 0.08, 3.4, 10]} />
          </mesh>
          <mesh position={[-2.1, 1.6, -0.6]} rotation={[-0.26, 0, 0]} castShadow material={ARCH_MATERIALS.teakWood}>
            <cylinderGeometry args={[0.07, 0.08, 3.4, 10]} />
          </mesh>
          {/* A-Frame Right Legs */}
          <mesh position={[2.1, 1.6, 0.6]} rotation={[0.26, 0, 0]} castShadow material={ARCH_MATERIALS.teakWood}>
            <cylinderGeometry args={[0.07, 0.08, 3.4, 10]} />
          </mesh>
          <mesh position={[2.1, 1.6, -0.6]} rotation={[-0.26, 0, 0]} castShadow material={ARCH_MATERIALS.teakWood}>
            <cylinderGeometry args={[0.07, 0.08, 3.4, 10]} />
          </mesh>
          {/* Heavy Timber Crossbar Beam */}
          <mesh position={[0, 3.2, 0]} rotation={[0, 0, Math.PI / 2]} castShadow material={ARCH_MATERIALS.teakWood}>
            <cylinderGeometry args={[0.09, 0.09, 4.6, 12]} />
          </mesh>
          {/* Dark Steel Connecting Brackets */}
          {[-2.1, 2.1].map((bx) => (
            <mesh key={`brk-${bx}`} position={[bx, 3.2, 0]} material={ARCH_MATERIALS.railingDark}>
              <boxGeometry args={[0.22, 0.22, 0.22]} />
            </mesh>
          ))}
          {/* Two Hanging Flexible Rubber Belt Swings */}
          {[-1.0, 1.0].map((swX) => (
            <group key={`sw-${swX}`} position={[swX, 0, 0]}>
              {/* Rubber Seat */}
              <mesh position={[0, 0.45, 0]} material={ARCH_MATERIALS.carTrim} castShadow>
                <boxGeometry args={[0.55, 0.04, 0.22]} />
              </mesh>
              {/* Steel Suspension Chains */}
              <mesh position={[-0.24, 1.8, 0]} material={ARCH_MATERIALS.carRim}>
                <cylinderGeometry args={[0.01, 0.01, 2.7, 6]} />
              </mesh>
              <mesh position={[0.24, 1.8, 0]} material={ARCH_MATERIALS.carRim}>
                <cylinderGeometry args={[0.01, 0.01, 2.7, 6]} />
              </mesh>
            </group>
          ))}
        </group>

        {/* Stepping Stumps Balance Path */}
        {[
          [-0.2, 0.8], [0.5, 1.4], [1.2, 0.9], [1.9, 1.5]
        ].map(([sx, sz], sIdx) => (
          <mesh key={`stump-${sIdx}`} position={[sx, 0.2, sz]} material={ARCH_MATERIALS.teakWood} castShadow>
            <cylinderGeometry args={[0.22, 0.24, 0.35, 12]} />
          </mesh>
        ))}
      </group>

      {/* =========================================================
          CHAMPIONSHIP TENNIS ARENA (East of Central Garden)
      ========================================================== */}
      <group position={[28, 0.05, 12]}>
        {/* Court Base Green Margin */}
        <mesh
          position={[0, 0.1, 0]}
          receiveShadow
          material={ARCH_MATERIALS.tennisGreen}
        >
          <boxGeometry args={[21, 0.2, 13]} />
        </mesh>
        {/* Inner Playing Surface */}
        <mesh
          position={[0, 0.22, 0]}
          receiveShadow
          material={ARCH_MATERIALS.tennisGreen}
        >
          <boxGeometry args={[17, 0.05, 10]} />
        </mesh>
        {/* White Court Lines */}
        <mesh position={[0, 0.26, 0]}>
          <boxGeometry args={[16.5, 0.01, 9.5]} />
          <meshBasicMaterial color="#ffffff" wireframe />
        </mesh>
        {/* Center Net & Posts */}
        <group position={[0, 0.72, 0]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.06, 0.85, 10.2]} />
            <meshStandardMaterial
              color="#e8e8e8"
              transparent
              opacity={0.75}
              roughness={0.9}
            />
          </mesh>
          <mesh position={[0, 0.42, 0]} material={ARCH_MATERIALS.slabEdge}>
            <boxGeometry args={[0.08, 0.06, 10.2]} />
          </mesh>
          <mesh position={[0, 0, 5.2]} material={ARCH_MATERIALS.railingDark}>
            <cylinderGeometry args={[0.07, 0.07, 1.25, 8]} />
          </mesh>
          <mesh position={[0, 0, -5.2]} material={ARCH_MATERIALS.railingDark}>
            <cylinderGeometry args={[0.07, 0.07, 1.25, 8]} />
          </mesh>
        </group>
        {/* Perimeter Mesh Fencing */}
        <mesh position={[0, 1.6, 6.5]}>
          <boxGeometry args={[21, 3.0, 0.05]} />
          <meshStandardMaterial color="#2d3748" wireframe />
        </mesh>
        <mesh position={[0, 1.6, -6.5]}>
          <boxGeometry args={[21, 3.0, 0.05]} />
          <meshStandardMaterial color="#2d3748" wireframe />
        </mesh>
        <mesh position={[10.5, 1.6, 0]}>
          <boxGeometry args={[0.05, 3.0, 13]} />
          <meshStandardMaterial color="#2d3748" wireframe />
        </mesh>
        <mesh position={[-10.5, 1.6, 0]}>
          <boxGeometry args={[0.05, 3.0, 13]} />
          <meshStandardMaterial color="#2d3748" wireframe />
        </mesh>
      </group>

      {/* =========================================================
          LUXURY CLUBHOUSE & SWIMMING POOL (South of Tennis Court)
      ========================================================== */}
      <group position={[28, 0.05, 32]}>
        {/* Clubhouse Paved Foundation Podium with Stepped Coping */}
        <mesh
          position={[0, 0.25, 0]}
          receiveShadow
          material={ARCH_MATERIALS.concretePaving}
        >
          <boxGeometry args={[19, 0.5, 18]} />
        </mesh>
        <mesh
          position={[0, 0.52, 0]}
          receiveShadow
          material={ARCH_MATERIALS.slabEdge}
        >
          <boxGeometry args={[19.4, 0.08, 18.4]} />
        </mesh>

        {/* Main 2-Level Architectural Pavilion Structure in Crisp Ivory & Sand */}
        <mesh
          position={[0, 3.2, -2.5]}
          castShadow
          receiveShadow
          material={ARCH_MATERIALS.wallIvory}
        >
          <boxGeometry args={[16.5, 5.4, 10.5]} />
        </mesh>

        {/* Champagne Bronze Vertical Architectural Louver Accents on Side Walls */}
        {[-8.3, 8.3].map((sideX) =>
          [-6, -4.5, -3, -1.5, 0].map((lz) => (
            <mesh
              key={`louv-${sideX}-${lz}`}
              position={[sideX, 3.2, lz]}
              material={ARCH_MATERIALS.wallAccent}
            >
              <boxGeometry args={[0.08, 4.8, 0.4]} />
            </mesh>
          ))
        )}

        {/* Cantilevered 2nd-Floor Architectural Roof Canopy */}
        <group position={[0, 6.0, 0]}>
          {/* Crisp White Fascia Band */}
          <mesh castShadow material={ARCH_MATERIALS.slabEdge}>
            <boxGeometry args={[18.6, 0.4, 16.5]} />
          </mesh>
          {/* Warm Teak Soffit Underside */}
          <mesh position={[0, -0.21, 0]} material={ARCH_MATERIALS.teakWood}>
            <boxGeometry args={[18.2, 0.04, 16.1]} />
          </mesh>
          {/* Canopy Recessed Warm Downlight Spots */}
          {[-5, 0, 5].map((sx, idx) => (
            <mesh key={`cs-${idx}`} position={[sx, -0.23, 4.5]}>
              <cylinderGeometry args={[0.15, 0.15, 0.02, 12]} />
              <meshStandardMaterial
                color="#fff6e5"
                emissive="#ffcc66"
                emissiveIntensity={isNight ? 2.5 : 0.6}
              />
            </mesh>
          ))}
        </group>

        {/* Double-Height Glass Curtain Wall Facade with Bronze Mullion Grid */}
        <group position={[0, 3.2, 2.78]}>
          {/* Reflective Architectural Glass Panes */}
          <mesh material={ARCH_MATERIALS.glassDay}>
            <boxGeometry args={[15.2, 5.0, 0.06]} />
          </mesh>
          {/* Perimeter Bronze Curtain Wall Frame */}
          <mesh material={ARCH_MATERIALS.windowFrame}>
            <boxGeometry args={[15.4, 5.1, 0.08]} />
          </mesh>
          {/* Vertical Architectural Mullions */}
          {[-5.4, -2.7, 0, 2.7, 5.4].map((mx, idx) => (
            <mesh key={`cm-${idx}`} position={[mx, 0, 0.02]} material={ARCH_MATERIALS.windowFrame}>
              <boxGeometry args={[0.1, 5.0, 0.1]} />
            </mesh>
          ))}
          {/* Horizontal Transom Bars */}
          {[-1.0, 1.4].map((ty, idx) => (
            <mesh key={`ct-${idx}`} position={[0, ty, 0.02]} material={ARCH_MATERIALS.windowFrame}>
              <boxGeometry args={[15.2, 0.08, 0.09]} />
            </mesh>
          ))}
          {/* Entrance Double Glass Doors Handles in Stainless Steel */}
          <mesh position={[-0.15, -0.7, 0.08]} material={ARCH_MATERIALS.carRim}>
            <cylinderGeometry args={[0.02, 0.02, 0.65, 8]} />
          </mesh>
          <mesh position={[0.15, -0.7, 0.08]} material={ARCH_MATERIALS.carRim}>
            <cylinderGeometry args={[0.02, 0.02, 0.65, 8]} />
          </mesh>
        </group>

        {/* Warm Interior Reception Lounge (visible through transparent glazing) */}
        <group position={[0, 1.2, 0]}>
          {/* Teak Wood Reception Counter */}
          <mesh position={[0, 0.55, 0.2]} material={ARCH_MATERIALS.teakWood} castShadow>
            <boxGeometry args={[4.2, 1.1, 1.2]} />
          </mesh>
          {/* Marble Reception Counter Top */}
          <mesh position={[0, 1.12, 0.2]} material={ARCH_MATERIALS.slabEdge}>
            <boxGeometry args={[4.4, 0.08, 1.3]} />
          </mesh>
          {/* Backlit Feature Wall Behind Counter */}
          <mesh position={[0, 1.8, -4.5]} material={ARCH_MATERIALS.wallAccent}>
            <boxGeometry args={[6.5, 3.2, 0.1]} />
          </mesh>
          {/* Warm Interior Lounge Ambient Downlights */}
          {[-3, 0, 3].map((ix, idx) => (
            <mesh key={`in-${idx}`} position={[ix, 3.6, -1.5]}>
              <sphereGeometry args={[0.18, 8, 8]} />
              <meshStandardMaterial
                color="#ffecc7"
                emissive="#ffbe53"
                emissiveIntensity={isNight ? 2.8 : 1.2}
              />
            </mesh>
          ))}
        </group>

        {/* Luxury Swimming Pool with Teak Deck & Loungers */}
        <group position={[0, 0.1, 9.8]}>
          {/* Extended Teak Pool Deck */}
          <mesh
            position={[0, 0.28, 0]}
            receiveShadow
            material={ARCH_MATERIALS.teakWood}
          >
            <boxGeometry args={[16.5, 0.44, 8.2]} />
          </mesh>
          {/* White Stone Coping Perimeter Border */}
          <mesh position={[0, 0.51, 0]} material={ARCH_MATERIALS.slabEdge}>
            <boxGeometry args={[12.4, 0.04, 5.8]} />
          </mesh>
          {/* Crystal Clear Swimming Pool Water (Physical Material with Sky Reflections) */}
          <mesh
            position={[0, 0.46, 0]}
            material={ARCH_MATERIALS.poolWater}
          >
            <boxGeometry args={[11.6, 0.08, 5.0]} />
          </mesh>
          {/* Shallow Tiled Pool Step Ledge */}
          <mesh position={[-5.0, 0.32, 0]} material={ARCH_MATERIALS.tennisBlue}>
            <boxGeometry args={[1.6, 0.2, 4.8]} />
          </mesh>
          {/* Stainless Steel Pool Access Ladders */}
          <group position={[5.4, 0.65, 1.8]}>
            {[-0.25, 0.25].map((lz) => (
              <mesh key={`pl-${lz}`} position={[0, 0, lz]} material={ARCH_MATERIALS.carRim}>
                <cylinderGeometry args={[0.02, 0.02, 0.9, 10]} />
              </mesh>
            ))}
            {[0.1, -0.15].map((ry) => (
              <mesh key={`pr-${ry}`} position={[0, ry, 0]} rotation={[Math.PI / 2, 0, 0]} material={ARCH_MATERIALS.carRim}>
                <cylinderGeometry args={[0.015, 0.015, 0.5, 8]} />
              </mesh>
            ))}
          </group>

          {/* 4 Sun Loungers with Parasols */}
          <SunLoungerWithParasol position={[-5.8, 0.52, 0]} rotationY={Math.PI / 2} />
          <SunLoungerWithParasol position={[5.8, 0.52, 0]} rotationY={-Math.PI / 2} />
          <SunLoungerWithParasol position={[-2.4, 0.52, 3.2]} rotationY={0} />
          <SunLoungerWithParasol position={[2.4, 0.52, 3.2]} rotationY={0} />

          {/* Frameless Glass Pool Railing on Lawn Side */}
          <group position={[0, 0.95, 3.9]}>
            <mesh material={ARCH_MATERIALS.balconyGlass}>
              <boxGeometry args={[16.2, 0.9, 0.04]} />
            </mesh>
            <mesh position={[0, 0.46, 0]} material={ARCH_MATERIALS.railingDark}>
              <boxGeometry args={[16.3, 0.04, 0.06]} />
            </mesh>
            {[-7.8, -3.9, 0, 3.9, 7.8].map((px, idx) => (
              <mesh key={`p-post-${idx}`} position={[px, 0, 0]} material={ARCH_MATERIALS.railingDark}>
                <cylinderGeometry args={[0.02, 0.02, 0.92, 8]} />
              </mesh>
            ))}
          </group>
        </group>
      </group>

      {/* =========================================================
          DUAL ENTRANCE & EXIT PORTALS (Matching Reference Masterplan)
      ========================================================== */}
      {/* 1. Main Monumental Entrance Portal (Left) */}
      <group position={[-14, 0.05, 48]}>
        <group position={[0, 3.6, 0]}>
          {/* Monumental Top Canopy Cantilever Beam in Champagne/Sand */}
          <mesh
            position={[0, 1.9, 0]}
            castShadow
            material={ARCH_MATERIALS.wallSand}
          >
            <boxGeometry args={[22, 1.4, 4.8]} />
          </mesh>
          {/* Left Support Portal Pier */}
          <mesh
            position={[-10.4, -0.6, 0]}
            castShadow
            material={ARCH_MATERIALS.wallSand}
          >
            <boxGeometry args={[1.8, 5.0, 4.6]} />
          </mesh>
          {/* Right Support Pier */}
          <mesh
            position={[10.4, -0.6, 0]}
            castShadow
            material={ARCH_MATERIALS.wallSand}
          >
            <boxGeometry args={[1.8, 5.0, 4.6]} />
          </mesh>
          {/* Security Guardhouse Cabin with Warm Lighting */}
          <group position={[-4.5, -1.8, 0]}>
            <mesh
              castShadow
              receiveShadow
              material={ARCH_MATERIALS.wallIvory}
            >
              <boxGeometry args={[3.2, 2.9, 3.6]} />
            </mesh>
            <mesh
              position={[0, 0, 1.82]}
              material={ARCH_MATERIALS.glassLit}
            >
              <boxGeometry args={[2.4, 1.7, 0.08]} />
            </mesh>
          </group>
        </group>

        {/* RFID Automated Boom Barriers */}
        <group position={[2.5, 0.65, 0]}>
          <mesh position={[-2.4, 0, 0]} rotation={[0, 0, -0.04]}>
            <boxGeometry args={[4.2, 0.1, 0.1]} />
            <meshStandardMaterial color="#c53030" roughness={0.3} />
          </mesh>
          <mesh position={[3.4, 0, 0]} rotation={[0, 0, 0.04]}>
            <boxGeometry args={[4.2, 0.1, 0.1]} />
            <meshStandardMaterial color="#c53030" roughness={0.3} />
          </mesh>
        </group>
      </group>

      {/* 2. Secondary Dedicated Exit Portal (Right) */}
      <group position={[18, 0.05, 48]}>
        <group position={[0, 3.6, 0]}>
          <mesh
            position={[0, 1.9, 0]}
            castShadow
            material={ARCH_MATERIALS.wallSand}
          >
            <boxGeometry args={[14, 1.4, 4.8]} />
          </mesh>
          <mesh
            position={[-6.4, -0.6, 0]}
            castShadow
            material={ARCH_MATERIALS.wallSand}
          >
            <boxGeometry args={[1.6, 5.0, 4.6]} />
          </mesh>
          <mesh
            position={[6.4, -0.6, 0]}
            castShadow
            material={ARCH_MATERIALS.wallSand}
          >
            <boxGeometry args={[1.6, 5.0, 4.6]} />
          </mesh>
        </group>
        <group position={[0, 0.65, 0]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[4.2, 0.1, 0.1]} />
            <meshStandardMaterial color="#c53030" roughness={0.3} />
          </mesh>
        </group>
      </group>

      {/* =========================================================
          PERIMETER BOUNDARY WALLS & MODERN ARCHITECTURAL PIERS
      ========================================================== */}
      <mesh
        position={[0, 1.3, 54]}
        castShadow
        material={ARCH_MATERIALS.wallSand}
      >
        <boxGeometry args={[184, 2.6, 0.65]} />
      </mesh>
      <mesh
        position={[0, 1.3, -62]}
        castShadow
        material={ARCH_MATERIALS.wallSand}
      >
        <boxGeometry args={[184, 2.6, 0.65]} />
      </mesh>
      <mesh
        position={[-82, 1.3, -4]}
        castShadow
        material={ARCH_MATERIALS.wallSand}
      >
        <boxGeometry args={[0.65, 2.6, 122]} />
      </mesh>
      <mesh
        position={[82, 1.3, -4]}
        castShadow
        material={ARCH_MATERIALS.wallSand}
      >
        <boxGeometry args={[0.65, 2.6, 122]} />
      </mesh>
    </group>
  );
}
