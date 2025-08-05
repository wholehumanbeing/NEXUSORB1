'use client';

import dynamic from 'next/dynamic';

const Canvas = dynamic(() => import('@react-three/fiber').then(mod => ({ default: mod.Canvas })), { ssr: false });
const OrbitControls = dynamic(() => import('@react-three/drei').then(mod => ({ default: mod.OrbitControls })), { ssr: false });
const Environment = dynamic(() => import('@react-three/drei').then(mod => ({ default: mod.Environment })), { ssr: false });
import { PhilosopherCluster } from '@/components/3d/PhilosopherCluster';
import { FractillionTrace } from '@/components/3d/FractillionTrace';
import { NestedSpheres } from '@/components/3d/NestedSpheres';
import { useHistoricalOrbStore } from '@/lib/stores/historical-orb-store';
import { FilterPanel } from '@/components/ui/FilterPanel';
import { PhilosopherInfoPanel } from '@/components/ui/PhilosopherInfoPanel';
import { useEffect } from 'react';

export function HistoricalOrb() {
  const { 
    philosophers, 
    connections, 
    selectedPhilosopher,
    selectPhilosopher,
    setPhilosophers,
    setConnections,
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
    selectPhilosopher(philosopher);
  };

  return (
    <div className="relative h-screen bg-black text-phosphor-green">
      {/* 3D Canvas */}
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 60 }}
        className="w-full h-full"
      >
        <Environment preset="night" />
        <ambientLight intensity={0.2} color="#00FF00" />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#00FFFF" />
        
        <NestedSpheres eras={['Ancient', 'Medieval', 'Modern', 'Contemporary']} />
        <PhilosopherCluster 
          philosophers={philosophers} 
          onPhilosopherClick={handlePhilosopherClick}
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
      <div className="absolute top-4 left-4 z-10">
        <FilterPanel />
      </div>
      
      {selectedPhilosopher && (
        <div className="absolute bottom-4 right-4 z-10">
          <PhilosopherInfoPanel philosopher={selectedPhilosopher} />
        </div>
      )}
      
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