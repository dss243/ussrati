from langchain_neo4j import Neo4jGraph
from dotenv import load_dotenv
import os
from typing import List, Dict, Any

load_dotenv()

NEO4J_URI = os.environ["NEO4J_URI"]
NEO4J_USERNAME = os.environ["NEO4J_USERNAME"]
NEO4J_PASSWORD = os.environ["NEO4J_PASSWORD"]
NEO4J_DATABASE = os.environ.get("NEO4J_DATABASE", "neo4j")

graph = Neo4jGraph(
    url=NEO4J_URI,
    username=NEO4J_USERNAME,
    password=NEO4J_PASSWORD,
    database=NEO4J_DATABASE,
)

# --------- QUERIES (same structure as original) ---------

# 1) "similarity" search placeholder: here we just use text search but keep same API
#    You can later replace this with a real vector index.
similarity_search_query = """
MATCH (n:document OR n:article)
WHERE
  toLower(coalesce(n.title, '')) CONTAINS toLower($query) OR
  toLower(coalesce(n.content_en, '')) CONTAINS toLower($query) OR
  toLower(coalesce(n.content_ar, '')) CONTAINS toLower($query) OR
  toLower(coalesce(n.description_ar, '')) CONTAINS toLower($query)
RETURN
  coalesce(n.document_id, n.article_id) AS document_id,
  coalesce(n.title, n.description_ar) AS title,
  coalesce(n.content_en, n.content_ar, n.description_ar) AS content,
  n.date AS date,
  labels(n) AS labels,
  0.8 AS score
LIMIT $k
"""

# 2) Fallback pure text search (same role as original document_search_query)
document_search_query = """
MATCH (n:document OR n:article)
WHERE
  toLower(coalesce(n.title, '')) CONTAINS toLower($query) OR
  toLower(coalesce(n.content_en, '')) CONTAINS toLower($query) OR
  toLower(coalesce(n.content_ar, '')) CONTAINS toLower($query) OR
  toLower(coalesce(n.description_ar, '')) CONTAINS toLower($query)
RETURN
  coalesce(n.document_id, n.article_id) AS document_id,
  coalesce(n.title, n.description_ar) AS title,
  coalesce(n.content_en, n.content_ar, n.description_ar) AS content,
  n.date AS date,
  labels(n) AS labels
LIMIT 5
"""

# 3) Expand relations around the hits (same as original expand_query)
expand_query = """
MATCH (m)
WHERE coalesce(m.document_id, m.article_id) IN $list_ids
OPTIONAL MATCH (m)-[r]->(related)
RETURN
  coalesce(m.document_id, m.article_id) AS source_id,
  type(r) AS relationship_type,
  labels(related) AS target_labels,
  coalesce(related.document_id, related.article_id) AS target_id,
  coalesce(related.title, related.description_ar) AS target_title
"""


# --------- MAIN API (same logic as original) ---------

def retrieve_structured(query_text: str) -> List[Dict[str, Any]]:
    try:
        # 1) "vector" search step (here implemented as stronger text search)
        try:
            relevant_docs = graph.query(
                similarity_search_query,
                {"k": 5, "query": query_text},
            )

            if not relevant_docs:
                # 2) fallback text search
                relevant_docs = graph.query(
                    document_search_query,
                    {"query": query_text},
                )
        except Exception:
            # If similarity phase fails, fallback directly
            relevant_docs = graph.query(
                document_search_query,
                {"query": query_text},
            )

        # 3) Collect ids for expansion
        list_ids = [
            doc["document_id"]
            for doc in relevant_docs
            if doc.get("document_id")
        ]

        related_docs: List[Dict[str, Any]] = []
        if list_ids:
            try:
                related_docs = graph.query(expand_query, {"list_ids": list_ids})
            except Exception:
                pass

        # 4) Build structured_docs (same pattern as original)
        structured_docs: List[Dict[str, Any]] = []
        for doc in relevant_docs:
            document_id = doc.get("document_id", "unknown")
            title = doc.get("title", "Sans titre")
            content = doc.get("content", "Pas de contenu disponible")
            date = (
                str(doc.get("date", ""))[:10]
                if doc.get("date")
                else "Date inconnue"
            )
            labels = doc.get("labels", [])
            score = float(doc.get("score", 0.7))  # default if not provided

            doc_relations = [
                f"{rel['relationship_type']} -> {rel['target_title'] or rel['target_id']}"
                for rel in related_docs
                if rel["source_id"] == document_id and rel["relationship_type"]
            ]

            structured_docs.append(
                {
                    "document_id": document_id,
                    "title": title,
                    "content": content,
                    "date": date,
                    "labels": labels,
                    "related_documents": doc_relations,
                    "relevance_score": score,
                    "content_preview": (
                        content[:200] + "..." if len(content) > 200 else content
                    ),
                }
            )

        return structured_docs
    except Exception:
        return []


def retrieve(query_text: str) -> List[str]:
    try:
        structured_docs = retrieve_structured(query_text)
        formatted_docs: List[str] = []
        for doc in structured_docs:
            doc_string = f"""
Document ID: {doc['document_id']}
Title: {doc['title']}
Type: {', '.join(doc['labels']) if doc['labels'] else 'Unknown'}
Date: {doc['date']}
Relevance Score: {doc['relevance_score']:.3f}
Relations: {', '.join(doc['related_documents']) if doc['related_documents'] else 'Aucune'}
Content: {doc['content']}
"""
            formatted_docs.append(doc_string.strip())
        return formatted_docs
    except Exception:
        return ["Erreur lors de la récupération des documents"]
