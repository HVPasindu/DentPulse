import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ChatWindow from "./ChatWindow";
import "./chatbot.css";
import chatbotIcon from "../assets/chatbot-icon.png";

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close chatbot on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Show chatbot only on "/" and "/patient/**"
  const isAllowed =
    location.pathname === "/" ||
    location.pathname.startsWith("/patient");

  if (!isAllowed) {
    return null;
  }

  return (
    <>
      {open && <ChatWindow onClose={() => setOpen(false)} />}

      <button className="chatbot-fab" onClick={() => setOpen(!open)}>
        <img src={chatbotIcon} alt="Chatbot" className="chatbot-icon" />
      </button>
    </>
  );
}
