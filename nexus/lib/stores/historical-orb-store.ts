import { create } from 'zustand';
import { PhilosopherNode, Connection, Domain } from '../types';

interface HistoricalOrbStore {
  philosophers: PhilosopherNode[];
  connections: Connection[];
  selectedPhilosopher: PhilosopherNode | null;
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
  updateFilters: (filters: Partial<HistoricalOrbStore['filters']>) => void;
  setViewMode: (mode: 'orb' | 'helix' | 'network') => void;
  setLoading: (loading: boolean) => void;
}

export const useHistoricalOrbStore = create<HistoricalOrbStore>((set, get) => ({
  philosophers: [],
  connections: [],
  selectedPhilosopher: null,
  filters: { era: [], domain: [], spiralStage: [] },
  viewMode: 'orb',
  loading: false,
  
  setPhilosophers: (philosophers) => set({ philosophers }),
  setConnections: (connections) => set({ connections }),
  selectPhilosopher: (philosopher) => set({ selectedPhilosopher: philosopher }),
  updateFilters: (newFilters) => set((state) => ({ 
    filters: { ...state.filters, ...newFilters } 
  })),
  setViewMode: (mode) => set({ viewMode: mode }),
  setLoading: (loading) => set({ loading }),
}));