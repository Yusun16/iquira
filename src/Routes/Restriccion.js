import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Restriccion = ({ element, allowedRoles }) => {
    const token = localStorage.getItem("token");
    const user = token ? jwtDecode(token) : null;

    if (!user) return <Navigate to="/" />;

    const userRoles = user?.roles || [];

    if (userRoles.includes('ROLE_ADMIN')) {
        return element;
    }

    const hasAccess = allowedRoles.some(role => userRoles.includes(role));

    return hasAccess ? element : <Navigate to="/" />;

};

export default Restriccion