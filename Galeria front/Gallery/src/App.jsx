import { Routes, Route, Navigate } from "react-router-dom";
import Galerias from "./pages/Home";
import Signup from "./pages/Signup";
import Usuario from "./pages/Usuario";
import Login from "./pages/Login";
import Artista from "./pages/Artista"
import { AuthProvider } from "./context/AutoContext";



function App() {
  return (
<AuthProvider>
<Routes>
      <Route path="/" element={<Galerias />} />
      <Route path="/galerias" element={<Galerias />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/usuario" element={<Usuario />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/artista" element={<Artista />}/>
        
    </Routes>
</AuthProvider>
    
  );
}

export default App;
