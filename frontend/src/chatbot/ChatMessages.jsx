import { useEffect, useRef } from "react";

export default function ChatMessages({ messages, isTyping, onQuickSend }) {
  const containerRef = useRef(null);

  // ✅ AUTO SCROLL
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
          DentPulse is typing<span className="dots">...</span>
        </div>
      )}

      {/* ✅ QUICK ACTION BUTTONS */}
      {!isTyping && (
        <div className="quick-actions">
          <button onClick={() => onQuickSend("I have tooth pain")}>
            🦷 Tooth Pain
          </button>

          <button onClick={() => onQuickSend("I want to book an appointment")}>
            📅 Book Appointment
          </button>

          <button onClick={() => onQuickSend("Give me aftercare tips")}>
            💊 Aftercare Tips
          </button>
        </div>
      )}
    </div>
  );
}