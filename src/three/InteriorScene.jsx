import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Materials for interior
const INT_MAT = {
  floorWood: new THREE.MeshStandardMaterial({
    color: '#d6b896',
    roughness: 0.45,
    metalness: 0.05,
  }),
  floorTileBath: new THREE.MeshStandardMaterial({
    color: '#e5e7eb',
    roughness: 0.25,
    metalness: 0.1,
  }),
  floorBalcony: new THREE.MeshStandardMaterial({
    color: '#8b6f4e',
    roughness: 0.7,
  }),
  wallCutaway: new THREE.MeshStandardMaterial({
    color: '#f4f1ea',
    roughness: 0.9,
  }),
  wallAccent: new THREE.MeshStandardMaterial({
    color: '#425b76',
    roughness: 0.85,
  }),
  sofaFabric: new THREE.MeshStandardMaterial({
    color: '#3f444e',
    roughness: 0.8,
  }),
  sofaCushion: new THREE.MeshStandardMaterial({
    color: '#c59b6d',
    roughness: 0.7,
  }),
  woodFurniture: new THREE.MeshStandardMaterial({
    color: '#5c4033',
    roughness: 0.5,
  }),
  lightWood: new THREE.MeshStandardMaterial({
    color: '#c2a688',
    roughness: 0.6,
  }),
  whiteCeramic: new THREE.MeshStandardMaterial({
    color: '#ffffff',
    roughness: 0.15,
    metalness: 0.1,
  }),
  kitchenCounter: new THREE.MeshStandardMaterial({
    color: '#262626',
    roughness: 0.2,
    metalness: 0.1,
  }),
  bedSheetsWhite: new THREE.MeshStandardMaterial({
    color: '#fafafa',
    roughness: 0.9,
  }),
  bedBlanketNavy: new THREE.MeshStandardMaterial({
    color: '#1e3a5f',
    roughness: 0.8,
  }),
  bedBlanketOlive: new THREE.MeshStandardMaterial({
    color: '#4a5d43',
    roughness: 0.8,
  }),
  glassShower: new THREE.MeshStandardMaterial({
    color: '#d0e6f7',
    roughness: 0.1,
    transparent: true,
    opacity: 0.4,
  }),
  metalChrome: new THREE.MeshStandardMaterial({
    color: '#e5e7eb',
    roughness: 0.15,
    metalness: 0.95,
  }),
  rug: new THREE.MeshStandardMaterial({
    color: '#c9bfa8',
    roughness: 0.95,
  }),
  screenTV: new THREE.MeshStandardMaterial({
    color: '#050505',
    roughness: 0.1,
    metalness: 0.8,
  }),
};

function CutawayApartment() {
  const wallH = 1.1;

  return (
    <group position={[0, 0, 0]}>
      {/* BASE FLOOR SLAB */}
      <mesh position={[-2.5, 0.05, 0]} receiveShadow material={INT_MAT.floorWood}>
        <boxGeometry args={[11, 0.1, 14]} />
      </mesh>
      <mesh position={[5.5, 0.05, 0]} receiveShadow material={INT_MAT.floorWood}>
        <boxGeometry args={[7, 0.1, 14]} />
      </mesh>
      <mesh position={[6.5, 0.06, -1.5]} receiveShadow material={INT_MAT.floorTileBath}>
        <boxGeometry args={[4.5, 0.11, 3]} />
      </mesh>
      <mesh position={[-5, 0.06, 8.2]} receiveShadow material={INT_MAT.floorBalcony}>
        <boxGeometry args={[6, 0.11, 2.4]} />
      </mesh>

      {/* EXTERIOR & INTERIOR PARTITION CUTAWAY WALLS */}
      <mesh position={[1, wallH / 2, -7.05]} castShadow material={INT_MAT.wallCutaway}>
        <boxGeometry args={[18.2, wallH, 0.25]} />
      </mesh>
      <mesh position={[5.5, wallH / 2, 7.05]} castShadow material={INT_MAT.wallCutaway}>
        <boxGeometry args={[7.2, wallH, 0.25]} />
      </mesh>
      <mesh position={[-0.5, wallH / 2, 7.05]} castShadow material={INT_MAT.wallCutaway}>
        <boxGeometry args={[3.0, wallH, 0.25]} />
      </mesh>
      <mesh position={[-8.05, wallH / 2, 0]} castShadow material={INT_MAT.wallCutaway}>
        <boxGeometry args={[0.25, wallH, 14.3]} />
      </mesh>
      <mesh position={[9.05, wallH / 2, 0]} castShadow material={INT_MAT.wallCutaway}>
        <boxGeometry args={[0.25, wallH, 14.3]} />
      </mesh>

      {/* Central Corridor Wall */}
      <mesh position={[2, wallH / 2, 0.5]} castShadow material={INT_MAT.wallCutaway}>
        <boxGeometry args={[0.22, wallH, 11]} />
      </mesh>

      {/* Kitchen Half-Wall */}
      <mesh position={[-4, wallH / 2, -3.2]} castShadow material={INT_MAT.wallCutaway}>
        <boxGeometry args={[7.8, wallH, 0.2]} />
      </mesh>

      {/* Bedroom Partitions */}
      <mesh position={[5.5, wallH / 2, 1.8]} castShadow material={INT_MAT.wallCutaway}>
        <boxGeometry args={[6.8, wallH, 0.2]} />
      </mesh>
      <mesh position={[4.2, wallH / 2, -3.8]} castShadow material={INT_MAT.wallCutaway}>
        <boxGeometry args={[0.2, wallH, 6.2]} />
      </mesh>

      {/* Balcony Railings */}
      <mesh position={[-5, 0.6, 9.4]} material={INT_MAT.glassShower}>
        <boxGeometry args={[6, 0.9, 0.05]} />
      </mesh>
      <mesh position={[-8, 0.6, 8.2]} material={INT_MAT.glassShower}>
        <boxGeometry args={[0.05, 0.9, 2.4]} />
      </mesh>
      <mesh position={[-2, 0.6, 8.2]} material={INT_MAT.glassShower}>
        <boxGeometry args={[0.05, 0.9, 2.4]} />
      </mesh>

      {/* LIVING ROOM */}
      <group position={[-3.5, 0.1, 2.5]}>
        <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow material={INT_MAT.rug}>
          <planeGeometry args={[4.8, 3.6]} />
        </mesh>
        <group position={[-0.8, 0, -0.6]}>
          <mesh position={[0, 0.3, 0]} castShadow material={INT_MAT.sofaFabric}>
            <boxGeometry args={[3.2, 0.45, 0.9]} />
          </mesh>
          <mesh position={[0, 0.65, -0.35]} castShadow material={INT_MAT.sofaFabric}>
            <boxGeometry args={[3.2, 0.5, 0.22]} />
          </mesh>
          <mesh position={[-1.2, 0.3, 1.0]} castShadow material={INT_MAT.sofaFabric}>
            <boxGeometry args={[0.85, 0.45, 1.3]} />
          </mesh>
          <mesh position={[-0.4, 0.6, -0.2]} material={INT_MAT.sofaCushion}>
            <boxGeometry args={[0.4, 0.3, 0.15]} />
          </mesh>
          <mesh position={[0.4, 0.6, -0.2]} material={INT_MAT.sofaCushion}>
            <boxGeometry args={[0.4, 0.3, 0.15]} />
          </mesh>
        </group>
        <mesh position={[0.2, 0.22, 0.2]} castShadow material={INT_MAT.woodFurniture}>
          <boxGeometry args={[1.4, 0.3, 0.8]} />
        </mesh>
        <mesh position={[1.85, 0.35, 0.2]} castShadow material={INT_MAT.woodFurniture}>
          <boxGeometry args={[0.4, 0.45, 2.6]} />
        </mesh>
        <mesh position={[1.92, 0.95, 0.2]} castShadow material={INT_MAT.screenTV}>
          <boxGeometry args={[0.08, 0.8, 1.8]} />
        </mesh>
      </group>

      {/* DINING AREA */}
      <group position={[-0.5, 0.1, -1.2]}>
        <mesh position={[0, 0.55, 0]} castShadow material={INT_MAT.woodFurniture}>
          <boxGeometry args={[1.4, 0.08, 2.2]} />
        </mesh>
        {[-0.6, 0.6].map((x) =>
          [-0.95, 0.95].map((z) => (
            <mesh key={`${x}-${z}`} position={[x, 0.27, z]} material={INT_MAT.metalChrome}>
              <cylinderGeometry args={[0.04, 0.04, 0.54, 8]} />
            </mesh>
          ))
        )}
        {[-0.7, 0.7].map((x, idx) =>
          [-0.6, 0, 0.6].map((z, idz) => (
            <group key={`${idx}-${idz}`} position={[x, 0, z]}>
              <mesh position={[0, 0.35, 0]} castShadow material={INT_MAT.sofaFabric}>
                <boxGeometry args={[0.38, 0.05, 0.38]} />
              </mesh>
              <mesh position={[x > 0 ? 0.16 : -0.16, 0.6, 0]} material={INT_MAT.sofaFabric}>
                <boxGeometry args={[0.05, 0.45, 0.38]} />
              </mesh>
            </group>
          ))
        )}
      </group>

      {/* KITCHEN */}
      <group position={[-5.4, 0.1, -5.2]}>
        <mesh position={[0, 0.45, 0]} castShadow material={INT_MAT.lightWood}>
          <boxGeometry args={[4.2, 0.85, 0.9]} />
        </mesh>
        <mesh position={[0, 0.88, 0]} castShadow material={INT_MAT.kitchenCounter}>
          <boxGeometry args={[4.25, 0.06, 0.95]} />
        </mesh>
        <mesh position={[-1.7, 0.45, 1.3]} castShadow material={INT_MAT.lightWood}>
          <boxGeometry args={[0.9, 0.85, 1.8]} />
        </mesh>
        <mesh position={[-1.7, 0.88, 1.3]} material={INT_MAT.kitchenCounter}>
          <boxGeometry args={[0.95, 0.06, 1.85]} />
        </mesh>
        <mesh position={[0.8, 0.92, 0]} material={INT_MAT.screenTV}>
          <boxGeometry args={[0.9, 0.02, 0.55]} />
        </mesh>
        <mesh position={[-0.8, 0.92, 0]} material={INT_MAT.metalChrome}>
          <boxGeometry args={[0.8, 0.02, 0.5]} />
        </mesh>
        <mesh position={[1.8, 0.95, 0]} castShadow material={INT_MAT.metalChrome}>
          <boxGeometry args={[0.85, 1.85, 0.85]} />
        </mesh>
      </group>

      {/* MASTER BEDROOM */}
      <group position={[5.8, 0.1, -4.8]}>
        <mesh position={[0, 0.25, 0]} castShadow material={INT_MAT.woodFurniture}>
          <boxGeometry args={[2.3, 0.4, 2.4]} />
        </mesh>
        <mesh position={[0, 0.48, 0]} castShadow material={INT_MAT.bedSheetsWhite}>
          <boxGeometry args={[2.1, 0.25, 2.2]} />
        </mesh>
        <mesh position={[0, 0.55, 0.4]} castShadow material={INT_MAT.bedBlanketNavy}>
          <boxGeometry args={[2.12, 0.14, 1.2]} />
        </mesh>
        <mesh position={[0, 0.85, -1.15]} castShadow material={INT_MAT.wallAccent}>
          <boxGeometry args={[2.3, 0.85, 0.15]} />
        </mesh>
        <mesh position={[-0.55, 0.65, -0.8]} material={INT_MAT.bedSheetsWhite}>
          <boxGeometry args={[0.65, 0.12, 0.4]} />
        </mesh>
        <mesh position={[0.55, 0.65, -0.8]} material={INT_MAT.bedSheetsWhite}>
          <boxGeometry args={[0.65, 0.12, 0.4]} />
        </mesh>
        {[-1.4, 1.4].map((x) => (
          <group key={x} position={[x, 0, -1.0]}>
            <mesh position={[0, 0.25, 0]} castShadow material={INT_MAT.woodFurniture}>
              <boxGeometry args={[0.55, 0.45, 0.5]} />
            </mesh>
            <mesh position={[0, 0.6, 0]} material={INT_MAT.whiteCeramic}>
              <cylinderGeometry args={[0.1, 0.15, 0.25, 12]} />
            </mesh>
          </group>
        ))}
        <mesh position={[2.8, 0.95, 0.8]} castShadow material={INT_MAT.lightWood}>
          <boxGeometry args={[0.6, 1.85, 2.4]} />
        </mesh>
      </group>

      {/* BEDROOM 2 */}
      <group position={[5.8, 0.1, 4.4]}>
        <mesh position={[0, 0.25, 0]} castShadow material={INT_MAT.woodFurniture}>
          <boxGeometry args={[1.9, 0.38, 2.2]} />
        </mesh>
        <mesh position={[0, 0.46, 0]} castShadow material={INT_MAT.bedSheetsWhite}>
          <boxGeometry args={[1.75, 0.24, 2.05]} />
        </mesh>
        <mesh position={[0, 0.52, 0.4]} material={INT_MAT.bedBlanketOlive}>
          <boxGeometry args={[1.76, 0.12, 1.1]} />
        </mesh>
        <group position={[-1.8, 0, -1.2]}>
          <mesh position={[0, 0.42, 0]} castShadow material={INT_MAT.lightWood}>
            <boxGeometry args={[1.3, 0.05, 0.6]} />
          </mesh>
          <mesh position={[0, 0.46, 0]} material={INT_MAT.metalChrome}>
            <boxGeometry args={[0.32, 0.02, 0.24]} />
          </mesh>
        </group>
        <mesh position={[2.8, 0.95, -0.6]} castShadow material={INT_MAT.lightWood}>
          <boxGeometry args={[0.6, 1.85, 2.0]} />
        </mesh>
      </group>

      {/* BATHROOM */}
      <group position={[2.9, 0.1, -1.6]}>
        <mesh position={[0, 0.42, 0]} castShadow material={INT_MAT.woodFurniture}>
          <boxGeometry args={[0.65, 0.8, 1.4]} />
        </mesh>
        <mesh position={[0, 0.84, 0]} material={INT_MAT.whiteCeramic}>
          <cylinderGeometry args={[0.22, 0.18, 0.14, 16]} />
        </mesh>
        <mesh position={[0, 0.7, -1.2]} material={INT_MAT.glassShower}>
          <boxGeometry args={[0.8, 1.4, 0.04]} />
        </mesh>
        <mesh position={[0, 0.35, 1.1]} castShadow material={INT_MAT.whiteCeramic}>
          <boxGeometry args={[0.42, 0.45, 0.58]} />
        </mesh>
      </group>

      {/* BALCONY */}
      <group position={[-5, 0.1, 8.2]}>
        {[-1.4, 1.4].map((x) => (
          <mesh key={x} position={[x, 0.32, 0]} castShadow material={INT_MAT.sofaFabric}>
            <boxGeometry args={[0.7, 0.5, 0.8]} />
          </mesh>
        ))}
        <mesh position={[0, 0.28, 0]} castShadow material={INT_MAT.metalChrome}>
          <cylinderGeometry args={[0.3, 0.3, 0.45, 16]} />
        </mesh>
      </group>
    </group>
  );
}

function InteriorCamera({ roomFocus }) {
  const controlsRef = useRef();

  useEffect(() => {
    if (!controlsRef.current) return;
    const targetMap = {
      all: { pos: [0, 16, 18], look: [0, 0, 0] },
      living: { pos: [-3, 7, 9], look: [-3.5, 0, 2.5] },
      dining: { pos: [-0.5, 7, 5], look: [-0.5, 0, -1.2] },
      kitchen: { pos: [-5, 7, 1], look: [-5.4, 0, -5.2] },
      masterBed: { pos: [5.8, 6.5, 1], look: [5.8, 0, -4.8] },
      bed2: { pos: [5.8, 6.5, 10], look: [5.8, 0, 4.4] },
      balcony: { pos: [-5, 5, 14], look: [-5, 0, 8.2] },
    };

    const dest = targetMap[roomFocus] || targetMap.all;
    controlsRef.current.object.position.set(dest.pos[0], dest.pos[1], dest.pos[2]);
    controlsRef.current.target.set(dest.look[0], dest.look[1], dest.look[2]);
    controlsRef.current.update();
  }, [roomFocus]);

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enableDamping
      dampingFactor={0.06}
      maxPolarAngle={Math.PI / 2 - 0.08}
      minDistance={4}
      maxDistance={35}
    />
  );
}

export default function InteriorScene({ roomFocus = 'all', apartmentData }) {
  return (
    <div className="w-full h-full relative">
      <Canvas
        shadows
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.15 }}
        camera={{ position: [0, 16, 18], fov: 38 }}
      >
        <color attach="background" args={['#13161c']} />
        <ambientLight color="#ffffff" intensity={0.75} />
        <directionalLight
          position={[12, 22, 16]}
          color="#fff6e8"
          intensity={1.8}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <directionalLight position={[-12, 15, -10]} color="#b4d5fe" intensity={0.6} />

        <CutawayApartment />
        <InteriorCamera roomFocus={roomFocus} />
      </Canvas>
    </div>
  );
}
