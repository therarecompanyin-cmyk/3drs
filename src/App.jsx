import React, { useState, useEffect, useCallback, Component } from 'react';
import Scene from './three/Scene';
import Navbar from './components/Navbar';
import ProjectInfo from './components/ProjectInfo';
import BuildingSelector from './components/BuildingSelector';
import FloorSelector from './components/FloorSelector';
import ApartmentPanel from './components/ApartmentPanel';
import FloorPlan2D from './components/FloorPlan2D';
import InteriorViewer from './components/InteriorViewer';
import ArchitecturalReferenceModal from './components/ArchitecturalReferenceModal';
import AmenitiesModal from './components/AmenitiesModal';
import ApartmentsDirectoryModal from './components/ApartmentsDirectoryModal';
import CameraControlsHUD from './components/CameraControlsHUD';
import LoadingScreen from './components/LoadingScreen';
import { BUILDINGS_DATA } from './data/buildings';
import { getApartmentById } from './data/apartments';

class SceneErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error('3D Scene Error caught by boundary:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-full p-6 text-center text-white bg-[#0f1115]">
          <div className="glass-panel p-6 rounded-2xl max-w-md border border-amber-500/40">
            <h2 className="text-base font-bold text-amber-300">Graphics Context Reload</h2>
            <p className="mt-2 text-xs text-white/70 leading-relaxed">
              {this.state.error?.message || 'A graphics pipeline notice was received.'}
            </p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="mt-4 px-5 py-2 bg-amber-500 hover:bg-amber-400 text-charcoal-900 font-bold rounded-xl text-xs transition-all shadow-lg"
            >
              Restore 3D Scene
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  // Navigation & Selection States
  const [selectedBuildingId, setSelectedBuildingId] = useState(null);
  const [selectedFloorNumber, setSelectedFloorNumber] = useState(null);
  const [selectedApartmentId, setSelectedApartmentId] = useState(null);

  // View Mode: '3d' (Primary interactive 3D scene) | 'floorplan' | 'interior'
  const [viewMode, setViewMode] = useState('3d');

  // Controls & Environmental States
  const [isFloorIsolated, setIsFloorIsolated] = useState(false);
  const [timeOfDay, setTimeOfDay] = useState('day');
  const [cameraPreset, setCameraPreset] = useState('masterplan');
  const [activeAmenityTarget, setActiveAmenityTarget] = useState(null);
  const [autoRotate, setAutoRotate] = useState(false);
  const [zoomAction, setZoomAction] = useState(null);

  // Modals & Panels
  const [isAmenitiesOpen, setIsAmenitiesOpen] = useState(false);
  const [isApartmentsOpen, setIsApartmentsOpen] = useState(false);
  const [isReferenceOpen, setIsReferenceOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasWebGLError, setHasWebGLError] = useState(false);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGLError(true);
      }
    } catch (e) {
      setHasWebGLError(true);
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  const handleSelectBuilding = useCallback((buildingId) => {
    setSelectedBuildingId(buildingId);
    setSelectedFloorNumber(null);
    setSelectedApartmentId(null);
    setIsFloorIsolated(false);
    setCameraPreset(null);
    setActiveAmenityTarget(null);
    setAutoRotate(false);
  }, []);

  const handleSelectFloor = useCallback((floorNumber) => {
    setSelectedFloorNumber(floorNumber);
    setSelectedApartmentId(null);
    setCameraPreset(null);
    setActiveAmenityTarget(null);
  }, []);

  const handleSelectApartment = useCallback((apartmentId) => {
    const apt = getApartmentById(apartmentId);
    if (apt) {
      setSelectedBuildingId(apt.buildingId);
      setSelectedFloorNumber(apt.floorNumber);
      setSelectedApartmentId(apt.id);
      setCameraPreset(null);
      setActiveAmenityTarget(null);
    }
  }, []);

  const handleResetToMasterplan = useCallback(() => {
    setSelectedBuildingId(null);
    setSelectedFloorNumber(null);
    setSelectedApartmentId(null);
    setIsFloorIsolated(false);
    setCameraPreset('masterplan');
    setActiveAmenityTarget(null);
  }, []);

  const handleSelectAmenity = useCallback((amenity) => {
    setSelectedBuildingId(null);
    setSelectedFloorNumber(null);
    setSelectedApartmentId(null);
    setIsFloorIsolated(false);
    setCameraPreset('amenity');
    setActiveAmenityTarget({
      cam: amenity.targetCamera,
      target: amenity.position,
    });
  }, []);

  const handleSetTopView = () => {
    setCameraPreset('top');
    setActiveAmenityTarget(null);
  };

  const handleSetFrontView = () => {
    setCameraPreset('front');
    setActiveAmenityTarget(null);
  };

  const handleInspectBlockA = () => {
    setSelectedBuildingId('block-a');
    setSelectedFloorNumber(null);
    setSelectedApartmentId(null);
    setIsFloorIsolated(false);
    setCameraPreset('inspect-block-a');
    setActiveAmenityTarget(null);
  };

  const handleInspectFacade = () => {
    setSelectedBuildingId('block-a');
    setSelectedFloorNumber(null);
    setSelectedApartmentId(null);
    setIsFloorIsolated(false);
    setCameraPreset('facade-block-a');
    setActiveAmenityTarget(null);
  };

  const handleZoom = (type) => {
    setZoomAction({ type, timestamp: Date.now() });
  };

  const selectedBuilding = BUILDINGS_DATA.find((b) => b.id === selectedBuildingId);
  const selectedApartment = selectedApartmentId ? getApartmentById(selectedApartmentId) : null;

  return (
    <div className="w-full h-full relative overflow-hidden select-none bg-[#07090e]">
      {/* Loading & Error Screens */}
      <LoadingScreen isLoading={isLoading} hasWebGLError={hasWebGLError} />

      {/* PRIMARY INTERACTIVE 3D SCENE VIEWPORT */}
      <div className="w-full h-full absolute inset-0">
        <SceneErrorBoundary>
          <Scene
            selectedBuildingId={selectedBuildingId}
            selectedFloorNumber={selectedFloorNumber}
            selectedApartmentId={selectedApartmentId}
            isFloorIsolated={isFloorIsolated}
            timeOfDay={timeOfDay}
            cameraPreset={cameraPreset}
            activeAmenityTarget={activeAmenityTarget}
            autoRotate={autoRotate}
            zoomAction={zoomAction}
            onSelectBuilding={handleSelectBuilding}
            onSelectFloor={handleSelectFloor}
            onSelectApartment={handleSelectApartment}
            onResetToMasterplan={handleResetToMasterplan}
          />
        </SceneErrorBoundary>
      </div>

      {/* Interactive UI Overlays (Only shown in '3d' viewMode) */}
      {viewMode === '3d' && (
        <>
          <Navbar
            selectedBuildingId={selectedBuildingId}
            selectedFloorNumber={selectedFloorNumber}
            timeOfDay={timeOfDay}
            setTimeOfDay={setTimeOfDay}
            onNavigateMasterplan={handleResetToMasterplan}
            onOpenFloors={() => {
              if (!selectedBuildingId) setSelectedBuildingId('block-a');
              if (!selectedFloorNumber) setSelectedFloorNumber(1);
            }}
            onOpenApartments={() => setIsApartmentsOpen(true)}
            onOpenAmenities={() => setIsAmenitiesOpen(true)}
            onOpenReference={() => setIsReferenceOpen(true)}
            isFullscreen={isFullscreen}
            onToggleFullscreen={handleToggleFullscreen}
          />

          {!selectedBuildingId && (
            <ProjectInfo onSelectTower={handleSelectBuilding} />
          )}

          <BuildingSelector
            selectedBuildingId={selectedBuildingId}
            onSelectBuilding={handleSelectBuilding}
            onResetMasterplan={handleResetToMasterplan}
          />

          <FloorSelector
            selectedBuildingId={selectedBuildingId}
            selectedFloorNumber={selectedFloorNumber}
            selectedApartmentId={selectedApartmentId}
            isFloorIsolated={isFloorIsolated}
            onToggleIsolation={() => setIsFloorIsolated(!isFloorIsolated)}
            onSelectFloor={handleSelectFloor}
            onSelectApartment={handleSelectApartment}
            onViewFloorPlan={() => setViewMode('floorplan')}
          />

          {selectedApartment && (
            <ApartmentPanel
              apartment={selectedApartment}
              onClose={() => setSelectedApartmentId(null)}
              onViewFloorPlan={() => setViewMode('floorplan')}
              onViewInterior={() => setViewMode('interior')}
            />
          )}

          <CameraControlsHUD
            onResetCamera={handleResetToMasterplan}
            onZoomIn={() => handleZoom('in')}
            onZoomOut={() => handleZoom('out')}
            onSetTopView={handleSetTopView}
            onSetFrontView={handleSetFrontView}
            onInspectBlockA={handleInspectBlockA}
            onInspectFacade={handleInspectFacade}
            autoRotate={autoRotate}
            onToggleAutoRotate={() => setAutoRotate(!autoRotate)}
            activeCameraPreset={cameraPreset}
          />
        </>
      )}

      {/* 2D Interactive SVG Floor Plan Viewer */}
      {viewMode === 'floorplan' && (
        <FloorPlan2D
          selectedBuilding={selectedBuilding || BUILDINGS_DATA[0]}
          selectedFloorNumber={selectedFloorNumber || 5}
          selectedApartment={selectedApartment}
          onSelectApartment={handleSelectApartment}
          onOpenInterior={() => setViewMode('interior')}
          onBackTo3D={() => setViewMode('3d')}
        />
      )}

      {/* 3D Apartment Interior Cutaway View */}
      {viewMode === 'interior' && (
        <InteriorViewer
          selectedApartment={
            selectedApartment ||
            getApartmentById(`${selectedBuilding?.code || 'A'}-${(selectedFloorNumber || 5) * 100 + 1}`)
          }
          onBackToBuilding={() => setViewMode('3d')}
          onBackToFloorPlan={() => setViewMode('floorplan')}
        />
      )}

      {/* Architectural Masterplan Reference Modal (Available as Reference Only) */}
      <ArchitecturalReferenceModal
        isOpen={isReferenceOpen}
        onClose={() => setIsReferenceOpen(false)}
      />

      {/* Master Amenities Modal */}
      <AmenitiesModal
        isOpen={isAmenitiesOpen}
        onClose={() => setIsAmenitiesOpen(false)}
        onSelectAmenity={handleSelectAmenity}
      />

      {/* Searchable 135 Apartments Directory */}
      <ApartmentsDirectoryModal
        isOpen={isApartmentsOpen}
        onClose={() => setIsApartmentsOpen(false)}
        onSelectApartmentAndJump={(apt) => {
          handleSelectApartment(apt.id);
          setViewMode('3d');
        }}
        onViewFloorPlan={(apt) => {
          handleSelectApartment(apt.id);
          setViewMode('floorplan');
        }}
      />
    </div>
  );
}
