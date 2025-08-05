'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useHistoricalOrbStore } from '@/lib/stores/historical-orb-store';

interface NestedSpheresProps {
  eras: string[];
}

export function NestedSpheres({ eras }: NestedSpheresProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { filters } = useHistoricalOrbStore();
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.elapsedTime * 0.05;
    }
  });

  // Define era layers with consistent radii matching philosopher positioning
  const eraLayers: Record<string, number> = {
    'Ancient': 3,      // Innermost layer
    'Medieval': 5,     // Second layer
    'Modern': 7,       // Third layer
    'Contemporary': 9  // Outermost layer
  };

  return (
    <group ref={groupRef}>
      {eras.map((era) => {
        const radius = eraLayers[era];
        // Show layer only if no filter is active or if this era is selected
        const showLayer = filters.era.length === 0 || filters.era.includes(era);
        
        if (!showLayer) return null;
        
        // Calculate opacity based on layer position
        const layerIndex = Object.keys(eraLayers).indexOf(era);
        const opacity = 0.15 - layerIndex * 0.03;
        
        return (
          <group key={era}>
            {/* Main wireframe sphere */}
            <mesh>
              <sphereGeometry args={[radius, 48, 24]} />
              <meshBasicMaterial 
                color="#00FF00" 
                wireframe 
                transparent 
                opacity={opacity}
              />
            </mesh>
            
            {/* Additional particle field for retrofuturism effect */}
            <mesh>
              <sphereGeometry args={[radius + 0.1, 32, 16]} />
              <meshBasicMaterial 
                color="#00FFFF" 
                wireframe 
                transparent 
                opacity={opacity * 0.5}
              />
            </mesh>
          </group>
        );
      })}
      
      {/* Central core sphere - always visible */}
      <group>
        <mesh>
          <sphereGeometry args={[0.8, 32, 16]} />
          <meshBasicMaterial 
            color="#00FFFF" 
            transparent 
            opacity={0.4}
          />
        </mesh>
        {/* Core glow effect */}
        <mesh>
          <sphereGeometry args={[1, 16, 8]} />
          <meshBasicMaterial 
            color="#00FF00" 
            transparent 
            opacity={0.2}
          />
        </mesh>
      </group>
    </group>
  );
}