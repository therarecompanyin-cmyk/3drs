import React, { useMemo, Suspense } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { ARCH_MATERIALS } from './materials';

// Preload genuine Poly Haven 3D models for instantaneous rendering
useGLTF.preload('/models/lamp/street_lamp_01_1k.gltf');
useGLTF.preload('/models/bush/wild_rooibos_bush_1k.gltf');
useGLTF.preload('/models/fern/fern_02_1k.gltf');
useGLTF.preload('/models/calathea/calathea_orbifolia_01_1k.gltf');

// 1. Scanned Poly Haven Wild Bush Model
export function PolyHavenBush({ scale = 1.3, rotationY = 0, position = [0, 0, 0] }) {
  const { scene } = useGLTF('/models/bush/wild_rooibos_bush_1k.gltf');
  const clone = useMemo(() => {
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
      scale={[scale, scale, scale]}
    />
  );
}

// 2. Scanned Poly Haven Forest Fern Model
export function PolyHavenFern({ scale = 1.0, rotationY = 0, position = [0, 0, 0] }) {
  const { scene } = useGLTF('/models/fern/fern_02_1k.gltf');
  const clone = useMemo(() => {
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
      scale={[scale, scale, scale]}
    />
  );
}

// 3. Scanned Poly Haven Calathea Tropical Plant Model
export function PolyHavenCalathea({ scale = 1.0, rotationY = 0, position = [0, 0, 0] }) {
  const { scene } = useGLTF('/models/calathea/calathea_orbifolia_01_1k.gltf');
  const clone = useMemo(() => {
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
      scale={[scale, scale, scale]}
    />
  );
}

// 4. Realistic Royal Date Palm (Phoenix Dactylifera) with feathery pinnate fronds
export function RealisticPalm({ position, scale = 1, rotationY = 0, leanAngle = 0.04 }) {
  const frondCount = 24;

  const fronds = useMemo(() => {
    return Array.from({ length: frondCount }).map((_, i) => {
      const angle = (i * Math.PI * 2) / frondCount;
      const tier = i % 3;
      const tilt = tier === 0 ? 0.96 : tier === 1 ? 0.68 : 0.42;
      const frondLen = 4.8 + (i % 4) * 0.35;
      const frondWidth = 1.45;
      return { angle, tilt, frondLen, frondWidth, key: i };
    });
  }, []);

  return (
    <group position={position} scale={[scale, scale, scale]} rotation={[0, rotationY, leanAngle]}>
      {/* Tapered Segmented Fibrous Trunk */}
      <mesh position={[0, 4.4, 0]} castShadow receiveShadow material={ARCH_MATERIALS.palmTrunk}>
        <cylinderGeometry args={[0.24, 0.44, 8.8, 12]} />
      </mesh>
      {/* Flared Buttress Base */}
      <mesh position={[0, 0.45, 0]} receiveShadow material={ARCH_MATERIALS.palmTrunk}>
        <cylinderGeometry args={[0.44, 0.7, 0.9, 12]} />
      </mesh>
      {/* Crown Shaft (Smooth olive neck below fronds) */}
      <mesh position={[0, 8.9, 0]} material={ARCH_MATERIALS.hedgeBoxwood}>
        <cylinderGeometry args={[0.27, 0.24, 0.85, 10]} />
      </mesh>

      {/* Cluster of Coconuts / Dates under crown */}
      {[
        [-0.18, 8.6, -0.18], [0.18, 8.6, -0.18],
        [-0.18, 8.6, 0.18], [0.18, 8.6, 0.18],
        [0, 8.55, -0.24], [0, 8.55, 0.24],
      ].map(([x, y, z], idx) => (
        <mesh key={idx} position={[x, y, z]} material={ARCH_MATERIALS.teakWood} castShadow>
          <sphereGeometry args={[0.15, 8, 8]} />
        </mesh>
      ))}

      {/* Radiating Arched Feathery Fronds with Botanical Pinnate Leaflets */}
      <group position={[0, 9.1, 0]}>
        {fronds.map((f) => (
          <group key={f.key} rotation={[0, f.angle, 0]}>
            <group rotation={[f.tilt, 0, 0]}>
              {/* Segment 1: Base Arch */}
              <mesh
                position={[0, 0, f.frondLen * 0.25]}
                material={ARCH_MATERIALS.palmFrondCard}
                castShadow
              >
                <planeGeometry args={[f.frondWidth, f.frondLen * 0.52]} />
              </mesh>
              {/* Segment 2: Drooping Tip */}
              <group position={[0, -0.16, f.frondLen * 0.5]} rotation={[0.38, 0, 0]}>
                <mesh
                  position={[0, 0, f.frondLen * 0.25]}
                  material={ARCH_MATERIALS.palmFrondCard}
                  castShadow
                >
                  <planeGeometry args={[f.frondWidth * 0.85, f.frondLen * 0.52]} />
                </mesh>
              </group>
            </group>
          </group>
        ))}
      </group>
    </group>
  );
}

// 5. Grand Canopy Shade Tree (Broadleaf Ficus / Banyan / Rain Tree)
export function GrandCanopyTree({ position, scale = 1, rotationY = 0, variant = 0 }) {
  const trunkHeight = 4.2 * scale;

  // 6 Primary boughs radiating outward at natural arching angles
  const boughs = useMemo(() => [
    { pos: [1.1, 2.6, 0.6], rot: [0.38, 0.3, -0.55], len: 3.4, w: 0.28 },
    { pos: [-1.2, 2.7, -0.5], rot: [-0.3, 0.5, 0.6], len: 3.5, w: 0.26 },
    { pos: [0.3, 3.0, -1.2], rot: [-0.62, -0.2, 0.2], len: 3.3, w: 0.25 },
    { pos: [-0.4, 2.9, 1.1], rot: [0.55, -0.4, -0.2], len: 3.2, w: 0.24 },
    { pos: [0, 3.4, 0], rot: [0.08, 0.1, 0.08], len: 3.0, w: 0.26 },
  ], []);

  // 12 Dense foliage canopy clusters forming a continuous, volumetric shade umbrella
  const foliageClusters = useMemo(() => [
    { pos: [0, trunkHeight + 3.2, 0], r: 3.2, h: 2.4 },
    { pos: [2.5, trunkHeight + 2.4, 1.2], r: 2.8, h: 2.0 },
    { pos: [-2.6, trunkHeight + 2.5, -1.0], r: 2.9, h: 2.1 },
    { pos: [0.8, trunkHeight + 2.6, -2.6], r: 2.7, h: 1.9 },
    { pos: [-1.0, trunkHeight + 2.4, 2.4], r: 2.7, h: 1.9 },
    { pos: [2.0, trunkHeight + 1.8, -1.8], r: 2.5, h: 1.8 },
    { pos: [-2.0, trunkHeight + 1.7, 1.8], r: 2.5, h: 1.8 },
    { pos: [0, trunkHeight + 4.2, 0], r: 2.4, h: 1.8 },
  ], [trunkHeight]);

  return (
    <group position={position} scale={[scale, scale, scale]} rotation={[0, rotationY, 0]}>
      {/* Main Rugged Tapering Trunk */}
      <mesh position={[0, trunkHeight / 2, 0]} castShadow receiveShadow material={ARCH_MATERIALS.treeBark}>
        <cylinderGeometry args={[0.34, 0.62, trunkHeight, 12]} />
      </mesh>
      {/* Buttress Root Flare */}
      <mesh position={[0, 0.35, 0]} receiveShadow material={ARCH_MATERIALS.treeBark}>
        <cylinderGeometry args={[0.62, 1.05, 0.7, 12]} />
      </mesh>

      {/* Spreading Major Boughs */}
      {boughs.map((b, idx) => (
        <mesh
          key={`bough-${idx}`}
          position={b.pos}
          rotation={b.rot}
          castShadow
          material={ARCH_MATERIALS.treeBark}
        >
          <cylinderGeometry args={[b.w * 0.6, b.w, b.len, 8]} />
        </mesh>
      ))}

      {/* Dense Volumetric Foliage Canopy Masses (Self-shadowing organic volumes) */}
      {foliageClusters.map((fc, idx) => (
        <group key={`cluster-${idx}`} position={fc.pos}>
          {/* Inner Dense Mass */}
          <mesh castShadow receiveShadow material={ARCH_MATERIALS.foliageCanopy}>
            <sphereGeometry args={[fc.r * 0.85, 12, 10]} />
          </mesh>
          {/* Outer Botanical Crossing Leaf Quads (Braking Silhouette Organically) */}
          <mesh rotation={[0.4, idx * 0.8, 0]} material={ARCH_MATERIALS.foliageCard} castShadow>
            <planeGeometry args={[fc.r * 1.8, fc.h * 1.5]} />
          </mesh>
          <mesh rotation={[-0.3, idx * 0.8 + Math.PI / 2, 0.2]} material={ARCH_MATERIALS.foliageCard} castShadow>
            <planeGeometry args={[fc.r * 1.8, fc.h * 1.5]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// 6. Columnar Evergreen Cypress / Ash Tree (Tall, slender upright architectural tree)
export function ColumnarCypressTree({ position, scale = 1, rotationY = 0 }) {
  const treeHeight = 11.0 * scale;

  return (
    <group position={position} scale={[scale, scale, scale]} rotation={[0, rotationY, 0]}>
      {/* Slender Straight Trunk */}
      <mesh position={[0, 2.0, 0]} castShadow receiveShadow material={ARCH_MATERIALS.treeBark}>
        <cylinderGeometry args={[0.18, 0.3, 4.0, 10]} />
      </mesh>

      {/* 5 Tiered Conical/Ovoid Dense Evergreen Foliage Volumes */}
      {[
        { y: 3.4, r: 1.6, h: 3.2 },
        { y: 5.4, r: 1.7, h: 3.4 },
        { y: 7.4, r: 1.5, h: 3.2 },
        { y: 9.2, r: 1.2, h: 2.8 },
        { y: 10.6, r: 0.7, h: 2.2 },
      ].map((tier, idx) => (
        <group key={`cyp-${idx}`} position={[0, tier.y, 0]}>
          <mesh castShadow receiveShadow material={ARCH_MATERIALS.hedgeBoxwood}>
            <cylinderGeometry args={[tier.r * 0.65, tier.r, tier.h, 12]} />
          </mesh>
          {/* Crossing Cypress Needle Sprays */}
          <mesh rotation={[0, idx * 1.1, 0]} material={ARCH_MATERIALS.cypressFoliage} castShadow>
            <planeGeometry args={[tier.r * 2.1, tier.h * 1.1]} />
          </mesh>
          <mesh rotation={[0, idx * 1.1 + Math.PI / 2, 0]} material={ARCH_MATERIALS.cypressFoliage} castShadow>
            <planeGeometry args={[tier.r * 2.1, tier.h * 1.1]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// 7. Flowering Ornamental Accent Tree (Gulmohar / Jacaranda with rich violet-purple blossoms)
export function FloweringJacarandaTree({ position, scale = 1, rotationY = 0 }) {
  const trunkHeight = 3.6 * scale;

  const clusters = useMemo(() => [
    { pos: [0, trunkHeight + 2.6, 0], r: 2.6, h: 2.0 },
    { pos: [2.0, trunkHeight + 1.8, 0.9], r: 2.2, h: 1.7 },
    { pos: [-2.1, trunkHeight + 1.9, -0.8], r: 2.3, h: 1.8 },
    { pos: [0.6, trunkHeight + 2.0, -2.1], r: 2.1, h: 1.6 },
    { pos: [-0.8, trunkHeight + 1.8, 1.9], r: 2.1, h: 1.6 },
  ], [trunkHeight]);

  return (
    <group position={position} scale={[scale, scale, scale]} rotation={[0, rotationY, 0]}>
      {/* Tapered Spreading Trunk */}
      <mesh position={[0, trunkHeight / 2, 0]} castShadow receiveShadow material={ARCH_MATERIALS.treeBark}>
        <cylinderGeometry args={[0.26, 0.48, trunkHeight, 10]} />
      </mesh>
      {/* Root flare */}
      <mesh position={[0, 0.3, 0]} receiveShadow material={ARCH_MATERIALS.treeBark}>
        <cylinderGeometry args={[0.48, 0.75, 0.6, 10]} />
      </mesh>

      {/* Spreading Limbs */}
      <group position={[0, trunkHeight * 0.8, 0]}>
        <mesh position={[0.8, 0.7, 0.4]} rotation={[0.4, 0.2, -0.55]} castShadow material={ARCH_MATERIALS.treeBark}>
          <cylinderGeometry args={[0.13, 0.22, 2.2, 8]} />
        </mesh>
        <mesh position={[-0.8, 0.8, -0.3]} rotation={[-0.3, 0.4, 0.6]} castShadow material={ARCH_MATERIALS.treeBark}>
          <cylinderGeometry args={[0.13, 0.21, 2.3, 8]} />
        </mesh>
        <mesh position={[0.2, 0.9, -0.8]} rotation={[-0.55, -0.15, 0.2]} castShadow material={ARCH_MATERIALS.treeBark}>
          <cylinderGeometry args={[0.12, 0.2, 2.2, 8]} />
        </mesh>
        <mesh position={[-0.2, 0.8, 0.7]} rotation={[0.5, -0.3, -0.2]} castShadow material={ARCH_MATERIALS.treeBark}>
          <cylinderGeometry args={[0.12, 0.2, 2.1, 8]} />
        </mesh>
      </group>

      {/* Blossoming Floral Canopy Clusters */}
      {clusters.map((c, idx) => (
        <group key={`jac-${idx}`} position={c.pos}>
          <mesh castShadow receiveShadow material={ARCH_MATERIALS.floralMagenta}>
            <sphereGeometry args={[c.r * 0.85, 12, 10]} />
          </mesh>
          <mesh rotation={[0.3, idx * 0.9, 0]} material={ARCH_MATERIALS.floralJacaranda} castShadow>
            <planeGeometry args={[c.r * 1.9, c.h * 1.5]} />
          </mesh>
          <mesh rotation={[-0.3, idx * 0.9 + Math.PI / 2, 0.2]} material={ARCH_MATERIALS.floralJacaranda} castShadow>
            <planeGeometry args={[c.r * 1.9, c.h * 1.5]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// Backward compatible RealisticShadeTree calling GrandCanopyTree
export function RealisticShadeTree(props) {
  if (props.variant === 1) {
    return <ColumnarCypressTree {...props} />;
  }
  if (props.variant === 2) {
    return <FloweringJacarandaTree {...props} />;
  }
  return <GrandCanopyTree {...props} />;
}

// Master Palm Trees Arrangement
export function InstancedPalms() {
  const palmPositions = useMemo(() => {
    const list = [];
    // Entrance grand boulevard avenue (both sides of main and exit roads)
    for (let z = 44; z <= 64; z += 4.5) {
      list.push({ pos: [-23, 0, z], scale: 1.1 + (z % 3) * 0.1, rot: z * 0.4, lean: 0.04 });
      list.push({ pos: [-5, 0, z], scale: 1.1 + (z % 2) * 0.12, rot: -z * 0.4, lean: -0.04 });
      list.push({ pos: [10, 0, z], scale: 1.05 + (z % 3) * 0.1, rot: z * 0.3, lean: 0.03 });
      list.push({ pos: [26, 0, z], scale: 1.1, rot: -z * 0.3, lean: -0.03 });
    }
    // Perimeter ring around central park contoured track
    const count = 18;
    for (let i = 0; i < count; i++) {
      const angle = (i * Math.PI * 2) / count;
      const rx = 24.5 * Math.cos(angle);
      const rz = 21 * Math.sin(angle) + 2;
      list.push({
        pos: [rx, 0, rz],
        scale: 0.95 + (i % 3) * 0.12,
        rot: angle + Math.PI / 2,
        lean: 0.04,
      });
    }
    // Palms near clubhouse and sports court
    list.push({ pos: [40, 0, 14], scale: 1.15, rot: 0.8, lean: 0.06 });
    list.push({ pos: [40, 0, 32], scale: 1.1, rot: 1.4, lean: -0.05 });
    list.push({ pos: [16, 0, 24], scale: 1.2, rot: 2.1, lean: 0.04 });
    list.push({ pos: [16, 0, 38], scale: 1.15, rot: 2.8, lean: -0.04 });
    return list;
  }, []);

  return (
    <group>
      {palmPositions.map((p, idx) => (
        <RealisticPalm
          key={idx}
          position={p.pos}
          scale={p.scale}
          rotationY={p.rot}
          leanAngle={p.lean}
        />
      ))}
    </group>
  );
}

// Master Varied Shade Trees & Garden Plantings Arrangement
export function InstancedShadeTrees() {
  const trees = useMemo(() => [
    // Grand Canopy Trees in Central Park & Complex Corners
    { type: 'canopy', pos: [-12, 0, 8], scale: 1.15, rot: 0.4 },
    { type: 'canopy', pos: [12, 0, 6], scale: 1.18, rot: 1.2 },
    { type: 'canopy', pos: [-28, 0, 10], scale: 1.22, rot: 2.1 },
    { type: 'canopy', pos: [28, 0, -2], scale: 1.25, rot: 0.8 },
    { type: 'canopy', pos: [-32, 0, -28], scale: 1.3, rot: 1.5 },
    { type: 'canopy', pos: [32, 0, -28], scale: 1.3, rot: 2.4 },

    // Blooming Jacarandas / Gulmohars (Rich purple/magenta floral color)
    { type: 'jacaranda', pos: [-6, 0, -4], scale: 1.05, rot: 0.9 },
    { type: 'jacaranda', pos: [7, 0, -6], scale: 1.1, rot: 2.2 },
    { type: 'jacaranda', pos: [-18, 0, 16], scale: 1.12, rot: 1.7 },
    { type: 'jacaranda', pos: [18, 0, 14], scale: 1.15, rot: 3.1 },
    { type: 'jacaranda', pos: [0, 0, -14], scale: 1.05, rot: 0.5 },

    // Columnar Cypress Trees (Upright architectural accents lining avenues)
    { type: 'cypress', pos: [-34, 0, 36], scale: 1.1, rot: 0 },
    { type: 'cypress', pos: [-34, 0, 48], scale: 1.15, rot: 0.5 },
    { type: 'cypress', pos: [34, 0, 36], scale: 1.1, rot: 0.8 },
    { type: 'cypress', pos: [34, 0, 48], scale: 1.15, rot: 1.2 },
    { type: 'cypress', pos: [-42, 0, 12], scale: 1.2, rot: 0.3 },
    { type: 'cypress', pos: [42, 0, 2], scale: 1.2, rot: 1.4 },
    { type: 'cypress', pos: [-16, 0, -32], scale: 1.25, rot: 2.0 },
    { type: 'cypress', pos: [16, 0, -32], scale: 1.25, rot: 2.8 },
  ], []);

  // Scanned Poly Haven Fern clusters around tree bases
  const fernBases = useMemo(() => [
    [-12, 8], [12, 6], [-28, 10], [28, -2], [-6, -4], [7, -6]
  ], []);

  return (
    <group>
      {trees.map((t, idx) => {
        if (t.type === 'cypress') {
          return (
            <ColumnarCypressTree
              key={`tree-${idx}`}
              position={t.pos}
              scale={t.scale}
              rotationY={t.rot}
            />
          );
        }
        if (t.type === 'jacaranda') {
          return (
            <FloweringJacarandaTree
              key={`tree-${idx}`}
              position={t.pos}
              scale={t.scale}
              rotationY={t.rot}
            />
          );
        }
        return (
          <GrandCanopyTree
            key={`tree-${idx}`}
            position={t.pos}
            scale={t.scale}
            rotationY={t.rot}
          />
        );
      })}

      {/* Scanned Poly Haven Fern Clusters Under Majestic Shade Trees */}
      {fernBases.map(([fx, fz], idx) => (
        <group key={`fern-${idx}`}>
          <Suspense fallback={null}>
            <PolyHavenFern position={[fx + 1.2, 0, fz + 0.8]} scale={1.1} rotationY={0.6} />
            <PolyHavenFern position={[fx - 1.1, 0, fz - 0.7]} scale={0.9} rotationY={2.1} />
          </Suspense>
        </group>
      ))}
    </group>
  );
}

// Manicured Boxwood Hedges, Flower Islands & Scanned 3D Bushes
export function LandscapeHedges() {
  const hedges = useMemo(() => [
    // Entrance boulevard borders
    { pos: [-20, 0.4, 52], size: [1.2, 0.8, 16] },
    { pos: [0, 0.4, 52], size: [1.2, 0.8, 16] },
    // Crossroad borders
    { pos: [-24, 0.4, 43], size: [36, 0.75, 1.2] },
    { pos: [24, 0.4, 43], size: [36, 0.75, 1.2] },
    // Central lawn curb hedge segments
    { pos: [-18, 0.35, 26], size: [12, 0.7, 1.2] },
    { pos: [18, 0.35, 26], size: [12, 0.7, 1.2] },
    { pos: [0, 0.35, -17], size: [28, 0.7, 1.2] },
  ], []);

  // Real 3D Scanned Bush and Calathea Planting Island Coordinates
  const scannedPlantBeds = useMemo(() => [
    { pos: [-14, 0, 38], type: 'bush', s: 1.4 },
    { pos: [14, 0, 38], type: 'bush', s: 1.4 },
    { pos: [-24, 0, 22], type: 'bush', s: 1.5 },
    { pos: [30, 0, 12], type: 'bush', s: 1.5 },
    { pos: [-10, 0, 44], type: 'calathea', s: 1.2 },
    { pos: [10, 0, 44], type: 'calathea', s: 1.2 },
    { pos: [22, 0, 28], type: 'calathea', s: 1.3 },
    { pos: [-22, 0, 28], type: 'calathea', s: 1.3 },
  ], []);

  return (
    <group>
      {/* Boxwood Hedges */}
      {hedges.map((h, idx) => (
        <mesh
          key={idx}
          position={h.pos}
          castShadow
          receiveShadow
          material={ARCH_MATERIALS.hedgeBoxwood}
        >
          <boxGeometry args={h.size} />
        </mesh>
      ))}

      {/* Genuine 3D Scanned Poly Haven Plants in Garden Islands */}
      {scannedPlantBeds.map((sp, idx) => (
        <group key={`scanned-plant-${idx}`} position={sp.pos}>
          <Suspense fallback={null}>
            {sp.type === 'bush' ? (
              <PolyHavenBush scale={sp.s} rotationY={idx * 1.3} />
            ) : (
              <PolyHavenCalathea scale={sp.s} rotationY={idx * 0.9} />
            )}
          </Suspense>
        </group>
      ))}
    </group>
  );
}

// Genuine Poly Haven Architectural Street Lamp Model
function PolyHavenLamp({ position, isNight }) {
  const { scene } = useGLTF('/models/lamp/street_lamp_01_1k.gltf');
  const clone = useMemo(() => {
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
    <group position={position}>
      <primitive object={clone} scale={[1.15, 1.15, 1.15]} />
      {isNight && (
        <pointLight
          position={[0, 4.8, 0]}
          color="#ffcc66"
          intensity={25}
          distance={18}
          decay={2}
        />
      )}
    </group>
  );
}

// Procedural Fallback Lamp
function ProceduralLamp({ position, isNight }) {
  return (
    <group position={position}>
      <mesh
        position={[0, 2.2, 0]}
        castShadow
        material={ARCH_MATERIALS.railingDark}
      >
        <cylinderGeometry args={[0.06, 0.08, 4.4, 8]} />
      </mesh>
      <mesh
        position={[0.3, 4.4, 0]}
        material={ARCH_MATERIALS.railingDark}
      >
        <boxGeometry args={[0.7, 0.08, 0.12]} />
      </mesh>
      <mesh position={[0.55, 4.3, 0]}>
        <boxGeometry args={[0.25, 0.1, 0.15]} />
        <meshStandardMaterial
          color="#fff3d1"
          emissive={isNight ? '#ffcc66' : '#333333'}
          emissiveIntensity={isNight ? 2.8 : 0.2}
        />
      </mesh>
      {isNight && (
        <pointLight
          position={[0.55, 4.0, 0]}
          color="#ffcc66"
          intensity={28}
          distance={18}
          decay={2}
        />
      )}
    </group>
  );
}

// Modern Street & Pathway Light Poles
export function OutdoorLights({ isNight }) {
  const lampPositions = useMemo(() => [
    [-17, 56], [-3, 56], [-17, 46], [-3, 46],
    [-30, 38], [-15, 38], [0, 38], [15, 38], [30, 38],
    [-38, 2], [0, -18], [38, 2],
    [-16, 2], [16, 2], [0, 16], [0, -8],
    [-18, 26], [18, 26],
  ], []);

  return (
    <group>
      {lampPositions.map(([x, z], idx) => (
        <Suspense key={idx} fallback={<ProceduralLamp position={[x, 0, z]} isNight={isNight} />}>
          <PolyHavenLamp position={[x, 0, z]} isNight={isNight} />
        </Suspense>
      ))}
    </group>
  );
}

// Dense Natural Rolling Forest Canopy Belt Surrounding Masterplan Complex
export function PerimeterForestBelt() {
  const forestTrees = useMemo(() => {
    const list = [];
    // Rear North Forest (Behind Block B and complex)
    for (let x = -105; x <= 105; x += 13) {
      for (let z = -68; z >= -100; z -= 14) {
        const isCyp = Math.abs(x + z) % 3 === 0;
        list.push({
          type: isCyp ? 'cypress' : 'canopy',
          pos: [x + Math.sin(x) * 3, 0, z + Math.cos(z) * 3],
          scale: 1.25 + (Math.abs(x + z) % 4) * 0.1,
          rot: (x * 0.3) % (Math.PI * 2),
        });
      }
    }
    // West Forest Flank
    for (let z = -65; z <= 48; z += 14) {
      for (let x = -86; x >= -115; x -= 15) {
        list.push({
          type: Math.abs(z) % 2 === 0 ? 'cypress' : 'canopy',
          pos: [x, 0, z],
          scale: 1.3,
          rot: z * 0.4,
        });
      }
    }
    // East Forest Flank
    for (let z = -65; z <= 48; z += 14) {
      for (let x = 86; x <= 115; x += 15) {
        list.push({
          type: Math.abs(z) % 2 === 0 ? 'cypress' : 'canopy',
          pos: [x, 0, z],
          scale: 1.3,
          rot: -z * 0.4,
        });
      }
    }
    return list;
  }, []);

  return (
    <group>
      {forestTrees.map((t, idx) => (
        t.type === 'cypress' ? (
          <ColumnarCypressTree
            key={`forest-${idx}`}
            position={t.pos}
            scale={t.scale}
            rotationY={t.rot}
          />
        ) : (
          <GrandCanopyTree
            key={`forest-${idx}`}
            position={t.pos}
            scale={t.scale}
            rotationY={t.rot}
          />
        )
      ))}
    </group>
  );
}
