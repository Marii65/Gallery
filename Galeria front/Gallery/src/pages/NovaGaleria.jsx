import { useState } from "react";
import { criarGaleria } from "../service/galeriaservice";

function NovaGaleria() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");

  const usuarioId = 1; // depois vem do login

  const salvar = async (e) => {
    e.preventDefault();

    await criarGaleria({
      nome,
      descricao,
      usuarioId
    });

    setNome("");
    setDescricao("");
    alert("Galeria criada!");
  };

  return (
    <form onSubmit={salvar}>
      <h2>Nova Galeria</h2>

      <input
        placeholder="Nome"
        value={nome}
        onChange={e => setNome(e.target.value)}
        required
      />

      <textarea
        placeholder="Descrição"
        value={descricao}
        onChange={e => setDescricao(e.target.value)}
      />

      <button type="submit">Salvar</button>
    </form>
  );
}

export default NovaGaleria;
