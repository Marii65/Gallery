import Navbar from "../components/NavBar";
import "./Artista.css";
import { useState, useEffect, useRef } from "react"; // useRef adicionado aqui
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import MyGallery from "../components/MyGallery";
import MyOcs from "../components/MyOcs";
import MyPost from "../components/MyPost";
import NewPost from "../components/NewPost";
import MyFavorites from "../components/MyFavorites";

export default function PerfilArtista() {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // ESTADOS
  const [abaAtiva, setAbaAtiva] = useState("gallery"); // Faltava esta linha
  const [nome, setNome] = useState(user?.nome || "");
  const [descricao, setDescricao] = useState(user?.descricao || "");
  const [foto, setFoto] = useState(user?.fotoUrl || "");

  // Proteger rota
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Função para abrir seletor de arquivos
  function handleImageClick() {
    fileInputRef.current.click();
  }

  // Converter imagem para Base64 para visualização e envio
  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  async function salvarPerfil() {
    try {
      const response = await fetch(`http://localhost:8080/usuarios/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: nome,
          descricao: descricao,
          fotoUrl: foto,
          email: user.email,
          role: user.role,
        }),
      });

      if (!response.ok) throw new Error("Erro ao atualizar perfil");

      const data = await response.json();
      login(data); 
      alert("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar perfil");
    }
  }

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="perfil-page">
      <Navbar />

      <div className="perfil-header">
        {/* Input de arquivo invisível */}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleImageChange}
        />

        <div className="perfil-avatar clickable" onClick={handleImageClick}>
          {foto ? <img src={foto} alt="perfil" /> : <i className="fa-solid fa-camera"></i>}
          <div className="avatar-overlay">
            <i className="fa-solid fa-camera"></i>
          </div>
        </div>

        <div className="perfil-info">
          <div className="perfil-inputs-container">
            <div className="input-group">
              <h3>Nome de Artista</h3>
              <div className="input-wrapper">
                <input
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="nome-input"
                />
                <i className="fa-solid fa-pen"></i>
              </div>
            </div>

            <div className="input-group">
              <h3>Biografia</h3>
              <div className="input-wrapper">
                <textarea
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  className="descricao-input"
                  placeholder="Conte um pouco sobre você..."
                />
                <i className="fa-solid fa-pen"></i>
              </div>
            </div>
          </div>

          <div className="perfil-actions">
            <button onClick={salvarPerfil} className="save-profile">
              <i className="fa-solid fa-check"></i> Salvar Alterações
            </button>
            <button onClick={handleLogout} className="logout-btn">
              <i className="fa-solid fa-right-from-bracket"></i> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="perfil-content">
        <div className="perfil-menu">
          <button
            onClick={() => setAbaAtiva("gallery")}
            className={abaAtiva === "gallery" ? "menu-btn active" : "menu-btn"}
          >
            My Gallery
          </button>
          <button
            onClick={() => setAbaAtiva("ocs")}
            className={abaAtiva === "ocs" ? "menu-btn active" : "menu-btn"}
          >
            My OC's
          </button>
          <button
            onClick={() => setAbaAtiva("posts")}
            className={abaAtiva === "posts" ? "menu-btn active" : "menu-btn"}
          >
            My Posts
          </button>
          <button
            onClick={() => setAbaAtiva("favorites")}
            className={abaAtiva === "favorites" ? "menu-btn active" : "menu-btn"}
          >
            Favorites
          </button>
        </div>

        <div className="gallery-area">
          {abaAtiva === "gallery" && <MyGallery userId={user?.id} />}
          {abaAtiva === "ocs" && <MyOcs userId={user?.id} />}
          {abaAtiva === "posts" && (
            <MyPost userId={user?.id} onAddNew={() => setAbaAtiva("new-post")} />
          )}
          {abaAtiva === "new-post" && (
            <NewPost userId={user?.id} onSaveSuccess={() => setAbaAtiva("posts")} />
          )}
          {abaAtiva === "favorites" && <MyFavorites userId={user?.id} />}
        </div>
      </div>
    </div>
  );
}