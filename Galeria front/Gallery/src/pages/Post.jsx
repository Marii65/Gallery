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

  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [userGalleries, setUserGalleries] = useState([]);
  const [loadingGalleries, setLoadingGalleries] = useState(false);

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

  const handleOpenGalleryModal = async () => {
    if (!userId) {
      alert("Faça login para adicionar a uma galeria.");
      return;
    }
    
    setShowGalleryModal(true);
    setLoadingGalleries(true);

    try {
      const res = await fetch(`http://localhost:8080/galerias/usuario/${userId}`);
      
      if (res.ok) {
        const data = await res.json();
        setUserGalleries(data);
      } else {
        console.error("Erro ao buscar galerias.");
        setUserGalleries([]);
      }
    } catch (err) {
      console.error("Erro de conexão ao buscar galerias:", err);
    } finally {
      setLoadingGalleries(false);
    }
  };

  const handleAddToGallery = async (galeriaId) => {
    try {
      const res = await fetch(`http://localhost:8080/galerias/${galeriaId}/posts/${post.id}`, {
        method: "POST"
      });

      if (res.ok) {
        alert("Desenho adicionado à galeria com sucesso!");
        setShowGalleryModal(false); // Fecha o modal após o sucesso
      } else {
        alert("Erro ao adicionar. Talvez o desenho já esteja nesta galeria?");
      }
    } catch (err) {
      console.error("Erro ao adicionar à galeria:", err);
      alert("Erro de conexão ao salvar na galeria.");
    }
  };

  if (!post) return <p>Carregando...</p>;

  return (
    
    <>{showModal && (
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

      {showGalleryModal && (
        <div className="gallery-modal-overlay" onClick={() => setShowGalleryModal(false)} style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999
        }}>
          <div className="gallery-modal-content" onClick={e => e.stopPropagation()} style={{
            backgroundColor: '#1a1a1a', padding: '25px', borderRadius: '12px', minWidth: '320px', color: '#fff', border: '1px solid #333'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0 }}>Adicionar à Galeria</h3>
              <button onClick={() => setShowGalleryModal(false)} style={{
                background: 'transparent', border: 'none', color: '#fff', fontSize: '18px', cursor: 'pointer'
              }}>✖</button>
            </div>

            {loadingGalleries ? (
              <p>Carregando suas galerias...</p>
            ) : userGalleries.length > 0 ? (
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, maxHeight: '300px', overflowY: 'auto' }}>
                {userGalleries.map(galeria => (
                  <li key={galeria.id} style={{ marginBottom: '10px' }}>
                    <button 
                      onClick={() => handleAddToGallery(galeria.id)}
                      style={{
                        width: '100%', padding: '12px', cursor: 'pointer', borderRadius: '8px', 
                        border: '1px solid #444', backgroundColor: '#2d0320', color: 'white',
                        display: 'flex', alignItems: 'center', gap: '10px', fontSize: '16px', fontWeight: 'bold'
                      }}
                    >
                      📁 {galeria.nome || "Galeria Sem Nome"}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ color: '#ccc', textAlign: 'center' }}>Você ainda não criou nenhuma galeria.</p>
            )}
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
              style={{ cursor: 'pointer' }}
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
                {favorited ? " Favoritado" : " Favoritar"}
              </button>
              
              
              <button className="add-gallery-btn" onClick={handleOpenGalleryModal} style={{
                backgroundColor: 'transparent', color: 'white', border: '1px solid #fff', 
                padding: '8px 15px', borderRadius: '20px', cursor: 'pointer', display: 'flex', gap: '5px', alignItems: 'center'
              }}>
                <i className="fa-solid fa-folder-plus"></i> Salvar
              </button>

              <button className="share-btn">
                <i className="fa-solid fa-share"></i> Compartilhar
              </button>
            </div>
          </div>

          <div className="info-card">
            <h1>{post.title}</h1>
            <p className="artist">por {post.artistName}</p>

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