import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import logo from "../Inicio/img/logo.jpg";

export default function NewPassword() {
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    const { otp, username } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        if (password.length < 4 || password.length > 12) {
            setErrorMessage('La contraseña debe tener entre 4 y 12 caracteres.');
            return;
        }

        const regex = /^[A-Za-z0-9]+$/;
        if (!regex.test(password)) {
            setErrorMessage('La contraseña solo puede contener letras y números.');
            return;
        }

        if (password !== repeatPassword) {
            setErrorMessage('Las contraseñas no coinciden.');
            return;
        }

        try {
            const response = await axios.post(`http://localhost:8080/iquira/iquiraccess/changedPassword/${otp}/${username}`, {
                password,
                repeatPassword,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            setSuccessMessage(response.data);
            localStorage.setItem('hasChangedPassword', true);
            setTimeout(() => {
                navigate("/");
            }, 3000);
        } catch (error) {
            if (error.response) {
                console.error("Detalles del error:", error.response.data);
                setErrorMessage(error.response.data.message || 'Error al cambiar la contraseña.');
            } else {
                setErrorMessage('Error en cambiar la contrasena');
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
                                                    Actualizar contraseña
                                                </h5>
                                                <div className="form-outline mb-4">
                                                    <label className="form-label" htmlFor="form2Example20">
                                                        Nueva contraseña
                                                    </label>
                                                    <input
                                                        type="password"
                                                        id="form2Example20"
                                                        className="form-control form-control-lg"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div className="form-outline mb-4">
                                                    <label className="form-label" htmlFor="form2Example21">
                                                        Confirme contraseña
                                                    </label>
                                                    <input
                                                        type="password"
                                                        id="form2Example21"
                                                        className="form-control form-control-lg"
                                                        value={repeatPassword}
                                                        onChange={(e) => setRepeatPassword(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div className="pt-1 mb-4">
                                                    <button
                                                        className="btn btn-dark btn-lg btn-block"
                                                        type="submit"

                                                    >
                                                        Actualizar
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
