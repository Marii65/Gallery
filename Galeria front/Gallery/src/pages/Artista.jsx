import Navbar from "../components/NavBar";
import "./Artista.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PerfilArtista() {

  const navigate = useNavigate();

  // pegar usuário do localStorage
  const storedUser = localStorage.getItem("user");

  let user = null;

  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch {
    user = null;
  }

  // proteger rota
  useEffect(() => {
    if (!storedUser) {
      navigate("/login");
    }
  }, [navigate, storedUser]);

  // states
  const [nome, setNome] = useState(user?.nome || "");
  const [descricao, setDescricao] = useState(user?.descricao || "");
  const [foto, setFoto] = useState(user?.foto || "");

  async function salvarPerfil() {

    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:8080/usuarios/perfil", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        nome,
        descricao,
        foto
      })
    });

    const data = await response.json();

    if (response.ok) {

      // atualizar localStorage
      const updatedUser = {
        ...user,
        nome,
        descricao,
        foto
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));

      alert("Perfil atualizado!");

    } else {
      alert("Erro ao atualizar perfil");
    }
  }

  return (
    <div className="perfil-page">

      <Navbar />

      <div className="perfil-header">

  <div className="perfil-info">

    <div className="avatar">
      {foto && <img src={foto} alt="perfil" />}
    </div>

    <div className="perfil-text">

      <div className="perfil-nome">

        <input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="nome-input"
        />

        <span className="edit-icon">✏️</span>

      </div>

      <div className="perfil-descricao">

        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="descricao-input"
        />

        <span className="edit-icon">✏️</span>

      </div>

    </div>

  </div>

  <button onClick={salvarPerfil} className="save-profile">
    Save Profile
  </button>

</div>

      <div className="perfil-content">

        <div className="perfil-menu">
          <button>My Gallery</button>
          <button>My OC's</button>
          <button>My Posts</button>
          <button>Favorites</button>
        </div>

        <div className="gallery-area">

          <div className="gallery-header">
            <h2>My Gallery</h2>

            <button className="new-gallery">
              New Gallery +
            </button>
          </div>

          <div className="gallery-grid">

            <div className="gallery-card">
              <div className="img-placeholder"></div>
              <span>Circus</span>
            </div>

            <div className="gallery-card">
              <div className="img-placeholder"></div>
              <span>Commissions</span>
            </div>

            <div className="gallery-card">
              <div className="img-placeholder"></div>
              <span>My best drawings</span>
            </div>

            <div className="gallery-card">
              <div className="img-placeholder"></div>
              <span>Fanarts</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}