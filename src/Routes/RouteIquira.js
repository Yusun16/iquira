import { Route, Routes, useLocation } from "react-router-dom";
import Restriccion from './Restriccion'
import Navegacion from "./../plantilla/Navegacion";
import Login from "./../Inicio/InicioSesion";
import Dasboard from "./../Dasboard/Dasboard";
import CreacionUsuarios from "./../CreacionUsuario/CreacionUsuarios";
import OlvidarContraseña from "./../OlvidarContraseña/OlvidarContraseña";
import Ventanilla from "./../Ventanilla/ventanilla";
import Envio from "./../Envio/Envio";
import Gobierno from "./../Dependencias/Gobierno";
import Tesoreria from "./../Dependencias/Tesoreria";
import Planeacion from "./../Dependencias/Planeacion";
import Despacho from "./../Dependencias/Despacho";
import Almacen from "./../Dependencias/Almacen";
import Comisaria from "./../Dependencias/Comisaria";
import Salud from "./../Dependencias/Salud";
import ConfirmEmail from "../OlvidarContraseña/ConfirmEmail";
import NewPassword from "../OlvidarContraseña/NewPassword";

function NavBarVisibility() {
    const location = useLocation();

    // Definimos las rutas donde no queremos que se muestre el nav
    const noNavRoutes = ["/", "/creacionusuario", "/olvidarcontrasena", "/verificar-correo", "/renovar-contrasena"];

    // Verificamos si la ruta actual está en noNavRoutes o si es una ruta de renovar contraseña
    const isRenovarContrasenaRoute = location.pathname.startsWith("/renovar-contrasena/");

    // Renderizamos el componente Navegacion solo si la ruta actual no está en noNavRoutes
    return !noNavRoutes.includes(location.pathname) && !isRenovarContrasenaRoute ? <Navegacion /> : null;
}

function RouteIquira() {
    return (
        <div>
            <NavBarVisibility />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dasboard" element={<Restriccion element={<Dasboard />} allowedRoles={['ROLE_VENTANILLA', 'ROLE_ADMIN']} />} />
                <Route path="/creacionusuario" element={<Restriccion element={<CreacionUsuarios />} allowedRoles={['ROLE_ADMIN']} />} />
                <Route path="/olvidarcontrasena" element={<OlvidarContraseña />} />
                <Route path="/verificar-correo" element={<ConfirmEmail />} />
                <Route path="/renovar-contrasena/:otp/:username" element={<NewPassword />} />
                <Route path="/envio" element={<Envio />} />
                <Route path="/almacen" element={<Restriccion element={<Almacen />} allowedRoles={['ROLE_ALMACEN', 'ROLE_ADMIN']} />} />
                <Route path="/comisaria" element={<Restriccion element={<Comisaria />} allowedRoles={['ROLE_COMISARIA', 'ROLE_ADMIN']} />} />
                <Route path="/despacho" element={<Restriccion element={<Despacho />} allowedRoles={['ROLE_DESPACHO', 'ROLE_ADMIN']} />} />
                <Route path="/gobierno" element={<Restriccion element={<Gobierno />} allowedRoles={['ROLE_GOBIERNO', 'ROLE_ADMIN']} />} />
                <Route path="/planeacion" element={<Restriccion element={<Planeacion />} allowedRoles={['ROLE_PLANEACION', 'ROLE_ADMIN']} />} />
                <Route path="/salud" element={<Restriccion element={<Salud />} allowedRoles={['ROLE_SALUD', 'ROLE_ADMIN']} />} />
                <Route path="/tesoreria" element={<Restriccion element={<Tesoreria />} allowedRoles={['ROLE_TESORERIA', 'ROLE_ADMIN']} />} />
                <Route path="/ventanilla" element={<Restriccion element={<Ventanilla />} allowedRoles={['ROLE_VENTANILLA', 'ROLE_ADMIN']} />} />
            </Routes>
        </div>
    );
}

export default RouteIquira;
