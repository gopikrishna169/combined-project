import React, { useEffect, useState } from "react";
import { useApp } from "../context/AppProvider";
import "./Profile.css";

export default function Profile() {
  const { users, currentUser, updateUser, posts } = useApp();
  const userObj = users.find(u => u.username === currentUser) || {};
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState(userObj.bio || "");
  const [avatar, setAvatar] = useState(userObj.avatar || "");
  const [cover, setCover] = useState(userObj.cover || "");

  useEffect(() => {
    setBio(userObj.bio || "");
    setAvatar(userObj.avatar || "");
    setCover(userObj.cover || "");
  }, [userObj]);

  const save = () => {
    updateUser(currentUser, { bio, avatar, cover });
    setEditing(false);
  };

  const handleFile = (e, setFn) => {
    const f = e.target.files?.[0]; if(!f) return;
    const r = new FileReader(); r.onload = () => setFn(r.result); r.readAsDataURL(f);
  };

  const myPosts = posts.filter(p => p.author === currentUser);

  return (
    <div className="profile-page">
      <div className="profile-top card">
        <div className="profile-cover" style={{ backgroundImage: cover ? `url(${cover})` : undefined }} />
        <div className="profile-meta">
          <img className="profile-avatar" src={avatar || `https://i.pravatar.cc/120?u=${currentUser}`} alt="avatar" />
          <div>
            <h2>{currentUser}</h2>
            <p className="muted">{userObj.bio}</p>
          </div>
          <div style={{marginLeft:"auto"}}>
            <button className="btn" onClick={()=>setEditing(e=>!e)}>{editing ? "Cancel" : "Edit Profile"}</button>
          </div>
        </div>

        {editing && (
          <div className="profile-edit">
            <textarea value={bio} onChange={e=>setBio(e.target.value)} />
            <input type="file" accept="image/*" onChange={(e)=>handleFile(e, setAvatar)} />
            <input type="file" accept="image/*" onChange={(e)=>handleFile(e, setCover)} />
            <button className="btn" onClick={save}>Save</button>
          </div>
        )}
      </div>

      <div className="card">
        <h3>Your posts</h3>
        {myPosts.length === 0 ? <div className="muted">No posts yet</div> : myPosts.map(p=>(
          <div key={p.id} style={{padding:8, borderBottom:"1px solid #f1f1f1"}}>
            <div style={{fontWeight:700}}>{p.content}</div>
            <div className="muted" style={{fontSize:13}}>{new Date(p.createdAt).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
