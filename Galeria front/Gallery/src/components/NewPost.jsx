import React, { useState, useEffect } from 'react';
import './NewPost.css';

const NewPost = ({ userId, onSaveSuccess }) => {

  const [galerias, setGalerias] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null); // preview da imagem
  const [erro, setErro] = useState("");

  const [formData, setFormData] = useState({
    artistName: '',
    title: '',
    creationDate: '',
    tecnica: 'Digital',
    type: 'Original',
    style: 'Cartoon',
    theme: 'Fantasia',
    characterType: 'Personagem original (OC)',
    characterName: '',
    description: '',
    galleryId: ''
  });

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:8080/galerias/usuarios/${userId}`)
        .then(res => res.json())
        .then(data => {
          setGalerias(data);
          if (data.length > 0) {
            setFormData(prev => ({ ...prev, galleryId: data[0].id }));
          }
        })
        .catch(err => console.error("Erro ao carregar galerias:", err));
    }
  }, [userId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const tiposPermitidos = ["image/jpeg", "image/png"];
    if (!tiposPermitidos.includes(file.type)) {
      setErro("Apenas imagens JPG ou PNG são permitidas.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setErro("Imagem muito grande (máx 2MB).");
      return;
    }

    setErro("");
    setImageFile(file);
    setPreview(URL.createObjectURL(file)); // cria preview
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();
      form.append('data', JSON.stringify({ ...formData, userId }));
      if (imageFile) form.append('image', imageFile);

      const response = await fetch('http://localhost:8080/posts', {
        method: 'POST',
        body: form
      });

      if (response.ok) {
        alert("Post realizado com sucesso!");
        onSaveSuccess();
      } else {
        console.error('Erro ao salvar post:', response.statusText);
        alert("Erro ao salvar post");
      }
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro ao conectar com a API");
    }
  };

  return (
    <div className="new-post-container">
      <h1 className="new-post-title">New Post</h1>
      
      <form className="new-post-form" onSubmit={handleSubmit}>

        {/* IMAGEM */}
        <div className="upload-section">
          {preview ? (
            <img src={preview} alt="preview" className="image-preview" />
          ) : (
            <label className="image-placeholder-big">
              <i className="fa-solid fa-image-plus"></i>
              <div className="add-icon"><i class="fa-regular fa-image"></i></div>
              <input
                type="file"
                accept="image/png, image/jpeg"
                hidden
                onChange={handleImage}
              />
            </label>
          )}
          {erro && <p className="erro">{erro}</p>}
        </div>

        {/* CAMPOS */}
        <div className="fields-section">
          <div className="row">
            <div className="input-group">
              <label>*Artist name:</label>
              <input name="artistName" required onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>*Title:</label>
              <input name="title" required onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>*Creation Date:</label>
              <input type="date" name="creationDate" required onChange={handleChange} />
            </div>
          </div>

          <div className="row">
            <div className="input-group">
              <label>Técnica:</label>
              <select name="tecnica" onChange={handleChange}>
                <option value="Digital">Digital</option>
                <option value="Lápis">Lápis</option>
              </select>
            </div>
            <div className="input-group">
              <label>Tipo:</label>
              <select name="type" onChange={handleChange}>
                <option value="Original">Original</option>
                <option value="Fanart">Fanart</option>
                <option value="Studding">Studding</option>
                <option value="Sketch">Sketch</option>
                <option value="Comission">Comission (encomenda)</option>
                <option value="Concept art">Concept art</option>
              </select>
            </div>
            <div className="input-group">
              <label>Estilo:</label>
              <select name="style" onChange={handleChange}>
                <option value="Cartoon">Cartoon</option>
                <option value="Furry">Furry</option>
                <option value="Anime">Anime / Mangá</option>
                <option value="Realista">Realista</option>
                <option value="Chibi">Chibi</option>
                <option value="Minimalista">Minimalista</option>
                <option value="Pixel art">Pixel art</option>
              </select>
            </div>
            <div className="input-group">
              <label>Tema:</label>
              <select name="theme" onChange={handleChange}>
                <option value="Fantasia">Fantasia</option>
                <option value="Terror">Terror</option>
                <option value="Romance">Romance</option>
                <option value="Sci-fi">Sci-fi</option>
                <option value="Natureza">Natureza</option>
                <option value="Urbano">Urbano</option>
                <option value="Mitologia">Mitologia</option>
                <option value="Cotidiano">Cotidiano</option>
              </select>
            </div>
          </div>

          <div className="input-group full">
            <label>Personagem:</label>
            <select name="characterType" onChange={handleChange}>
              <option value="OC">Personagem original (OC)</option>
              <option value="Famoso">Personagem famoso (anime, filme, jogo)</option>
            </select>
          </div>

          <div className="input-group full">
            <label>Character's Name:</label>
            <input name="characterName" placeholder="Nome do personagem..." onChange={handleChange} />
          </div>

          <div className="input-group full">
            <label>Description:</label>
            <textarea name="description" rows="3" onChange={handleChange}></textarea>
          </div>

          <div className="row footer-row">
             <div className="input-group">
                <label>Gallery:</label>
                <select 
                  name="galleryId" 
                  value={formData.galleryId} 
                  onChange={handleChange}
                >
                  {galerias.length > 0 ? (
                    galerias?.map(gal => (
                      <option key={gal.id} value={gal.id}>
                        {gal.nome}
                      </option>
                    ))
                  ) : (
                    <option value="">Nenhuma galeria encontrada</option>
                  )}
                </select>
             </div>
             <button type="submit" className="upload-btn">
                Upload <i className="fa-solid fa-upload"></i>
             </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewPost;