// frontend/src/pages/RegisterClient.js
import React, { useState } from 'react';
import ClienteForm from '../components/ClienteForm';
import useForm from '../hooks/useForm';
import { registrarCliente } from '../services/api';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registrarCliente(formData);
      setSuccess(true);
      setError(null);
    } catch (error) {
      setError('Error al registrar cliente');
      setSuccess(false);
    }
  };

  return (
    <div>
      <h1>Registrar Cliente</h1>
      {success && <p>Cliente registrado exitosamente</p>}
      {error && <p>{error}</p>}
      <ClienteForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
    </div>
  );
};

export default RegisterClient;
