'use client';

import dynamic from 'next/dynamic';

const Canvas = dynamic(() => import('@react-three/fiber').then(mod => ({ default: mod.Canvas })), { ssr: false });
const OrbitControls = dynamic(() => import('@react-three/drei').then(mod => ({ default: mod.OrbitControls })), { ssr: false });
const Environment = dynamic(() => import('@react-three/drei').then(mod => ({ default: mod.Environment })), { ssr: false });
import { PhilosopherCluster } from '@/components/3d/PhilosopherCluster';
import { FractillionTrace } from '@/components/3d/FractillionTrace';
import { NestedSpheres } from '@/components/3d/NestedSpheres';
import { ParticleField } from '@/components/3d/ParticleField';
import { useHistoricalOrbStore } from '@/lib/stores/historical-orb-store';
import { FilterPanel } from '@/components/ui/FilterPanel';
import { PhilosopherPanel } from '@/components/ui/PhilosopherPanel';
import { PhilosopherTooltip } from '@/components/ui/PhilosopherTooltip';
import { PhilosopherPreview } from '@/components/ui/PhilosopherPreview';
import { useEffect } from 'react';

export function HistoricalOrb() {
  const { 
    philosophers, 
    connections, 
    selectedPhilosopher,
    hoveredPhilosopher,
    previewPhilosopher,
    mousePosition,
    selectPhilosopher,
    setHoveredPhilosopher,
    setPreviewPhilosopher,
    setMousePosition,
    setPhilosophers,
    setConnections,
    filters,
    loading
  } = useHistoricalOrbStore();

  // Load philosopher data on mount
  useEffect(() => {
    loadPhilosopherDataFromFile();
  }, []);

  const loadPhilosopherDataFromFile = async () => {
    try {
      const { loadPhilosopherData } = await import('@/lib/data/philosopher-loader');
      const { philosophers, connections } = await loadPhilosopherData();
      
      setPhilosophers(philosophers);
      setConnections(connections);
    } catch (error) {
      console.error('Failed to load philosopher data:', error);
      // Fallback to empty data
      setPhilosophers([]);
      setConnections([]);
    }
  };

  const handlePhilosopherClick = (philosopher: any) => {
    setPreviewPhilosopher(philosopher);
  };

  const handlePhilosopherHover = (philosopher: any) => {
    setHoveredPhilosopher(philosopher);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  const handlePreviewClose = () => {
    setPreviewPhilosopher(null);
  };

  // Filter philosophers based on selected filters
  const filteredPhilosophers = philosophers.filter(phil => {
    // Era filter
    if (filters.era.length > 0 && !filters.era.includes(phil.era)) {
      return false;
    }
    
    // Domain filter
    if (filters.domain.length > 0) {
      const hasMatchingDomain = filters.domain.some(domain => 
        phil.domainStrengths[domain] > 0
      );
      if (!hasMatchingDomain) return false;
    }
    
    // Spiral stage filter
    if (filters.spiralStage.length > 0 && !filters.spiralStage.includes(phil.spiralDynamicsStage)) {
      return false;
    }
    
    return true;
  });

  return (
    <div 
      className="relative h-screen bg-black text-phosphor-green" 
      onMouseMove={handleMouseMove}
    >
      {/* 3D Canvas */}
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 60 }}
        className="w-full h-full"
      >
        <Environment preset="night" />
        <ambientLight intensity={0.1} color="#00FF00" />
        <pointLight position={[10, 10, 10]} intensity={0.3} color="#00FFFF" />
        
        <ParticleField />
        <NestedSpheres eras={['Ancient', 'Medieval', 'Modern', 'Contemporary']} />
        <PhilosopherCluster 
          philosophers={filteredPhilosophers} 
          onPhilosopherClick={handlePhilosopherClick}
          onPhilosopherHover={handlePhilosopherHover}
        />
        <FractillionTrace connections={connections} />
        
        <OrbitControls 
          enableDamping
          dampingFactor={0.05}
          minDistance={3}
          maxDistance={50}
        />
      </Canvas>
      
      {/* UI Overlays */}
      <div className="absolute top-20 left-4 z-10">
        <FilterPanel />
      </div>
      
      {/* Tooltip */}
      {hoveredPhilosopher && (
        <PhilosopherTooltip 
          philosopher={hoveredPhilosopher} 
          position={mousePosition} 
        />
      )}
      
      {/* Preview Modal */}
      {previewPhilosopher && <PhilosopherPreview philosopher={previewPhilosopher} />}
      
      {/* Full Bio Panel */}
      {selectedPhilosopher && <PhilosopherPanel philosopher={selectedPhilosopher} />}
      
      {/* Loading State */}
      {(loading || philosophers.length === 0) && (
        <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center z-20">
          <div className="text-phosphor-green font-mono text-xl glow-text">
            LOADING PHILOSOPHICAL NEXUS...
          </div>
        </div>
      )}
    </div>
  );
}