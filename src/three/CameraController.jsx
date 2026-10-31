import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { BUILDINGS_DATA } from '../data/buildings';

export default function CameraController({
  selectedBuildingId,
  selectedFloorNumber,
  selectedApartmentId,
  cameraPreset, // 'masterplan' | 'top' | 'front' | 'amenity'
  activeAmenityTarget,
  autoRotate = false,
  zoomAction,
}) {
  const controlsRef = useRef();
  const { camera } = useThree();

  // Desired camera destination: Elevated masterplan composition framing all 3 complete towers and grounds
  const targetCamPos = useRef(new THREE.Vector3(0, 75, 148));
  const targetLookAt = useRef(new THREE.Vector3(0, 20, 2));
  const isTransitioning = useRef(false);

  useEffect(() => {
    isTransitioning.current = true;

    if (cameraPreset === 'top') {
      targetCamPos.current.set(0, 165, 4);
      targetLookAt.current.set(0, 0, 4);
    } else if (cameraPreset === 'front') {
      targetCamPos.current.set(0, 36, 148);
      targetLookAt.current.set(0, 22, 10);
    } else if (cameraPreset === 'inspect-block-a') {
      // Full Block A Tower Architectural Elevation (Complete 15 floors, base & rooftop crown without cropping)
      targetCamPos.current.set(-8, 30, 56);
      targetLookAt.current.set(-38, 26, -10);
    } else if (cameraPreset === 'facade-block-a') {
      // Close-up Block A Facade Inspection (Balconies, reveals, glass reflections, railings)
      targetCamPos.current.set(-21, 20, 25);
      targetLookAt.current.set(-38, 20, -10);
    } else if (activeAmenityTarget) {
      targetCamPos.current.set(
        activeAmenityTarget.cam[0],
        activeAmenityTarget.cam[1],
        activeAmenityTarget.cam[2]
      );
      targetLookAt.current.set(
        activeAmenityTarget.target[0],
        activeAmenityTarget.target[1],
        activeAmenityTarget.target[2]
      );
    } else if (selectedBuildingId) {
      const bld = BUILDINGS_DATA.find((b) => b.id === selectedBuildingId);
      if (bld) {
        if (selectedFloorNumber) {
          const floorY = 4.2 + (selectedFloorNumber - 1) * 3.2 + 1.6;
          const angle = bld.rotation[1];
          const dist = 32;
          const offsetX = Math.sin(angle) * dist;
          const offsetZ = Math.cos(angle) * dist;

          targetCamPos.current.set(
            bld.position[0] + offsetX,
            floorY + 6.5,
            bld.position[2] + offsetZ
          );
          targetLookAt.current.set(bld.position[0], floorY, bld.position[2]);
        } else {
          targetCamPos.current.set(
            bld.position[0] + bld.cameraOffset[0] * 1.08,
            bld.cameraOffset[1] * 1.1,
            bld.position[2] + bld.cameraOffset[2] * 1.08
          );
          targetLookAt.current.set(
            bld.targetPosition[0],
            bld.targetPosition[1],
            bld.targetPosition[2]
          );
        }
      }
    } else {
      // Default Masterplan elevated architectural composition
      targetCamPos.current.set(0, 75, 148);
      targetLookAt.current.set(0, 20, 2);
    }
  }, [selectedBuildingId, selectedFloorNumber, selectedApartmentId, cameraPreset, activeAmenityTarget]);

  useEffect(() => {
    if (!zoomAction || !controlsRef.current) return;
    const factor = zoomAction.type === 'in' ? 0.84 : 1.19;
    const controls = controlsRef.current;
    const offset = new THREE.Vector3().subVectors(camera.position, controls.target);
    offset.multiplyScalar(factor);
    camera.position.addVectors(controls.target, offset);
    controls.update();
  }, [zoomAction, camera]);

  useFrame((_, delta) => {
    if (!controlsRef.current) return;

    if (isTransitioning.current) {
      const camLerpSpeed = THREE.MathUtils.clamp(delta * 3.5, 0.01, 0.15);
      camera.position.lerp(targetCamPos.current, camLerpSpeed);
      controlsRef.current.target.lerp(targetLookAt.current, camLerpSpeed);
      controlsRef.current.update();

      if (
        camera.position.distanceTo(targetCamPos.current) < 0.25 &&
        controlsRef.current.target.distanceTo(targetLookAt.current) < 0.25
      ) {
        isTransitioning.current = false;
      }
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enableDamping
      dampingFactor={0.06}
      maxPolarAngle={Math.PI / 2 - 0.05}
      minPolarAngle={0.05}
      minDistance={10}
      maxDistance={220}
      autoRotate={autoRotate}
      autoRotateSpeed={0.7}
    />
  );
}
