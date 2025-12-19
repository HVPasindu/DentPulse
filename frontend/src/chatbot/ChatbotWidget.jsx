import { useState } from "react";
import ChatWindow from "./ChatWindow";
import "./chatbot.css";

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && <ChatWindow onClose={() => setOpen(false)} />}

      <button className="chatbot-fab" onClick={() => setOpen(!open)}>
        🦷
      </button>
    </>
  );
}