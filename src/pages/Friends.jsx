import React, { useState } from "react";
import { useApp } from "../context/AppProvider";
import "./Friends.css";

export default function Friends() {
  const { users, currentUser, sendFriendRequest, acceptFriend, removeFriend } = useApp();
  const me = users.find(u => u.username === currentUser);
  const [q, setQ] = useState("");

  const results = users.filter(u => u.username !== currentUser && u.username.toLowerCase().includes(q.toLowerCase()));

  return (
    <div>
      <div className="card">
        <h3>Find friends</h3>
        <input placeholder="Search users" value={q} onChange={e=>setQ(e.target.value)} />
        <div style={{marginTop:8}}>
          {results.map(u=>(
            <div key={u.username} className="user-row">
              <div><img src={u.avatar||`https://i.pravatar.cc/40?u=${u.username}`} alt="" style={{width:40,height:40,borderRadius:20}} /> {u.username}</div>
              <div>
                {me?.friends?.includes(u.username) ? <button onClick={()=>removeFriend(currentUser,u.username)}>Remove</button> :
                  <button onClick={()=>sendFriendRequest(currentUser,u.username)}>Add Friend</button>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
