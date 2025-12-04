import os
from dotenv import load_dotenv
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_groq import ChatGroq

load_dotenv()

# -------------------------------
# Legal Agent Class (Modern LangChain)
# -------------------------------
class AgentUssraty:
    def __init__(self):
        self.llm = ChatGroq(
            model_name="llama-3.3-70b-versatile",
            api_key=os.environ.get("GROQ_API_KEY"),
            temperature=0.1
        )

        self.name = "Ussraty"
        self.domain = "قانون الأسرة الجزائري"

        # System prompt for the agent
        self.system_prompt = """
أنت خبير قانوني متخصص في قانون الأسرة الجزائري، واسمك "أسرتي - Ussraty".

مجالات الخبرة:
- الزواج، شروطه وموانعه
- الصداق والالتزامات المالية بين الزوجين
- الطلاق، التطليق، الخلع، والانفصال القضائي
- حضانة الأولاد وحق الزيارة
- النفقة للزوجة والأولاد
- مسائل النسب وما يتصل بالأسرة

القواعد:
1. اعتمد فقط على المواد القانونية والوثائق والقرارات الموجودة في "السياق" أدناه.
2. عند الإمكان، اذكر رقم المادة أو عنوان الوثيقة التي اعتمدت عليها.
3. إذا كان السؤال خارج قانون الأسرة الجزائري فقل بوضوح:
   "أنا متخصص فقط في قانون الأسرة الجزائري."
4. يجب أن تكون الإجابة كلها باللغة العربية الفصحى، واضحة ومهيكلة
   (مقدمة قصيرة، نقاط أو فقرات منظمة، وخاتمة بسيطة إن لزم).
5. إذا لم تجد في السياق ما يكفي للإجابة بدقة، قل ذلك بصراحة
   واذكر ما يمكن استنتاجه بشكل عام دون اختراع أحكام غير موجودة.

السياق (مقتطفات من قاعدة Neo4j):
{context}

سؤال المستخدم:
{question}

قدّم إجابة قانونية مفصلة ومنظمة باللغة العربية فقط:
"""

        # Create the chain using modern LCEL syntax
        self.prompt = ChatPromptTemplate.from_template(self.system_prompt)
        self.output_parser = StrOutputParser()
        
        # Build the chain: prompt -> llm -> output_parser
        self.chain = self.prompt | self.llm | self.output_parser

    def invoke(self, question: str, context: str = "") -> dict:
        try:
            # Use modern invoke method
            response_text = self.chain.invoke({
                "context": context, 
                "question": question
            })
            
            return {
                "success": True,
                "answer": response_text,
                "agent": self.name,
                "domain": self.domain,
                "metadata": {
                    "question_type": self._classify_question(question),
                    "response_length": len(response_text),
                },
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e),
                "agent": self.name,
                "domain": self.domain,
            }

    def _classify_question(self, question: str) -> str:
        q = question.lower()
        if any(w in q for w in ["زواج", "mariage", "زوج", "زوجة", "عقد"]):
            return "marriage"
        if any(w in q for w in ["طلاق", "تطليق", "divorce", "خلع", "khol"]):
            return "divorce"
        if any(w in q for w in ["حضانة", "garde", "enfant", "أبناء"]):
            return "custody"
        if any(w in q for w in ["نفقة", "pension", "nafaka", "مصروفات"]):
            return "alimony"
        if any(w in q for w in ["ميراث", "succession", "إرث"]):
            return "inheritance"
        return "general"

# Instantiate the agent
agent_ussraty = AgentUssraty()