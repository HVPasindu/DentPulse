import { useState, useEffect } from "react";
import axios from "axios";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import chatbotIcon from "../assets/chatbot-icon.png";

export default function ChatWindow({ onClose }) {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi 👋 I’m DP Assistant. How can I help you today?",
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState(null);

  // ✅ Create session once
  useEffect(() => {
    let storedSession = localStorage.getItem("chatSessionId");
    if (!storedSession) {
      storedSession = crypto.randomUUID();
      localStorage.setItem("chatSessionId", storedSession);
    }
    setSessionId(storedSession);
  }, []);

  async function sendMessage(text) {
    if (!text.trim() || isTyping || !sessionId) return;

    const newMessages = [...messages, { sender: "user", text }];

    setMessages(newMessages);
    setIsTyping(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/chat",
        { message: text },
        {
          headers: {
            "Content-Type": "application/json",
            "X-Session-Id": sessionId,
          },
        }
      );

      setTimeout(() => {
        setMessages([
          ...newMessages,
          {
            sender: "bot",
            text: response.data.reply,
          },
        ]);
        setIsTyping(false);
      }, 800);
    } catch (err) {
      console.error("Chat API error:", err);
      setMessages([
        ...newMessages,
        {
          sender: "bot",
          text: "⚠️ Unable to connect to server.",
        },
      ]);
      setIsTyping(false);
    }
  }

  return (
    <div className="chatbot-window">
      <div className="chatbot-header">
        <div className="chatbot-title">
          <img src={chatbotIcon} alt="Chatbot" className="chatbot-icon" />
          <span>DP Assistant</span>
        </div>
        <button onClick={onClose}>✕</button>
      </div>

      <ChatMessages
        messages={messages}
        isTyping={isTyping}
        onQuickSend={sendMessage}
      />

      <ChatInput sendMessage={sendMessage} isTyping={isTyping} />
    </div>
  );
}