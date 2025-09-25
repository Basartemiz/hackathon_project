from sentence_transformers import SentenceTransformer
import faiss
import numpy as np
from dotenv import load_dotenv
import os
from langchain_openai import ChatOpenAI

# --- set safe threading BEFORE heavy imports ---
os.environ.setdefault("TOKENIZERS_PARALLELISM", "false")
os.environ.setdefault("OMP_NUM_THREADS", "1")
os.environ.setdefault("MKL_NUM_THREADS", "1")
os.environ.setdefault("OPENBLAS_NUM_THREADS", "1")

def get_sql_from_query(query)-> str:

    # get description of tables
    table_file=open("table_descriptions.txt","r")
    categories=table_file.read().split(";")

    #vectorize descriptions of tables
    model=SentenceTransformer("paraphrase-multilingual-MiniLM-L12-v2") #get the model
    embeddings = model.encode(categories[:-1], normalize_embeddings=True) #vectorize the descriptions of tables

    

    #use similarity search to find the nearest top 2 schema 
    d=embeddings.shape[1] #get dimensions
    index=faiss.IndexFlatIP(d) #set inner product rule and dimension
    index.add(embeddings) #add the embeddings vector 

    qvec=model.encode([query], normalize_embeddings=True) # normalize vector and get query 
    #qvec = np.asarray(qvec, dtype="float32")  #make this a numpy array

    #search for top 3 schema
    scores,idxs=index.search(qvec,k=3)

    summed_categories=""
    #print scores and indexes
    for i,(index,score) in enumerate(zip(idxs[0],scores[0])):
        print(f"score of categorie: { categories[index]} is {score}")
        summed_categories+=categories[index]+"\n"

    #call openAI to produce SQL string



    load_dotenv() #load env
    api_key = os.getenv("OPENAI_API_KEY")
    print(api_key)
    llm=ChatOpenAI(
        model="gpt-4o-mini",
        temperature=0.1,
        api_key=api_key,
    )

    prompt = f"""
    You are a SQL generator. 
    Only output a valid SQL statement, nothing else. 
    Do not add explanations, comments, or formatting outside SQL.

    Using these 3 tables:
    {summed_categories}

    Query: {query}
    SQL:
    """

    response=llm.invoke(prompt) #get response



    #strip the response
    sql=response.content.strip()
    sql=sql.strip("'''").replace("sql","",1).strip()
    return sql



