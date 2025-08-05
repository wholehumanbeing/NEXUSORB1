'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { PhilosopherNode } from '@/lib/types';
import { SPIRAL_DYNAMICS_COLORS } from '@/lib/design-system';

interface PhilosopherClusterProps {
  philosophers: PhilosopherNode[];
  onPhilosopherClick?: (philosopher: PhilosopherNode) => void;
}

export function PhilosopherCluster({ philosophers, onPhilosopherClick }: PhilosopherClusterProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  const { geometry, material } = useMemo(() => {
    const geom = new THREE.SphereGeometry(0.08, 8, 8);
    
    // Map spiral dynamics stages to color indices
    const getSpiralIndex = (stage: string): number => {
      const stageMap: Record<string, number> = {
        'Purple': 0, 'Red': 1, 'Blue': 2, 'Orange': 3,
        'Green': 4, 'Yellow': 5, 'Turquoise': 6, 'Coral': 7,
        'Blue-Orange': 2.5, 'Orange-Green': 3.5
      };
      return stageMap[stage] || 0;
    };
    
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        spiralColors: { value: SPIRAL_DYNAMICS_COLORS.map(color => new THREE.Color(color)) },
        selectionStates: { value: new Float32Array(philosophers.length) }
      },
      vertexShader: `
        attribute float spiralStage;
        attribute float selectionState;
        uniform float time;
        varying float vSpiral;
        varying float vSelection;
        varying vec3 vPosition;
        varying float vDistance;
        
        void main() {
          vSpiral = spiralStage;
          vSelection = selectionState;
          vPosition = position;
          
          vec3 pos = position;
          // Subtle radar pulse effect
          float pulse = 0.5 + 0.5 * sin(time * 3.0 + spiralStage * 5.0);
          pos *= (1.0 + pulse * 0.1);
          
          vec4 mvPosition = modelViewMatrix * instanceMatrix * vec4(pos, 1.0);
          vDistance = length(mvPosition.xyz);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 spiralColors[8];
        uniform float time;
        varying float vSpiral;
        varying float vSelection;
        varying vec3 vPosition;
        varying float vDistance;
        
        void main() {
          // Create distance-based fade for radar effect
          float distanceFromCenter = length(vPosition);
          
          // Radar sweep effect
          float sweep = sin(time * 2.0 + distanceFromCenter * 2.0) * 0.5 + 0.5;
          
          // Wireframe grid effect
          vec3 grid = abs(fract(vPosition * 8.0) - 0.5) / fwidth(vPosition * 8.0);
          float wireframe = 1.0 - min(min(grid.x, grid.y), grid.z);
          
          // Color selection
          int colorIndex = int(floor(vSpiral));
          int nextColorIndex = int(ceil(vSpiral));
          float mixFactor = fract(vSpiral);
          
          vec3 baseColor = mix(
            spiralColors[colorIndex], 
            spiralColors[nextColorIndex], 
            mixFactor
          );
          
          // Particle glow core
          float core = 1.0 - smoothstep(0.0, 0.3, distanceFromCenter);
          
          // Selection highlight
          float selectionGlow = 1.0 + vSelection * 3.0;
          
          // Combine effects
          float intensity = (core * 0.8 + wireframe * 0.3 + sweep * 0.2) * selectionGlow;
          float alpha = intensity * (0.6 + vSelection * 0.4);
          
          // Fade based on camera distance for depth
          alpha *= 1.0 - smoothstep(20.0, 50.0, vDistance);
          
          gl_FragColor = vec4(baseColor * intensity, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    
    return { geometry: geom, material: mat };
  }, [philosophers.length]);

  // Set up instanced matrices and attributes
  useEffect(() => {
    if (!meshRef.current || philosophers.length === 0) return;
    
    const dummy = new THREE.Object3D();
    const spiralStages = new Float32Array(philosophers.length);
    
    const getSpiralIndex = (stage: string): number => {
      const stageMap: Record<string, number> = {
        'Purple': 0, 'Red': 1, 'Blue': 2, 'Orange': 3,
        'Green': 4, 'Yellow': 5, 'Turquoise': 6, 'Coral': 7,
        'Blue-Orange': 2.5, 'Orange-Green': 3.5
      };
      return stageMap[stage] || 0;
    };
    
    philosophers.forEach((phil, i) => {
      // Position in 3D space
      dummy.position.set(...phil.position);
      
      // Scale based on total domain influence - subtle size variation
      const totalStrength = Object.values(phil.domainStrengths).reduce((sum, val) => sum + val, 0);
      const scale = 0.8 + (totalStrength / 2000); // Scale between 0.8 and 1.3
      dummy.scale.setScalar(scale);
      
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
      
      // Set spiral dynamics stage for shader
      spiralStages[i] = getSpiralIndex(phil.spiralDynamicsStage);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
    
    // Add spiral stage attribute to geometry
    const spiralAttribute = new THREE.InstancedBufferAttribute(spiralStages, 1);
    meshRef.current.geometry.setAttribute('spiralStage', spiralAttribute);
    
  }, [philosophers]);

  // Animation loop
  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = clock.elapsedTime;
    }
  });

  // Click handling
  const handleClick = (event: any) => {
    if (!onPhilosopherClick || event.instanceId === undefined) return;
    
    const philosopher = philosophers[event.instanceId];
    if (philosopher) {
      onPhilosopherClick(philosopher);
    }
  };

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, philosophers.length]}
      onClick={handleClick}
    />
  );
}