import React, { useState } from "react";
import { useApp } from "../context/AppProvider";
import "./PostBox.css";

export default function PostBox({ onCreate }) {
  const { users, currentUser } = useApp();
  const me = users.find(u => u.username === currentUser);
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  const handleFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setFile(reader.result);
    reader.readAsDataURL(f);
  };

  const submit = () => {
    if (!text.trim() && !file) return;
    onCreate({ content: text.trim(), media: file || null });
    setText(""); setFile(null);
  };

  return (
    <div className="postbox card">
      <img className="postbox-avatar" src={me?.avatar || `https://i.pravatar.cc/48?u=${me?.username}`} alt="me"/>
      <div style={{flex:1}}>
        <textarea className="postbox-text" placeholder="What's on your mind?" value={text} onChange={e=>setText(e.target.value)} />
        <div className="postbox-controls">
          <input type="file" accept="image/*,video/*" onChange={handleFile} />
          <button className="btn" onClick={submit}>Post</button>
        </div>
        {file && <div className="postbox-preview"><img src={file} alt="preview" /></div>}
      </div>
    </div>
  );
}
