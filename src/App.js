import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navegacion from "./plantilla/Navegacion";
import Login from "./Inicio/InicioSesion";
import Dasboard from "./Dasboard/Dasboard";
import CreacionUsuarios from "./CreacionUsuario/CreacionUsuarios";
import OlvidarContraseña from "./OlvidarContraseña/OlvidarContraseña";

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

function Layout() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";
  const isCreacionUsuarioPage = location.pathname === "/creacionusuario";
  const isOlvidarContraseña = location.pathname === "/olvidarcontraseña";

  return (
    <div>
      <div className="container">
        {!isLoginPage && !isCreacionUsuarioPage && !isOlvidarContraseña && <Navegacion />}
      </div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dasboard" element={<Dasboard />} />
        <Route path="/creacionusuario" element={<CreacionUsuarios />} />
        <Route path="/olvidarcontraseña" element={<OlvidarContraseña />} />
      </Routes>
    </div>
  );
}

export default App;

