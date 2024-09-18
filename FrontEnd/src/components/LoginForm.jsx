// components/LoginForm.jsx
import React, { useState } from 'react';
import { login } from '../services/api'; // Ajusta la ruta si es necesario
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Usa useNavigate para la redirección

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      // Guarda el token en localStorage
      localStorage.setItem('token', response.token);
      // Redirige a la vista de registro de cliente
      navigate('/registrar-cliente');
    } catch (error) {
      setError('Error al iniciar sesión');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Contraseña:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Iniciar sesión</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default LoginForm;
