import React, { createContext, useContext, useEffect, useState } from "react";
import { load, save } from "../utils/storage";

const LS = {
  USERS: "mf_users",
  CURRENT: "mf_current",
  POSTS: "mf_posts",
  NOTIFS: "mf_notifs",
  MESSAGES: "mf_msgs",
  THEME: "mf_theme",
};

const AppContext = createContext();
export const useApp = () => useContext(AppContext);

export function AppProvider({ children }) {
  const [users, setUsers] = useState(() => load(LS.USERS, [
    { username: "admin", password: "1234", avatar: "", cover: "", bio: "Admin", friends: [] }
  ]));
  const [currentUser, setCurrentUser] = useState(() => load(LS.CURRENT, null)); // username string
  const [posts, setPosts] = useState(() => load(LS.POSTS, [
    { id: Date.now().toString(), author: "admin", content: "Welcome to MiniFacebook!", media: null, createdAt: Date.now(), likes: [], comments: [], sharedFrom: null }
  ]));
  const [notifications, setNotifications] = useState(() => load(LS.NOTIFS, []));
  const [messages, setMessages] = useState(() => load(LS.MESSAGES, {})); // { convoId: [{id, from, to, text, createdAt}] }
  const [theme, setTheme] = useState(() => load(LS.THEME, "light"));

  // persist
  useEffect(() => save(LS.USERS, users), [users]);
  useEffect(() => save(LS.CURRENT, currentUser), [currentUser]);
  useEffect(() => save(LS.POSTS, posts), [posts]);
  useEffect(() => save(LS.NOTIFS, notifications), [notifications]);
  useEffect(() => save(LS.MESSAGES, messages), [messages]);
  useEffect(() => save(LS.THEME, theme), [theme]);

  // Authentication
  const signup = ({ username, password, avatar = "", bio = "" }) => {
    if (!username || !password) return { success: false, message: "Missing fields" };
    if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
      return { success: false, message: "Username taken" };
    }
    const newUser = { username, password, avatar, bio, cover: "", friends: [] };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser.username);
    return { success: true, user: newUser };
  };

  const login = (username, password) => {
    const u = users.find(x => x.username === username && x.password === password);
    if (!u) return { success: false };
    setCurrentUser(u.username);
    return { success: true, user: u };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateUser = (username, patch) => {
    setUsers(prev => prev.map(u => u.username === username ? { ...u, ...patch } : u));
  };

  // Posts
  const createPost = ({ author, content, media = null, sharedFrom = null }) => {
    const p = { id: Date.now().toString(), author, content, media, createdAt: Date.now(), likes: [], comments: [], sharedFrom };
    setPosts(prev => [p, ...prev]);
    // notify friends
    const userObj = users.find(u => u.username === author);
    if (userObj) {
      userObj.friends?.forEach(f => addNotification({ to: f, from: author, type: "friend_post", message: `${author} posted.` }));
    }
    return p;
  };

  const likePost = (postId, username) => {
    setPosts(prev => prev.map(p => {
      if (p.id !== postId) return p;
      const likes = p.likes.includes(username) ? p.likes.filter(x => x !== username) : [...p.likes, username];
      // notify author if someone liked
      if (!p.likes.includes(username) && p.author !== username) addNotification({ to: p.author, from: username, type: "like", postId });
      return { ...p, likes };
    }));
  };

  const commentPost = (postId, username, text) => {
    setPosts(prev => prev.map(p => {
      if (p.id !== postId) return p;
      const comment = { id: Date.now().toString(), user: username, text, createdAt: Date.now() };
      if (p.author !== username) addNotification({ to: p.author, from: username, type: "comment", postId });
      return { ...p, comments: [...p.comments, comment] };
    }));
  };

  const sharePost = (postId, username) => {
    const original = posts.find(p => p.id === postId);
    if (!original) return;
    createPost({ author: username, content: original.content, media: original.media, sharedFrom: original.id });
  };

  // Friends
  const sendFriendRequest = (from, to) => {
    addNotification({ to, from, type: "friend_request" });
  };

  const acceptFriend = (a, b) => {
    setUsers(prev => prev.map(u => {
      if (u.username === a) return { ...u, friends: Array.from(new Set([...(u.friends||[]), b])) };
      if (u.username === b) return { ...u, friends: Array.from(new Set([...(u.friends||[]), a])) };
      return u;
    }));
    addNotification({ to: b, from: a, type: "friend_accept" });
  };

  const removeFriend = (a, b) => {
    setUsers(prev => prev.map(u => {
      if (u.username === a) return { ...u, friends: (u.friends || []).filter(x => x !== b) };
      if (u.username === b) return { ...u, friends: (u.friends || []).filter(x => x !== a) };
      return u;
    }));
  };

  // Notifications
  const addNotification = ({ to, from, type, postId = null, message = null }) => {
    const n = { id: Date.now().toString(), to, from, type, postId, message, createdAt: Date.now(), read: false };
    setNotifications(prev => [n, ...prev]);
  };
  const markNotificationRead = (id) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));

  // Chat (local)
  const sendMessage = (from, to, text) => {
    const convo = [from, to].sort().join("__");
    const m = { id: Date.now().toString(), from, to, text, createdAt: Date.now() };
    setMessages(prev => ({ ...prev, [convo]: [...(prev[convo] || []), m] }));
    addNotification({ to, from, type: "message", message: text });
  };

  // Search
  const searchUsers = (q) => users.filter(u => u.username.toLowerCase().includes(q.toLowerCase()));
  const searchPosts = (q) => posts.filter(p => p.content.toLowerCase().includes(q.toLowerCase()));

  const value = {
    users, currentUser, posts, notifications, messages, theme,
    signup, login, logout, updateUser,
    createPost, likePost, commentPost, sharePost,
    sendFriendRequest, acceptFriend, removeFriend,
    addNotification, markNotificationRead,
    sendMessage,
    searchUsers, searchPosts,
    setTheme
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
