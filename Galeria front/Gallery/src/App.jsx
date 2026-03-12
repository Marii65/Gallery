import { Routes, Route, Navigate } from "react-router-dom";
import Galerias from "./pages/Home";
import Signup from "./pages/Signup";
import Usuario from "./pages/Usuario";
import Login from "./pages/Login";
import Artista from "./pages/Artista"
import { AuthProvider } from "./context/AuthContext";
import MyGallery from "./components/MyGallery"; 

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Galerias />} />
        <Route path="/galerias" element={<Galerias />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/usuario" element={<Usuario />} />
        <Route path="/login" element={<Login />} />

        {/* Rota do Artista com Sub-rotas */}
        <Route path="/artista" element={<Artista />}>
  {/* Remova o <Route index element={<Navigate to="gallery" />} /> se não quiser o pulo automático */}
  <Route path="gallery" element={<MyGallery />} />
  {/* ...outras rotas */}
</Route>
      </Routes>
    </AuthProvider>
  );
}
