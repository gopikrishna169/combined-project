import React, { useState } from "react";
import { useApp } from "../context/AppProvider";
import { timeAgo } from "../utils/time";
import "./PostCard.css";

export default function PostCard({ post }) {
  const { currentUser, likePost, commentPost, users, sharePost } = useApp();
  const [commentText, setCommentText] = useState("");
  const authorObj = users.find(u => u.username === post.author) || {};

  const doLike = () => likePost(post.id, currentUser);
  const doComment = () => {
    if (!commentText.trim()) return;
    commentPost(post.id, currentUser, commentText.trim());
    setCommentText("");
  };
  const doShare = () => sharePost(post.id, currentUser);

  return (
    <div className="post-card card">
      <div className="post-header">
        <img className="pc-avatar" src={authorObj.avatar || `https://i.pravatar.cc/48?u=${authorObj.username}`} alt="a"/>
        <div>
          <div className="pc-author">{post.author}</div>
          <div className="pc-time">{timeAgo(post.createdAt)} · {post.sharedFrom ? "shared" : "public"}</div>
        </div>
      </div>
      <div className="post-body">{post.content}</div>
      {post.media && <div className="post-media"><img src={post.media} alt="m" /></div>}
      <div className="post-actions">
        <button onClick={doLike}>👍 {post.likes?.length || 0}</button>
        <button onClick={doShare}>🔁 Share</button>
      </div>
      <div className="post-comments">
        {(post.comments||[]).map(c=>(
          <div key={c.id} className="comment"><b>{c.user}</b> {c.text}</div>
        ))}
        <div className="comment-box">
          <input placeholder="Write a comment..." value={commentText} onChange={e=>setCommentText(e.target.value)} />
          <button onClick={doComment}>Comment</button>
        </div>
      </div>
    </div>
  );
}
