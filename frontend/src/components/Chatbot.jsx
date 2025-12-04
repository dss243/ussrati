// at the top of Chatbot.jsx
import React, { useState, useRef, useEffect } from "react";
import { askUssraty } from "../api.js"; 

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "مرحباً! أنا مساعدك القانوني المتخصص في القانون العائلي الجزائري. يمكنني المساعدة في قضايا الزواج، الطلاق، الحضانة، النفقة، والمزيد. تذكر أنني أقدم معلومات عامة فقط.",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  

  const handleSendMessage = async (e) => {
  e.preventDefault();
  if (!inputMessage.trim() || isLoading) return;

  const userMessage = {
    id: messages.length + 1,
    text: inputMessage,
    sender: "user",
    timestamp: new Date(),
  };

  setMessages((prev) => [...prev, userMessage]);
  setInputMessage("");
  setIsLoading(true);

  try {
    const data = await askUssraty(userMessage.text);
    const botText = data.answer || "لم أستطع فهم سؤالك، حاول صياغته بطريقة أخرى.";

    const botMessage = {
      id: userMessage.id + 1,
      text: botText,
      sender: "bot",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, botMessage]);
  } catch (err) {
    const errorMessage = {
      id: userMessage.id + 1,
      text: "حدث خطأ أثناء الاتصال بالخادم. حاول مرة أخرى لاحقًا.",
      sender: "bot",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, errorMessage]);
    console.error(err);
  } finally {
    setIsLoading(false);
  }
};

  const formatTime = (date) => {
    return date.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <section id="chatbot" className="chatbot-section">
      <div className="container">
        <div className="chatbot-header">
          <h2 className="section-title">المساعد القانوني الذكي</h2>
          <p className="section-subtitle">احصل على إجابات فورية لاستفساراتك القانونية</p>
        </div>
        
        <div className="legal-chatbot">
          <div className="chat-header">
            <div className="header-content">
              <div className="bot-avatar">
                <div className="avatar-icon">⚖️</div>
                <div className="online-indicator"></div>
              </div>
              <div className="header-text">
                <h2>المساعد القانوني العائلي</h2>
                <p>إجابات فورية للاستفسارات القانونية</p>
              </div>
            </div>
            <div className="status-indicator">
              <div className="status-dot"></div>
              <span>متاح الآن</span>
            </div>
          </div>

          <div className="chat-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
              >
                {message.sender === 'bot' && (
                  <div className="bot-avatar-small">
                    <span>⚖️</span>
                  </div>
                )}
                <div className="message-content">
                  <div className="message-text">{message.text}</div>
                  <div className="message-time">
                    {formatTime(message.timestamp)}
                  </div>
                </div>
                {message.sender === 'user' && (
                  <div className="user-avatar-small">
                    <span>👤</span>
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="message bot-message">
                <div className="bot-avatar-small">
                  <span>⚖️</span>
                </div>
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <form className="chat-input-form" onSubmit={handleSendMessage}>
            <div className="input-container">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="اسأل عن الزواج، الطلاق، الحضانة، النفقة، الميراث..."
                className="chat-input"
                disabled={isLoading}
                dir="rtl"
              />
              <button
                type="submit"
                className="send-button"
                disabled={!inputMessage.trim() || isLoading}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Chatbot;