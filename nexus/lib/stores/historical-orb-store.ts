import { create } from 'zustand';
import { PhilosopherNode, Connection, Domain } from '../types';

interface HistoricalOrbStore {
  philosophers: PhilosopherNode[];
  connections: Connection[];
  selectedPhilosopher: PhilosopherNode | null;
  hoveredPhilosopher: PhilosopherNode | null;
  previewPhilosopher: PhilosopherNode | null;
  mousePosition: { x: number; y: number };
  filters: {
    era: string[];
    domain: Domain[];
    spiralStage: string[];
  };
  viewMode: 'orb' | 'helix' | 'network';
  loading: boolean;
  
  // Actions
  setPhilosophers: (philosophers: PhilosopherNode[]) => void;
  setConnections: (connections: Connection[]) => void;
  selectPhilosopher: (philosopher: PhilosopherNode | null) => void;
  setHoveredPhilosopher: (philosopher: PhilosopherNode | null) => void;
  setPreviewPhilosopher: (philosopher: PhilosopherNode | null) => void;
  setMousePosition: (position: { x: number; y: number }) => void;
  updateFilters: (filters: Partial<HistoricalOrbStore['filters']>) => void;
  setViewMode: (mode: 'orb' | 'helix' | 'network') => void;
  setLoading: (loading: boolean) => void;
}

export const useHistoricalOrbStore = create<HistoricalOrbStore>((set, get) => ({
  philosophers: [],
  connections: [],
  selectedPhilosopher: null,
  hoveredPhilosopher: null,
  previewPhilosopher: null,
  mousePosition: { x: 0, y: 0 },
  filters: { era: [], domain: [], spiralStage: [] },
  viewMode: 'orb',
  loading: false,
  
  setPhilosophers: (philosophers) => set({ philosophers }),
  setConnections: (connections) => set({ connections }),
  selectPhilosopher: (philosopher) => set({ selectedPhilosopher: philosopher }),
  setHoveredPhilosopher: (philosopher) => set({ hoveredPhilosopher: philosopher }),
  setPreviewPhilosopher: (philosopher) => set({ previewPhilosopher: philosopher }),
  setMousePosition: (position) => set({ mousePosition: position }),
  updateFilters: (newFilters) => set((state) => ({ 
    filters: { ...state.filters, ...newFilters } 
  })),
  setViewMode: (mode) => set({ viewMode: mode }),
  setLoading: (loading) => set({ loading }),
}));