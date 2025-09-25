import streamlit as st
import os

#set page config
st.set_page_config(page_title="Charts for Visualization", page_icon="📊", layout="wide") #set page config

st.title("📊 Charts") #set title for the page


#exec code and generate charts
code=st.session_state["code"] #get code

exec(code) #execute code





