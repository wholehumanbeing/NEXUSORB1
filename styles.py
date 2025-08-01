import streamlit as st

def apply_retro_styles():
    """Apply retro/cassette-futurism styling to the Streamlit app"""
    
    st.markdown("""
    <style>
    /* Import retro fonts */
    @import url('https://fonts.googleapis.com/css2?family=VT323:wght@400&family=Press+Start+2P&display=swap');
    
    /* Global background and base styling */
    .stApp {
        background: linear-gradient(45deg, #000000 25%, transparent 25%), 
                   linear-gradient(-45deg, #000000 25%, transparent 25%), 
                   linear-gradient(45deg, transparent 75%, #000000 75%), 
                   linear-gradient(-45deg, transparent 75%, #000000 75%);
        background-size: 20px 20px;
        background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
        background-color: #000000;
    }
    
    /* Add scanlines effect */
    .stApp::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 255, 0, 0.03) 2px,
            rgba(0, 255, 0, 0.03) 4px
        );
        pointer-events: none;
        z-index: 1000;
    }
    
    /* Main content styling */
    .main .block-container {
        padding-top: 2rem;
        padding-bottom: 2rem;
        max-width: 100%;
    }
    
    /* Sidebar styling */
    .css-1d391kg {
        background-color: rgba(0, 20, 0, 0.9);
        border-right: 2px solid #00FF00;
        box-shadow: inset 0 0 20px rgba(0, 255, 0, 0.1);
    }
    
    /* Headers and text */
    h1, h2, h3, h4, h5, h6 {
        color: #00FF00 !important;
        font-family: 'VT323', monospace !important;
        text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
        letter-spacing: 2px;
    }
    
    /* Regular text */
    p, div, span, label {
        color: #00FF00 !important;
        font-family: 'VT323', monospace !important;
        font-size: 16px !important;
        letter-spacing: 1px;
    }
    
    /* Input fields */
    .stTextInput input {
        background-color: rgba(0, 0, 0, 0.8) !important;
        border: 2px solid #00FF00 !important;
        color: #00FF00 !important;
        font-family: 'VT323', monospace !important;
        box-shadow: inset 0 0 10px rgba(0, 255, 0, 0.1);
    }
    
    /* Select boxes */
    .stSelectbox select {
        background-color: rgba(0, 0, 0, 0.8) !important;
        border: 2px solid #00FF00 !important;
        color: #00FF00 !important;
        font-family: 'VT323', monospace !important;
    }
    
    /* Buttons */
    .stButton button {
        background-color: rgba(0, 0, 0, 0.8) !important;
        border: 2px solid #00FF00 !important;
        color: #00FF00 !important;
        font-family: 'VT323', monospace !important;
        font-size: 16px !important;
        letter-spacing: 1px;
        transition: all 0.3s ease;
        box-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
    }
    
    .stButton button:hover {
        background-color: rgba(0, 255, 0, 0.1) !important;
        box-shadow: 0 0 20px rgba(0, 255, 0, 0.6);
        text-shadow: 0 0 5px #00FF00;
    }
    
    /* Progress bars */
    .stProgress .st-bo {
        background-color: rgba(0, 255, 0, 0.2) !important;
    }
    
    .stProgress .st-bp {
        background-color: #00FF00 !important;
        box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
    }
    
    /* Metrics */
    .metric-container {
        background-color: rgba(0, 0, 0, 0.8);
        border: 1px solid #00FF00;
        border-radius: 5px;
        padding: 10px;
        box-shadow: inset 0 0 10px rgba(0, 255, 0, 0.1);
    }
    
    /* Expanders */
    .streamlit-expanderHeader {
        background-color: rgba(0, 0, 0, 0.8) !important;
        border: 1px solid #00FF00 !important;
        color: #00FF00 !important;
        font-family: 'VT323', monospace !important;
    }
    
    .streamlit-expanderContent {
        background-color: rgba(0, 20, 0, 0.9) !important;
        border: 1px solid #00FF00 !important;
        border-top: none !important;
    }
    
    /* Custom glitch effect for titles */
    @keyframes glitch {
        0% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
        100% { transform: translate(0); }
    }
    
    /* Warning and error messages */
    .stAlert {
        background-color: rgba(0, 0, 0, 0.9) !important;
        border: 2px solid #FF0000 !important;
        color: #FF0000 !important;
        font-family: 'VT323', monospace !important;
    }
    
    /* Success messages */
    .stSuccess {
        background-color: rgba(0, 0, 0, 0.9) !important;
        border: 2px solid #00FF00 !important;
        color: #00FF00 !important;
        font-family: 'VT323', monospace !important;
    }
    
    /* Hide Streamlit branding */
    #MainMenu {visibility: hidden;}
    footer {visibility: hidden;}
    header {visibility: hidden;}
    
    /* Custom scrollbar */
    ::-webkit-scrollbar {
        width: 12px;
    }
    
    ::-webkit-scrollbar-track {
        background: #000000;
        border: 1px solid #00FF00;
    }
    
    ::-webkit-scrollbar-thumb {
        background: #00FF00;
        border-radius: 6px;
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }
    
    ::-webkit-scrollbar-thumb:hover {
        background: #00FFFF;
    }
    </style>
    """, unsafe_allow_html=True)
