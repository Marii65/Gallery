import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080"
});

export const listarGalerias = () => {
  return api.get("/galerias");
};


export const buscarGaleria = async (id) => {
  const response = await api.get(`/galerias/${id}`);
  return response.data;
};

export const criarGaleria = async (galeria) => {
  const response = await api.post("/galerias", galeria);
  return response.data;
};

export const atualizarGaleria = async (id, galeria) => {
  const response = await api.put(`/galerias/${id}`, galeria);
  return response.data;
};

export const removerGaleria = async (id) => {
  await api.delete(`/galerias/${id}`);
};
