import { useState } from "react";
import "./NewOc.css";

export default function NewOc({ userId, onCancel, onSuccess }) {

  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    imagem: null
  });

  const [preview, setPreview] = useState(null);
  const [erro, setErro] = useState("");

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  function handleImage(e) {
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

    setForm({ ...form, imagem: file });
    setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const formData = new FormData();

      const dados = {
        nome: form.nome,
        descricao: form.descricao,
        usuarioId: userId
      };

      formData.append(
        "dados",
        new Blob([JSON.stringify(dados)], { type: "application/json" })
      );

      if (form.imagem) {
        formData.append("imagem", form.imagem);
      }

      const response = await fetch("http://localhost:8080/personagens", {
        method: "POST",
        body: formData
      });

      if (response.ok) {
        onSuccess();
      } else {
        setErro("Erro ao salvar OC");
      }

    } catch (err) {
      setErro("Erro no servidor");
    }
  }

  return (
    <div className="new-oc-container">

      <h2>New OC</h2>

      <form onSubmit={handleSubmit} className="new-oc-form">

        {/* IMAGEM */}
        <div className="image-upload">
          {preview ? (
            <img src={preview} alt="preview" />
          ) : (
            <label className="upload-placeholder">
              +
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleImage}
                hidden
              />
            </label>
          )}
        </div>

        {/* NOME */}
        <input
          type="text"
          name="nome"
          placeholder="Character name"
          onChange={handleChange}
          required
        />

        {/* DESCRIÇÃO */}
        <textarea
          name="descricao"
          placeholder="Description"
          onChange={handleChange}
        />

        {erro && <p className="erro">{erro}</p>}

        <div className="buttons">
          <button type="button" className="cancel" onClick={onCancel}>
            Cancel
          </button>

          <button type="submit">
            Save
          </button>
        </div>

      </form>
    </div>
  );
}