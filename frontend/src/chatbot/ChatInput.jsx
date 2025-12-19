import { useState } from "react";

export default function ChatInput({ sendMessage, isTyping }) {
  const [text, setText] = useState("");

  function handleSend() {
    if (!text.trim()) return;
    sendMessage(text);
    setText(""); // ✅ CLEAR after send
  }

  return (
    <div className="chatbot-input">
      <input
        type="text"
        placeholder="Type your message..."
        value={text}
        disabled={isTyping}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />

      {/* SEND */}
      <button onClick={handleSend} disabled={isTyping}>
        ➤
      </button>

      {/* CLEAR */}
      <button
        onClick={() => setText("")}
        disabled={isTyping}
        style={{ marginLeft: "6px" }}
      >
        ✕
      </button>
    </div>
  );
}