import React from "react";
import { useApp } from "../context/AppProvider";

export default function Notifications() {
  const { notifications, currentUser, markNotificationRead } = useApp();
  const mine = notifications.filter(n => n.to === currentUser);

  return (
    <div className="card">
      <h3>Notifications</h3>
      {mine.length === 0 && <div className="muted">No notifications</div>}
      {mine.map(n => (
        <div key={n.id} style={{padding:8, borderBottom:"1px solid #f1f1f1"}}>
          <div><b>{n.from}</b> {n.type}{n.message?` — ${n.message}`:""}</div>
          <div style={{fontSize:12, color:"#666"}}>{new Date(n.createdAt).toLocaleString()}</div>
          {!n.read && <button style={{marginTop:6}} onClick={()=>markNotificationRead(n.id)}>Mark read</button>}
        </div>
      ))}
    </div>
  );
}
