import Navbar from "../components/NavBar";
import "../pages/Signup.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {

const [erro, setErro] = useState("");
const [mensagem, setMensagem] = useState("");
const navigate = useNavigate();


  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    role: "ARTISTA"
  });
  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

async function handleSubmit(e) {
  e.preventDefault();

  setErro("");
  setMensagem("");

  try {
    const response = await fetch("http://localhost:8080/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await response.json();

    if (response.ok) {
      setMensagem("Usuário criado com sucesso!");
    } else {
      setErro(data.message || "Erro ao cadastrar usuário");
    }

  } catch (error) {
    setErro("Erro ao conectar no servidor");
  }
}
  return (
    <div>
      <Navbar />
      <div className="signup-container">
        <form className="signup-box" onSubmit={handleSubmit}>

          <div className="row">
            <div className="field">
              <label>*Email:</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label>*Username:</label>
              <input
                type="text"
                name="nome"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="field full">
            <label>*Senha:</label>
            <input
              type="password"
              name="senha"
              onChange={handleChange}
              required
            />
          </div>


          <div className="field full">
            <label>*Account type:</label>
            <select name="role" onChange={handleChange}>
              <option value="ARTISTA">ARTIST</option>
              <option value="USER">USER</option>
            </select>
          </div>
{erro && <p className="erro">{erro}</p>}
{mensagem && <p className="sucesso">{mensagem}</p>}
          <button className="signup-btn">Sign Up</button>

          <p onClick={() => navigate("/login")} className="login-link">Log in</p>

        </form>
      </div>
    </div>

  ) 
}
