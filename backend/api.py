from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from agent_ussraty import agent_ussraty
from con_emb_tool import retrieve_structured
import uvicorn
from typing import List, Optional
import time
import re


app = FastAPI(
    title="Ussraty Agent API",
    description="واجهة برمجية لوكيل قانون الأسرة الجزائري (أسرتي)",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class QuestionRequest(BaseModel):
    question: str
    user_id: Optional[str] = "anonymous"
    session_id: Optional[str] = None


class DocumentResponse(BaseModel):
    document_id: str
    title: str
    content_preview: str
    date: str
    relevance_score: float
    type: List[str]


class AgentResponse(BaseModel):
    success: bool
    answer: str
    agent_name: str = "Ussraty"
    domain: str = "قانون الأسرة الجزائري"
    documents_used: List[DocumentResponse]
    response_time: float
    question_type: str


class ErrorResponse(BaseModel):
    success: bool = False
    error: str
    code: str


def _strip_markdown(text: str) -> str:
    """إزالة تنسيق ماركداون البسيط مثل **bold** و __bold__."""
    text = re.sub(r"\*\*(.*?)\*\*", r"\1", text)
    text = re.sub(r"__(.*?)__", r"\1", text)
    return text


@app.get("/")
async def root():
    return {
        "message": "واجهة أسرتي (Ussraty) لقانون الأسرة الجزائري تعمل بنجاح",
        "status": "healthy",
        "version": "1.0.0",
        "agent": "Ussraty - خبير قانون الأسرة الجزائري",
    }


@app.get("/health")
async def health_check():
    return {"status": "healthy", "agent": "Ussraty"}


@app.get("/agent/info")
async def agent_info():
    return {
        "name": "Ussraty",
        "domain": "قانون الأسرة الجزائري",
        "description": "وكيل ذكي متخصص في قانون الأسرة الجزائري، يعتمد على قاعدة Neo4j (وثائق + مواد قانونية).",
        "language": "ar",
    }


@app.post(
    "/ask",
    response_model=AgentResponse,
    responses={500: {"model": ErrorResponse}},
)
async def ask_question(request: QuestionRequest):
    start_time = time.time()
    try:
        # استرجاع الوثائق من Neo4j
        docs = retrieve_structured(request.question)

        # بناء السياق النصي الذي يُمرَّر إلى الوكيل
        context = "\n\n".join(
            [
                f"وثيقة {i+1}: {doc['title']}\n{doc['content_preview']}"
                for i, doc in enumerate(docs)
            ]
        )

        agent_result = agent_ussraty.invoke(request.question, context)

        # تنظيف الإجابة من رموز الماركداون
        raw_answer = agent_result.get("answer", "لم يتم توليد أي إجابة.")
        clean_answer = _strip_markdown(raw_answer)

        response_time = round(time.time() - start_time, 2)

        documents_used = [
            DocumentResponse(
                document_id=doc["document_id"],
                title=doc["title"],
                content_preview=doc["content_preview"],
                date=doc["date"],
                relevance_score=doc["relevance_score"],
                type=doc.get("labels", []),
            )
            for doc in docs
        ]

        return AgentResponse(
            success=True,
            answer=clean_answer,
            agent_name="Ussraty",
            domain="قانون الأسرة الجزائري",
            documents_used=documents_used,
            response_time=response_time,
            question_type=agent_result.get("metadata", {}).get(
                "question_type", "general"
            ),
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail={
                "success": False,
                "error": f"خطأ في الوكيل: {str(e)}",
                "code": "AGENT_ERROR",
            },
        )


@app.post("/ask-batch")
async def ask_batch_questions(requests: List[QuestionRequest]):
    responses: List[dict] = []
    for req in requests:
        try:
            res = await ask_question(req)
            responses.append(res.dict())
        except Exception as e:
            responses.append(
                {"success": False, "error": str(e), "question": req.question}
            )
    return {"responses": responses}


if __name__ == "__main__":
    uvicorn.run("api:app", host="0.0.0.0", port=8000, reload=True)
