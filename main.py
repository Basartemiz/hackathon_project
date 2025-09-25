
import streamlit as st
import tools.chart_generator
from tools.chart_generator import generate_chart

def main():
    # ---------- Page setup ----------
    st.set_page_config(
        page_title="Mini Dashboard",
        page_icon="📊",
        layout="centered",
        initial_sidebar_state="expanded"
    )


    st.title("📈 Interface for data visualization")

    st.write("Enter a query or text below. The app will produce a quick visualization and a data preview.")

    # ---------- Input Form ----------
    with st.form("query_form", clear_on_submit=False):
        user_text = st.text_input("Input text", placeholder="e.g., 'Show total loans per month for Başar'")
        submitted = st.form_submit_button("Visualize")
    if submitted:
        code=generate_chart(user_text)
        print(f"code from main : {code}")
        st.session_state["code"] = code #get the code
        st.switch_page("pages/charts.py") #switch page
if __name__ == "__main__":
    main()