import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../Inicio/img/escudo.png";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export default function InicioSesion() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/iquira/iquiraccess/signin', {
        username,
        password,
      });

      const token = response.data.accessToken;

      const decodedToken = jwtDecode(token);
      const roles = decodedToken.roles || [];

      // Guardamos el JWT en localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('roles', JSON.stringify(roles));

      if (roles.includes("ROLE_ADMIN")) {
        navigate('/dasboard');
      } else if (roles.includes("ROLE_ALMACEN")) {
        navigate('/almacen');
      } else if (roles.includes("ROLE_COMISARIA")) {
        navigate('/comisaria');
      } else if (roles.includes("ROLE_DESPACHO")) {
        navigate('/despacho');
      } else if (roles.includes("ROLE_GOBIERNO")) {
        navigate('/gobierno');
      } else if (roles.includes("ROLE_PLANEACION")) {
        navigate('/planeacion');
      } else if (roles.includes("ROLE_SALUD")) {
        navigate('/salud');
      } else if (roles.includes("ROLE_TESORERIA")) {
        navigate('/tesoreria');
      } else if (roles.includes("ROLE_VENTANILLA")) {
        navigate('/ventanilla');
      } else {
        navigate('/');
      }
    } catch (error) {
      if (error.response) {
        console.error("Detalles del error:", error.response.data);
      }
      setErrorMessage("Correo y/o contrasena invalido");
      console.log(error);
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
                      alt="login form"
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form onSubmit={handleSubmit}>
                        <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>
                          Inicia sesión en tu cuenta
                        </h5>
                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="form2Example17">
                            Dirección de correo electrónico
                          </label>
                          <input
                            type="email"
                            id="form2Example17"
                            className="form-control form-control-lg"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                          />
                        </div>
                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="form2Example27">
                            Contraseña
                          </label>
                          <input
                            type="password"
                            id="form2Example27"
                            className="form-control form-control-lg"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>
                        <div className="pt-1 mb-4">
                          <button
                            className="btn btn-dark btn-lg btn-block"
                            type="submit"
                          >
                            Login
                          </button>
                          {errorMessage && <p className="error-message">{errorMessage}</p>}
                        </div>
                        <a className="small text-muted" href="http://localhost:3000/olvidarcontrasena">
                          ¿Has olvidado tu contraseña?
                        </a>
                        <p></p>
                        <a href="" className="small text-muted">
                          Condiciones de uso.
                        </a>
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
