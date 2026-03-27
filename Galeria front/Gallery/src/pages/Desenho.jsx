import { useEffect, useState } from "react";
import api from "../service/api";

function Desenhos() {
  const [desenhos, setDesenhos] = useState([]);

  useEffect(() => {
    api.get("/desenhos")
      .then(response => setDesenhos(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Galeria</h1>

      {desenhos.map(desenho => (
        <div key={desenho.id}>
          <img src={desenho.imagemUrl} width="200" />
          <h3>{desenho.titulo}</h3>
          <p>{desenho.artista}</p>
          <FavoritarButton desenhoId={desenho.id} favoritoIdInicial={null} />
        </div>
      ))}
    </div>
  );
}

export default Desenhos;