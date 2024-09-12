// src/components/CreacionUsuarios.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../Inicio/img/logo.jpg";

export default function CreacionUsuarios() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para manejar la creación del usuario
    // Por ejemplo, enviar los datos del formulario a un servidor
    console.log('Usuario creado');
    // Redirige a otra página si es necesario
    navigate('/dashboard');
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
                        <label className="form-label" htmlFor="username">
                            Nombre de Usuario
                          </label>
                          <input
                            type="text"
                            id="username"
                            className="form-control form-control-lg"
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
                            required
                          />
                        </div>
                        <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="dependencia">
                            Dependencia
                          </label>
                          <input
                            type="text"
                            id="dependencia"
                            className="form-control form-control-lg"
                            required
                          />
                        </div>
                        <div className="pt-1 mb-4">
                          <button
                            className="btn btn-dark btn-lg btn-block"
                            type="submit"
                          >
                            Crear Usuario
                          </button>
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
