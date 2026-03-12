import React from 'react';
import './MyGallery.css';
import "./NavBar.css";
import Navbar from './NavBar';
import { Nav } from 'react-bootstrap';
import { useState, useEffect } from "react";

const MyGallery = () => {
  const [galerias, setGalerias] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState("");

  // 1. Buscar dados da API ao carregar
  useEffect(() => {
    fetch('http://localhost:8080/galerias') // Usando ID 1 como exemplo
      .then(res => res.json())
      .then(data => setGalerias(data));
  }, []);

  // 2. Função para salvar nova galeria no Banco
  const handleSave = () => {
    const newGallery = { name: newName, coverUrl: "", userId: 1 };

    fetch('http://localhost:8080/galerias', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newGallery)
    })
    .then(res => res.json())
    .then(savedGallery => {
      setGalerias([...galleries, savedGallery]); // Atualiza a lista na tela
      setShowModal(false);
      setNewName("");
    });
  };

  return (
   
    <div className="gallery-section">

      <div className="header">
        <h1 className="title">My Gallery</h1>
        <button className="add-btn" onClick={() => setShowModal(true)}>
          New Gallery <span>+</span>
        </button>
      </div>

      <div className="grid">
        {galerias.map(g => (
          <div key={g.id} className="folder-card">
            <div className="folder-preview">
              {g.coverUrl ? <img src={g.coverUrl} alt={g.name} /> : <div className="placeholder" />}
            </div>
            <div className="folder-name">{g.name}</div>
          </div>
        ))}
      </div>

      {/* Modal para criar nova galeria */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Nome da Galeria</h3>
            <input 
              value={newName} 
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Ex: Estudos de Anatomia"
            />
            <div className="modal-actions">
              <button onClick={() => setShowModal(false)}>Cancelar</button>
              <button className="confirm-btn" onClick={handleSave}>Criar</button>
            </div>
          </div>
        </div>
      )}
    </div>
   
  );
};

export default MyGallery;