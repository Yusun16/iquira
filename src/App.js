import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navegacion from "./plantilla/Navegacion";
import Login from "./Inicio/InicioSesion";
import Dasboard from "./Dasboard/Dasboard";
import CreacionUsuarios from "./CreacionUsuario/CreacionUsuarios";
import OlvidarContraseña from "./OlvidarContraseña/OlvidarContraseña";
import Ventanilla from "./Ventanilla/ventanilla";
import Envio from "./Envio/Envio";
import Gobierno from "./Dependencias/Gobierno";
import Tesoreria from "./Dependencias/Tesoreria";
import Planeacion from "./Dependencias/Planeacion";
import Despacho from "./Dependencias/Despacho";
import Almacen from "./Dependencias/Almacen";
import Comisaria from "./Dependencias/Comisaria";
import Salud from "./Dependencias/Salud";

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
        <Route path="/tesoreria" element={<Tesoreria/>}/>
        <Route path="/planeacion" element={<Planeacion/>}/>
        <Route path="/despacho" element={<Despacho/>}/>
        <Route path="/almacen" element={<Almacen/>}/>
        <Route path="/comisaria" element={<Comisaria/>}/>
        <Route path="/salud" element={<Salud/>}/>
      </Routes>
    </div>
  );
}

export default App;
