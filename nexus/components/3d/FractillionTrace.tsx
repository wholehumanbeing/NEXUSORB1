'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Connection } from '@/lib/types';

interface FractillionTraceProps {
  connections: Connection[];
  activeTrace?: string[];
}

export function FractillionTrace({ connections, activeTrace }: FractillionTraceProps) {
  const pointsRef = useRef<THREE.Points>(null);
  
  const { geometry, material } = useMemo(() => {
    if (connections.length === 0) {
      return { geometry: new THREE.BufferGeometry(), material: new THREE.ShaderMaterial() };
    }
    
    const particleCount = connections.length * 50; // 50 particles per connection
    const positions = new Float32Array(particleCount * 3);
    const connectionIndices = new Float32Array(particleCount);
    const timeOffsets = new Float32Array(particleCount);
    const connectionTypes = new Float32Array(particleCount);
    
    connections.forEach((conn, connIndex) => {
      const typeValue = conn.type === 'influence' ? 1.0 : 
                       conn.type === 'critique' ? 2.0 :
                       conn.type === 'dialogue' ? 3.0 : 4.0;
      
      for (let i = 0; i < 50; i++) {
        const particleIndex = connIndex * 50 + i;
        connectionIndices[particleIndex] = connIndex;
        timeOffsets[particleIndex] = Math.random();
        connectionTypes[particleIndex] = typeValue;
      }
    });
    
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geom.setAttribute('connectionIndex', new THREE.BufferAttribute(connectionIndices, 1));
    geom.setAttribute('timeOffset', new THREE.BufferAttribute(timeOffsets, 1));
    geom.setAttribute('connectionType', new THREE.BufferAttribute(connectionTypes, 1));
    
    // Create connection path data for shader
    const pathData = new Float32Array(connections.length * 6); // start + end positions
    connections.forEach((conn, index) => {
      // For now, we'll use simple straight lines
      // In a full implementation, you'd calculate spline paths
      const baseIndex = index * 6;
      pathData[baseIndex] = 0;     // startX - will be set dynamically
      pathData[baseIndex + 1] = 0; // startY
      pathData[baseIndex + 2] = 0; // startZ
      pathData[baseIndex + 3] = 1; // endX - will be set dynamically
      pathData[baseIndex + 4] = 1; // endY
      pathData[baseIndex + 5] = 1; // endZ
    });
    
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        connectionPaths: { value: pathData },
        traceColor: { value: new THREE.Color('#00FF00') },
        critiqueColor: { value: new THREE.Color('#FF0000') },
        dialogueColor: { value: new THREE.Color('#00FFFF') }
      },
      vertexShader: `
        attribute float connectionIndex;
        attribute float timeOffset;
        attribute float connectionType;
        uniform float time;
        uniform float connectionPaths[${connections.length * 6}];
        varying float vConnectionType;
        varying float vAlpha;
        
        void main() {
          vConnectionType = connectionType;
          
          float progress = mod(time * 0.3 + timeOffset, 1.0);
          int pathStart = int(connectionIndex * 6.0);
          
          // Interpolate along connection path
          vec3 startPos = vec3(
            connectionPaths[pathStart],
            connectionPaths[pathStart + 1],
            connectionPaths[pathStart + 2]
          );
          
          vec3 endPos = vec3(
            connectionPaths[pathStart + 3],
            connectionPaths[pathStart + 4],
            connectionPaths[pathStart + 5]
          );
          
          vec3 pos = mix(startPos, endPos, progress);
          
          // Add some curved motion
          float curve = sin(progress * 3.14159) * 0.5;
          pos.y += curve;
          
          vAlpha = sin(progress * 3.14159); // Fade in/out along path
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = 2.0 + connectionType * 0.5;
        }
      `,
      fragmentShader: `
        uniform vec3 traceColor;
        uniform vec3 critiqueColor;
        uniform vec3 dialogueColor;
        varying float vConnectionType;
        varying float vAlpha;
        
        void main() {
          vec3 color = traceColor;
          
          if (vConnectionType > 1.5 && vConnectionType < 2.5) {
            color = critiqueColor; // Critique
          } else if (vConnectionType > 2.5) {
            color = dialogueColor; // Dialogue/other
          }
          
          float dist = distance(gl_PointCoord, vec2(0.5));
          if (dist > 0.5) discard;
          
          float alpha = (1.0 - dist * 2.0) * vAlpha * 0.7;
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending
    });
    
    return { geometry: geom, material: mat };
  }, [connections]);

  useFrame(({ clock }) => {
    if (material.uniforms) {
      material.uniforms.time.value = clock.elapsedTime;
    }
  });

  if (connections.length === 0) return null;

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}