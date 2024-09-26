import React, { useState } from 'react';
import { login } from '../services/api'; // Asegúrate de ajustar la ruta
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

import '../styles/style.css'; // Asegúrate de tener los estilos bien importados

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Usa useNavigate para redirigir después del login

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login({ email, password }); // Conexión con la API
            // Guarda el token en localStorage
            localStorage.setItem('token', response.token);
            // Redirige a la página de registro de cliente
            navigate('/registrar-cliente');
        } catch (error) {
            setError('Error al iniciar sesión');
        }
    };

    return (
        <div className="dashboard">
            {/* Main content area */}
            <div className="main-content">
                {/* Login form */}
                <div className="login-container">
                    {/* Logo encima del formulario */}
                    <div className="logo-container">
                        <img src="/koala.png" alt="Koala Vet Logo" className="logo" />
                    </div>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <h2>Iniciar Sesión</h2>
                        <div className="form-group">
                            <label htmlFor="email">Correo</label>
                            <input
                                type="text"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">Iniciar Sesión</button>
                        {error && <p>{error}</p>}
                        <div className="forgot-password">
                            <a href="#">¿Olvidaste tu contraseña? vuelve a intentarlo</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
