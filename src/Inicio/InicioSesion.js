import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import logo from "../Inicio/img/escudo.png";

export default function InicioSesion() {
  const navigate = useNavigate(); // Usa useNavigate para obtener la función de navegación

  const handleLoginClick = () => {
    navigate('/dasboard'); // Redirige al usuario a /dasboard
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
                      <form>
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
                          />
                        </div>
                        <div className="pt-1 mb-4">
                          <button
                            className="btn btn-dark btn-lg btn-block"
                            type="button"
                            onClick={handleLoginClick} // Usa onClick para manejar la navegación
                          >
                            Login
                          </button>
                        </div>
                        <a className="small text-muted" href="http://localhost:3000/olvidarcontrase%C3%B1a">
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
