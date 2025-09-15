import React, { useEffect, useState } from "react";
import { useApp } from "../context/AppProvider";
import PostBox from "./PostBox";
import PostCard from "./PostCard";
import "./Feed.css";

export default function Feed() {
  const { posts, createPost, currentUser, users } = useApp();
  const [visible, setVisible] = useState(6); // for infinite scroll
  const [feedPosts, setFeedPosts] = useState([]);

  useEffect(() => {
    // Show own + friends posts
    if (!currentUser) return;
    const me = users.find(u => u.username === currentUser);
    const allowed = posts.filter(p => p.author === currentUser || (me?.friends || []).includes(p.author));
    // sort by createdAt desc
    allowed.sort((a,b) => b.createdAt - a.createdAt);
    setFeedPosts(allowed);
  }, [posts, currentUser, users]);

  // infinite scroll simple
  useEffect(() => {
    const onScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
        setVisible(v => Math.min(v + 5, feedPosts.length));
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [feedPosts]);

  const handleCreate = ({ content, media }) => {
    createPost({ author: currentUser, content, media });
  };

  return (
    <div className="feed-wrap">
      <PostBox onCreate={handleCreate} />
      <div className="posts-list">
        {feedPosts.slice(0, visible).map(p => <PostCard key={p.id} post={p} />)}
      </div>
      {visible < feedPosts.length && <div className="load-more">Scroll to load more...</div>}
    </div>
  );
}
