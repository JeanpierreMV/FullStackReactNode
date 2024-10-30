import React, { useState } from 'react';
import { login } from '../services/api'; // Asegúrate de ajustar la ruta
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import '../styles/login.css'; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Usa useNavigate para redirigir después del login

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login({ email, password }); // Conexión con la API
            localStorage.setItem('token', response.token); // Guarda el token en localStorage
            navigate('/registrar-cliente'); // Redirige a la página de registro de cliente
        } catch (error) {
            setError('Error al iniciar sesión');
        }
    };

    return (
        <div className="dashboard">
            <div className="main-content">
                <div className="login-container">
                    <div className="logo-title-container">
                        <img src="/koala.png" alt="Koala Vet Logo" className="logo" />
                        <h1>KOALA VET</h1>
                    </div>
                    <form className="login-form" onSubmit={handleSubmit}>
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
                            <a href="#">¿Olvidaste tu contraseña?</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
