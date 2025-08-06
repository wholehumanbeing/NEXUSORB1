// Archetype System Data
// 42 unique philosophical archetypes based on alchemical symbol combinations

export interface Archetype {
  id: string;
  name: string;
  symbols: AlchemicalSymbol[];
  question: string;
  domain: PhilosophicalDomain;
  description?: string;
  initialShape?: number[]; // 10-dimensional philosophical position
  color: string; // Hex color for visualization
}

export type AlchemicalSymbol = 
  | 'gold' | 'silver' | 'mercury' 
  | 'copper' | 'tin' | 'iron' 
  | 'salt' | 'lead' | 'sulfur';

export type PhilosophicalDomain = 
  | 'metaphysics' | 'consciousness' | 'ethics' 
  | 'epistemology' | 'logic' | 'society';

// Symbol properties for visualization
export const ALCHEMICAL_SYMBOLS: Record<AlchemicalSymbol, {
  name: string;
  unicode: string;
  color: string;
  description: string;
}> = {
  gold: {
    name: 'Gold (Sol)',
    unicode: '☉',
    color: '#FFD700',
    description: 'Perfection, enlightenment, the divine'
  },
  silver: {
    name: 'Silver (Luna)',
    unicode: '☽',
    color: '#C0C0C0',
    description: 'Intuition, reflection, the subconscious'
  },
  mercury: {
    name: 'Mercury',
    unicode: '☿',
    color: '#B5B5B5',
    description: 'Transformation, communication, fluidity'
  },
  copper: {
    name: 'Copper (Venus)',
    unicode: '♀',
    color: '#B87333',
    description: 'Love, harmony, artistic beauty'
  },
  tin: {
    name: 'Tin (Jupiter)',
    unicode: '♃',
    color: '#808080',
    description: 'Wisdom, expansion, growth'
  },
  iron: {
    name: 'Iron (Mars)',
    unicode: '♂',
    color: '#8B4513',
    description: 'Strength, conflict, determination'
  },
  salt: {
    name: 'Salt',
    unicode: '🜔',
    color: '#FFFFFF',
    description: 'Body, physical reality, crystallization'
  },
  lead: {
    name: 'Lead (Saturn)',
    unicode: '♄',
    color: '#413839',
    description: 'Limitation, structure, time'
  },
  sulfur: {
    name: 'Sulfur',
    unicode: '🜍',
    color: '#FFFF00',
    description: 'Soul, volatility, active principle'
  }
};

// Complete list of 42 archetypes
export const ARCHETYPES: Archetype[] = [
  // Gold combinations
  {
    id: 'auric-messenger',
    name: 'The Auric Messenger',
    symbols: ['gold', 'mercury', 'silver'],
    question: 'Can language fully capture reality, or are there truths ineffable?',
    domain: 'metaphysics',
    color: '#FFD700'
  },
  
  // Silver combinations
  {
    id: 'moonlit-sage',
    name: 'The Moonlit Sage',
    symbols: ['silver', 'mercury', 'tin'],
    question: 'Is consciousness reducible to physical processes?',
    domain: 'consciousness',
    color: '#C0C0C0'
  },
  {
    id: 'nightblade',
    name: 'The Nightblade',
    symbols: ['silver', 'mercury', 'iron'],
    question: 'Are people inherently good, evil, or blank slates?',
    domain: 'ethics',
    color: '#9B9B9B'
  },
  {
    id: 'reflective-chalice',
    name: 'The Reflective Chalice',
    symbols: ['silver', 'mercury', 'salt'],
    question: 'Do we have a persistent self or are we a bundle of perceptions?',
    domain: 'consciousness',
    color: '#E5E5E5'
  },
  {
    id: 'shadow-scholar',
    name: 'The Shadow Scholar',
    symbols: ['silver', 'mercury', 'lead'],
    question: 'Do other minds exist and can we know what they experience?',
    domain: 'consciousness',
    color: '#707070'
  },
  {
    id: 'mystic-crucible',
    name: 'The Mystic Crucible',
    symbols: ['silver', 'mercury', 'sulfur'],
    question: 'Can contradictions ever be true?',
    domain: 'logic',
    color: '#DFDFDF'
  },
  {
    id: 'nurturing-oracle',
    name: 'The Nurturing Oracle',
    symbols: ['silver', 'copper', 'tin'],
    question: 'Should the individual serve society or society serve the individual?',
    domain: 'society',
    color: '#D4A76A'
  },
  {
    id: 'devoted-protector',
    name: 'The Devoted Protector',
    symbols: ['silver', 'copper', 'iron'],
    question: 'What is more fundamental: order or justice?',
    domain: 'ethics',
    color: '#A67C52'
  },
  {
    id: 'gentle-vessel',
    name: 'The Gentle Vessel',
    symbols: ['silver', 'copper', 'salt'],
    question: 'Is morality objective or relative?',
    domain: 'ethics',
    color: '#F0E6E6'
  },
  {
    id: 'melancholic-lover',
    name: 'The Melancholic Lover',
    symbols: ['silver', 'copper', 'lead'],
    question: 'Is it better to know an unpleasant truth or live in comforting illusion?',
    domain: 'epistemology',
    color: '#8B7D7B'
  },
  {
    id: 'passionate-dreamer',
    name: 'The Passionate Dreamer',
    symbols: ['silver', 'copper', 'sulfur'],
    question: 'Does language shape reality or merely describe it?',
    domain: 'metaphysics',
    color: '#FFB6C1'
  },
  {
    id: 'visionary-defender',
    name: 'The Visionary Defender',
    symbols: ['silver', 'tin', 'iron'],
    question: 'Should the state prioritize liberty or security?',
    domain: 'society',
    color: '#9FA0A0'
  },
  {
    id: 'keeper-of-tides',
    name: 'The Keeper of Tides',
    symbols: ['silver', 'tin', 'salt'],
    question: 'Does time flow objectively or is it an illusion of consciousness?',
    domain: 'metaphysics',
    color: '#E0E0E0'
  },
  {
    id: 'hermit-prophet',
    name: 'The Hermit Prophet',
    symbols: ['silver', 'tin', 'lead'],
    question: 'Is everything that exists in time and space, or do abstract objects exist?',
    domain: 'metaphysics',
    color: '#696969'
  },
  {
    id: 'lunar-alchemist',
    name: 'The Lunar Alchemist',
    symbols: ['silver', 'tin', 'sulfur'],
    question: 'Is change an illusion?',
    domain: 'metaphysics',
    color: '#F5F5DC'
  },
  {
    id: 'midnight-guardian',
    name: 'The Midnight Guardian',
    symbols: ['silver', 'iron', 'salt'],
    question: 'Does technology control us or do we control technology?',
    domain: 'society',
    color: '#2F4F4F'
  },
  {
    id: 'silent-sentinel',
    name: 'The Silent Sentinel',
    symbols: ['silver', 'iron', 'lead'],
    question: 'Is the mind nothing more than the brain?',
    domain: 'consciousness',
    color: '#555555'
  },
  {
    id: 'witchblade',
    name: 'The Witchblade',
    symbols: ['silver', 'iron', 'sulfur'],
    question: 'Do the ends justify the means?',
    domain: 'ethics',
    color: '#8B008B'
  },
  {
    id: 'moonlit-anchor',
    name: 'The Moonlit Anchor',
    symbols: ['silver', 'salt', 'lead'],
    question: 'Are humans free or determined by biology and environment?',
    domain: 'ethics',
    color: '#708090'
  },
  {
    id: 'dream-vessel',
    name: 'The Dream Vessel',
    symbols: ['silver', 'salt', 'sulfur'],
    question: 'Could the world we experience be just a simulation or illusion?',
    domain: 'metaphysics',
    color: '#E6E6FA'
  },
  {
    id: 'dark-crucible',
    name: 'The Dark Crucible',
    symbols: ['silver', 'lead', 'sulfur'],
    question: 'Does every event have a cause, or can some things happen without cause?',
    domain: 'metaphysics',
    color: '#483D8B'
  },
  
  // Iron combinations
  {
    id: 'defender-of-order',
    name: 'The Defender of Order',
    symbols: ['iron', 'tin', 'salt'],
    question: 'Are the laws of nature actually governing the universe or just descriptions?',
    domain: 'metaphysics',
    color: '#8B4513'
  },
  {
    id: 'just-warrior',
    name: 'The Just Warrior',
    symbols: ['iron', 'tin', 'lead'],
    question: 'Can we be held morally responsible if determinism is true?',
    domain: 'ethics',
    color: '#A0522D'
  },
  {
    id: 'zealous-crusader',
    name: 'The Zealous Crusader',
    symbols: ['iron', 'tin', 'sulfur'],
    question: 'Is truth relative to conceptual scheme or absolute?',
    domain: 'epistemology',
    color: '#CD853F'
  },
  {
    id: 'stoic-guardian',
    name: 'The Stoic Guardian',
    symbols: ['iron', 'salt', 'lead'],
    question: 'Is it worse to do wrong or to suffer wrong?',
    domain: 'ethics',
    color: '#696969'
  },
  {
    id: 'blooded-vessel',
    name: 'The Blooded Vessel',
    symbols: ['iron', 'salt', 'sulfur'],
    question: 'Do non-human animals have rights?',
    domain: 'ethics',
    color: '#B22222'
  },
  {
    id: 'iron-crucible',
    name: 'The Iron Crucible',
    symbols: ['iron', 'lead', 'sulfur'],
    question: 'Is reality fundamentally material or mental?',
    domain: 'metaphysics',
    color: '#8B0000'
  },
  
  // Mercury combinations
  {
    id: 'keeper-of-lore',
    name: 'The Keeper of Lore',
    symbols: ['mercury', 'tin', 'salt'],
    question: 'Does all knowledge come from experience?',
    domain: 'epistemology',
    color: '#87CEEB'
  },
  {
    id: 'wise-architect',
    name: 'The Wise Architect',
    symbols: ['mercury', 'tin', 'lead'],
    question: 'Are numbers and mathematical entities real?',
    domain: 'metaphysics',
    color: '#4682B4'
  },
  {
    id: 'visionary-alchemist',
    name: 'The Visionary Alchemist',
    symbols: ['mercury', 'tin', 'sulfur'],
    question: 'Can machines or AI have consciousness?',
    domain: 'consciousness',
    color: '#00CED1'
  },
  {
    id: 'tactical-herald',
    name: 'The Tactical Herald',
    symbols: ['mercury', 'iron', 'tin'],
    question: 'Is mathematics ultimately invented by humans or discovered?',
    domain: 'metaphysics',
    color: '#5F9EA0'
  },
  {
    id: 'protean-guard',
    name: 'The Protean Guard',
    symbols: ['mercury', 'iron', 'salt'],
    question: 'Is the world ultimately simple or composed of many irreducible elements?',
    domain: 'metaphysics',
    color: '#7B68EE'
  },
  {
    id: 'iron-messenger',
    name: 'The Iron Messenger',
    symbols: ['mercury', 'iron', 'lead'],
    question: 'Is testimony a valid source of knowledge or always secondary?',
    domain: 'epistemology',
    color: '#6495ED'
  },
  {
    id: 'fiery-magus',
    name: 'The Fiery Magus',
    symbols: ['mercury', 'iron', 'sulfur'],
    question: 'Can one obtain knowledge by pure reason alone?',
    domain: 'epistemology',
    color: '#FF6347'
  },
  {
    id: 'silent-scribe',
    name: 'The Silent Scribe',
    symbols: ['mercury', 'salt', 'lead'],
    question: 'Do words have inherent meanings or just usages?',
    domain: 'metaphysics',
    color: '#778899'
  },
  {
    id: 'living-talisman',
    name: 'The Living Talisman',
    symbols: ['mercury', 'salt', 'sulfur'],
    question: 'Is identity something innate or constructed?',
    domain: 'consciousness',
    color: '#20B2AA'
  },
  {
    id: 'secret-fire',
    name: 'The Secret Fire',
    symbols: ['mercury', 'lead', 'sulfur'],
    question: 'Can there be progress in philosophy or only endless debate?',
    domain: 'metaphysics',
    color: '#FF4500'
  },
  {
    id: 'diplomatic-sage',
    name: 'The Diplomatic Sage',
    symbols: ['mercury', 'copper', 'tin'],
    question: 'Is inequality a sign of justice or injustice?',
    domain: 'society',
    color: '#DDA0DD'
  },
  {
    id: 'charming-duelist',
    name: 'The Charming Duelist',
    symbols: ['mercury', 'copper', 'iron'],
    question: 'Do individuals have natural rights?',
    domain: 'ethics',
    color: '#DA70D6'
  },
  {
    id: 'artful-vessel',
    name: 'The Artful Vessel',
    symbols: ['mercury', 'copper', 'salt'],
    question: 'Is beauty objective or in the eye of the beholder?',
    domain: 'epistemology',
    color: '#DDA0DD'
  },
  {
    id: 'cunning-mediator',
    name: 'The Cunning Mediator',
    symbols: ['mercury', 'copper', 'lead'],
    question: 'Should speech be completely free or are some restrictions justified?',
    domain: 'society',
    color: '#9370DB'
  },
  {
    id: 'creative-trickster',
    name: 'The Creative Trickster',
    symbols: ['mercury', 'copper', 'sulfur'],
    question: 'Must every claim be either true or false?',
    domain: 'logic',
    color: '#FF69B4'
  }
];

// Helper function to get archetype by symbol combination
export function getArchetypeBySymbols(symbols: AlchemicalSymbol[]): Archetype | undefined {
  // Sort symbols to ensure consistent matching regardless of order
  const sortedInput = [...symbols].sort();
  
  return ARCHETYPES.find(archetype => {
    const sortedArchetype = [...archetype.symbols].sort();
    return sortedInput.length === sortedArchetype.length &&
           sortedInput.every((symbol, index) => symbol === sortedArchetype[index]);
  });
}

// Helper function to get archetypes by domain
export function getArchetypesByDomain(domain: PhilosophicalDomain): Archetype[] {
  return ARCHETYPES.filter(archetype => archetype.domain === domain);
}

// Generate unique color blend from symbols
export function generateArchetypeColor(symbols: AlchemicalSymbol[]): string {
  const colors = symbols.map(s => ALCHEMICAL_SYMBOLS[s].color);
  // Simple color blending algorithm
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
}