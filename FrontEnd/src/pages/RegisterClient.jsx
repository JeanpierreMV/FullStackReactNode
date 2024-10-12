import React, { useState } from 'react';
import ClienteForm from '../components/ClienteForm';
import useForm from '../hooks/useForm';
import { registrarCliente } from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../styles/RegisterClient.css';
import Sidebar from '../components/SideBar'; // Importa el Sidebar
import Navbar from '../components/Navbar';


const RegisterClient = () => {
  const initialState = {
    nombre: '',
    apellido: '',
    dni: '',
    celular: '',
    email: '',
    direccion: '',
  };

  const { formData, handleChange } = useForm(initialState);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate(); // Hook para la navegación

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registrarCliente(formData);
      setSuccess(true);
      setError(null);
      // Navegar a la página de Registrar Mascota pasando el DNI
      navigate('/registrar-mascota', { state: { dni: formData.dni } });
    } catch (error) {
      setError('Error al registrar cliente');
      setSuccess(false);
    }
  };

  return (
    <div className="page-container">
      <Sidebar /> {/* Sidebar al costado */}
      <div className="form-container"> {/* Contenedor central para el formulario */}
        <h1>Registrar Cliente</h1>
        {success && <p>Cliente registrado exitosamente</p>}
        {error && <p>{error}</p>}
        <ClienteForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default RegisterClient;
