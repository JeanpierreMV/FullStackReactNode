// frontend/src/pages/RegisterTipoMascota.jsx
import React, { useState } from 'react';
import TipoMascotaForm from '../components/TipoMascotaForm';
import useForm from '../hooks/useForm';
import { registrarTipoMascota } from '../services/api';

const RegisterTipoMascota = () => {
  const initialState = {
    nombre: '',
  };

  const { formData, handleChange } = useForm(initialState);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registrarTipoMascota(formData);
      setSuccess(true);
      setError(null);
    } catch (error) {
      setError('Error al registrar tipo de mascota');
      setSuccess(false);
    }
  };

  return (
    <div>
      <h1>Registrar Tipo de Mascota</h1>
      {success && <p>Tipo de mascota registrado exitosamente</p>}
      {error && <p>{error}</p>}
      <TipoMascotaForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
    </div>
  );
};

export default RegisterTipoMascota;
