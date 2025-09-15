import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppProvider";
import "./Signup.css";

export default function Signup() {
  const { signup } = useApp();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const handleFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => setAvatar(r.result);
    r.readAsDataURL(f);
  };

  const submit = (e) => {
    e.preventDefault();
    const res = signup({ username: username.trim(), password, avatar });
    if (res.success) nav("/home");
    else setErr(res.message);
  };

  return (
    <div className="auth-wrap">
      <form className="auth-card" onSubmit={submit}>
        <h2>Signup</h2>
        {err && <div className="auth-error">{err}</div>}
        <input placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <input type="file" accept="image/*" onChange={handleFile} />
        {avatar && <img src={avatar} alt="preview" style={{width:80, borderRadius:8}} />}
        <button className="btn">Create account</button>
      </form>
    </div>
  );
}
