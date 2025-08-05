export const theme = {
  colors: {
    phosphorGreen: '#00FF00',
    neonCyan: '#00FFFF',
    voidBlack: '#000000',
    critiqueCrimson: '#FF0000',
    spiralDynamics: {
      purple: '#8B00FF',
      red: '#FF0000', 
      blue: '#0000FF',
      orange: '#FF8C00',
      green: '#00FF00',
      yellow: '#FFFF00',
      turquoise: '#40E0D0',
      coral: '#FF7F50'
    }
  },
  fonts: { 
    mono: 'VT323', 
    pixel: 'Press Start 2P' 
  },
  effects: {
    scanlines: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.03) 2px, rgba(0,255,0,0.03) 4px)',
    glow: '0 0 20px rgba(0,255,0,0.6)',
    chromatic: 'drop-shadow(2px 0 0 #ff0000) drop-shadow(-2px 0 0 #00ffff)'
  }
};

export const SPIRAL_DYNAMICS_COLORS = [
  theme.colors.spiralDynamics.purple,  // Purple
  theme.colors.spiralDynamics.red,     // Red
  theme.colors.spiralDynamics.blue,    // Blue
  theme.colors.spiralDynamics.orange,  // Orange
  theme.colors.spiralDynamics.green,   // Green
  theme.colors.spiralDynamics.yellow,  // Yellow
  theme.colors.spiralDynamics.turquoise, // Turquoise
  theme.colors.spiralDynamics.coral    // Coral
];