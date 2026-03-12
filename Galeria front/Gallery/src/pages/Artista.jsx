import Navbar from "../components/NavBar";
import "./Artista.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import MyGallery from "../components/MyGallery";
import MyOcs from "../components/MyOcs";
import MyPost from "../components/MyPost";
import NewPost from "../components/NewPost"

export default function PerfilArtista() {

  const { user, login, logout } = useAuth();
  const navigate = useNavigate();
  const [abaAtiva, setAbaAtiva] = useState("gallery");

  // proteger rota
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // states
  const [nome, setNome] = useState(user?.nome || "");
  const [descricao, setDescricao] = useState(user?.descricao || "");
  const [foto, setFoto] = useState(user?.fotoUrl || "");

  function handleLogout(){
    logout();
    navigate("/login");
  }

  async function salvarPerfil(){

  try{

    const response = await fetch(`http://localhost:8080/usuarios/${user.id}`,{
      method:"PUT",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        nome:nome,
        descricao:descricao,
        email:user.email,
        role:user.role
      })
    })

    if(!response.ok){
      throw new Error("Erro ao atualizar perfil")
    }

    const data = await response.json()

    login(data)

    alert("Perfil atualizado com sucesso!")

  }catch(error){

    console.error(error)
    alert("Erro ao salvar perfil")

  }

}

  return (
    <div className="perfil-page">

      <Navbar />

      <div className="perfil-header">

  <div className="perfil-avatar">
    {foto && <img src={foto} alt="perfil" />}
  </div>

  <div className="perfil-info">

    <div className="perfil-nome">

      <input
        value={nome}
        onChange={(e)=>setNome(e.target.value)}
        className="nome-input"
      />

      <i className="fa-solid fa-pen edit-icon"></i>

    </div>

    <div className="perfil-descricao">

      <textarea
        value={descricao}
        onChange={(e)=>setDescricao(e.target.value)}
        className="descricao-input"
      />

      <i className="fa-solid fa-pen edit-icon"></i>

    </div>

    <div className="perfil-actions">

      <button
        onClick={salvarPerfil}
        className="save-profile"
      >
        <i className="fa-solid fa-floppy-disk"></i>
          Save Profile
      </button>

      <button
        onClick={handleLogout}
        className="logout-btn"
      >
        <i className="fa-solid fa-right-from-bracket"></i>
        Logout
      </button>

    </div>

  </div>

</div>  
      <div className="perfil-content">
        {/* MENU LATERAL - Agora usamos botões normais */}
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
          >My OC's</button>

          <button 
            onClick={() => setAbaAtiva("posts")} 
            className={abaAtiva === "posts" ? "menu-btn active" : "menu-btn"}
          >My Posts</button>
          
          <button 
            onClick={() => setAbaAtiva("favorites")} 
            className={abaAtiva === "favorites" ? "menu-btn active" : "menu-btn"}
          >Favorites</button>
          
        </div>

        {/* ÁREA DE CONTEÚDO - Onde a mágica acontece */}
        <div className="gallery-area">
          {abaAtiva === "gallery" && <MyGallery userId={user?.id} />}
          {abaAtiva === "ocs" && <MyOcs userId={user?.id} />}
          
          {abaAtiva === "posts" && (
    <MyPost
      userId={user?.id} 
      onAddNew={() => setAbaAtiva("new-post")} 
    />
  )}
  {abaAtiva === "new-post" && (
    <NewPost 
      userId={user?.id} 
      onSaveSuccess={() => setAbaAtiva("posts")} 
    />
  )}
          {abaAtiva === "favorites" && <div>Em breve: Desenhos Favoritos</div>}
          
        </div>
      </div>
    </div>
  );
}