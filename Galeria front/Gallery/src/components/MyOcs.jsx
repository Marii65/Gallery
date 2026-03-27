import React, { useState, useEffect } from 'react';
import './MyOcs.css';
import NewOc from "./NewOc";
import { useNavigate } from "react-router-dom";

const MyOcs = ({ userId }) => {
  const [ocs, setOcs] = useState([]);
  const [modo, setModo] = useState("lista");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/personagens/usuarios/${userId}`)
      .then(res => res.json())
      .then(data => setOcs(data))
      .catch(err => console.error("Erro ao carregar OCs:", err));
  }, [userId]);

  function recarregar() {
    fetch(`http://localhost:8080/personagens/usuarios/${userId}`)
      .then(res => res.json())
      .then(data => setOcs(data));
  }

  return (
    <div className="ocs-container">

      {modo === "novo" && (
        <NewOc
          userId={userId}
          onCancel={() => setModo("lista")}
          onSuccess={() => {
            setModo("lista");
            recarregar();
          }}
        />
      )}

      {modo === "lista" && (
        <>
          <div className="ocs-header">
            <h2 className="ocs-title">My OC's</h2>

            <button
              className="new-oc-btn"
              onClick={() => setModo("novo")}
            >
              New OC <span>+</span>
            </button>
          </div>

          <div className="ocs-grid">
            {ocs.length > 0 ? (
              ocs.map((oc) => (
                <div
                  key={oc.id}
                  className="oc-card"
                  onClick={() => navigate(`/artista/personagem/${oc.id}`)}
                >
                  <div className="oc-image-area">
                    {oc.imagemUrl ? (
                      <img
                        src={`data:image/jpeg;base64,${oc.imagemUrl}`}
                        alt={oc.nome}
                      />
                    ) : (
                      <div className="oc-placeholder" />
                    )}
                  </div>

                  <div className="oc-info">
                    <span className="oc-name">{oc.nome}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="empty-msg">
                Nenhum personagem cadastrado ainda.
              </p>
            )}
          </div>
        </>
      )}

    </div>
  );
};

export default MyOcs;