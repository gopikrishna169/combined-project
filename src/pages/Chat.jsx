import React, { useState } from "react";
import ChatPanel from "../components/ChatPanel";
import "./Chat.css";

function Chat({ user }) {
  const [selectedFriend, setSelectedFriend] = useState(null);

  // Dummy friends list
  const friends = [
    { id: 1, name: "Alice", online: true },
    { id: 2, name: "Bob", online: false },
    { id: 3, name: "Charlie", online: true },
  ];

  return (
    <div className="chat-page">
      <div className="friends-list">
        <h3>Friends</h3>
        {friends.map((friend) => (
          <div
            key={friend.id}
            className={`friend-item ${
              selectedFriend?.id === friend.id ? "active" : ""
            }`}
            onClick={() => setSelectedFriend(friend)}
          >
            <span
              className={`status-dot ${friend.online ? "online" : "offline"}`}
            ></span>
            {friend.name}
          </div>
        ))}
      </div>

      <div className="chat-panel">
        {selectedFriend ? (
          <ChatPanel user={user} friend={selectedFriend} />
        ) : (
          <p className="no-chat">Select a friend to start chatting</p>
        )}
      </div>
    </div>
  );
}

export default Chat;
