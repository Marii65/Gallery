import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ArtistProfile.css'; 
import Navbar from '../components/NavBar';

const filterCategories = {
  tecnica: { title: '🖌️ Técnica', options: ['Digital', 'Lápis'] },
  tipo: { title: '🧠 Tipo de desenho', options: ['Original', 'Fanart', 'Studding', 'Sketch', 'Comission', 'Concept art'] },
  estilo: { title: '🎭 Estilo', options: ['Cartoon', 'Furry', 'Anime / Mangá', 'realista', 'Chibi', 'Minimalista', 'Pixel art'] },
  personagem: { title: '👤 Personagem', options: ['Personagem original (OC)', 'Personagem famoso'] },
  tema: { title: '🌍 Tema', options: ['Fantasia', 'Terror', 'Romance', 'Sci-fi', 'Natureza', 'Urbano', 'Mitologia', 'Cotidiano'] }
};

export default function ArtistProfile() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [artista, setArtista] = useState(null);
  const [desenhos, setDesenhos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeFilters, setActiveFilters] = useState({
    tecnica: [], tipo: [], estilo: [], personagem: [], tema: [], dataOrder: 'Recentes'
  });

  useEffect(() => {
    // Busca do Perfil
    fetch(`http://localhost:8080/usuarios/${id}`)
      .then(res => res.json())
      .then(dadosArtista => setArtista(dadosArtista))
      .catch(err => console.error("Erro ao buscar artista:", err));

    fetch(`http://localhost:8080/posts/user/${id}`) 
      .then(res => {
        if (!res.ok) throw new Error("Posts não encontrados (404)"); 
        return res.json();
      })
      .then(dadosPosts => {
        if (Array.isArray(dadosPosts)) {
          setDesenhos(dadosPosts);
        } else {
          setDesenhos([]); 
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Erro ao buscar posts:", err);
        setDesenhos([]); 
        setLoading(false);
      });
  }, [id]);

  const handleFilterChange = (category, option) => {
    setActiveFilters(prev => {
      const currentCategory = prev[category];
      const isSelected = currentCategory.includes(option);
      
      return {
        ...prev,
        [category]: isSelected 
          ? currentCategory.filter(item => item !== option) 
          : [...currentCategory, option] 
      };
    });
  };

  const verificaFiltro = (arrayFiltroSelecionado, valorDoBanco) => {
    if (arrayFiltroSelecionado.length === 0) return true; 
    if (!valorDoBanco) return false; 
    
    const valorPadronizado = String(valorDoBanco).toLowerCase().trim();
    
    return arrayFiltroSelecionado.some(opcaoFiltro => {
      const opcaoPadronizada = opcaoFiltro.toLowerCase().trim();
      return opcaoPadronizada.includes(valorPadronizado) || valorPadronizado.includes(opcaoPadronizada);
    });
  };

  const filteredArtworks = desenhos.filter(art => {
    
    const matchTecnica = verificaFiltro(activeFilters.tecnica, art.tecnica);
    const matchTipo = verificaFiltro(activeFilters.tipo, art.type || art.tipo);
    const matchEstilo = verificaFiltro(activeFilters.estilo, art.style || art.estilo);
    
    // 👇 Mudança aqui: pegamos o characterType (padrão do Java) ou character_type (padrão do banco)
    const valorPersonagem = art.characterType || art.character_type || art.personagem;
    const matchPersonagem = verificaFiltro(activeFilters.personagem, valorPersonagem); 
    
    const matchTema = verificaFiltro(activeFilters.tema, art.theme || art.tema);

    return matchTecnica && matchTipo && matchEstilo && matchPersonagem && matchTema;
  }).sort((a, b) => {
    const dateA = new Date(a.creationDate || a.dataCriacao);
    const dateB = new Date(b.creationDate || b.dataCriacao);
    
    if (activeFilters.dataOrder === 'Recentes') {
      return dateB - dateA;
    } else {
      return dateA - dateB;
    }
  });

  
  if (loading) return <div style={{ padding: '50px', textAlign: 'center' }}>Carregando perfil...</div>;
  if (!artista) return <div style={{ padding: '50px', textAlign: 'center' }}>Artista não encontrado.</div>;

  return (
    <div className="profile-page">
      <Navbar></Navbar>
      
      <div className="top-bar" style={{ padding: '20px 40px 0 40px' }}>
        <button className="back-btn" onClick={() => navigate(-1)} style={{
          backgroundColor: '#2d0320', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold'
        }}>
          ⬅ Voltar
        </button>
      </div>

      <div className="profile-header">
        <div className="avatar-container">
          {artista.fotoUrl ? (
            <img src={artista.fotoUrl} alt={artista.nome} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div className="avatar-placeholder">{artista.nome ? artista.nome.charAt(0) : '?'}</div>
          )}
        </div>
        <div className="profile-info">
          <h1 className="artist-name">{artista.nome}</h1>
          <p className="artist-bio">{artista.descricao || "Este artista ainda não adicionou uma biografia."}</p>
          <span className="last-post"><strong>Last Post:</strong> {artista.dataUltimoPost || "Recente"}</span>
        </div>
      </div>

      <div className="profile-content">
        
        <aside className="filter-sidebar">
          <h2 className="sidebar-title">Filtrar</h2>

          {Object.entries(filterCategories).map(([categoryKey, categoryData]) => (
            <div key={categoryKey} className="filter-group">
              <h3 className="filter-group-title">{categoryData.title}</h3>
              {categoryData.options.map(option => (
                <label key={option} className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={activeFilters[categoryKey].includes(option)}
                    onChange={() => handleFilterChange(categoryKey, option)}
                  />
                  <span className="checkmark"></span>
                  {option}
                </label>
              ))}
            </div>
          ))}

          <div className="filter-group">
            <h3 className="filter-group-title">⏳ Data</h3>
            <label className="checkbox-label">
              <input 
                type="radio" 
                name="dataOrder"
                checked={activeFilters.dataOrder === 'Recentes'}
                onChange={() => setActiveFilters({...activeFilters, dataOrder: 'Recentes'})}
              />
              Recentes
            </label>
            <label className="checkbox-label">
              <input 
                type="radio" 
                name="dataOrder"
                checked={activeFilters.dataOrder === 'Antigos'}
                onChange={() => setActiveFilters({...activeFilters, dataOrder: 'Antigos'})}
              />
              Antigos
            </label>
          </div>
        </aside>

        <main className="gallery-area">
          <h2 className="section-title">Portfólio</h2>
          
          {filteredArtworks.length > 0 ? (
            <div className="art-grid">
              {filteredArtworks.map(art => (
                <div 
                  key={art.id} 
                  className="art-card"
                  onClick={() => navigate(`/post/${art.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="art-placeholder">
                    {/* Renderiza a imagem em Base64 ou URL normal dependendo de como vem do seu banco */}
                    {art.imagemUrl ? (
                      <img src={`data:image/jpeg;base64,${art.imagemUrl}`} alt={art.title || art.titulo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <img src={art.url} alt={art.title || art.titulo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    )}
                  </div>
                  <div className="art-info">
                    <h4>{art.title || art.titulo || "Sem título"}</h4>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-results">Nenhum desenho encontrado.</p>
          )}
        </main>
      </div>
    </div>
  );
}