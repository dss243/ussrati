from langchain_core.output_parsers import StrOutputParser
from langchain_groq import ChatGroq
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv
import os

load_dotenv()


class AgentUssraty:
    def __init__(self):
        self.llm = ChatGroq(
            model_name="llama-3.3-70b-versatile",
            api_key=os.environ.get("GROQ_API_KEY"),
        )

        self.name = "Ussraty"
        self.domain = "قانون الأسرة الجزائري"

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

        self.prompt = PromptTemplate(
            template=self.system_prompt,
            input_variables=["context", "question"],
        )

        self.chain = self.prompt | self.llm | StrOutputParser()

    def invoke(self, question: str, context: str) -> dict:
        try:
            response_text = self.chain.invoke(
                {"context": context, "question": question}
            )
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


agent_ussraty = AgentUssraty()
