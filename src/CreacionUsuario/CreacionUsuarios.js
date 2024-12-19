// src/components/CreacionUsuarios.js
import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from "../Inicio/img/logo.jpg";

export default function CreacionUsuarios() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [fecha, setFecha] = useState('');
  const [role, setRole] = useState('');
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!role || role === 'default') {
      setErrorMessage("Por favor, selecciona un rol.");
      return;
    }

    setErrorMessage("");

    const token = localStorage.getItem('token');

    try {
      const response = await axios.post('http://localhost:8080/iquira/admin/register-user', {
        username,
        password,
        nombre,
        apellido,
        fecha,
        role: [role],
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccessMessage('Usuario registrado exitosamente.');
      navigate("/dasboard");
    } catch (error) {
      console.error("Error en el registro:", error);
      if (error.response) {
        setErrorMessage(`Error: ${error.response.data.message || error.response.data}`);
      } else {
        setErrorMessage("Hubo un problema al registrar al usuario. Intenta nuevamente.");
      }
    }
  };

  return (
    <div>
      <section className="vh-100" style={{ backgroundColor: '#F27405' }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: '1rem' }}>
                <div className="row g-0" style={{ alignItems: 'center' }}>
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src={logo}
                      alt="form"
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form onSubmit={handleSubmit}>
                        <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>
                          Crear Usuario
                        </h5>
                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="nombre">
                            Nombre del Usuario
                          </label>
                          <input
                            type="text"
                            id="nombre"
                            className="form-control form-control-lg"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                          />
                        </div>
                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="apellido">
                            Apellido del Usuario
                          </label>
                          <input
                            type="text"
                            id="apellido"
                            className="form-control form-control-lg"
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)}
                            required
                          />
                        </div>
                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="fecha">
                            Fecha de Creacion
                          </label>
                          <input
                            type="date"
                            id="fecha"
                            className="form-control form-control-lg"
                            value={fecha}
                            onChange={(e) => setFecha(e.target.value)}
                            required
                          />
                        </div>
                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="email">
                            Correo Electrónico
                          </label>
                          <input
                            type="email"
                            id="email"
                            className="form-control form-control-lg"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                          />
                        </div>
                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="password">
                            Contraseña
                          </label>
                          <input
                            type="password"
                            id="password"
                            className="form-control form-control-lg"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>
                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="dependencia">
                            Dependencia
                          </label>
                          <select
                            id="dependencia"
                            className="form-control form-control-lg"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                          >
                            <option value="default" disabled>Selecciona una dependencia</option>
                            <option value="almacen">Almacen</option>
                            <option value="comisaria">Comisaria</option>
                            <option value="despacho">Despacho</option>
                            <option value="gobierno">Gobierno</option>
                            <option value="planeacion">Planeacion</option>
                            <option value="salud">Salud</option>
                            <option value="tesoreria">Tesoreria</option>
                            <option value="ventanilla">Ventanilla</option>
                          </select>
                        </div>
                        <div className="pt-1 mb-4">
                          <button
                            className="btn btn-dark btn-lg btn-block"
                            type="submit"
                          >
                            Crear Usuario
                          </button>
                          {errorMessage && <p className="error-message">{errorMessage}</p>}
                          {successMessage && <p className="success">{successMessage}</p>}
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
