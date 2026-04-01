import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../pages/Post.css";
import Navbar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const userId = user?.id;

  useEffect(() => {
  if (!id) return;

  
  fetch(`http://localhost:8080/posts/${id}`)
    .then(res => res.json())
    .then(data => setPost(data))
    .catch(err => console.error(err));

  
  if (userId) {
    fetch(`http://localhost:8080/favoritos?usuarioId=${userId}&postId=${id}`)
      .then(res => res.json())
      .then(data => {
  if (Array.isArray(data)) {
    const isFavorited = data.some(fav => fav.postId === Number(id));
    setFavorited(isFavorited);
  } else {
    setFavorited(false);
  }
})
      .catch(err => {
        console.error(err);
        setFavorited(false);
      });
  }
}, [id, userId]);

  const handleFavorite = async () => {
    if (!userId) {
      alert("Faça login para favoritar");
      return;
    }

    if (!post) return;

    try {
      if (!favorited) {
        await fetch(
          `http://localhost:8080/favoritos?usuarioId=${userId}&postId=${post.id}`,
          { method: "POST" }
        );
        setFavorited(true);
      } else {
        await fetch(
          `http://localhost:8080/favoritos?usuarioId=${userId}&postId=${post.id}`,
          { method: "DELETE" }
        );
        setFavorited(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!post) return <p>Carregando...</p>;

  return (
    <>
      {showModal && (
        <div className="image-modal" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <img
              src={`http://localhost:8080/posts/${post.id}/imagemUrl`}
              alt={post.title}
            />
            <div className="modal-actions">
              <button className="close-btn" onClick={() => setShowModal(false)}>
                ✖
              </button>
            </div>
          </div>
        </div>
      )}

      <Navbar />

      <div className="post-detail-page">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Voltar
        </button>

        <div className="post-detail-content">
          <div className="image-box">
            <img
              src={`http://localhost:8080/posts/${post.id}/imagemUrl`}
              alt={post.title}
              onClick={() => setShowModal(true)}
            />

            <div className="actions">
              <button
                className={`like-btn ${favorited ? "liked" : ""}`}
                onClick={handleFavorite}
              >
                {favorited ? (
                  <i className="fa-solid fa-heart"></i>
                ) : (
                  <i className="fa-regular fa-heart"></i>
                )}
                {favorited ? " Favorited" : " Favorite"}
              </button>
              <button className="share-btn">
                <i className="fa-solid fa-share"></i> Share
              </button>
            </div>
          </div>

          <div className="info-card">
            <h1>{post.title}</h1>
            <p className="artist">by {post.artistName}</p>

            <div className="tags">
              <span>{post.tecnica}</span>
              <span>{post.type}</span>
              <span>{post.style}</span>
              <span>{post.theme}</span>
            </div>

            <div className="info-grid">
              <p>
                <strong>Personagem:</strong> {post.characterName}
              </p>
              <p>
                <strong>Tipo:</strong> {post.characterType}
              </p>
            </div>

            <div className="description">
              <h3>Descrição</h3>
              <p>{post.description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;