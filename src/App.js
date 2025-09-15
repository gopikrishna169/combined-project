import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Friends from "./pages/Friends";
import Chat from "./pages/Chat";
import Notifications from "./pages/Notifications";
import Feed from "./components/Feed";
import { useApp } from "./context/AppProvider";

export default function App() {
  const { currentUser } = useApp();

  return (
    <Router>
      <Header />
      <div style={{ maxWidth: 1000, margin: "18px auto", padding: "0 14px" }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={currentUser ? <Feed /> : <Navigate to="/login" />} />
          <Route path="/profile" element={currentUser ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/friends" element={currentUser ? <Friends /> : <Navigate to="/login" />} />
          <Route path="/chat" element={currentUser ? <Chat /> : <Navigate to="/login" />} />
          <Route path="/notifications" element={currentUser ? <Notifications /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to={currentUser ? "/home" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
}
