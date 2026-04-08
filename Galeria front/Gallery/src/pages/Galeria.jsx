import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Galeria.css";
import Navbar from "../components/NavBar";

const Galeria = () => {
  const { id } = useParams();

  const [gallery, setGallery] = useState(null);
  const [posts, setPosts] = useState([]);

  const userId = 1;

  
  useEffect(() => {
    fetch(`http://localhost:8080/galerias/${id}`)
      .then((res) => res.json())
      .then((data) => setGallery(data));

    fetch(`http://localhost:8080/posts?galleryId=${id}`)
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, [id]);

  if (!gallery) return <p>Carregando...</p>;

  const isOwner = gallery.usuario_id === userId;

  return (
    <div className="gallery-page">
      <Navbar />

    
      <div className="gallery-header">
        <h1>{gallery.nome}</h1>
        <p>{gallery.descricao || "Sem descrição"}</p>

        <span className="date">
          Criado em:{" "}
          {new Date(gallery.data_criacao).toLocaleDateString()}
        </span>

        <span className="status">
          {gallery.is_public ? "🌍 Pública" : "🔒 Privada"}
        </span>

        
        {isOwner && (
          <button className="add-post-btn">
            + Adicionar desenho
          </button>
        )}
      </div>

      <div className="posts-grid">
        {posts.length === 0 ? (
          <p>Nenhum desenho ainda 😢</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="post-card">
              <img src={post.image_url} alt={post.titulo} />
              <div className="post-info">
                <h4>{post.titulo}</h4>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Galeria;