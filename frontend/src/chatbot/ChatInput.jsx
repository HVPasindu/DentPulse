import { useState, useRef, useEffect } from "react";

export default function ChatInput({ sendMessage, isTyping }) {
  const [text, setText] = useState("");
  const inputRef = useRef(null);

  function handleSend() {
    if (!text.trim() || isTyping) return;

    sendMessage(text);
    setText("");

    // ✅ Keep cursor after sending
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  }

  // ✅ Auto focus when bot finishes typing
  useEffect(() => {
    if (!isTyping) {
      inputRef.current?.focus();
    }
  }, [isTyping]);

  return (
    <div className="chatbot-input">
      <input
        ref={inputRef}
        type="text"
        placeholder="Type your message..."
        value={text}
        disabled={isTyping}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSend();
          }
        }}
      />

      {/* SEND BUTTON */}
      <button onClick={handleSend} disabled={isTyping}>
        ➤
      </button>

      {/* CLEAR BUTTON */}
      <button
        onClick={() => {
          setText("");
          inputRef.current?.focus();
        }}
        disabled={isTyping}
        style={{ marginLeft: "6px" }}
      >
        ✕
      </button>
    </div>
  );
}