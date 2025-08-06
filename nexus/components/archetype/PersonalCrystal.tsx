'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { Archetype, ALCHEMICAL_SYMBOLS } from '@/lib/data/archetypes';

interface PersonalCrystalProps {
  archetype: Archetype;
  shape: number[];
  onReset: () => void;
}

interface CrystalVisualizerProps {
  shape: number[];
  archetype: Archetype;
}

function CrystalShape({ shape, archetype }: CrystalVisualizerProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Create dynamic geometry based on philosophical shape
  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(2, 2);
    const positions = geo.attributes.position;
    
    // Deform vertices based on philosophical shape
    for (let i = 0; i < positions.count; i++) {
      const vertex = new THREE.Vector3(
        positions.getX(i),
        positions.getY(i),
        positions.getZ(i)
      );
      
      const shapeIndex = i % shape.length;
      const deformation = shape[shapeIndex];
      vertex.multiplyScalar(0.7 + deformation * 0.6);
      
      positions.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }
    
    geo.computeVertexNormals();
    return geo;
  }, [shape]);

  // Animate rotation and pulsing
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.002;
      meshRef.current.rotation.y += 0.003;
      
      // Gentle pulsing
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      meshRef.current.scale.setScalar(scale);
    }
  });

  // Blend colors from archetype symbols
  const crystalColor = useMemo(() => {
    const colors = archetype.symbols.map(s => ALCHEMICAL_SYMBOLS[s].color);
    // Average the colors
    let r = 0, g = 0, b = 0;
    colors.forEach(color => {
      const hex = color.replace('#', '');
      r += parseInt(hex.substr(0, 2), 16);
      g += parseInt(hex.substr(2, 2), 16);
      b += parseInt(hex.substr(4, 2), 16);
    });
    r = Math.floor(r / colors.length);
    g = Math.floor(g / colors.length);
    b = Math.floor(b / colors.length);
    
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }, [archetype]);

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <MeshDistortMaterial
        color={crystalColor}
        emissive={crystalColor}
        emissiveIntensity={0.2}
        roughness={0.2}
        metalness={0.8}
        distort={0.1}
        speed={2}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

function ParticleField({ archetype }: { archetype: Archetype }) {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const count = 500;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    // Get colors from archetype symbols
    const symbolColors = archetype.symbols.map(s => {
      const hex = ALCHEMICAL_SYMBOLS[s].color.replace('#', '');
      return {
        r: parseInt(hex.substr(0, 2), 16) / 255,
        g: parseInt(hex.substr(2, 2), 16) / 255,
        b: parseInt(hex.substr(4, 2), 16) / 255
      };
    });
    
    for (let i = 0; i < count; i++) {
      // Random position in sphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 5 + Math.random() * 10;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      // Use symbol colors
      const colorIndex = i % symbolColors.length;
      colors[i * 3] = symbolColors[colorIndex].r;
      colors[i * 3 + 1] = symbolColors[colorIndex].g;
      colors[i * 3 + 2] = symbolColors[colorIndex].b;
    }
    
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    return geometry;
  }, [archetype]);
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0005;
      particlesRef.current.rotation.x += 0.0003;
    }
  });
  
  return (
    <points ref={particlesRef} geometry={particles}>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function PersonalCrystal({ archetype, shape, onReset }: PersonalCrystalProps) {
  return (
    <div className="h-full relative">
      {/* 3D Visualization */}
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <Environment preset="night" />
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#00FFFF" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#FF00FF" />
        
        <CrystalShape shape={shape} archetype={archetype} />
        <ParticleField archetype={archetype} />
        
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
      
      {/* UI Overlay */}
      <div className="absolute top-0 left-0 right-0 p-8 pointer-events-none">
        <div className="max-w-4xl mx-auto pointer-events-auto">
          <div className="bg-black bg-opacity-80 border border-phosphor-green p-6 glow-border">
            <h1 className="text-3xl font-pixel text-phosphor-green mb-4 glow-text">
              YOUR PHILOSOPHICAL CRYSTAL
            </h1>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h2 className="text-neon-cyan text-sm mb-2 font-pixel">ARCHETYPE</h2>
                <p className="text-xl text-gray-300 mb-4">{archetype.name}</p>
                
                <h3 className="text-neon-cyan text-sm mb-2 font-pixel">CORE QUESTION</h3>
                <p className="text-sm text-gray-400 italic">"{archetype.question}"</p>
              </div>
              
              <div>
                <h3 className="text-neon-cyan text-sm mb-2 font-pixel">ALCHEMICAL COMPOSITION</h3>
                <div className="flex gap-4 mb-4">
                  {archetype.symbols.map(symbol => (
                    <div key={symbol} className="text-center">
                      <span 
                        className="text-3xl block mb-1"
                        style={{ color: ALCHEMICAL_SYMBOLS[symbol].color }}
                      >
                        {ALCHEMICAL_SYMBOLS[symbol].unicode}
                      </span>
                      <span className="text-xs text-gray-400">{symbol}</span>
                    </div>
                  ))}
                </div>
                
                <h3 className="text-neon-cyan text-sm mb-2 font-pixel">PHILOSOPHICAL DIMENSIONS</h3>
                <div className="grid grid-cols-5 gap-1">
                  {shape.map((value, index) => (
                    <div 
                      key={index}
                      className="h-8 bg-gray-800 border border-gray-600 relative overflow-hidden"
                    >
                      <div 
                        className="absolute bottom-0 left-0 right-0 bg-phosphor-green opacity-50"
                        style={{ height: `${value * 100}%` }}
                      />
                      <span className="absolute inset-0 flex items-center justify-center text-xs text-gray-300">
                        {Math.round(value * 100)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex gap-4">
              <button
                onClick={onReset}
                className="px-4 py-2 border border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black transition-colors text-sm font-pixel"
              >
                BEGIN NEW JOURNEY
              </button>
              <button
                className="px-4 py-2 border border-gray-600 text-gray-400 hover:border-phosphor-green hover:text-phosphor-green transition-colors text-sm font-pixel"
              >
                SAVE CRYSTAL
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Crystal Analysis Panel */}
      <div className="absolute bottom-8 left-8 right-8 pointer-events-none">
        <div className="max-w-2xl mx-auto pointer-events-auto">
          <div className="bg-black bg-opacity-80 border border-neon-cyan p-4 glow-border">
            <h3 className="text-neon-cyan text-sm mb-2 font-pixel">PHILOSOPHICAL ANALYSIS</h3>
            <p className="text-gray-300 text-xs leading-relaxed">
              Your crystal formation reveals a unique philosophical stance characterized by {' '}
              {shape[0] > 0.5 ? 'strong idealist' : 'pragmatic materialist'} tendencies, 
              with {shape[2] > 0.6 ? 'rigid' : 'flexible'} ethical frameworks and {' '}
              {shape[4] > 0.5 ? 'holistic' : 'analytical'} approaches to knowledge.
              The {archetype.domain} domain shapes your core worldview, creating tensions 
              and harmonies that define your philosophical identity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}