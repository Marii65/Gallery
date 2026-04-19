import React, { useState, useEffect } from "react";
import "./MyGallery.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const MyGallery = () => {
  const [galerias, setGalerias] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newGallery, setNewGallery] = useState({
    nome: "",
    descricao: "",
  });
  const navigate = useNavigate();
  const { user } = useAuth();


  useEffect(() => {
  if (!user?.id) return;

  fetch(`http://localhost:8080/galerias/usuarios/${user.id}`)
    .then(res => res.json())
    .then(data => setGalerias(data))
    .catch(err => console.error(err));

}, [user]);

  const handleSave = () => {
    if (!newGallery.nome.trim()) {
      alert("Nome da galeria é obrigatório!");
      return;
    }

   

const galleryToSend = {
  nome: newGallery.nome,
  descricao: newGallery.descricao,
  usuarioId: Number(user.id)
};
console.log(JSON.stringify(galleryToSend, null, 2));

   fetch(`http://localhost:8080/galerias/usuarios/${user.id}`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(galleryToSend)
})  
  .then((res) => res.json())
  .then((savedGallery) => {
    setGalerias([...galerias, savedGallery]);
    setNewGallery({ nome: "", descricao: "" });
    setShowModal(false);
  })
  .catch((err) => console.error(err));
}

  return (
    <div className="gallery-section">
      <div className="header">
        <h1 className="title">My Galleries</h1>
        <button className="add-btn" onClick={() => setShowModal(true)}>
          New Gallery +
        </button>
      </div>

      <div className="grid">
        {galerias.map((g, index) => (
          <div
            key={g.id || index}
            className="folder-card"
            onClick={() => navigate(`/artista/gallery/${g.id}`)}
          >
            <div className="folder-preview">
              <div className="placeholder" />
            </div>

            <div className="folder-info">
              <h4 className="folder-name">{g.nome}</h4>
              <p className="folder-desc">
                {g.descricao || "Nenhuma descrição adicionada."}
              </p>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
        <div className="modal-content">
  <div className="modal-header">
    <h3>Criar Nova Galeria</h3>

    <div className="modal-header-actions">
      <button className="cancel-btn" onClick={() => setShowModal(false)}>
        Cancelar
      </button>
      <button className="confirm-btn" onClick={handleSave}>
        Criar Galeria
      </button>
    </div>
  </div>

  <div className="modal-body">
    <input
      type="text"
      placeholder="Nome da Galeria *"
      value={newGallery.nome}
      onChange={(e) =>
        setNewGallery({ ...newGallery, nome: e.target.value })
      }
    />

    <textarea
      placeholder="Descrição (opcional)"
      value={newGallery.descricao}
      onChange={(e) =>
        setNewGallery({ ...newGallery, descricao: e.target.value })
      }
    />
  </div>
</div>
</div>
      )}
    </div>
  );
};

export default MyGallery;