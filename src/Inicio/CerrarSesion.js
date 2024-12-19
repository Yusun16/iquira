import React from 'react';
import { useNavigate } from 'react-router-dom';

function CerrarSesion() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Eliminar el token en el localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("lastVisitedRoute");

        // Redirigir a la página de login
        navigate("/");
    };

    return (
        <a onClick={handleLogout} className='button'>
            <span>Cerrar sesión</span>
        </a>
    );
};

export default CerrarSesion