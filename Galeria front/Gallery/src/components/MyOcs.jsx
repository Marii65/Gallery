import React, { useState, useEffect } from 'react';
import './MyOcs.css';

const MyOcs = ({ userId }) => {
  const [ocs, setOcs] = useState([]);

  // Busca os OCs do banco de dados (Java)
  useEffect(() => {
    fetch(`http://localhost:8080/ocs/${userId}`)
      .then(res => res.json())
      .then(data => setOcs(data))
      .catch(err => console.error("Erro ao carregar OCs:", err));
  }, [userId]);

  return (
    <div className="ocs-container">
      <div className="ocs-header">
        <h2 className="ocs-title">My OC's</h2>
        <button className="new-oc-btn">
          New OC <span>+</span>
        </button>
      </div>

      <div className="ocs-grid">
        {ocs.length > 0 ? (
          ocs.map((oc) => (
            <div key={oc.id} className="oc-card">
              <div className="oc-image-area">
                {oc.fotoUrl ? <img src={oc.fotoUrl} alt={oc.nome} /> : <div className="oc-placeholder" />}
              </div>
              <div className="oc-info">
                <span className="oc-name">{oc.nome}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="empty-msg">Nenhum personagem cadastrado ainda.</p>
        )}
      </div>
    </div>
  );
};

export default MyOcs;