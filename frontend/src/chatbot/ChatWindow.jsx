import { useState } from "react";
import axios from "axios";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

export default function ChatWindow({ onClose }) {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi 👋 I’m DentPulse Assistant. How can I help you today?",
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);

  async function sendMessage(text) {
    if (!text.trim() || isTyping) return;

    const newMessages = [...messages, { sender: "user", text }];

    setMessages(newMessages);
    setIsTyping(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/chat",
        { message: text },
        { headers: { "Content-Type": "application/json" } }
      );

      // ⏳ small delay for realism
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
        <span>DentPulse Assistant 🦷</span>
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