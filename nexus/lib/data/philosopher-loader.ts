import { PhilosopherNode, Connection } from '../types';

export interface RawPhilosopherData {
  id: string;
  name: string;
  birthYear: number;
  deathYear: number;
  birthLocation?: {
    city: string;
    region: string;
    modernCountry: string;
    coordinates: [number, number];
  };
  primaryDomain: string;
  allDomains?: string[];
  domainStrengths: Record<string, number>;
  era: string;
  eraPosition: number;
  spiralDynamicsStage: string;
  spiralJustification: string;
  spiralTransitions?: string[];
  philosophicalGenome: {
    beingVsBecoming: string;
    oneVsMany: string;
    mindVsMatter: string;
    freedomVsDeterminism: string;
    transcendentVsImmanent: string;
    realismVsAntiRealism: string;
    reasonVsExperience: string;
    absoluteVsRelative: string;
    genomeJustifications?: Record<string, string>;
  };
  switchPoints?: Array<{
    question: string;
    position: string;
    argument: string;
    domainCascades?: Record<string, string>;
  }>;
  comprehensiveBiography: string;
  intellectualJourney: string;
  historicalContext?: string;
  influences?: string[];
  critiques?: string[];
  influenceMap?: Record<string, number>;
  critiqueMap?: Record<string, number>;
}

/**
 * Generates 3D position based on philosopher's characteristics
 */
function calculatePosition(philosopher: RawPhilosopherData, index: number, total: number): [number, number, number] {
  // Use era and primary characteristics to position in 3D space
  const eraRadius = philosopher.eraPosition * 8; // Scale era position to radius
  
  // Map era to angle ranges
  const eraAngles: Record<string, [number, number]> = {
    'Ancient': [0, Math.PI / 2],
    'Medieval': [Math.PI / 2, Math.PI],
    'Modern': [Math.PI, 3 * Math.PI / 2],
    'Contemporary': [3 * Math.PI / 2, 2 * Math.PI]
  };
  
  const [minAngle, maxAngle] = eraAngles[philosopher.era] || [0, 2 * Math.PI];
  const angle = minAngle + (philosopher.eraPosition * (maxAngle - minAngle));
  
  // Use genome characteristics for height positioning
  const genomeHeight = getGenomeHeight(philosopher.philosophicalGenome);
  
  // Add some randomness based on philosopher's unique characteristics
  const uniqueOffset = (philosopher.name.charCodeAt(0) % 100) / 100;
  
  const x = eraRadius * Math.cos(angle) + uniqueOffset;
  const z = eraRadius * Math.sin(angle) + uniqueOffset;
  const y = genomeHeight * 4 - 2; // Range from -2 to 2
  
  return [x, y, z];
}

/**
 * Calculate height based on philosophical genome characteristics
 */
function getGenomeHeight(genome: RawPhilosopherData['philosophicalGenome']): number {
  // Map genome positions to numerical values for height calculation
  const values = [
    getGenomeValue(genome.beingVsBecoming),
    getGenomeValue(genome.oneVsMany),
    getGenomeValue(genome.mindVsMatter),
    getGenomeValue(genome.freedomVsDeterminism),
    getGenomeValue(genome.transcendentVsImmanent),
    getGenomeValue(genome.realismVsAntiRealism),
    getGenomeValue(genome.reasonVsExperience),
    getGenomeValue(genome.absoluteVsRelative)
  ];
  
  return values.reduce((sum, val) => sum + val, 0) / values.length;
}

function getGenomeValue(position: string): number {
  const valueMap: Record<string, number> = {
    'Being': 0.2,
    'Becoming': 0.8,
    'One': 0.2,
    'Many': 0.8,
    'Mind': 0.2,
    'Matter': 0.8,
    'Freedom': 0.8,
    'Determinism': 0.2,
    'Transcendent': 0.8,
    'Immanent': 0.2,
    'Realist': 0.2,
    'Anti-realist': 0.8,
    'Reason': 0.2,
    'Experience': 0.8,
    'Absolute': 0.2,
    'Relative': 0.8,
    'Both': 0.5,
    'Dualist': 0.5,
    'Synthesis': 0.5
  };
  
  return valueMap[position] || 0.5;
}

/**
 * Transform raw philosopher data into PhilosopherNode format
 */
export function transformPhilosopherData(rawData: RawPhilosopherData[]): PhilosopherNode[] {
  return rawData.map((raw, index) => ({
    id: raw.id,
    name: raw.name,
    birthYear: raw.birthYear,
    deathYear: raw.deathYear,
    position: calculatePosition(raw, index, rawData.length),
    spiralDynamicsStage: raw.spiralDynamicsStage,
    spiralJustification: raw.spiralJustification,
    philosophicalGenome: {
      beingVsBecoming: raw.philosophicalGenome.beingVsBecoming as any,
      oneVsMany: raw.philosophicalGenome.oneVsMany as any,
      mindVsMatter: raw.philosophicalGenome.mindVsMatter as any,
      freedomVsDeterminism: raw.philosophicalGenome.freedomVsDeterminism as any,
      transcendentVsImmanent: raw.philosophicalGenome.transcendentVsImmanent as any,
      realismVsAntiRealism: raw.philosophicalGenome.realismVsAntiRealism as any,
      reasonVsExperience: raw.philosophicalGenome.reasonVsExperience as any,
      absoluteVsRelative: raw.philosophicalGenome.absoluteVsRelative as any,
    },
    switchPoints: raw.switchPoints || [],
    domainStrengths: raw.domainStrengths,
    influences: raw.influences || [],
    critiques: raw.critiques || [],
    comprehensiveBiography: raw.comprehensiveBiography,
    intellectualJourney: raw.intellectualJourney,
    primaryDomain: raw.primaryDomain,
    era: raw.era as any,
    eraPosition: raw.eraPosition,
    birthLocation: raw.birthLocation,
    allDomains: raw.allDomains,
    historicalContext: raw.historicalContext,
    spiralTransitions: raw.spiralTransitions
  }));
}

/**
 * Generate connections based on influence and critique relationships
 */
export function generateConnections(rawData: RawPhilosopherData[]): Connection[] {
  const connections: Connection[] = [];
  
  rawData.forEach(philosopher => {
    // Process influences
    if (philosopher.influenceMap) {
      Object.entries(philosopher.influenceMap).forEach(([sourceId, strength]) => {
        connections.push({
          sourceId,
          targetId: philosopher.id,
          strength,
          type: 'influence',
          description: `Influences ${philosopher.name}'s philosophical development`
        });
      });
    }
    
    // Process critiques
    if (philosopher.critiqueMap) {
      Object.entries(philosopher.critiqueMap).forEach(([targetId, strength]) => {
        connections.push({
          sourceId: philosopher.id,
          targetId,
          strength,
          type: 'critique',
          description: `${philosopher.name} critiques this philosophical position`
        });
      });
    }
  });
  
  return connections;
}

/**
 * Load and process philosopher data from database API
 */
export async function loadPhilosopherData(): Promise<{ philosophers: PhilosopherNode[], connections: Connection[] }> {
  try {
    const response = await fetch('/api/philosophers');
    if (!response.ok) {
      throw new Error(`Failed to load philosopher data: ${response.statusText}`);
    }
    
    const rawData: RawPhilosopherData[] = await response.json();
    
    const philosophers = transformPhilosopherData(rawData);
    const connections = generateConnections(rawData);
    
    console.log(`Loaded ${philosophers.length} philosophers and ${connections.length} connections`);
    
    return { philosophers, connections };
  } catch (error) {
    console.error('Error loading philosopher data:', error);
    // Fallback to JSON file if API fails
    try {
      const fallbackResponse = await fetch('/data/philosophers.json');
      if (fallbackResponse.ok) {
        const fallbackData: RawPhilosopherData[] = await fallbackResponse.json();
        const philosophers = transformPhilosopherData(fallbackData);
        const connections = generateConnections(fallbackData);
        console.log('Using fallback JSON data:', philosophers.length, 'philosophers');
        return { philosophers, connections };
      }
    } catch (fallbackError) {
      console.error('Fallback also failed:', fallbackError);
    }
    throw error;
  }
}