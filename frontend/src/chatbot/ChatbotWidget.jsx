import { useState } from "react";
import ChatWindow from "./ChatWindow";
import "./chatbot.css";
import chatbotIcon from "../assets/chatbot-icon.png";

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && <ChatWindow onClose={() => setOpen(false)} />}

      <button className="chatbot-fab" onClick={() => setOpen(!open)}>
        <img src={chatbotIcon} alt="Chatbot" className="chatbot-icon" />
      </button>
    </>
  );
}
