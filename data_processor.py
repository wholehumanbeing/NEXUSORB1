import pandas as pd
import numpy as np
import json
import streamlit as st
from pathlib import Path

class PhilosopherDataProcessor:
    """Handles loading and processing of philosopher data"""
    
    def __init__(self):
        self.philosophers_data = None
    
    def load_data(self):
        """Load philosopher data from JSON file"""
        try:
            # Try working data first, then fallback to basic data
            data_paths = [
                Path("data/working_philosophers.json"),
                Path("data/philosophers.json")
            ]
            
            for data_path in data_paths:
                if data_path.exists():
                    with open(data_path, 'r', encoding='utf-8') as f:
                        self.philosophers_data = json.load(f)
                    return self.process_data()
            
            # If no data found, create empty structure
            return self.create_empty_dataframe()
            
        except Exception as e:
            st.error(f"Error loading data: {str(e)}")
            return self.create_empty_dataframe()
    
    def create_empty_dataframe(self):
        """Create an empty DataFrame with expected columns"""
        return pd.DataFrame(columns=[
            'id', 'name', 'birthYear', 'deathYear', 'era', 'primaryDomain',
            'allDomains', 'spiralDynamicsStage', 'x', 'y', 'z', 'color'
        ])
    
    def process_data(self):
        """Process raw philosopher data into DataFrame"""
        if not self.philosophers_data:
            return self.create_empty_dataframe()
        
        processed_data = []
        
        for philosopher in self.philosophers_data:
            # Extract basic information
            philosopher_data = {
                'id': philosopher.get('id', ''),
                'name': philosopher.get('name', ''),
                'birthYear': philosopher.get('birthYear', 0),
                'deathYear': philosopher.get('deathYear', 0),
                'era': philosopher.get('era', 'Unknown'),
                'primaryDomain': philosopher.get('primaryDomain', 'Unknown'),
                'allDomains': philosopher.get('allDomains', []),
                'spiralDynamicsStage': philosopher.get('spiralDynamicsStage', 'Unknown'),
                'birthLocation': philosopher.get('birthLocation', {}),
                'domainStrengths': philosopher.get('domainStrengths', {}),
                'comprehensiveBiography': philosopher.get('comprehensiveBiography', ''),
                'switchPoints': philosopher.get('switchPoints', [])
            }
            
            # Generate 3D coordinates for orb positioning
            coords = self.generate_orb_coordinates(len(processed_data))
            philosopher_data.update(coords)
            
            # Assign color based on era or domain
            philosopher_data['color'] = self.get_philosopher_color(philosopher_data)
            
            processed_data.append(philosopher_data)
        
        return pd.DataFrame(processed_data)
    
    def generate_orb_coordinates(self, index):
        """Generate 3D coordinates on a sphere surface"""
        # Use golden ratio for spiral distribution
        golden_ratio = (1 + 5**0.5) / 2
        
        # Generate coordinates using Fibonacci sphere
        i = index
        theta = 2 * np.pi * i / golden_ratio
        phi = np.arccos(1 - 2 * i / (index + 1)) if index > 0 else 0
        
        radius = 5  # Base radius for the orb
        
        x = radius * np.sin(phi) * np.cos(theta)
        y = radius * np.sin(phi) * np.sin(theta)
        z = radius * np.cos(phi)
        
        return {'x': x, 'y': y, 'z': z}
    
    def get_philosopher_color(self, philosopher_data):
        """Assign color based on era or domain"""
        era_colors = {
            'Ancient': '#FF6B6B',      # Red
            'Classical': '#4ECDC4',    # Teal
            'Medieval': '#45B7D1',     # Blue
            'Renaissance': '#96CEB4',  # Green
            'Modern': '#FFEAA7',       # Yellow
            'Contemporary': '#DDA0DD', # Plum
            'Postmodern': '#98D8C8'    # Mint
        }
        
        era = philosopher_data.get('era', 'Unknown')
        return era_colors.get(era, '#00FF00')  # Default to phosphor green
    
    def filter_philosophers(self, df, domain_filter, era_filter, search_term):
        """Filter philosophers based on criteria"""
        filtered_df = df.copy()
        
        # Apply domain filter
        if domain_filter != "All":
            filtered_df = filtered_df[
                (filtered_df['primaryDomain'] == domain_filter) |
                (filtered_df['allDomains'].apply(lambda x: domain_filter in x if isinstance(x, list) else False))
            ]
        
        # Apply era filter
        if era_filter != "All":
            filtered_df = filtered_df[filtered_df['era'] == era_filter]
        
        # Apply search filter
        if search_term:
            search_mask = filtered_df['name'].str.contains(search_term, case=False, na=False)
            filtered_df = filtered_df[search_mask]
        
        return filtered_df
    
    def get_all_domains(self):
        """Get all unique domains from the data"""
        if self.philosophers_data is None:
            return []
        
        domains = set()
        for philosopher in self.philosophers_data:
            # Add primary domain
            if 'primaryDomain' in philosopher:
                domains.add(philosopher['primaryDomain'])
            
            # Add all domains
            if 'allDomains' in philosopher:
                domains.update(philosopher['allDomains'])
        
        return list(domains)
    
    def get_all_eras(self):
        """Get all unique eras from the data"""
        if self.philosophers_data is None:
            return []
        
        eras = set()
        for philosopher in self.philosophers_data:
            if 'era' in philosopher:
                eras.add(philosopher['era'])
        
        return list(eras)
    
    def get_philosopher_by_id(self, df, philosopher_id):
        """Get philosopher details by ID"""
        if self.philosophers_data is None:
            return None
        
        for philosopher in self.philosophers_data:
            if philosopher.get('id') == philosopher_id:
                return philosopher
        
        return None
