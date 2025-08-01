import streamlit as st
import pandas as pd
import numpy as np
import plotly.graph_objects as go
import plotly.express as px
import json
import networkx as nx
from data_processor import PhilosopherDataProcessor
from visualization import PhilosophicalOrb
from styles import apply_retro_styles

# Configure page
st.set_page_config(
    page_title="Philosophical Nexus",
    page_icon="🌌",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Apply custom styles
apply_retro_styles()

# Initialize data processor
@st.cache_data
def load_philosopher_data():
    """Load and process philosopher data"""
    processor = PhilosopherDataProcessor()
    return processor.load_data(), processor

# Initialize session state
if 'selected_philosopher' not in st.session_state:
    st.session_state.selected_philosopher = None
if 'filter_domain' not in st.session_state:
    st.session_state.filter_domain = "All"
if 'filter_era' not in st.session_state:
    st.session_state.filter_era = "All"

def main():
    # Load data
    philosophers_df, processor = load_philosopher_data()
    
    if philosophers_df.empty:
        st.error("No philosopher data could be loaded. Please check the data file.")
        return
    
    # Header
    st.markdown("""
    <div style='text-align: center; padding: 20px;'>
        <h1 style='color: #00FF00; font-family: monospace; font-size: 3rem; text-shadow: 0 0 10px #00FF00;'>
            PHILOSOPHICAL NEXUS
        </h1>
        <p style='color: #00FFFF; font-family: monospace; font-size: 1.2rem;'>
            Navigate the interconnected web of philosophical thought
        </p>
    </div>
    """, unsafe_allow_html=True)
    
    # Sidebar controls
    with st.sidebar:
        st.markdown("### 🎛️ CONTROL PANEL")
        
        # Search functionality
        search_term = st.text_input("🔍 Search Philosophers", placeholder="Enter philosopher name...")
        
        # Filters
        st.markdown("#### 📊 Filters")
        
        # Domain filter
        all_domains = ["All"] + sorted(processor.get_all_domains())
        filter_domain = st.selectbox("Domain", all_domains, index=0, key="domain_filter")
        
        # Era filter
        all_eras = ["All"] + sorted(processor.get_all_eras())
        filter_era = st.selectbox("Era", all_eras, index=0, key="era_filter")
        
        # Update session state
        st.session_state.filter_domain = filter_domain
        st.session_state.filter_era = filter_era
        
        # Statistics
        st.markdown("#### 📈 Statistics")
        filtered_df = processor.filter_philosophers(philosophers_df, filter_domain, filter_era, search_term)
        st.metric("Total Philosophers", len(philosophers_df))
        st.metric("Filtered Results", len(filtered_df))
        
        # Selected philosopher info
        if st.session_state.selected_philosopher:
            st.markdown("#### 🎯 Selected")
            philosopher = processor.get_philosopher_by_id(philosophers_df, st.session_state.selected_philosopher)
            if philosopher is not None:
                st.write(f"**{philosopher['name']}**")
                st.write(f"Era: {philosopher['era']}")
                st.write(f"Domain: {philosopher['primaryDomain']}")
    
    # Main content area
    col1, col2 = st.columns([3, 1])
    
    with col1:
        # Create and display the 3D orb
        orb = PhilosophicalOrb(processor)
        filtered_df = processor.filter_philosophers(philosophers_df, filter_domain, filter_era, search_term)
        
        if not filtered_df.empty:
            fig = orb.create_3d_orb(filtered_df)
            
            # Handle click events
            selected_points = st.plotly_chart(
                fig, 
                use_container_width=True, 
                key="philosopher_orb",
                on_select="rerun"
            )
            
            # Update selected philosopher based on click
            if hasattr(st.session_state, 'philosopher_orb') and st.session_state.philosopher_orb:
                selection = st.session_state.philosopher_orb.get('selection', {})
                if selection and 'points' in selection and selection['points']:
                    point_index = selection['points'][0]['pointIndex']
                    if point_index < len(filtered_df):
                        st.session_state.selected_philosopher = filtered_df.iloc[point_index]['id']
                        st.rerun()
        else:
            st.warning("No philosophers match the current filters.")
    
    with col2:
        # Philosopher details panel
        st.markdown("### 📜 PHILOSOPHER DETAILS")
        
        if st.session_state.selected_philosopher:
            philosopher = processor.get_philosopher_by_id(philosophers_df, st.session_state.selected_philosopher)
            if philosopher is not None:
                display_philosopher_details(philosopher)
        else:
            st.markdown("""
            <div style='padding: 20px; border: 1px solid #00FF00; border-radius: 5px; background: rgba(0, 255, 0, 0.05);'>
                <p style='color: #00FF00; text-align: center; margin: 0;'>
                    Click on a philosopher node in the orb to view details
                </p>
            </div>
            """, unsafe_allow_html=True)

def display_philosopher_details(philosopher):
    """Display detailed information about a selected philosopher"""
    
    # Basic info
    st.markdown(f"**Name:** {philosopher['name']}")
    st.markdown(f"**Era:** {philosopher['era']}")
    st.markdown(f"**Years:** {philosopher['birthYear']} - {philosopher['deathYear']}")
    st.markdown(f"**Primary Domain:** {philosopher['primaryDomain']}")
    
    # Birth location
    if 'birthLocation' in philosopher:
        location = philosopher['birthLocation']
        st.markdown(f"**Birth Location:** {location['city']}, {location['region']}")
    
    # Spiral Dynamics stage
    if 'spiralDynamicsStage' in philosopher:
        st.markdown(f"**Spiral Dynamics:** {philosopher['spiralDynamicsStage']}")
    
    # Domain strengths
    if 'domainStrengths' in philosopher:
        st.markdown("**Domain Strengths:**")
        for domain, strength in philosopher['domainStrengths'].items():
            st.progress(strength / 100, text=f"{domain}: {strength}%")
    
    # All domains
    if 'allDomains' in philosopher:
        st.markdown("**All Domains:**")
        st.write(", ".join(philosopher['allDomains']))
    
    # Biography excerpt
    if 'comprehensiveBiography' in philosopher:
        st.markdown("**Biography:**")
        biography = philosopher['comprehensiveBiography']
        # Show first 300 characters
        if len(biography) > 300:
            st.write(biography[:300] + "...")
            if st.button("Read More", key=f"bio_{philosopher['id']}"):
                st.write(biography)
        else:
            st.write(biography)
    
    # Switch points
    if 'switchPoints' in philosopher and philosopher['switchPoints']:
        st.markdown("**Key Ideas:**")
        for i, switch_point in enumerate(philosopher['switchPoints'][:3]):  # Show first 3
            with st.expander(f"💡 {switch_point['question'][:50]}..."):
                st.write(f"**Position:** {switch_point['position']}")
                st.write(f"**Argument:** {switch_point['argument'][:200]}...")

if __name__ == "__main__":
    main()
