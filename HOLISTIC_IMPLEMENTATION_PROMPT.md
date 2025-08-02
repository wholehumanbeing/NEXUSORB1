# The Philosophical Nexus: Complete Implementation Prompt

## Persona & Context
You are a world-class full-stack developer and 3D visualization expert with deep expertise in Next.js, Three.js, Neo4j, TypeScript, and modern web architecture. You're tasked with building "The Philosophical Nexus" - a revolutionary 3D platform that transforms 2,500+ years of philosophical thought into an immersive, explorable universe.

## Project Vision
Create a three-layer philosophical exploration platform:
1. **Historical Orb**: 3D visualization of 500+ philosophers in nested chronological spheres
2. **Personal Orb**: User's philosophical profile as crystalline structure from quiz responses
3. **Resonance Chamber**: Abstract particle meditation space reflecting philosophical harmony/tension

## Core Requirements
- **Aesthetic**: Retro-futuristic cassette-punk with phosphor green (#00FF00), monospace fonts (VT323), scanlines, CRT effects
- **Performance**: 60+ FPS with 500+ nodes, GPU-based rendering, instanced meshes
- **Data**: Rich philosophical metadata including Spiral Dynamics, philosophical genome, switch points
- **Interaction**: Smooth navigation, influence tracing, domain filtering, era transitions

## Technical Stack
```typescript
// Primary Technologies
Frontend: Next.js 14 + TypeScript + Tailwind CSS
3D Engine: Three.js + React Three Fiber + Drei
State: Zustand (atomic, performant)
Database: Neo4j Aura + Supabase (auth/user data)
Styling: Stitches CSS-in-JS
Audio: Web Audio API
Performance: WebGL shaders, instanced rendering, LOD
```

## Implementation Phases

### Phase 1: Foundation & Core Engine
1. **Project Setup**
   ```bash
   npx create-next-app@14 philosophical-nexus --typescript --tailwind --app
   npm install three @react-three/fiber @react-three/drei zustand @stitches/react
   npm install neo4j-driver @supabase/supabase-js gsap framer-motion
   ```

2. **Directory Structure**
   ```
   /app
     /api
       /graph
       /philosophers
       /quiz
     /components
       /ui (Panel, Button, Input)
       /3d (Globe, PhilosopherNode, ConnectionTrace)
       /layers (HistoricalOrb, PersonalOrb, ResonanceChamber)
     /lib
       /database (neo4j, supabase)
       /utils (audio, performance)
     /data
       /philosophers.json
       /quiz.json
   /public
     /shaders
     /audio
   ```

3. **Core Design System**
   ```typescript
   // /lib/design-system.ts
   export const theme = {
     colors: {
       phosphorGreen: '#00FF00',
       neonCyan: '#00FFFF',
       voidBlack: '#000000',
       critiqueCrimson: '#FF0000',
       spiralDynamics: {
         purple: '#8B00FF', red: '#FF0000', blue: '#0000FF',
         orange: '#FF8C00', green: '#00FF00', yellow: '#FFFF00',
         turquoise: '#40E0D0', coral: '#FF7F50'
       }
     },
     fonts: { mono: 'VT323', pixel: 'Press Start 2P' },
     effects: {
       scanlines: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.03) 2px, rgba(0,255,0,0.03) 4px)',
       glow: '0 0 20px rgba(0,255,0,0.6)',
       chromatic: 'drop-shadow(2px 0 0 #ff0000) drop-shadow(-2px 0 0 #00ffff)'
     }
   };
   ```

### Phase 2: Data Architecture
1. **Neo4j Schema Setup**
   ```cypher
   // Core constraints and indexes
   CREATE CONSTRAINT philosopher_id FOR (p:Philosopher) REQUIRE p.id IS UNIQUE;
   CREATE CONSTRAINT concept_id FOR (c:Concept) REQUIRE c.id IS UNIQUE;
   CREATE INDEX philosopher_era FOR (p:Philosopher) ON (p.era);
   CREATE INDEX philosopher_domain FOR (p:Philosopher) ON (p.primaryDomain);
   
   // Relationship types
   (:Philosopher)-[:INFLUENCED {strength: float, description: string}]->(:Philosopher)
   (:Philosopher)-[:CRITIQUED {strength: float, description: string}]->(:Philosopher)
   (:Philosopher)-[:SWITCH_POINT {question: string, position: string, cascades: [string]}]->(:Concept)
   (:Philosopher)-[:BELONGS_TO]->(:Era)
   (:Philosopher)-[:SPECIALIZES_IN {strength: int}]->(:Domain)
   ```

2. **TypeScript Interfaces**
   ```typescript
   // /lib/types.ts
   interface PhilosopherNode {
     id: string;
     name: string;
     birthYear: number;
     deathYear: number;
     position: [number, number, number]; // 3D coordinates
     spiralDynamicsStage: string;
     spiralJustification: string;
     philosophicalGenome: {
       beingVsBecoming: 'Being' | 'Becoming' | 'Both';
       oneVsMany: 'One' | 'Many' | 'Both';
       mindVsMatter: 'Mind' | 'Matter' | 'Dualist' | 'Synthesis';
       freedomVsDeterminism: 'Freedom' | 'Determinism' | 'Both';
       transcendentVsImmanent: 'Transcendent' | 'Immanent' | 'Both';
       realismVsAntiRealism: 'Realist' | 'Anti-realist' | 'Both';
       reasonVsExperience: 'Reason' | 'Experience' | 'Synthesis';
       absoluteVsRelative: 'Absolute' | 'Relative' | 'Both';
     };
     switchPoints: SwitchPoint[];
     domainStrengths: Record<Domain, number>;
     influences: Connection[];
     critiques: Connection[];
     comprehensiveBiography: string;
     intellectualJourney: string;
   }

   interface Connection {
     targetId: string;
     strength: number;
     type: 'influence' | 'critique' | 'dialogue' | 'build_upon';
     description: string;
     connectionPath?: [number, number, number][]; // 3D spline points
   }

   interface SwitchPoint {
     question: string;
     position: string;
     argument: string;
     domainCascades: Record<Domain, string>;
   }
   ```

3. **Data Ingestion Pipeline**
   ```typescript
   // /scripts/ingest-data.ts
   import { Neo4jDatabase } from '../lib/database/neo4j';
   import philosophersData from '../data/comprehensive_philosophers.json';

   class DataIngestionEngine {
     async ingestPhilosophers() {
       const session = this.neo4j.session();
       
       for (const philosopher of philosophersData) {
         // Create philosopher node with all properties
         await session.run(`
           CREATE (p:Philosopher {
             id: $id, name: $name, birthYear: $birthYear, deathYear: $deathYear,
             spiralDynamicsStage: $spiralStage, philosophicalGenome: $genome,
             position: $position, comprehensiveBiography: $biography
           })
         `, philosopher);
         
         // Create domain relationships
         for (const [domain, strength] of Object.entries(philosopher.domainStrengths)) {
           await session.run(`
             MATCH (p:Philosopher {id: $philId})
             MERGE (d:Domain {name: $domain})
             CREATE (p)-[:SPECIALIZES_IN {strength: $strength}]->(d)
           `, { philId: philosopher.id, domain, strength });
         }
         
         // Create influence relationships
         for (const influence of philosopher.influences) {
           await session.run(`
             MATCH (p1:Philosopher {id: $sourceId})
             MATCH (p2:Philosopher {id: $targetId})
             CREATE (p1)-[:INFLUENCED {
               strength: $strength, 
               description: $description,
               connectionPath: $path
             }]->(p2)
           `, influence);
         }
       }
     }
   }
   ```

### Phase 3: High-Performance 3D Engine
1. **Instanced Philosopher Rendering**
   ```typescript
   // /components/3d/PhilosopherCluster.tsx
   import { useRef, useMemo, useEffect } from 'react';
   import { useFrame } from '@react-three/fiber';
   import * as THREE from 'three';

   export function PhilosopherCluster({ philosophers }: { philosophers: PhilosopherNode[] }) {
     const meshRef = useRef<THREE.InstancedMesh>(null);
     const materialRef = useRef<THREE.ShaderMaterial>(null);
     
     const { geometry, material } = useMemo(() => {
       const geom = new THREE.SphereGeometry(0.1, 16, 16);
       const mat = new THREE.ShaderMaterial({
         uniforms: {
           time: { value: 0 },
           spiralColors: { value: SPIRAL_DYNAMICS_COLORS },
           selectionStates: { value: new Float32Array(philosophers.length) }
         },
         vertexShader: `
           attribute float spiralStage;
           attribute float selectionState;
           uniform float time;
           varying float vSpiral;
           varying float vSelection;
           
           void main() {
             vSpiral = spiralStage;
             vSelection = selectionState;
             
             vec3 pos = position;
             pos += 0.02 * sin(time * 2.0 + spiralStage * 10.0) * normal;
             
             vec4 mvPosition = modelViewMatrix * instanceMatrix * vec4(pos, 1.0);
             gl_Position = projectionMatrix * mvPosition;
           }
         `,
         fragmentShader: `
           uniform vec3 spiralColors[8];
           varying float vSpiral;
           varying float vSelection;
           
           void main() {
             int colorIndex = int(floor(vSpiral));
             vec3 baseColor = spiralColors[colorIndex];
             
             float glow = 1.0 + vSelection * 2.0;
             gl_FragColor = vec4(baseColor * glow, 0.8);
           }
         `
       });
       return { geometry: geom, material: mat };
     }, [philosophers.length]);

     useEffect(() => {
       if (!meshRef.current) return;
       
       const dummy = new THREE.Object3D();
       philosophers.forEach((phil, i) => {
         dummy.position.set(...phil.position);
         dummy.scale.setScalar(phil.domainStrengths.total / 100);
         dummy.updateMatrix();
         meshRef.current!.setMatrixAt(i, dummy.matrix);
       });
       meshRef.current.instanceMatrix.needsUpdate = true;
     }, [philosophers]);

     useFrame(({ clock }) => {
       if (materialRef.current) {
         materialRef.current.uniforms.time.value = clock.elapsedTime;
       }
     });

     return (
       <instancedMesh
         ref={meshRef}
         args={[geometry, material, philosophers.length]}
         material={materialRef.current!}
       />
     );
   }
   ```

2. **GPU-Based Connection Tracing**
   ```typescript
   // /components/3d/FractillionTrace.tsx
   export function FractillionTrace({ connections }: { connections: Connection[] }) {
     const pointsRef = useRef<THREE.Points>(null);
     
     const { geometry, material } = useMemo(() => {
       const particleCount = connections.length * 100;
       const positions = new Float32Array(particleCount * 3);
       const connectionIndices = new Float32Array(particleCount);
       const timeOffsets = new Float32Array(particleCount);
       
       connections.forEach((conn, connIndex) => {
         for (let i = 0; i < 100; i++) {
           const particleIndex = connIndex * 100 + i;
           connectionIndices[particleIndex] = connIndex;
           timeOffsets[particleIndex] = Math.random();
         }
       });
       
       const geom = new THREE.BufferGeometry();
       geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
       geom.setAttribute('connectionIndex', new THREE.BufferAttribute(connectionIndices, 1));
       geom.setAttribute('timeOffset', new THREE.BufferAttribute(timeOffsets, 1));
       
       const mat = new THREE.ShaderMaterial({
         uniforms: {
           time: { value: 0 },
           connectionPaths: { value: connections.map(c => c.connectionPath).flat() },
           traceColor: { value: new THREE.Color('#00FF00') }
         },
         vertexShader: `
           attribute float connectionIndex;
           attribute float timeOffset;
           uniform float time;
           uniform vec3 connectionPaths[${connections.length * 10}];
           
           void main() {
             float progress = mod(time * 0.5 + timeOffset, 1.0);
             int pathStart = int(connectionIndex * 10.0);
             
             // Interpolate along spline path
             vec3 pos = mix(
               connectionPaths[pathStart],
               connectionPaths[pathStart + 9],
               progress
             );
             
             gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
             gl_PointSize = 3.0;
           }
         `,
         fragmentShader: `
           uniform vec3 traceColor;
           void main() {
             float dist = distance(gl_PointCoord, vec2(0.5));
             if (dist > 0.5) discard;
             gl_FragColor = vec4(traceColor, 1.0 - dist * 2.0);
           }
         `
       });
       
       return { geometry: geom, material: mat };
     }, [connections]);

     useFrame(({ clock }) => {
       if (material.uniforms) {
         material.uniforms.time.value = clock.elapsedTime;
       }
     });

     return <points ref={pointsRef} geometry={geometry} material={material} />;
   }
   ```

### Phase 4: Layer Implementation
1. **Historical Orb Scene**
   ```typescript
   // /components/layers/HistoricalOrb.tsx
   import { Canvas } from '@react-three/fiber';
   import { OrbitControls, Environment } from '@react-three/drei';
   import { PhilosopherCluster } from '../3d/PhilosopherCluster';
   import { FractillionTrace } from '../3d/FractillionTrace';
   import { NestedSpheres } from '../3d/NestedSpheres';

   export function HistoricalOrb() {
     const { philosophers, connections, selectedEra } = useHistoricalOrbStore();
     
     return (
       <div className="relative h-screen bg-black">
         <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
           <Environment preset="night" />
           <ambientLight intensity={0.2} color="#00FF00" />
           <pointLight position={[10, 10, 10]} intensity={0.5} color="#00FFFF" />
           
           <NestedSpheres eras={['Ancient', 'Medieval', 'Modern', 'Contemporary']} />
           <PhilosopherCluster philosophers={philosophers} />
           <FractillionTrace connections={connections} />
           
           <OrbitControls 
             enableDamping
             dampingFactor={0.05}
             minDistance={3}
             maxDistance={50}
           />
         </Canvas>
         
         <div className="absolute top-4 left-4 z-10">
           <FilterPanel />
         </div>
         <div className="absolute bottom-4 right-4 z-10">
           <PhilosopherInfoPanel />
         </div>
       </div>
     );
   }
   ```

2. **Personal Orb with Quiz Integration**
   ```typescript
   // /components/layers/PersonalOrb.tsx
   export function PersonalOrb() {
     const { userProfile, quizComplete } = usePersonalOrbStore();
     
     if (!quizComplete) {
       return <PhilosophicalQuiz />;
     }
     
     return (
       <div className="relative h-screen bg-black">
         <Canvas>
           <PersonalCrystalStructure profile={userProfile} />
           <TensionLines tensions={userProfile.internalTensions} />
           <HarmonyFlows harmonies={userProfile.beliefHarmonies} />
         </Canvas>
         
         <div className="absolute top-4 left-4 z-10">
           <ProfileSummary profile={userProfile} />
         </div>
       </div>
     );
   }

   // /components/PhilosophicalQuiz.tsx
   export function PhilosophicalQuiz() {
     const [currentQuestion, setCurrentQuestion] = useState(0);
     const [responses, setResponses] = useState<QuizResponse[]>([]);
     
     const questions: QuizQuestion[] = [
       {
         id: 'metaphysics_1',
         domain: 'Metaphysics',
         text: 'A tree falls in an empty forest. Did it make a sound?',
         scenario: 'You are hiking alone and witness a massive oak tree crash to the ground with no one else around.',
         choices: [
           {
             text: 'Yes - sound waves were created regardless of observation',
             weights: { empiricism: 10, materialism: 8, realism: 10 },
             historicalAlignment: [
               { philosopherId: 'aristotle', agreementLevel: 85 },
               { philosopherId: 'locke_john', agreementLevel: 90 }
             ]
           },
           {
             text: 'No - sound requires a conscious observer to exist',
             weights: { idealism: 10, phenomenology: 8, subjectivism: 9 },
             historicalAlignment: [
               { philosopherId: 'berkeley_george', agreementLevel: 100 },
               { philosopherId: 'kant_immanuel', agreementLevel: 70 }
             ]
           },
           {
             text: 'The question reveals the limits of language and meaning',
             weights: { linguistic_philosophy: 10, pragmatism: 7 },
             historicalAlignment: [
               { philosopherId: 'wittgenstein_ludwig', agreementLevel: 95 }
             ]
           }
         ]
       }
       // ... 50 more sophisticated questions across all domains
     ];
     
     const handleResponse = (choice: QuizChoice) => {
       setResponses([...responses, { questionId: questions[currentQuestion].id, choice }]);
       
       if (currentQuestion < questions.length - 1) {
         setCurrentQuestion(currentQuestion + 1);
       } else {
         generatePersonalProfile(responses);
       }
     };
     
     return (
       <div className="min-h-screen bg-black text-green-400 font-mono p-8">
         <div className="max-w-4xl mx-auto">
           <div className="mb-8">
             <div className="text-xs mb-2">QUESTION {currentQuestion + 1} OF {questions.length}</div>
             <div className="w-full bg-gray-800 h-2">
               <div 
                 className="bg-green-400 h-2 transition-all duration-300"
                 style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
               />
             </div>
           </div>
           
           <div className="mb-8">
             <div className="text-cyan-400 text-sm mb-2">
               {questions[currentQuestion].domain.toUpperCase()}
             </div>
             <h2 className="text-2xl mb-4 leading-relaxed">
               {questions[currentQuestion].text}
             </h2>
             <div className="text-gray-300 text-sm mb-8 italic">
               {questions[currentQuestion].scenario}
             </div>
           </div>
           
           <div className="space-y-4">
             {questions[currentQuestion].choices.map((choice, index) => (
               <button
                 key={index}
                 onClick={() => handleResponse(choice)}
                 className="w-full text-left p-6 border border-green-400 hover:bg-green-400 hover:bg-opacity-10 transition-all duration-200 text-sm leading-relaxed"
               >
                 <div className="flex items-start">
                   <span className="text-cyan-400 mr-4 font-pixel text-xs">
                     [{String.fromCharCode(65 + index)}]
                   </span>
                   <span>{choice.text}</span>
                 </div>
               </button>
             ))}
           </div>
         </div>
       </div>
     );
   }
   ```

3. **Resonance Chamber**
   ```typescript
   // /components/layers/ResonanceChamber.tsx
   export function ResonanceChamber() {
     const { userProfile } = usePersonalOrbStore();
     
     return (
       <div className="relative h-screen bg-black">
         <Canvas>
           <ResonanceParticleSystem 
             harmony={userProfile.harmonyScore}
             tension={userProfile.tensionScore}
             beliefVector={userProfile.beliefVector}
           />
           <EtherealChamber />
         </Canvas>
         
         <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
           <MeditationControls />
         </div>
       </div>
     );
   }

   // GPU-based particle meditation system
   function ResonanceParticleSystem({ harmony, tension, beliefVector }) {
     const particlesRef = useRef<THREE.Points>(null);
     
     const particleSystem = useMemo(() => {
       const particleCount = 100000;
       const positions = new Float32Array(particleCount * 3);
       const velocities = new Float32Array(particleCount * 3);
       const lifetimes = new Float32Array(particleCount);
       
       for (let i = 0; i < particleCount; i++) {
         positions[i * 3] = (Math.random() - 0.5) * 20;
         positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
         positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
         lifetimes[i] = Math.random() * 10;
       }
       
       const geometry = new THREE.BufferGeometry();
       geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
       geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
       geometry.setAttribute('lifetime', new THREE.BufferAttribute(lifetimes, 1));
       
       const material = new THREE.ShaderMaterial({
         uniforms: {
           time: { value: 0 },
           harmony: { value: harmony },
           tension: { value: tension },
           beliefVector: { value: new THREE.Vector3(...beliefVector) }
         },
         vertexShader: `
           attribute vec3 velocity;
           attribute float lifetime;
           uniform float time;
           uniform float harmony;
           uniform float tension;
           uniform vec3 beliefVector;
           
           void main() {
             vec3 pos = position;
             
             // Harmonic flow
             pos += harmony * 0.1 * sin(time + pos.x * 0.1) * vec3(1, 0, 0);
             pos += harmony * 0.1 * cos(time + pos.y * 0.1) * vec3(0, 1, 0);
             
             // Tension turbulence
             pos += tension * 0.2 * sin(time * 3.0 + pos.z * 0.2) * normalize(pos);
             
             // Belief vector attraction
             vec3 toCenter = -pos * 0.01;
             pos += dot(toCenter, beliefVector) * beliefVector * 0.05;
             
             gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
             gl_PointSize = 2.0;
           }
         `,
         fragmentShader: `
           uniform float harmony;
           uniform float tension;
           
           void main() {
             vec3 harmonyColor = vec3(0.0, 1.0, 0.5);
             vec3 tensionColor = vec3(1.0, 0.2, 0.0);
             vec3 color = mix(harmonyColor, tensionColor, tension);
             
             float dist = distance(gl_PointCoord, vec2(0.5));
             if (dist > 0.5) discard;
             
             gl_FragColor = vec4(color, (1.0 - dist * 2.0) * harmony);
           }
         `
       });
       
       return { geometry, material };
     }, [harmony, tension, beliefVector]);

     useFrame(({ clock }) => {
       if (particleSystem.material.uniforms) {
         particleSystem.material.uniforms.time.value = clock.elapsedTime;
       }
     });

     return (
       <points 
         ref={particlesRef}
         geometry={particleSystem.geometry}
         material={particleSystem.material}
       />
     );
   }
   ```

### Phase 5: State Management & API Integration
1. **Zustand Store Architecture**
   ```typescript
   // /lib/stores/historical-orb-store.ts
   interface HistoricalOrbStore {
     philosophers: PhilosopherNode[];
     connections: Connection[];
     selectedPhilosopher: PhilosopherNode | null;
     filters: {
       era: string[];
       domain: string[];
       spiralStage: string[];
     };
     viewMode: 'orb' | 'helix' | 'network';
     
     // Actions
     loadPhilosophers: () => Promise<void>;
     selectPhilosopher: (id: string) => void;
     updateFilters: (filters: Partial<typeof filters>) => void;
     traceInfluence: (fromId: string, toId: string) => Promise<Connection[]>;
   }

   export const useHistoricalOrbStore = create<HistoricalOrbStore>((set, get) => ({
     philosophers: [],
     connections: [],
     selectedPhilosopher: null,
     filters: { era: [], domain: [], spiralStage: [] },
     viewMode: 'orb',
     
     loadPhilosophers: async () => {
       const response = await fetch('/api/philosophers');
       const philosophers = await response.json();
       set({ philosophers });
     },
     
     selectPhilosopher: (id: string) => {
       const philosopher = get().philosophers.find(p => p.id === id);
       set({ selectedPhilosopher: philosopher || null });
     },
     
     traceInfluence: async (fromId: string, toId: string) => {
       const response = await fetch(`/api/graph/trace?from=${fromId}&to=${toId}`);
       const trace = await response.json();
       return trace;
     }
   }));
   ```

2. **API Routes**
   ```typescript
   // /app/api/philosophers/route.ts
   import { NextResponse } from 'next/server';
   import { Neo4jService } from '../../../lib/database/neo4j';

   export async function GET(request: Request) {
     const { searchParams } = new URL(request.url);
     const era = searchParams.get('era');
     const domain = searchParams.get('domain');
     
     const neo4j = new Neo4jService();
     
     let query = `
       MATCH (p:Philosopher)
       OPTIONAL MATCH (p)-[r:INFLUENCED]->(target:Philosopher)
       OPTIONAL MATCH (p)-[s:SPECIALIZES_IN]->(d:Domain)
     `;
     
     const params: any = {};
     
     if (era) {
       query += ` WHERE p.era = $era`;
       params.era = era;
     }
     
     query += `
       RETURN p, 
              collect({target: target.id, strength: r.strength, description: r.description}) as influences,
              collect({domain: d.name, strength: s.strength}) as domains
     `;
     
     const result = await neo4j.run(query, params);
     
     const philosophers = result.records.map(record => ({
       ...record.get('p').properties,
       influences: record.get('influences'),
       domains: record.get('domains')
     }));
     
     return NextResponse.json(philosophers);
   }

   // /app/api/graph/trace/route.ts
   export async function GET(request: Request) {
     const { searchParams } = new URL(request.url);
     const fromId = searchParams.get('from');
     const toId = searchParams.get('to');
     
     if (!fromId || !toId) {
       return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
     }
     
     const neo4j = new Neo4jService();
     
     // Find all paths between philosophers
     const query = `
       MATCH path = allShortestPaths((from:Philosopher {id: $fromId})-[:INFLUENCED*1..6]-(to:Philosopher {id: $toId}))
       RETURN path, length(path) as pathLength
       ORDER BY pathLength
       LIMIT 5
     `;
     
     const result = await neo4j.run(query, { fromId, toId });
     
     const traces = result.records.map(record => {
       const path = record.get('path');
       return {
         nodes: path.segments.map(seg => seg.start.properties),
         relationships: path.segments.map(seg => seg.relationship.properties),
         length: record.get('pathLength')
       };
     });
     
     return NextResponse.json(traces);
   }
   ```

### Phase 6: Advanced Features
1. **Audio System**
   ```typescript
   // /lib/audio/philosophical-soundscape.ts
   export class PhilosophicalAudioEngine {
     private context: AudioContext;
     private gainNode: GainNode;
     private philosopherTones: Map<string, number> = new Map();
     
     constructor() {
       this.context = new (window.AudioContext || window.webkitAudioContext)();
       this.gainNode = this.context.createGain();
       this.gainNode.connect(this.context.destination);
       
       // Map philosophers to frequencies based on their birth year
       this.initializePhilosopherTones();
     }
     
     private initializePhilosopherTones() {
       // Map birth years to musical frequencies
       const baseFreq = 220; // A3
       const philosophers = useHistoricalOrbStore.getState().philosophers;
       
       philosophers.forEach(phil => {
         const normalizedYear = (phil.birthYear + 600) / 2600; // -600 to 2000 -> 0 to 1
         const frequency = baseFreq * Math.pow(2, normalizedYear * 3); // 3 octave range
         this.philosopherTones.set(phil.id, frequency);
       });
     }
     
     playPhilosopherTone(philosopherId: string, duration: number = 1.0) {
       const frequency = this.philosopherTones.get(philosopherId) || 440;
       
       const oscillator = this.context.createOscillator();
       const envelope = this.context.createGain();
       
       oscillator.type = 'sine';
       oscillator.frequency.setValueAtTime(frequency, this.context.currentTime);
       
       envelope.gain.setValueAtTime(0, this.context.currentTime);
       envelope.gain.linearRampToValueAtTime(0.1, this.context.currentTime + 0.1);
       envelope.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + duration);
       
       oscillator.connect(envelope);
       envelope.connect(this.gainNode);
       
       oscillator.start();
       oscillator.stop(this.context.currentTime + duration);
     }
     
     playInfluenceTrace(connection: Connection) {
       const sourceFreq = this.philosopherTones.get(connection.sourceId) || 440;
       const targetFreq = this.philosopherTones.get(connection.targetId) || 440;
       
       // Play ascending arpeggio from source to target
       const steps = 8;
       const stepDuration = 0.15;
       
       for (let i = 0; i < steps; i++) {
         const t = i / (steps - 1);
         const frequency = sourceFreq + (targetFreq - sourceFreq) * t;
         
         setTimeout(() => {
           this.playTone(frequency, stepDuration);
         }, i * stepDuration * 1000);
       }
     }
     
     private playTone(frequency: number, duration: number) {
       const oscillator = this.context.createOscillator();
       const envelope = this.context.createGain();
       
       oscillator.frequency.setValueAtTime(frequency, this.context.currentTime);
       envelope.gain.setValueAtTime(0.05, this.context.currentTime);
       envelope.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + duration);
       
       oscillator.connect(envelope);
       envelope.connect(this.gainNode);
       
       oscillator.start();
       oscillator.stop(this.context.currentTime + duration);
     }
   }
   ```

2. **Performance Optimization**
   ```typescript
   // /lib/performance/lod-system.ts
   export class PhilosopherLODSystem {
     private camera: THREE.Camera;
     private lodLevels = [
       { distance: 5, detail: 'high', sphereSegments: 32 },
       { distance: 15, detail: 'medium', sphereSegments: 16 },
       { distance: 30, detail: 'low', sphereSegments: 8 },
       { distance: Infinity, detail: 'point', sphereSegments: 4 }
     ];
     
     calculateLOD(philosopher: PhilosopherNode): LODLevel {
       const distance = this.camera.position.distanceTo(
         new THREE.Vector3(...philosopher.position)
       );
       
       for (const level of this.lodLevels) {
         if (distance < level.distance) {
           return level;
         }
       }
       
       return this.lodLevels[this.lodLevels.length - 1];
     }
     
     updateInstancedMeshLOD(instancedMesh: THREE.InstancedMesh, philosophers: PhilosopherNode[]) {
       const dummy = new THREE.Object3D();
       
       philosophers.forEach((phil, index) => {
         const lod = this.calculateLOD(phil);
         
         dummy.position.set(...phil.position);
         dummy.scale.setScalar(lod.detail === 'point' ? 0.02 : 0.1);
         dummy.updateMatrix();
         
         instancedMesh.setMatrixAt(index, dummy.matrix);
       });
       
       instancedMesh.instanceMatrix.needsUpdate = true;
     }
   }
   ```

## Final Integration & Deployment
1. **Main App Component**
   ```typescript
   // /app/page.tsx
   'use client';
   
   import { useState } from 'react';
   import { HistoricalOrb } from './components/layers/HistoricalOrb';
   import { PersonalOrb } from './components/layers/PersonalOrb';
   import { ResonanceChamber } from './components/layers/ResonanceChamber';
   import { LayerNavigation } from './components/ui/LayerNavigation';
   import { AuthPanel } from './components/auth/AuthPanel';
   
   type Layer = 'historical' | 'personal' | 'resonance';
   
   export default function PhilosophicalNexus() {
     const [currentLayer, setCurrentLayer] = useState<Layer>('historical');
     const [isAuthenticated, setIsAuthenticated] = useState(false);
     
     const renderLayer = () => {
       switch (currentLayer) {
         case 'historical':
           return <HistoricalOrb />;
         case 'personal':
           return <PersonalOrb />;
         case 'resonance':
           return <ResonanceChamber />;
         default:
           return <HistoricalOrb />;
       }
     };
     
     return (
       <div className="min-h-screen bg-black text-green-400 font-mono overflow-hidden">
         {/* CRT Effect Overlay */}
         <div className="fixed inset-0 pointer-events-none z-50 opacity-10">
           <div className="w-full h-full bg-scanlines" />
         </div>
         
         {/* Main Content */}
         <div className="relative z-10">
           {renderLayer()}
         </div>
         
         {/* Layer Navigation */}
         <div className="fixed top-4 right-4 z-20">
           <LayerNavigation 
             currentLayer={currentLayer} 
             onLayerChange={setCurrentLayer}
             isAuthenticated={isAuthenticated}
           />
         </div>
         
         {/* Auth Panel */}
         {!isAuthenticated && (
           <div className="fixed top-4 left-4 z-20">
             <AuthPanel onAuthenticated={() => setIsAuthenticated(true)} />
           </div>
         )}
       </div>
     );
   }
   ```

2. **Environment Setup**
   ```env
   # .env.local
   NEO4J_URI=neo4j+s://your-instance.databases.neo4j.io
   NEO4J_USERNAME=neo4j
   NEO4J_PASSWORD=your-password
   
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

3. **Deployment Configuration**
   ```json
   // package.json
   {
     "scripts": {
       "dev": "next dev",
       "build": "next build",
       "start": "next start",
       "ingest": "tsx scripts/ingest-data.ts"
     },
     "dependencies": {
       "next": "14.1.0",
       "react": "^18.2.0",
       "three": "^0.160.0",
       "@react-three/fiber": "^8.15.0",
       "@react-three/drei": "^9.95.0",
       "zustand": "^4.4.7",
       "@stitches/react": "^1.2.8",
       "neo4j-driver": "^5.16.0",
       "@supabase/supabase-js": "^2.38.5",
       "gsap": "^3.12.2",
       "framer-motion": "^10.16.16"
     }
   }
   ```

## Success Metrics & Testing
- **Performance**: 60+ FPS with 500+ nodes on mid-range hardware
- **Engagement**: 15+ minute average session length
- **Discovery**: 80% of users interact with influence traces
- **Learning**: 40% improvement in philosophical concept retention
- **Scalability**: Support for 1000+ concurrent users

## Implementation Priority
1. **Week 1-2**: Core 3D engine and basic orb rendering
2. **Week 3-4**: Data ingestion and philosopher visualization  
3. **Week 5-6**: Interactive features and filtering
4. **Week 7-8**: Personal orb and quiz system
5. **Week 9-10**: Resonance chamber and audio integration
6. **Week 11-12**: Polish, optimization, and deployment

This implementation creates a truly revolutionary platform that transforms abstract philosophical concepts into tangible, explorable experiences while maintaining the retro-futuristic aesthetic that makes the interface both beautiful and functional.