import { adicionarFavorito, removerFavorito } from "../services/favoritoService";
import { useState } from "react";

function Favoritar({ desenhoId, favoritoIdInicial }) {
  const [favoritoId, setFavoritoId] = useState(favoritoIdInicial);

  const usuarioId = 1; // depois vem do login

  const favoritar = async () => {
    const favorito = await adicionarFavorito(usuarioId, desenhoId);
    setFavoritoId(favorito.id);
  };

  const desfavoritar = async () => {
    await removerFavorito(favoritoId);
    setFavoritoId(null);
  };

  return (
    <button onClick={favoritoId ? desfavoritar : favoritar}>
      {favoritoId ? "❤️" : "🤍"}
    </button>
  );
}

export default Favoritar;
