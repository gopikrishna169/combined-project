// pages/Profile.js
import React from "react";
import "./Profile.css";   // 👈 import

function Profile({ user }) {
  return (
    <div className="profile-page">
      <h2>Profile Page</h2>
      <div className="profile-card">
        <h3>{user}</h3>
        <p>Email: {user.toLowerCase()}@example.com</p>
        <p>Bio: This is {user}'s profile.</p>
      </div>
    </div>
  );
}

export default Profile;
