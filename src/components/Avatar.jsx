import React from "react";
import "./Avatar.css";

export default function Avatar({ username, size=40, url }) {
  const src = url || `https://i.pravatar.cc/${size}?u=${username}`;
  return <img src={src} alt={username} style={{ width:size, height:size, borderRadius:"50%" }} />;
}
