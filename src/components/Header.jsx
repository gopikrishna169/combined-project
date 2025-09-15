import React from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppProvider";
import "./Header.css";

export default function Header() {
  const { currentUser, logout, setTheme, theme, notifications } = useApp();

  const unread = notifications.filter(n => n.to === currentUser && !n.read).length;

  return (
    <header className="mf-header">
      <div className="mf-left">
        <Link to="/" className="logo">MiniFacebook</Link>
      </div>

      <div className="mf-center">
        <input className="mf-search" placeholder="Search users or posts..." />
      </div>

      <div className="mf-right">
        <Link to="/home">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/friends">Friends</Link>
        <Link to="/chat">Chat</Link>
        <Link to="/notifications">Notifications {unread > 0 && <span className="badge">{unread}</span>}</Link>
        <button className="theme-btn" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>
        {currentUser ? <button className="logout-btn" onClick={logout}>Logout</button> : <Link to="/login">Login</Link>}
      </div>
    </header>
  );
}
