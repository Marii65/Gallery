import "./NavBar.css";
import logo from "../assets/logo.png";
import Submit from "./Submit";
import { useNavigate } from "react-router-dom";

export default function Navbar() {

   const navigate = useNavigate();

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  function handleProfileClick(){

    if(usuario){
      navigate("/usuario"); // usuário logado
    }else{
      navigate("/login"); // não logado
    }

  }


  return (
    <header className="navbar">
      <img className="logo" src={logo} alt="Logo" />

      
      <div className="nav-right">
        <button onClick={() => navigate("/")} className="button">Home</button>
        <  Submit className="submit"/>
        <button onClick={() => navigate("/usuario")} className="profile">
          <i className="fa-solid fa-user"></i>
        </button>
      </div>
    </header>
  );
}
