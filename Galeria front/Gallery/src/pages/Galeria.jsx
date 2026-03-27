import { useEffect, useState } from "react";
import api from "../service/api";

export default function Galeria() {
  const [galerias, setGalerias] = useState([]);

  const usuarioId = 1; 

  async function carregarGalerias() {
  const response = await api.get("/galerias");
  setGalerias(response.data);
}


  // ❤️ FUNÇÃO DE FAVORITAR
  async function favoritar(desenhoId) {
    try {
      await api.post("/favoritos", null, {
        params: {
          usuarioId: usuarioId,
          desenhoId: desenhoId
        }
      });

      alert("Favoritado com sucesso ❤️");
    } catch (error) {
      console.error(error);
      alert("Erro ao favoritar");
    }
  }

  useEffect(() => {
    carregarGalerias();
  }, []);

  return (
    <div>
      <h1>Galeria</h1>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {galerias.map(desenho => (
          <div key={desenho.id} style={{ border: "1px solid #ccc", padding: 10 }}>
            <img
              src={desenho.imagemUrl}
              alt={desenho.titulo}
              width={200}
            />

            <h3>{desenho.titulo}</h3>

          
          </div>
        ))}
      </div>
    </div>
  );
}
