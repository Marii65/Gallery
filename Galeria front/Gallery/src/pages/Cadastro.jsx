import { useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function NewArtist() {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.post("/artists", {
      name,
      bio
    });

    navigate("/");
  };

  return (
    <div>
      <h1>Cadastrar Artista</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nome"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <textarea
          placeholder="Biografia"
          value={bio}
          onChange={e => setBio(e.target.value)}
        />

        <button>Salvar</button>
      </form>
    </div>
  );
}
