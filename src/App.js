import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navegacion from "./plantilla/Navegacion";
import Login from "./Inicio/InicioSesion";
import Dasboard from "./Dasboard/Dasboard";
import CreacionUsuarios from "./CreacionUsuario/CreacionUsuarios";

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

  return (
    <div>
      <div className="container">
        {!isLoginPage && !isCreacionUsuarioPage && <Navegacion />}
      </div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dasboard" element={<Dasboard />} />
        <Route path="/creacionusuario" element={<CreacionUsuarios />} />
      </Routes>
    </div>
  );
}

export default App;

