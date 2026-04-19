import Navbar from "../components/NavBar";
import "../pages/Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {

  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    senha: ""
  });

  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");

  // Atualiza os campos do formulário
  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  // Função de login
  async function handleSubmit(e) {

  e.preventDefault();

  const response = await fetch("http://localhost:8080/usuarios/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(form)
  });

  const data = await response.json();

  if(response.ok){

    login(data);

    redirectToProfile(data.role);

  }else{

    setErro(data.message);

  }

}

  // Redirecionamento baseado no perfil
  const redirectToProfile = (role) => {

    const r = role.toLowerCase();

    switch (r) {

      case "user":
        navigate("/artista");
        break;

      case "artista":
        navigate("/artista");
        break;

      default:
        navigate("/login");
    }
  };

  return (

    <div>

      <Navbar />

      <div className="login-container">

        <form className="login-box" onSubmit={handleSubmit}>

          <div className="field">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <label>Senha:</label>
            <input
              type="password"
              name="senha"
              value={form.senha}
              onChange={handleChange}
              required
            />
          </div>

          {erro && <p className="erro">{erro}</p>}
          {mensagem && <p className="sucesso">{mensagem}</p>}

          <button type="submit" className="login-btn">
            Log in
          </button>

          <p
            onClick={() => navigate("/signup")}
            className="login-link"
          >
            Sign Up
          </p>

        </form>

      </div>

    </div>

  );
}