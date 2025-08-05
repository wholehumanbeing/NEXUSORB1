export type Domain = 'Logic' | 'Ethics' | 'Metaphysics' | 'Epistemology' | 'Politics' | 'Aesthetics' | 'Philosophy of Religion' | 'Philosophy of Science';

export interface PhilosopherNode {
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
  primaryDomain: Domain;
  era: 'Ancient' | 'Medieval' | 'Modern' | 'Contemporary';
  eraPosition: number;
}

export interface Connection {
  targetId: string;
  sourceId: string;
  strength: number;
  type: 'influence' | 'critique' | 'dialogue' | 'build_upon';
  description: string;
  connectionPath?: [number, number, number][]; // 3D spline points
}

export interface SwitchPoint {
  question: string;
  position: string;
  argument: string;
  domainCascades: Record<Domain, string>;
}

export interface QuizQuestion {
  id: string;
  domain: Domain;
  text: string;
  scenario: string;
  choices: QuizChoice[];
}

export interface QuizChoice {
  text: string;
  weights: Record<string, number>;
  historicalAlignment: {
    philosopherId: string;
    agreementLevel: number;
  }[];
  nextQuestion?: string;
}

export interface QuizResponse {
  questionId: string;
  choice: QuizChoice;
}

export interface PhilosophicalProfile {
  beliefWeights: Record<string, number>;
  historicalAlignments: Record<string, number>;
  beliefVector: [number, number, number];
  harmonyScore: number;
  tensionScore: number;
  internalTensions: TensionLine[];
  beliefHarmonies: HarmonyFlow[];
}

export interface TensionLine {
  from: string;
  to: string;
  intensity: number;
  reason: string;
}

export interface HarmonyFlow {
  beliefs: string[];
  strength: number;
  description: string;
}

export type Layer = 'historical' | 'personal' | 'resonance';