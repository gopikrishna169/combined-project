// pages/Home.js
import React, { useState } from "react";
import "./Home.css";   // 👈 import

function Home({ user }) {
  const [posts, setPosts] = useState([
    { id: 1, author: "Admin", content: "Welcome to Mini Social App 🚀" },
  ]);
  const [newPost, setNewPost] = useState("");

  const handlePost = () => {
    if (newPost.trim() !== "") {
      const post = { id: Date.now(), author: user, content: newPost };
      setPosts([post, ...posts]);
      setNewPost("");
    }
  };

  return (
    <div className="home-page">
      <h2>Hello, {user}</h2>
      <div className="post-form">
        <textarea
          placeholder="What's on your mind?"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
        <button onClick={handlePost}>Post</button>
      </div>

      <div className="posts">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <h3>{post.author}</h3>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
