import "./NavBar.css";
import logo from "../assets/logo.png";
import Submit from "./Submit";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {

  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  function handleLogout() {
    logout();
    setMenuOpen(false);
    navigate("/");
  }

 function irParaPerfil(){

  if(!user){
    navigate("/login");
    return;
  }

  const role = user.role?.toUpperCase();


  if(role === "ARTISTA"){
    navigate("/artista");
  } 
  else if(role === "USER"){
    navigate("/usuario");
  } 
  else {
    navigate("/perfil");
  }

  setMenuOpen(false);
}

  // fechar menu clicando fora
  useEffect(() => {

    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

  }, []);

  return (
    <header className="navbar">

      <img
        className="logo"
        src={logo}
        alt="Logo"
        onClick={() => navigate("/")}
      />

      <div className="nav-right">

        <button onClick={() => navigate("/")} className="button">
          Home
        </button>

        {user && (
          <Submit
            className="submit"
            onClick={() => navigate("/artista")}
          />
        )}

        <div className="profile-container" ref={menuRef}>

          <button onClick={toggleMenu} className="profile">
            <i className="fa-solid fa-user"></i>
          </button>

          {menuOpen && (
            <div className="dropdown">

              {/* Usuário não logado */}
              {!user && (
                <>
                  <button onClick={() => navigate("/login")}>
                    Login
                  </button>

                  <button onClick={() => navigate("/signup")}>
                    Sign Up
                  </button>
                </>
              )}

              {/* Usuário logado */}
              {user && (
                <>
                  <div className="dropdown-user">
                    👤 {user.nome}
                  </div>

                  <button onClick={irParaPerfil}>
                    Perfil
                  </button>

                  <button className="Logout" onClick={handleLogout}>
                    Logout
                  </button>
                </>
              )}

            </div>
          )}

        </div>

      </div>

    </header>
  );
}