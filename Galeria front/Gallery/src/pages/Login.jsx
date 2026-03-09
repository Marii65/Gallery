import Navbar from "../components/NavBar";
import "../pages/Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
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

  // Função principal de login
  async function handleSubmit(e) {
  e.preventDefault();
  setErro("");
  setMensagem("");

  try {
    const response = await fetch("http://localhost:8080/usuarios/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await response.json();
    console.log("Resposta do backend:", data);

    if (response.ok) {

  setMensagem("Login realizado!");

  localStorage.setItem("token", data.token);

  if (data.user) {
    localStorage.setItem("user", JSON.stringify(data.user));
    redirectToProfile(data.user.role);
  } else if (data.role) {
    redirectToProfile(data.role);
  } else {
    console.log("Resposta do servidor:", data);
  }

}

  } catch (error) {
  console.error(error);
  setErro("Erro ao conectar com o servidor");
}
}

  // Redireciona para a página correta com base no perfil
  const redirectToProfile = (role) => {
     const r = role.toLowerCase();
    switch (r) {
      case "user":
        navigate("/perfil"); // Usuário normal
        break;
      case "artista":
        navigate("/artista"); // Artista
        break;
      case "adm":
        navigate("/admin"); // Admin
        break;
      default:
        navigate("/login"); // fallback
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

          <button type="submit" className="login-btn">Log in</button>
          <p onClick={() => navigate("/signup")} className="login-link">Sign Up</p>

        </form>
      </div>
    </div>
  );
}