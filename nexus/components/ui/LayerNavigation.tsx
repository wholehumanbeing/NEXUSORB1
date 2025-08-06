'use client';

import { Layer } from '@/lib/types';
import { useState } from 'react';

interface LayerNavigationProps {
  currentLayer: Layer;
  onLayerChange: (layer: Layer) => void;
  isAuthenticated: boolean;
}

export function LayerNavigation({ currentLayer, onLayerChange, isAuthenticated }: LayerNavigationProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const layers: { id: Layer; name: string; description: string; requiresAuth: boolean }[] = [
    {
      id: 'historical',
      name: 'HISTORICAL ORB',
      description: 'Explore 2,500+ years of philosophical thought',
      requiresAuth: false
    },
    {
      id: 'personal',
      name: 'PERSONAL ORB',
      description: 'Discover your philosophical profile',
      requiresAuth: true
    },
    {
      id: 'resonance',
      name: 'RESONANCE CHAMBER',
      description: 'Meditative philosophical reflection',
      requiresAuth: true
    }
  ];

  const activeLayer = layers.find(l => l.id === currentLayer);

  if (isMinimized) {
    return (
      <div className="bg-black border border-phosphor-green p-2 font-mono glow-border">
        <div className="flex items-center justify-between">
          <div className="text-phosphor-green font-pixel text-xs glow-text">
            {activeLayer?.name}
          </div>
          <button
            onClick={() => setIsMinimized(false)}
            className="text-neon-cyan hover:text-phosphor-green transition-colors text-xs font-pixel ml-2"
          >
            [+]
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black border border-phosphor-green p-4 font-mono glow-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-phosphor-green font-pixel text-xs glow-text">
          NEXUS LAYERS
        </h3>
        <button
          onClick={() => setIsMinimized(true)}
          className="text-neon-cyan hover:text-phosphor-green transition-colors text-xs font-pixel"
        >
          [-]
        </button>
      </div>
      
      <div className="space-y-2">
        {layers.map((layer) => {
          const isDisabled = layer.requiresAuth && !isAuthenticated;
          const isActive = currentLayer === layer.id;
          
          return (
            <div key={layer.id}>
              <button
                onClick={() => !isDisabled && onLayerChange(layer.id)}
                disabled={isDisabled}
                className={`w-full text-left p-2 border transition-colors text-xs ${
                  isActive
                    ? 'border-phosphor-green text-phosphor-green bg-phosphor-green bg-opacity-20'
                    : isDisabled
                    ? 'border-gray-600 text-gray-600 cursor-not-allowed'
                    : 'border-gray-600 text-gray-400 hover:border-neon-cyan hover:text-neon-cyan'
                }`}
              >
                <div className="font-bold">{layer.name}</div>
                <div className="text-xs opacity-75 mt-1">{layer.description}</div>
                {isDisabled && (
                  <div className="text-xs text-critique-crimson mt-1">
                    [AUTHENTICATION REQUIRED]
                  </div>
                )}
              </button>
            </div>
          );
        })}
      </div>
      
      {/* Layer Status */}
      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="text-xs text-neon-cyan">
          ACTIVE: {activeLayer?.name}
        </div>
        <div className="text-xs text-gray-400 mt-1">
          STATUS: {isAuthenticated ? 'AUTHENTICATED' : 'GUEST ACCESS'}
        </div>
      </div>
    </div>
  );
}