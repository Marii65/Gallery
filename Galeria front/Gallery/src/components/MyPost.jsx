import React, { useState, useEffect } from 'react';
import './MyPost.css';

const MyPosts = ({ userId, onAddNew }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Busca os posts ordenados por data de criação no seu Spring Boot
    fetch(`http://localhost:8080/posts/user/${userId}?sort=creationDate,desc`)
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error("Erro ao buscar posts:", err));
  }, [userId]);

  return (
    <div className="posts-container">
      <div className="posts-header">
        <h2 className="posts-title">My Posts</h2>

        <button className="new-post-btn" onClick={onAddNew}>
          New Post <span>+</span>
        </button>
        
      </div>

      <div className="posts-grid">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="post-card">
              <div className="post-image">
                {post.imageUrl ? (
                  <img src={post.imageUrl} alt={post.title} />
                ) : (
                  <div className="post-placeholder" />
                )}
              </div>
            </div>
          ))
        ) : (
          /* Placeholders estáticos para preencher a tela enquanto não há dados, como na sua imagem */
          <>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
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

export default MyPosts;