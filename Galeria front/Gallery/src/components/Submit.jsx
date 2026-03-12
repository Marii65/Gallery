import { useNavigate } from "react-router-dom";
import "./Submit.css";

function Submit() {

  async function criarDesenho(desenho){

  const token = localStorage.getItem("token");
  localStorage.setItem("user", JSON.stringify(data.user));

  const response = await fetch("http://localhost:8080/desenhos",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "Authorization":`Bearer ${token}`
    },
    body:JSON.stringify(desenho)
  });

  const data = await response.json();

  return data;
}

  const navigate = useNavigate();

  function handleClick() {
    const isLogged = !!localStorage.getItem("token");

    if (isLogged) {
      navigate("/post");
    } else {
      navigate("/login");
    }
  }

  return (
    <button className="submit-btn" onClick={handleClick}>
      Submit <span className="plus">+</span>
    </button>
  );
}
function handleClick() {

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if(!token){
    navigate("/login");
    return;
  }

  if(user.role !== "artista"){
    alert("Apenas artistas podem enviar desenhos");
    return;
  }

  navigate("/post");
}

export default Submit;
