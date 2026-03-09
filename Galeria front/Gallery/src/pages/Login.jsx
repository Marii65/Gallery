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

      if (response.ok) {
        // ✅ Login bem-sucedido
        setMensagem("Login realizado!");

        // Salva token e dados do usuário no localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Redireciona de acordo com o tipo de usuário
        redirectToProfile(data.user.role);

      } else {
        setErro(data.message || "Erro no login");
      }
    } catch (error) {
      setErro("Erro ao conectar com o servidor");
    }
  }

  // Redireciona para a página correta com base no perfil
  const redirectToProfile = (role) => {
    switch (role) {
      case "user":
        navigate("/perfil"); // Usuário normal
        break;
      case "artista":
        navigate("/perfil-artista"); // Artista
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