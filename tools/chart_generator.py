import tools.text_to_sql
import tools.sql_to_chart
from tools.text_to_sql import get_sql_from_query
from tools.sql_to_chart import sql_to_chart_generation

def generate_chart(query):
    sql=get_sql_from_query(query) #get sql
    code=sql_to_chart_generation(sql) #generate charts 
    return code