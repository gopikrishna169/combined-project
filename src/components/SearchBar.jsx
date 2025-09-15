import React, { useState } from "react";
import { useApp } from "../context/AppProvider";
import "./SearchBar.css";

export default function SearchBar() {
  const { searchUsers, searchPosts } = useApp();
  const [q, setQ] = useState("");
  const [res, setRes] = useState(null);

  const doSearch = (e) => {
    e.preventDefault();
    const users = searchUsers(q);
    const posts = searchPosts(q);
    setRes({ users, posts });
  };

  return (
    <div className="searchbar">
      <form onSubmit={doSearch} style={{display:"flex", gap:8}}>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search users or posts..." />
        <button>Search</button>
      </form>
      {res && <div className="search-results">
        <div><b>Users:</b> {res.users.map(u=>u.username).join(", ") || "none"}</div>
        <div><b>Posts:</b> {res.posts.length} found</div>
      </div>}
    </div>
  );
}
