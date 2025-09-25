'''
python file that automatically converts given query to a chart
'''

import sqlite3
from dotenv import load_dotenv
import os
from langchain_openai import ChatOpenAI

def sql_to_chart_generation(sql_query):
    #connect to database and get data
    db=sqlite3.connect("app.db") #connect
    cur = db.cursor()
    print(sql_query)
    cur.execute(sql_query.strip("```"))

    rows=cur.fetchall()
    columns = [desc[0] for desc in cur.description]  # column names
    #send relevant data to llm and get interpretion
    load_dotenv()
    api_key = os.getenv("OPENAI_API_KEY")
    llm=ChatOpenAI(
        model="gpt-4o-mini",
        temperature=0.1,
        api_key=api_key,
    )
    print(rows)
    prompt = f"""
        You are a Python data visualization expert.

        Task:
        - I will give you raw database rows: {rows}
        - The SQL query that produced them: {sql_query}
        - Also the column names: {columns}
        - Generate Python code that loads these rows into a pandas DataFrame
        and creates the most meaningful visualizations using the st.plotly_chart(fig) function.
        (histograms for numeric columns, bar charts for categories,
        time series plots for date columns).
        example:
            import plotly.express as px

            # Bar chart example
            fig = px.bar(df, x="Customer", y="total_loans",
                         title="Total Loans for Başar Temiz",
                         text="total_loans")
            st.plotly_chart(fig, use_container_width=True)

            # Histogram example
            fig = px.histogram(df, x="age", nbins=20,
                               title="Age Distribution")
            st.plotly_chart(fig, use_container_width=True)

            # Time series example
            fig = px.line(df, x="date", y="sales",
                          title="Sales Over Time")
            st.plotly_chart(fig, use_container_width=True)

        Rules:
        - Only output Python code, nothing else (no explanations).
        - Use pandas and plotly.express only.
        - The code must be runnable as-is.
        - Show each chart with st.plotly_chart(fig, use_container_width=True).

        Now output only the complete Python code.
        """

    response=llm.invoke(prompt) #get response
    code=response.content.strip().strip("```").replace("python","",1).strip() #generate usable code
    print(code)
    return code


