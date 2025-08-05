'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const { geometry, positions } = useMemo(() => {
    const particleCount = 800;
    const geom = new THREE.BufferGeometry();
    const pos = new Float32Array(particleCount * 3);
    
    // Create a field of particles around the philosophical orb
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Create particles in a larger sphere around the main orb
      const radius = 15 + Math.random() * 25;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      pos[i3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = radius * Math.cos(phi);
    }
    
    geom.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    
    return { geometry: geom, positions: pos };
  }, []);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        size: { value: 2.0 }
      },
      vertexShader: `
        uniform float time;
        uniform float size;
        attribute float randomness;
        
        void main() {
          vec3 pos = position;
          
          // Slow orbital drift
          float angle = time * 0.1 + length(position) * 0.01;
          pos.x += sin(angle) * 0.5;
          pos.z += cos(angle) * 0.5;
          
          // Subtle vertical drift
          pos.y += sin(time * 0.3 + length(position)) * 0.2;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (1.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform float time;
        
        void main() {
          vec2 center = gl_PointCoord - 0.5;
          float dist = length(center);
          
          // Create a soft circular particle
          float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
          
          // Subtle twinkling effect
          float twinkle = 0.5 + 0.5 * sin(time * 5.0 + gl_FragCoord.x * 0.1 + gl_FragCoord.y * 0.1);
          alpha *= twinkle;
          
          // Phosphor green with some variation
          vec3 color = vec3(0.0, 1.0, 0.2);
          
          gl_FragColor = vec4(color, alpha * 0.3);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
  }, []);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = clock.elapsedTime;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry} material={material} />
  );
}