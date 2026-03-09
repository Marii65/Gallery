import api from "./api";

export const listarFavoritos = async () => {
  const response = await api.get("/favoritos");
  return response.data;
};

export const listarFavoritosPorUsuario = async (usuarioId) => {
  const response = await api.get(`/favoritos/usuario/${usuarioId}`);
  return response.data;
};

export const adicionarFavorito = async (usuarioId, desenhoId) => {
  const response = await api.post("/favoritos", null, {
    params: { usuarioId, desenhoId }
  });
  return response.data;
};

export const removerFavorito = async (favoritoId) => {
  await api.delete(`/favoritos/${favoritoId}`);
};
