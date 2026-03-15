import { useEffect, useRef } from "react";

export default function ChatMessages({ messages, isTyping, onQuickSend }) {
  const containerRef = useRef(null);

  // AUTO SCROLL
  useEffect(() => {
    containerRef.current.scrollTop =
      containerRef.current.scrollHeight;
  }, [messages, isTyping]);

  return (
    <div className="chatbot-body" ref={containerRef}>
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`chat-message ${msg.sender}`}
        >
          {msg.text}
        </div>
      ))}

      {/* ⏳ TYPING INDICATOR */}
      {isTyping && (
        <div className="chat-message bot typing">
          DP Assistant is typing<span className="dots">...</span>
        </div>
      )}

      {/*QUICK ACTION BUTTONS */}
      {!isTyping && (
        <div className="quick-actions">
          <button onClick={() => onQuickSend("Where is your clinic located?")}>
            📍 Location
          </button>

          <button onClick={() => onQuickSend("Who are the doctors?")}>
            👨‍⚕️ Doctors
          </button>

          <button onClick={() => onQuickSend("What are your opening hours?")}>
            ⏰ Opening Hours
          </button>

          <button onClick={() => onQuickSend("What services do you provide?")}>
            🦷 Services
          </button>

        </div>
      )}
    </div>
  );
}