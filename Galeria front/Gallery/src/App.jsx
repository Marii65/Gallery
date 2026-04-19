import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Galerias from "./pages/Home";
import Signup from "./pages/Signup";
import Usuario from "./pages/Usuario";
import Login from "./pages/Login";
import Artista from "./pages/Artista";
import Desenhos from "./pages/Desenho";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Post from "./pages/Post";
import MyFavorites from "./components/MyFavorites";

import { AuthProvider } from "./context/AuthContext";

import MyGallery from "./components/MyGallery";
import Galeria from "./pages/Galeria";

import ArtistProfile from "./pages/ArtistProfile";

export default function App() {
  return (
    <AuthProvider>
      <Routes>

        {/* ROTAS PÚBLICAS */}
        <Route path="/" element={<Galerias />} />
        <Route path="/galerias" element={<Galerias />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/usuario" element={<Usuario />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/perfil/:id" element={<ArtistProfile />} />

        {/* ÁREA DO ARTISTA */}
        <Route path="/artista" element={<Artista />}>

          <Route index element={<Navigate to="gallery" />} />
          <Route path="gallery" element={<MyGallery />} />
          <Route path="gallery/:id" element={<Galeria />} />
          <Route path="personagem/:id" element={<Desenhos />} />

        </Route>

      </Routes>

      <ToastContainer />
    </AuthProvider>
  );
}