import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { Environment, Sky, Stars } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, SMAA } from '@react-three/postprocessing';
import { BUILDINGS_DATA } from '../data/buildings';
import Building from './Building';
import TowerBlockA from './TowerBlockA';
import Landscape from './Landscape';
import Roads from './Roads';
import { InstancedPalms, InstancedShadeTrees, LandscapeHedges, OutdoorLights, PerimeterForestBelt } from './InstancedTrees';
import InstancedVehicles from './InstancedVehicles';
import CameraController from './CameraController';

function ArchitecturalLighting({ timeOfDay }) {
  if (timeOfDay === 'night') {
    return (
      <>
        <color attach="background" args={['#080a10']} />
        <fog attach="fog" args={['#080a10', 140, 400]} />
        <ambientLight color="#1a2333" intensity={0.65} />
        {/* Soft cool moonlight */}
        <directionalLight
          position={[35, 80, 40]}
          color="#94b8e8"
          intensity={0.85}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={260}
          shadow-camera-left={-85}
          shadow-camera-right={85}
          shadow-camera-top={85}
          shadow-camera-bottom={-85}
          shadow-bias={-0.0001}
        />
        <Stars radius={180} depth={50} count={3500} factor={4} saturation={0} fade speed={1} />
      </>
    );
  }

  if (timeOfDay === 'sunset') {
    return (
      <>
        <color attach="background" args={['#3d1e22']} />
        <fog attach="fog" args={['#3d1e22', 150, 420]} />
        <Sky
          distance={1500}
          sunPosition={[-80, 16, -50]}
          turbidity={7}
          rayleigh={3.5}
          mieCoefficient={0.005}
          mieDirectionalG={0.8}
        />
        <ambientLight color="#fed7aa" intensity={0.55} />
        <hemisphereLight color="#fed7aa" groundColor="#3b211d" intensity={0.7} />
        <directionalLight
          position={[-70, 26, -40]}
          color="#ff7d3b"
          intensity={2.3}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={260}
          shadow-camera-left={-95}
          shadow-camera-right={95}
          shadow-camera-top={95}
          shadow-camera-bottom={-95}
          shadow-bias={-0.00012}
        />
      </>
    );
  }

  // Pleasant Late-Afternoon Daylight (Photorealistic Architectural Viz Setup)
  return (
    <>
      {/* HDRI Environment Panorama for natural sky backdrop & realistic PBR reflections */}
      <Environment files="/environment/sky.hdr" background blur={0.003} />
      <ambientLight color="#f0f4fa" intensity={0.25} />
      <hemisphereLight color="#e2f0fc" groundColor="#4a4c42" intensity={0.3} />
      {/* Primary Key Sunlight (Balanced warm daylight matching reference sun angle) */}
      <directionalLight
        position={[-65, 82, 55]}
        color="#fff8ed"
        intensity={1.35}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={10}
        shadow-camera-far={290}
        shadow-camera-left={-115}
        shadow-camera-right={115}
        shadow-camera-top={115}
        shadow-camera-bottom={-115}
        shadow-bias={-0.00012}
      />
      {/* Soft Fill Light from opposite quadrant */}
      <directionalLight
        position={[60, 40, -45]}
        color="#cce2f4"
        intensity={0.25}
      />
    </>
  );
}

export default function Scene({
  selectedBuildingId,
  selectedFloorNumber,
  selectedApartmentId,
  isFloorIsolated,
  timeOfDay = 'day',
  cameraPreset = 'masterplan',
  activeAmenityTarget = null,
  autoRotate = false,
  zoomAction = null,
  onSelectBuilding,
  onSelectFloor,
  onSelectApartment,
  onResetToMasterplan,
}) {
  const isNight = timeOfDay === 'night';

  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        shadows
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: timeOfDay === 'night' ? 1.0 : timeOfDay === 'sunset' ? 1.05 : 0.92,
          powerPreference: 'high-performance',
        }}
        camera={{ position: [0, 75, 148], fov: 40, near: 0.5, far: 2000 }}
      >
        <Suspense fallback={null}>
          <ArchitecturalLighting timeOfDay={timeOfDay} />

          {/* Master Landscape, Roads, Amenities & Vegetation */}
          <Landscape isNight={isNight} />
          <Roads />
          <LandscapeHedges />
          <InstancedPalms />
          <InstancedShadeTrees />
          <PerimeterForestBelt />
          <OutdoorLights isNight={isNight} />
          <InstancedVehicles />

          {/* Three Residential Towers: Block A (High Realism Component), Block B, Block C */}
          {BUILDINGS_DATA.map((bld) => {
            if (bld.id === 'block-a') {
              return (
                <TowerBlockA
                  key={bld.id}
                  buildingData={bld}
                  selectedBuildingId={selectedBuildingId}
                  selectedFloorNumber={selectedFloorNumber}
                  selectedApartmentId={selectedApartmentId}
                  isFloorIsolated={isFloorIsolated}
                  isNight={isNight}
                  onSelectBuilding={onSelectBuilding}
                  onSelectFloor={onSelectFloor}
                  onSelectApartment={onSelectApartment}
                />
              );
            }
            return (
              <Building
                key={bld.id}
                buildingData={bld}
                selectedBuildingId={selectedBuildingId}
                selectedFloorNumber={selectedFloorNumber}
                selectedApartmentId={selectedApartmentId}
                isFloorIsolated={isFloorIsolated}
                isNight={isNight}
                onSelectBuilding={onSelectBuilding}
                onSelectFloor={onSelectFloor}
                onSelectApartment={onSelectApartment}
              />
            );
          })}

          {/* Camera Controller with smooth animated navigation */}
          <CameraController
            selectedBuildingId={selectedBuildingId}
            selectedFloorNumber={selectedFloorNumber}
            selectedApartmentId={selectedApartmentId}
            cameraPreset={cameraPreset}
            activeAmenityTarget={activeAmenityTarget}
            autoRotate={autoRotate}
            zoomAction={zoomAction}
          />

          {/* Calibrated Architectural Post-Processing Pass (No blown-out white slabs) */}
          <EffectComposer disableNormalPass multisampling={4}>
            <Bloom
              luminanceThreshold={1.2}
              intensity={0.12}
              mipmapBlur
            />
            <Vignette
              offset={0.4}
              darkness={0.2}
            />
            <SMAA />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
