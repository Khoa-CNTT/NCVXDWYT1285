import React, { useState } from "react";
import "./ChatAI.css";
import chatIcon from '../../assets/images/chat-icon.png.png';
import axios from "axios";

const ChatAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "ai", text: "Xin chào! Tôi là trợ lý AI. Bạn cần hỗ trợ gì?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { from: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    try {
      const res = await axios.post("http://localhost:8080/api/ai-chat", { message: input });
      setMessages([...newMessages, { from: "ai", text: res.data.reply }]);
    } catch (err) {
      setMessages([...newMessages, { from: "ai", text: "Xin lỗi, có lỗi xảy ra." }]);
    }
  };

  return (
    <>
      <div className="chat-ai-float-btn" onClick={() => setIsOpen(!isOpen)}>
        <img src={chatIcon} alt="Chat AI" style={{ width: 32, height: 32 }} />
      </div>
      {isOpen && (
        <div className="chat-ai-window">
          <div className="chat-ai-header">Chat AI</div>
          <div className="chat-ai-body">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-ai-msg ${msg.from}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-ai-input">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSend()}
              placeholder="Nhập tin nhắn..."
            />
            <button onClick={handleSend}>Gửi</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatAI; 