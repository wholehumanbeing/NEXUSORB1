'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface NestedSpheresProps {
  eras: string[];
}

export function NestedSpheres({ eras }: NestedSpheresProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {eras.map((era, index) => {
        const radius = 3 + index * 2; // Increasing radius for each era
        const opacity = 0.1 - index * 0.02; // Decreasing opacity for outer spheres
        
        return (
          <mesh key={era}>
            <sphereGeometry args={[radius, 32, 16]} />
            <meshBasicMaterial 
              color="#00FF00" 
              wireframe 
              transparent 
              opacity={opacity}
            />
          </mesh>
        );
      })}
      
      {/* Central core sphere */}
      <mesh>
        <sphereGeometry args={[0.5, 16, 8]} />
        <meshBasicMaterial 
          color="#00FFFF" 
          transparent 
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}