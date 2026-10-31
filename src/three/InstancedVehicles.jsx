import React, { useMemo, Suspense } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { ARCH_MATERIALS } from './materials';

useGLTF.preload('/models/car/ferrari.glb');

// Genuine 3D Ferrari Sports Car Model (Downloaded from Three.js official examples)
function FerrariCarModel({ position, rotation = [0, 0, 0], color = '#f8f8f8' }) {
  const { scene } = useGLTF('/models/car/ferrari.glb');
  const clone = useMemo(() => {
    const c = scene.clone(true);
    c.traverse((node) => {
      if (node.isMesh) {
        node.castShadow = true;
        node.receiveShadow = true;
        if (node.material && node.material.name === 'Body_Color') {
          node.material = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color(color),
            roughness: 0.12,
            metalness: 0.88,
            clearcoat: 1.0,
            clearcoatRoughness: 0.03,
          });
        }
      }
    });
    return c;
  }, [scene, color]);

  return (
    <group position={position} rotation={rotation}>
      <primitive
        object={clone}
        scale={[0.92, 0.92, 0.92]}
        position={[0, 0.02, 0]}
        rotation={[0, Math.PI / 2, 0]}
      />
    </group>
  );
}

// Detailed Architectural Wheel with Rubber Tire, 5-Spoke Alloy Rim & Rotor
function ArchitecturalWheel({ position, isRightSide = false, radius = 0.34, width = 0.22 }) {
  return (
    <group position={position} rotation={[0, 0, isRightSide ? -Math.PI / 2 : Math.PI / 2]}>
      {/* Outer Rubber Tire */}
      <mesh material={ARCH_MATERIALS.carTire} castShadow>
        <cylinderGeometry args={[radius, radius, width, 18]} />
      </mesh>
      {/* Outer Tire Sidewall Bevel */}
      <mesh position={[0, isRightSide ? 0.08 : -0.08, 0]} material={ARCH_MATERIALS.carTire}>
        <cylinderGeometry args={[radius * 0.94, radius * 0.98, width * 0.35, 18]} />
      </mesh>
      {/* Inner Metallic Alloy Wheel Rim Barrel */}
      <mesh position={[0, isRightSide ? 0.02 : -0.02, 0]} material={ARCH_MATERIALS.carRim}>
        <cylinderGeometry args={[radius * 0.72, radius * 0.72, width * 1.02, 16]} />
      </mesh>
      {/* 5-Spoke Alloy Star */}
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i * Math.PI * 2) / 5;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * (radius * 0.36), isRightSide ? width * 0.52 : -width * 0.52, Math.sin(angle) * (radius * 0.36)]}
            rotation={[0, -angle, 0]}
            material={ARCH_MATERIALS.carRim}
          >
            <boxGeometry args={[0.045, 0.015, radius * 0.65]} />
          </mesh>
        );
      })}
      {/* Center Hub Cap */}
      <mesh position={[0, isRightSide ? width * 0.53 : -width * 0.53, 0]} material={ARCH_MATERIALS.railingDark}>
        <cylinderGeometry args={[0.055, 0.055, 0.02, 12]} />
      </mesh>
      {/* Disc Brake Rotor */}
      <mesh position={[0, isRightSide ? -0.03 : 0.03, 0]} material={ARCH_MATERIALS.shaftDark}>
        <cylinderGeometry args={[radius * 0.55, radius * 0.55, 0.025, 14]} />
      </mesh>
    </group>
  );
}

// Sculpted Architectural Vehicle (Executive Sedan & Luxury SUV)
export function Vehicle({ position, rotation = [0, 0, 0], colorMaterial, type = 'sedan' }) {
  const isSUV = type === 'suv';

  // Proportions
  const length = isSUV ? 4.75 : 4.6;
  const width = isSUV ? 2.02 : 1.94;
  const wheelBase = isSUV ? 2.85 : 2.7;
  const wheelRadius = isSUV ? 0.37 : 0.34;
  const wheelWidth = isSUV ? 0.24 : 0.22;
  const track = width * 0.88;

  // Heights
  const groundClearance = isSUV ? 0.24 : 0.16;
  const beltlineY = groundClearance + (isSUV ? 0.82 : 0.68);
  const roofY = beltlineY + (isSUV ? 0.72 : 0.58);
  const cabinWidth = width * 0.84;

  return (
    <group position={position} rotation={rotation}>
      {/* 1. BLACK UNDERTRAY / CHASSIS ROCKER */}
      <mesh
        position={[0, groundClearance * 0.55, 0]}
        material={ARCH_MATERIALS.carTrim}
      >
        <boxGeometry args={[width * 0.84, groundClearance * 0.9, length * 0.94]} />
      </mesh>

      {/* 2. LOWER SCULPTED BODY (Hood, Fenders, Doors, Rear Deck) */}
      <group position={[0, groundClearance, 0]}>
        {/* Main lower body volume */}
        <mesh
          position={[0, (beltlineY - groundClearance) * 0.45, 0]}
          castShadow
          receiveShadow
          material={colorMaterial}
        >
          <boxGeometry args={[width, (beltlineY - groundClearance) * 0.9, length * 0.96]} />
        </mesh>

        {/* Sculpted Sloping Front Hood */}
        <mesh
          position={[0, (beltlineY - groundClearance) * 0.82, length * 0.26]}
          rotation={[-0.08, 0, 0]}
          castShadow
          material={colorMaterial}
        >
          <boxGeometry args={[width * 0.94, (beltlineY - groundClearance) * 0.32, length * 0.42]} />
        </mesh>

        {/* Front Nose & Radiator Grille */}
        <group position={[0, (beltlineY - groundClearance) * 0.48, length * 0.485]}>
          <mesh material={ARCH_MATERIALS.carTrim}>
            <boxGeometry args={[width * 0.65, 0.28, 0.04]} />
          </mesh>
          {/* Chrome Surround Bar */}
          <mesh position={[0, 0.12, 0.01]} material={ARCH_MATERIALS.carRim}>
            <boxGeometry args={[width * 0.68, 0.03, 0.03]} />
          </mesh>
          {/* Front License Plate */}
          <mesh position={[0, -0.16, 0.02]} material={ARCH_MATERIALS.roadMarking}>
            <boxGeometry args={[0.52, 0.12, 0.02]} />
          </mesh>
          <mesh position={[0, -0.16, 0.01]} material={ARCH_MATERIALS.railingDark}>
            <boxGeometry args={[0.54, 0.14, 0.01]} />
          </mesh>
        </group>

        {/* Angular Front LED Headlights */}
        {[-width * 0.38, width * 0.38].map((hx, idx) => (
          <group key={`hl-${idx}`} position={[hx, (beltlineY - groundClearance) * 0.65, length * 0.47]}>
            <mesh material={ARCH_MATERIALS.carHeadlight}>
              <boxGeometry args={[width * 0.2, 0.12, 0.06]} />
            </mesh>
            <mesh position={[0, 0, 0.03]} material={ARCH_MATERIALS.carGlass}>
              <boxGeometry args={[width * 0.21, 0.13, 0.02]} />
            </mesh>
          </group>
        ))}

        {/* Sculpted Rear Trunk Deck (Sedan) or Lower Hatch (SUV) */}
        {!isSUV ? (
          <mesh
            position={[0, (beltlineY - groundClearance) * 0.8, -length * 0.35]}
            rotation={[0.04, 0, 0]}
            castShadow
            material={colorMaterial}
          >
            <boxGeometry args={[width * 0.92, (beltlineY - groundClearance) * 0.35, length * 0.25]} />
          </mesh>
        ) : null}

        {/* Rear LED Taillight Bar */}
        <group position={[0, (beltlineY - groundClearance) * 0.68, -length * 0.485]}>
          <mesh material={ARCH_MATERIALS.carTaillight}>
            <boxGeometry args={[width * 0.88, 0.1, 0.04]} />
          </mesh>
          {/* Rear License Plate */}
          <mesh position={[0, -0.15, -0.01]} material={ARCH_MATERIALS.roadMarking}>
            <boxGeometry args={[0.52, 0.12, 0.02]} />
          </mesh>
        </group>

        {/* Dual Stainless Steel Exhaust Tips */}
        {[-width * 0.32, width * 0.32].map((ex, idx) => (
          <mesh
            key={`ex-${idx}`}
            position={[ex, 0.06, -length * 0.482]}
            rotation={[Math.PI / 2, 0, 0]}
            material={ARCH_MATERIALS.carRim}
          >
            <cylinderGeometry args={[0.045, 0.045, 0.08, 12]} />
          </mesh>
        ))}
      </group>

      {/* 3. GREENHOUSE / CABIN & ROOF (Tinted Physical Glass, Sloped Glass, Pillars) */}
      <group position={[0, beltlineY, 0]}>
        {/* Slanted Front Windshield (42 deg aerodynamic incline) */}
        <mesh
          position={[0, (roofY - beltlineY) * 0.46, isSUV ? 0.32 : 0.22]}
          rotation={[-0.68, 0, 0]}
          castShadow
          material={ARCH_MATERIALS.carGlass}
        >
          <boxGeometry args={[cabinWidth * 0.94, 0.04, (roofY - beltlineY) * 1.35]} />
        </mesh>

        {/* Slanted Windshield A-Pillars in body paint */}
        {[-cabinWidth * 0.47, cabinWidth * 0.47].map((px, idx) => (
          <mesh
            key={`ap-${idx}`}
            position={[px, (roofY - beltlineY) * 0.46, isSUV ? 0.32 : 0.22]}
            rotation={[-0.68, 0, 0]}
            material={colorMaterial}
          >
            <boxGeometry args={[0.07, 0.06, (roofY - beltlineY) * 1.36]} />
          </mesh>
        ))}

        {/* Cabin Roof Panel */}
        <mesh
          position={[0, roofY - beltlineY, isSUV ? -0.12 : -0.22]}
          castShadow
          material={colorMaterial}
        >
          <boxGeometry args={[cabinWidth * 0.92, 0.06, length * (isSUV ? 0.48 : 0.38)]} />
        </mesh>

        {/* Panoramic Tinted Glass Sunroof Inset */}
        <mesh
          position={[0, roofY - beltlineY + 0.035, isSUV ? -0.12 : -0.22]}
          material={ARCH_MATERIALS.carGlass}
        >
          <boxGeometry args={[cabinWidth * 0.72, 0.02, length * (isSUV ? 0.36 : 0.26)]} />
        </mesh>

        {/* Cabin Side Windows (Left & Right) */}
        <mesh
          position={[-cabinWidth * 0.47, (roofY - beltlineY) * 0.48, isSUV ? -0.12 : -0.22]}
          material={ARCH_MATERIALS.carGlass}
        >
          <boxGeometry args={[0.03, (roofY - beltlineY) * 0.9, length * (isSUV ? 0.48 : 0.38)]} />
        </mesh>
        <mesh
          position={[cabinWidth * 0.47, (roofY - beltlineY) * 0.48, isSUV ? -0.12 : -0.22]}
          material={ARCH_MATERIALS.carGlass}
        >
          <boxGeometry args={[0.03, (roofY - beltlineY) * 0.9, length * (isSUV ? 0.48 : 0.38)]} />
        </mesh>

        {/* Center B-Pillar divider */}
        {[-cabinWidth * 0.475, cabinWidth * 0.475].map((bx, idx) => (
          <mesh
            key={`bp-${idx}`}
            position={[bx, (roofY - beltlineY) * 0.48, isSUV ? -0.12 : -0.22]}
            material={ARCH_MATERIALS.carTrim}
          >
            <boxGeometry args={[0.04, (roofY - beltlineY) * 0.92, 0.08]} />
          </mesh>
        ))}

        {/* Slanted Rear Windshield */}
        <mesh
          position={[0, (roofY - beltlineY) * 0.48, isSUV ? -length * 0.37 : -length * 0.42]}
          rotation={[isSUV ? 0.32 : 0.72, 0, 0]}
          castShadow
          material={ARCH_MATERIALS.carGlass}
        >
          <boxGeometry args={[cabinWidth * 0.92, 0.04, (roofY - beltlineY) * (isSUV ? 1.05 : 1.35)]} />
        </mesh>

        {/* Rear C-Pillars */}
        {[-cabinWidth * 0.47, cabinWidth * 0.47].map((cx, idx) => (
          <mesh
            key={`cp-${idx}`}
            position={[cx, (roofY - beltlineY) * 0.48, isSUV ? -length * 0.37 : -length * 0.42]}
            rotation={[isSUV ? 0.32 : 0.72, 0, 0]}
            material={colorMaterial}
          >
            <boxGeometry args={[0.08, 0.06, (roofY - beltlineY) * (isSUV ? 1.06 : 1.36)]} />
          </mesh>
        ))}

        {/* SUV Roof Rails in Satin Silver */}
        {isSUV && (
          <>
            <mesh position={[-cabinWidth * 0.43, roofY - beltlineY + 0.07, -0.12]} material={ARCH_MATERIALS.carRim}>
              <boxGeometry args={[0.03, 0.04, length * 0.46]} />
            </mesh>
            <mesh position={[cabinWidth * 0.43, roofY - beltlineY + 0.07, -0.12]} material={ARCH_MATERIALS.carRim}>
              <boxGeometry args={[0.03, 0.04, length * 0.46]} />
            </mesh>
          </>
        )}

        {/* Aerodynamic Door-Mounted Side Mirrors */}
        {/* Left mirror */}
        <group position={[-cabinWidth * 0.52, 0.06, 0.32]}>
          <mesh position={[-0.08, 0, 0]} castShadow material={colorMaterial}>
            <boxGeometry args={[0.16, 0.09, 0.18]} />
          </mesh>
          <mesh position={[-0.08, 0, -0.095]} material={ARCH_MATERIALS.carRim}>
            <planeGeometry args={[0.14, 0.075]} />
          </mesh>
          <mesh position={[0, -0.02, 0]} rotation={[0, 0, 0.5]} material={ARCH_MATERIALS.carTrim}>
            <boxGeometry args={[0.08, 0.03, 0.04]} />
          </mesh>
        </group>
        {/* Right mirror */}
        <group position={[cabinWidth * 0.52, 0.06, 0.32]}>
          <mesh position={[0.08, 0, 0]} castShadow material={colorMaterial}>
            <boxGeometry args={[0.16, 0.09, 0.18]} />
          </mesh>
          <mesh position={[0.08, 0, -0.095]} rotation={[0, Math.PI, 0]} material={ARCH_MATERIALS.carRim}>
            <planeGeometry args={[0.14, 0.075]} />
          </mesh>
          <mesh position={[0, -0.02, 0]} rotation={[0, 0, -0.5]} material={ARCH_MATERIALS.carTrim}>
            <boxGeometry args={[0.08, 0.03, 0.04]} />
          </mesh>
        </group>
      </group>

      {/* 4. FOUR ARCHITECTURAL WHEELS WITH ALLOY RIMS */}
      {/* Front Left */}
      <ArchitecturalWheel
        position={[-track * 0.5, wheelRadius, wheelBase * 0.5]}
        isRightSide={false}
        radius={wheelRadius}
        width={wheelWidth}
      />
      {/* Front Right */}
      <ArchitecturalWheel
        position={[track * 0.5, wheelRadius, wheelBase * 0.5]}
        isRightSide={true}
        radius={wheelRadius}
        width={wheelWidth}
      />
      {/* Rear Left */}
      <ArchitecturalWheel
        position={[-track * 0.5, wheelRadius, -wheelBase * 0.5]}
        isRightSide={false}
        radius={wheelRadius}
        width={wheelWidth}
      />
      {/* Rear Right */}
      <ArchitecturalWheel
        position={[track * 0.5, wheelRadius, -wheelBase * 0.5]}
        isRightSide={true}
        radius={wheelRadius}
        width={wheelWidth}
      />
    </group>
  );
}

export default function InstancedVehicles() {
  const materials = [
    ARCH_MATERIALS.carWhite,
    ARCH_MATERIALS.carCharcoal,
    ARCH_MATERIALS.carSilver,
    ARCH_MATERIALS.carBlue,
    ARCH_MATERIALS.carRed,
  ];

  const parkedCars = useMemo(() => [
    // West Parking Bay (Facing Block A & West Entrance Road)
    { pos: [-58, 0, -18], rot: [0, Math.PI / 2, 0], mat: materials[0], colorHex: '#f8f8f8', type: 'ferrari' },
    { pos: [-58, 0, -14], rot: [0, Math.PI / 2, 0], mat: materials[1], type: 'suv' },
    { pos: [-58, 0, -10], rot: [0, Math.PI / 2, 0], mat: materials[2], type: 'sedan' },
    { pos: [-58, 0, -2], rot: [0, Math.PI / 2, 0], mat: materials[3], type: 'suv' },
    { pos: [-58, 0, 6], rot: [0, Math.PI / 2, 0], mat: materials[0], type: 'sedan' },
    { pos: [-58, 0, 14], rot: [0, Math.PI / 2, 0], mat: materials[4], colorHex: '#9e1f1f', type: 'ferrari' },
    { pos: [-58, 0, 18], rot: [0, Math.PI / 2, 0], mat: materials[2], type: 'sedan' },

    // East Parking Bay (Adjacent to Tennis Court & Block C)
    { pos: [58, 0, -12], rot: [0, -Math.PI / 2, 0], mat: materials[1], colorHex: '#1a1c20', type: 'ferrari' },
    { pos: [58, 0, -8], rot: [0, -Math.PI / 2, 0], mat: materials[0], type: 'suv' },
    { pos: [58, 0, 0], rot: [0, -Math.PI / 2, 0], mat: materials[3], type: 'sedan' },
    { pos: [58, 0, 4], rot: [0, -Math.PI / 2, 0], mat: materials[2], type: 'suv' },
    { pos: [58, 0, 12], rot: [0, -Math.PI / 2, 0], mat: materials[4], type: 'sedan' },

    // Boulevard & Porte-Cochere Drop-off Circulation
    { pos: [-10, 0, 46], rot: [0, 0, 0], mat: materials[0], type: 'suv' },
    { pos: [-38, 0, 6], rot: [0, 0.45, 0], mat: materials[4], colorHex: '#b21e1e', type: 'ferrari' },
    { pos: [38, 0, 6], rot: [0, -0.45, 0], mat: materials[1], type: 'suv' },
    { pos: [-50, 0, 64], rot: [0, Math.PI / 2, 0], mat: materials[3], type: 'sedan' },
    { pos: [10, 0, 64], rot: [0, Math.PI / 2, 0], mat: materials[0], type: 'suv' },
    { pos: [60, 0, 72], rot: [0, -Math.PI / 2, 0], mat: materials[3], colorHex: '#1f4878', type: 'ferrari' },
    { pos: [-20, 0, 72], rot: [0, -Math.PI / 2, 0], mat: materials[1], type: 'suv' },
  ], []);

  return (
    <group>
      {parkedCars.map((car, idx) => {
        if (car.type === 'ferrari') {
          return (
            <Suspense
              key={idx}
              fallback={
                <Vehicle
                  position={car.pos}
                  rotation={car.rot}
                  colorMaterial={car.mat}
                  type="sedan"
                />
              }
            >
              <FerrariCarModel
                position={car.pos}
                rotation={car.rot}
                color={car.colorHex || '#f8f8f8'}
              />
            </Suspense>
          );
        }

        return (
          <Vehicle
            key={idx}
            position={car.pos}
            rotation={car.rot}
            colorMaterial={car.mat}
            type={car.type}
          />
        );
      })}
    </group>
  );
}
