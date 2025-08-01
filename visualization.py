import plotly.graph_objects as go
import plotly.express as px
import numpy as np
import pandas as pd

class PhilosophicalOrb:
    """Creates 3D visualizations for the philosophical nexus"""
    
    def __init__(self, data_processor):
        self.data_processor = data_processor
    
    def create_3d_orb(self, philosophers_df):
        """Create the main 3D orb visualization"""
        
        fig = go.Figure()
        
        # Add wireframe sphere
        self.add_wireframe_sphere(fig)
        
        # Add philosopher nodes
        self.add_philosopher_nodes(fig, philosophers_df)
        
        # Add domain wedges
        self.add_domain_wedges(fig)
        
        # Configure layout
        self.configure_layout(fig)
        
        return fig
    
    def add_wireframe_sphere(self, fig, radius=5):
        """Add wireframe sphere to represent the orb structure"""
        
        # Create sphere wireframe
        u = np.linspace(0, 2 * np.pi, 30)
        v = np.linspace(0, np.pi, 20)
        
        # Longitude lines
        for i in range(0, len(u), 3):
            theta = u[i]
            x_line = radius * np.sin(v) * np.cos(theta)
            y_line = radius * np.sin(v) * np.sin(theta)
            z_line = radius * np.cos(v)
            
            fig.add_trace(go.Scatter3d(
                x=x_line, y=y_line, z=z_line,
                mode='lines',
                line=dict(color='#00FF00', width=1),
                showlegend=False,
                hoverinfo='skip'
            ))
        
        # Latitude lines
        for i in range(1, len(v)-1, 2):
            phi = v[i]
            x_line = radius * np.sin(phi) * np.cos(u)
            y_line = radius * np.sin(phi) * np.sin(u)
            z_line = radius * np.cos(phi) * np.ones_like(u)
            
            fig.add_trace(go.Scatter3d(
                x=x_line, y=y_line, z=z_line,
                mode='lines',
                line=dict(color='#00FF00', width=1),
                showlegend=False,
                hoverinfo='skip'
            ))
    
    def add_philosopher_nodes(self, fig, philosophers_df):
        """Add philosopher nodes to the visualization"""
        
        if philosophers_df.empty:
            return
        
        # Group by era for better visualization
        eras = philosophers_df['era'].unique()
        
        for era in eras:
            era_df = philosophers_df[philosophers_df['era'] == era]
            
            fig.add_trace(go.Scatter3d(
                x=era_df['x'],
                y=era_df['y'],
                z=era_df['z'],
                mode='markers+text',
                marker=dict(
                    size=8,
                    color=era_df['color'],
                    opacity=0.8,
                    line=dict(width=2, color='#00FF00')
                ),
                text=era_df['name'],
                textposition="top center",
                textfont=dict(size=10, color='#00FF00'),
                name=era,
                hovertemplate=(
                    "<b>%{text}</b><br>" +
                    "Era: " + era + "<br>" +
                    "Domain: %{customdata[0]}<br>" +
                    "Years: %{customdata[1]} - %{customdata[2]}<br>" +
                    "<extra></extra>"
                ),
                customdata=era_df[['primaryDomain', 'birthYear', 'deathYear']].values
            ))
    
    def add_domain_wedges(self, fig):
        """Add visual indicators for the five philosophical domains"""
        
        domains = [
            ('Logic', '#FF0000', 0),
            ('Ethics', '#00FFFF', 72),
            ('Metaphysics', '#FF00FF', 144),
            ('Politics', '#FFFF00', 216),
            ('Aesthetics', '#FFA500', 288)
        ]
        
        radius = 6
        
        for domain, color, angle_offset in domains:
            # Create wedge lines
            angle_rad = np.radians(angle_offset)
            angles = np.linspace(angle_rad, angle_rad + np.radians(72), 10)
            
            for r in [4, 5, 6]:
                x_wedge = r * np.cos(angles)
                y_wedge = r * np.sin(angles)
                z_wedge = np.zeros_like(angles)
                
                fig.add_trace(go.Scatter3d(
                    x=x_wedge, y=y_wedge, z=z_wedge,
                    mode='lines',
                    line=dict(color=color, width=2, dash='dot'),
                    name=domain,
                    showlegend=False,
                    hoverinfo='skip'
                ))
    
    def configure_layout(self, fig):
        """Configure the 3D plot layout"""
        
        fig.update_layout(
            title=dict(
                text="Philosophical Nexus Orb",
                font=dict(color='#00FF00', size=20, family='monospace'),
                x=0.5
            ),
            scene=dict(
                bgcolor='rgba(0,0,0,0)',
                xaxis=dict(
                    showbackground=False,
                    showticklabels=False,
                    showgrid=False,
                    zeroline=False,
                    title=""
                ),
                yaxis=dict(
                    showbackground=False,
                    showticklabels=False,
                    showgrid=False,
                    zeroline=False,
                    title=""
                ),
                zaxis=dict(
                    showbackground=False,
                    showticklabels=False,
                    showgrid=False,
                    zeroline=False,
                    title=""
                ),
                camera=dict(
                    eye=dict(x=1.5, y=1.5, z=1.5),
                    center=dict(x=0, y=0, z=0)
                ),
                aspectmode='cube'
            ),
            paper_bgcolor='rgba(0,0,0,0)',
            plot_bgcolor='rgba(0,0,0,0)',
            font=dict(color='#00FF00', family='monospace'),
            margin=dict(l=0, r=0, t=50, b=0),
            showlegend=True,
            legend=dict(
                bgcolor='rgba(0,0,0,0.8)',
                bordercolor='#00FF00',
                borderwidth=1
            )
        )
    
    def create_network_graph(self, philosophers_df):
        """Create a network graph showing relationships between philosophers"""
        
        # This would implement the relationship network
        # For now, return a placeholder
        fig = go.Figure()
        
        fig.add_annotation(
            text="Network Graph Feature Coming Soon",
            xref="paper", yref="paper",
            x=0.5, y=0.5,
            xanchor='center', yanchor='middle',
            font=dict(size=20, color='#00FF00'),
            showarrow=False
        )
        
        fig.update_layout(
            xaxis=dict(visible=False),
            yaxis=dict(visible=False),
            paper_bgcolor='rgba(0,0,0,0)',
            plot_bgcolor='rgba(0,0,0,0)'
        )
        
        return fig
