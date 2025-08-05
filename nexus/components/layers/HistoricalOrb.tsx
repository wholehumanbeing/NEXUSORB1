'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
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
    loadPhilosopherData();
  }, []);

  const loadPhilosopherData = async () => {
    try {
      // For now, use mock data - in full implementation would fetch from API
      const mockPhilosophers = [
        {
          id: 'kant_immanuel',
          name: 'Immanuel Kant',
          birthYear: 1724,
          deathYear: 1804,
          position: [2, 1, 0] as [number, number, number],
          spiralDynamicsStage: 'Blue-Orange',
          spiralJustification: 'Enlightenment thinker bridging systematic order and rational progress',
          philosophicalGenome: {
            beingVsBecoming: 'Both' as const,
            oneVsMany: 'Both' as const,
            mindVsMatter: 'Dualist' as const,
            freedomVsDeterminism: 'Both' as const,
            transcendentVsImmanent: 'Transcendent' as const,
            realismVsAntiRealism: 'Realist' as const,
            reasonVsExperience: 'Synthesis' as const,
            absoluteVsRelative: 'Absolute' as const,
          },
          switchPoints: [],
          domainStrengths: {
            'Logic': 80,
            'Ethics': 100,
            'Metaphysics': 95,
            'Epistemology': 100,
            'Politics': 70,
            'Aesthetics': 85,
            'Philosophy of Religion': 60,
            'Philosophy of Science': 75
          },
          influences: [],
          critiques: [],
          comprehensiveBiography: 'Revolutionary German Enlightenment philosopher...',
          intellectualJourney: 'From Leibnizian rationalism to critical philosophy...',
          primaryDomain: 'Epistemology' as const,
          era: 'Modern' as const,
          eraPosition: 0.6
        },
        {
          id: 'aristotle',
          name: 'Aristotle',
          birthYear: -384,
          deathYear: -322,
          position: [-2, -1, 1] as [number, number, number],
          spiralDynamicsStage: 'Blue-Orange',
          spiralJustification: 'Systematic categorizer with empirical methodology',
          philosophicalGenome: {
            beingVsBecoming: 'Both' as const,
            oneVsMany: 'Both' as const,
            mindVsMatter: 'Synthesis' as const,
            freedomVsDeterminism: 'Both' as const,
            transcendentVsImmanent: 'Immanent' as const,
            realismVsAntiRealism: 'Realist' as const,
            reasonVsExperience: 'Synthesis' as const,
            absoluteVsRelative: 'Absolute' as const,
          },
          switchPoints: [],
          domainStrengths: {
            'Logic': 100,
            'Ethics': 95,
            'Metaphysics': 95,
            'Epistemology': 85,
            'Politics': 90,
            'Aesthetics': 70,
            'Philosophy of Religion': 60,
            'Philosophy of Science': 85
          },
          influences: [],
          critiques: [],
          comprehensiveBiography: 'Ancient Greek polymath and systematic philosopher...',
          intellectualJourney: 'From Plato\'s Academy to empirical naturalism...',
          primaryDomain: 'Logic' as const,
          era: 'Ancient' as const,
          eraPosition: 0.7
        },
        {
          id: 'nietzsche_friedrich',
          name: 'Friedrich Nietzsche',
          birthYear: 1844,
          deathYear: 1900,
          position: [0, 2, -1] as [number, number, number],
          spiralDynamicsStage: 'Orange-Green',
          spiralJustification: 'Critique of traditional values, perspectivism, and value creation',
          philosophicalGenome: {
            beingVsBecoming: 'Becoming' as const,
            oneVsMany: 'Many' as const,
            mindVsMatter: 'Both' as const,
            freedomVsDeterminism: 'Freedom' as const,
            transcendentVsImmanent: 'Immanent' as const,
            realismVsAntiRealism: 'Anti-realist' as const,
            reasonVsExperience: 'Experience' as const,
            absoluteVsRelative: 'Relative' as const,
          },
          switchPoints: [],
          domainStrengths: {
            'Logic': 60,
            'Ethics': 100,
            'Metaphysics': 80,
            'Epistemology': 75,
            'Politics': 70,
            'Aesthetics': 95,
            'Philosophy of Religion': 85,
            'Philosophy of Science': 60
          },
          influences: [],
          critiques: [],
          comprehensiveBiography: 'German philosopher of cultural criticism and value revaluation...',
          intellectualJourney: 'From classical philology to radical philosophy of life...',
          primaryDomain: 'Ethics' as const,
          era: 'Modern' as const,
          eraPosition: 0.9
        }
      ];

      const mockConnections = [
        {
          sourceId: 'aristotle',
          targetId: 'kant_immanuel',
          strength: 75,
          type: 'influence' as const,
          description: 'Categorical logic influences transcendental categories'
        },
        {
          sourceId: 'kant_immanuel', 
          targetId: 'nietzsche_friedrich',
          strength: 60,
          type: 'critique' as const,
          description: 'Nietzsche critiques Kantian moral absolutism'
        }
      ];

      setPhilosophers(mockPhilosophers);
      setConnections(mockConnections);
    } catch (error) {
      console.error('Failed to load philosopher data:', error);
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
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center z-20">
          <div className="text-phosphor-green font-mono text-xl glow-text">
            LOADING PHILOSOPHICAL NEXUS...
          </div>
        </div>
      )}
    </div>
  );
}