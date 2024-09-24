import React, { useState } from 'react';
import { Users, FileSpreadsheet, ClipboardList, Receipt, BarChart2, FileText, LogOut, User } from 'lucide-react';
import { Dog } from 'lucide-react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login attempted with:', username, password);
    };

    return (
        <div className="dashboard">
            {/* Sidebar */}
            <div className="sidebar">
                <div className="sidebar-header">
                    <img src="/public/koala.png" alt="Koala Vet Logo" className="logo" />
                    <h1>KOALA VET</h1>
                </div>
                <nav className="sidebar-nav">
                    <div className="nav-section">
                        <h2>USUARIO</h2>
                        <a href="#" className="nav-item"><Users size={18} /> Clientes</a>
                        <a href="#" className="nav-item"><Dog size={18} /> Mascotas</a>
                        <a href="#" className="nav-item active"><FileSpreadsheet size={18} /> Seguimiento de atención</a>
                    </div>
                    <div className="nav-section">
                        <h2>EMPRESA</h2>
                        <a href="#" className="nav-item"><ClipboardList size={18} /> Consultar servicios</a>
                        <a href="#" className="nav-item"><Receipt size={18} /> Registrar atención</a>
                    </div>
                    <div className="nav-section">
                        <h2>GESTION DE PAGOS</h2>
                        <a href="#" className="nav-item"><BarChart2 size={18} /> Cuadre del día</a>
                        <a href="#" className="nav-item"><FileText size={18} /> Facturas</a>
                    </div>
                    <div className="nav-section">
                        <h2>INICIO DE SESION</h2>
                        <a href="#" className="nav-item"><LogOut size={18} /> Cerrar sesión</a>
                    </div>
                </nav>
            </div>

            {/* Main content area */}
            <div className="main-content">
                {/* Navbar */}
                <div className="navbar">
                    <div className="user-info">
                        <div className="user-details">
                            <div className="user-name">J Moreno</div>
                            <div className="user-role">SUPER USUARIO</div>
                        </div>
                        <div className="user-avatar">
                            <User size={24} />
                        </div>
                    </div>
                </div>

                {/* Login form */}
                <div className="login-container">
                    <form className="login-form" onSubmit={handleSubmit}>
                        <h2>Iniciar Sesión</h2>
                        <div className="form-group">
                            <label htmlFor="username">Nombre de Usuario</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
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
                        <div className="forgot-password">
                            <a href="#">¿Olvidaste tu contraseña?</a>
                        </div>
                    </form>
                </div>
            </div>

            <style jsx>{`
                .dashboard {
                    display: flex;
                    height: 100vh;
                    width: 100vw;
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                }

                .sidebar {
                    width: 250px;
                    background-color: #04647c;
                    color: #ffffff;
                    overflow-y: auto;
                    flex-shrink: 0;
                }

                .sidebar-header {
                    padding: 20px;
                    text-align: center;
                    background-color: #057aa6;
                }

                .sidebar-header .logo {
                    width: 80px; /* Tamaño aumentado del logo */
                    height: auto;
                    margin-bottom: 10px;
                }

                .sidebar-header h1 {
                    margin: 0;
                    font-size: 24px;
                    color: #ffffff;
                }

                .sidebar-nav {
                    padding: 20px 0;
                }

                .nav-section {
                    margin-bottom: 20px;
                }

                .nav-section h2 {
                    font-size: 14px;
                    margin: 0 0 10px 20px;
                    color: #77c2d9;
                }

                .nav-item {
                    display: flex;
                    align-items: center;
                    padding: 10px 20px;
                    color: #ffffff;
                    text-decoration: none;
                    transition: background-color 0.3s;
                }

                .nav-item:hover {
                    background-color: #3b8cb9;
                }

                .nav-item.active {
                    background-color: #77c2d9;
                    color: #04647c;
                }

                .nav-item svg {
                    margin-right: 10px;
                }

                .main-content {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    background-color: #ffffff;
                    overflow-x: hidden;
                }

                .navbar {
                    background-color: #ffffff;
                    padding: 10px 20px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    width: 100%;
                }

                .user-info {
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    padding-right: 40px; /* Ajuste para separar del borde derecho */
                }

                .user-details {
                    text-align: right;
                    margin-right: 10px;
                }

                .user-name {
                    font-weight: bold;
                    color: #057aa6;
                }

                .user-role {
                    font-size: 12px;
                    color: #04647c;
                }

                .user-avatar {
                    background-color: #057aa6;
                    color: #ffffff;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .login-container {
                    flex: 1;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: #77c2d9;
                    width: 100%;
                }

                .login-form {
                    background-color: #ffffff;
                    padding: 40px;
                    border-radius: 8px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    width: 300px;
                }

                .login-form h2 {
                    margin: 0 0 20px;
                    text-align: center;
                    color: #057aa6;
                }

                .form-group {
                    margin-bottom: 20px;
                }

                .form-group label {
                    display: block;
                    margin-bottom: 5px;
                    color: #04647c;
                }

                .form-group input {
                    width: 100%;
                    padding: 8px;
                    border: 1px solid #057aa6;
                    border-radius: 4px;
                }

                .login-form button {
                    width: 100%;
                    padding: 10px;
                    background-color: #057aa6;
                    color: #ffffff;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-weight: bold;
                }

                .login-form button:hover {
                    background-color: #3b8cb9;
                }

                .forgot-password {
                    text-align: center;
                    margin-top: 10px;
                }

                .forgot-password a {
                    color: #057aa6;
                    text-decoration: none;
                    font-size: 14px;
                }

                .forgot-password a:hover {
                    text-decoration: underline;
                }

                /* Responsiveness */
                @media (max-width: 768px) {
                    .sidebar {
                        width: 200px;
                    }

                    .main-content {
                        width: calc(100vw - 200px);
                    }

                    .login-form {
                        width: 100%;
                        padding: 20px;
                    }
                }

                @media (max-width: 480px) {
                    .sidebar {
                        width: 150px;
                    }

                    .main-content {
                        width: calc(100vw - 150px);
                    }

                    .login-form {
                        width: 100%;
                        padding: 15px;
                    }
                }
            `}</style>
        </div>
    );
};

export default Login;
