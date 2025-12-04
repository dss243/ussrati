import React, { useState, useRef, useEffect } from "react";
import { askUssraty } from "../api.js";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "مرحباً! أنا مساعدك القانوني المتخصص في القانون العائلي الجزائري. يمكنني المساعدة في قضايا الزواج، الطلاق، الحضانة، النفقة، والمزيد.",
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
    <div className="chatbot-messages">
      <div className="messages-container">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender}`}>
            <div className={`message-avatar ${message.sender === 'bot' ? 'bot-avatar' : 'user-avatar'}`}>
              {message.sender === 'bot' ? '⚖️' : '👤'}
            </div>
            <div className={`message-content ${message.sender}`}>
              <div className="message-text">{message.text}</div>
              <div className="message-time">{formatTime(message.timestamp)}</div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="message bot typing">
            <div className="bot-avatar">⚖️</div>
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form className="chat-input-form" onSubmit={handleSendMessage}>
        <div className="input-wrapper">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="اسأل عن الزواج، الطلاق، الحضانة، النفقة..."
            className="chat-input"
            disabled={isLoading}
            dir="rtl"
          />
          <button type="submit" className="send-btn" disabled={isLoading || !inputMessage.trim()}>
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chatbot;
