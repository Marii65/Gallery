import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Galerias from "./pages/Home";
import Signup from "./pages/Signup";
import Usuario from "./pages/Usuario";
import Login from "./pages/Login";
import Artista from "./pages/Artista";
import Desenhos from "./pages/Desenho";

import { AuthProvider } from "./context/AuthContext";

import MyGallery from "./components/MyGallery";

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

          {/* ÁREA DO ARTISTA */}
          <Route path="/artista" element={<Artista />}>

            {/* Redireciona automaticamente para gallery */}
            <Route index element={<Navigate to="gallery" />} />

            {/* Lista de personagens */}
            <Route path="gallery" element={<MyGallery />} />

            {/* Página de desenhos por personagem */}
            <Route path="personagem/:id" element={<Desenhos />} />

          </Route>

        </Routes>
      </AuthProvider>

  );
}