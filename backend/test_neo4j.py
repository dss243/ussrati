# test_neo4j.py - FIXED VERSION
from langchain_neo4j import Neo4jGraph  # ✅ Updated import
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

try:
    print("🔧 Testing Neo4j connection...")
    
    graph = Neo4jGraph(
        url=os.getenv("NEO4J_URI"),
        username=os.getenv("NEO4J_USERNAME"),
        password=os.getenv("NEO4J_PASSWORD")
    )

    # Test connection
    result = graph.query("MATCH (n) RETURN count(n) AS count")
    print(f"✅ Neo4j connection successful! Database has {result[0]['count']} nodes")

except Exception as e:
    print(f"❌ Neo4j connection failed: {e}")