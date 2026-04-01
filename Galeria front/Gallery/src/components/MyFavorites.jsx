import React, { useState, useEffect } from 'react';
import './MyPost.css';
import { useNavigate } from "react-router-dom";

const MyFavorites = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

 useEffect(() => {
  if (!userId) return;

  // favoritos do backend
  fetch(`http://localhost:8080/favoritos/usuario/${userId}`)
    .then(res => res.json())
    .then(data => {
      const favoritosBackend = data.map(fav => ({
  id: fav.postId,
  title: fav.title
}));

      
      const localLikes = JSON.parse(localStorage.getItem("likedPosts")) || [];

      
      const todos = [...favoritosBackend];

      localLikes.forEach(localPost => {
        if (!todos.some(p => p.id === localPost.id)) {
          todos.push(localPost);
        }
      });
      setPosts(todos);
    });
}, [userId]);



  return (
    <div className="posts-container">
      <div className="posts-header">
        <h2 className="posts-title">My Favorites</h2>
      </div>

      <div className="posts-grid">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div 
              key={post.id} 
              className="post-card"
              onClick={() => navigate(`/post/${post.id}`)}
            >
              <div className="post-image">
                <img
                  src={`http://localhost:8080/posts/${post.id}/imagemUrl`}
                  alt={post.title}
                />
              </div>

              <div className="post-info">
                <h3>{post.title}</h3>
              </div>
            </div>
          ))
        ) : (
          <>
            {[1,2,3,4,5,6,7,8].map(n => (
              <div key={n} className="post-card">
                <div className="post-placeholder" />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default MyFavorites;