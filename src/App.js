import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navegacion from "./plantilla/Navegacion";
import Login from "./Inicio/InicioSesion";
import Dasboard from "./Dasboard/Dasboard";
import CreacionUsuarios from "./CreacionUsuario/CreacionUsuarios";
import OlvidarContraseña from "./OlvidarContraseña/OlvidarContraseña";
import Ventanilla from "./Ventanilla/ventanilla";
import Envio from "./Envio/Envio";
import Gobierno from "./Dependencias/Gobierno";

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

function Layout() {
  const location = useLocation();
  
  // Verifica las rutas
  console.log("Ruta actual:", location.pathname);

  const isLoginPage = location.pathname === "/";
  const isCreacionUsuarioPage = location.pathname === "/creacionusuario";
  const isOlvidarContraseñaPage = location.pathname === "/olvidarcontraseña";

  // Condición para mostrar el navbar
  const showNavbar = !isLoginPage && !isCreacionUsuarioPage && !isOlvidarContraseñaPage;

  return (
    <div>
      <div>
        {showNavbar && <Navegacion />}
      </div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dasboard" element={<Dasboard />} />
        <Route path="/creacionusuario" element={<CreacionUsuarios />} />
        <Route path="/olvidarcontraseña" element={<OlvidarContraseña />} />
        <Route path="/ventanilla" element={<Ventanilla />} />
        <Route path="/envio" element={<Envio />} />
        <Route path="/gobierno" element={<Gobierno/>}/>
      </Routes>
    </div>
  );
}

export default App;
