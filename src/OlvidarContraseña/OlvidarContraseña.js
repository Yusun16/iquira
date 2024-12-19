import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from "../Inicio/img/logo.jpg";

export default function OlvidarContraseña() {
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await axios.post('http://localhost:8080/iquira/iquiraccess/verify-correo', null, {
        params: {
          username,
        },
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setSuccessMessage(response.data);
      navigate("/verificar-correo")
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message || "Correo o cedula, no validos!!!");
      } else {
        setErrorMessage('Verifica tus datos y vuelva a intentarlo, nuevamente.');
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
                      alt="login form"
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form onSubmit={handleSubmit}>
                        <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>
                          ¿olvidaste tu contraseña?
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
                        <div className="pt-1 mb-4">
                          <button
                            className="btn btn-dark btn-lg btn-block"
                            type="submit"

                          >
                            Confirmar
                          </button>
                          {errorMessage && <p className="error-message">{errorMessage}</p>}
                          {successMessage && <p className="success-message">{successMessage}</p>}
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
