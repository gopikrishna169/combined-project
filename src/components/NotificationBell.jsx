import React, { useState } from "react";
import { useApp } from "../context/AppProvider";
import "./NotificationsBell.css";

export default function NotificationsBell() {
  const { notifications, currentUser, markNotificationRead } = useApp();
  const mine = notifications.filter(n => n.to === currentUser);
  const unread = mine.filter(n => !n.read).length;
  const [open, setOpen] = useState(false);

  return (
    <div className="notif-bell">
      <button onClick={()=>setOpen(o=>!o)}>🔔 {unread>0 && <span className="nbadge">{unread}</span>}</button>
      {open && (
        <div className="notif-dropdown">
          {mine.length===0 ? <div className="notif-empty">No notifications</div> :
            mine.map(n => (
              <div key={n.id} className={"notif-item " + (n.read ? "" : "unread")}>
                <div><b>{n.from}</b> {n.type}</div>
                <div className="notif-time">{new Date(n.createdAt).toLocaleString()}</div>
                {!n.read && <button onClick={()=>markNotificationRead(n.id)}>Mark read</button>}
              </div>
            ))
          }
        </div>
      )}
    </div>
  );
}
