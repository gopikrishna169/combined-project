import React, { useState, useEffect } from "react";
import "./ChatPanel.css";

function ChatPanel({ user, friend }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const handleSend = () => {
    if (input.trim() === "") return;

    const newMsg = {
      id: Date.now(),
      sender: user,
      text: input,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages([...messages, newMsg]);
    setInput("");
    setTyping(false);

    // Fake friend reply after 1.5s
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: friend.name,
          text: "Got it 👍",
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    }, 1500);
  };

  useEffect(() => {
    if (input.length > 0) {
      setTyping(true);
    } else {
      setTyping(false);
    }
  }, [input]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h3>{friend.name}</h3>
        <span className={friend.online ? "online" : "offline"}>
          {friend.online ? "Online" : "Offline"}
        </span>
      </div>

      <div className="chat-messages">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat-message ${
              msg.sender === user ? "sent" : "received"
            }`}
          >
            <div className="msg-text">{msg.text}</div>
            <span className="msg-time">{msg.timestamp}</span>
          </div>
        ))}
        {typing && <p className="typing">{friend.name} is typing…</p>}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default ChatPanel;
