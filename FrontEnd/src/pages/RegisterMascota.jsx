import React, { useEffect, useState } from 'react';
import MascotaForm from '../components/MascotaForm';
import useForm from '../hooks/useForm';
import { registrarMascota, obtenerTiposMascota, obtenerClientes } from '../services/api';

const RegisterMascota = () => {
  const initialState = {
    nombre: '',
    genero: '',
    raza: '',
    tipoMascotaId: '',
    edad: '',
    peso: '',
    clienteId: '',
  };

  const { formData, handleChange } = useForm(initialState);
  const [tipoMascotas, setTipoMascotas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tipos = await obtenerTiposMascota();
        const clientesData = await obtenerClientes();
        setTipoMascotas(tipos);
        setClientes(clientesData);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const mascotaData = {
        nombre: formData.nombre,
        genero: formData.genero,
        raza: formData.raza,
        tipoMascotaId: parseInt(formData.tipoMascotaId), // Convertir ID a número
        edad: parseInt(formData.edad),  // Convertir edad a número
        peso: parseFloat(formData.peso), // Convertir peso a número decimal
        clienteId: parseInt(formData.clienteId), // Convertir ID a número
      };
  
      await registrarMascota(mascotaData);
      setSuccess(true);
      setError(null);
    } catch (error) {
      console.error('Error al registrar mascota:', error);
      setError('Error al registrar mascota');
      setSuccess(false);
    }
  };
  

  return (
    <div>
      <h1>Registrar Mascota</h1>
      {success && <p>Mascota registrada exitosamente</p>}
      {error && <p>{error}</p>}
      <MascotaForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} tipoMascotas={tipoMascotas} clientes={clientes} />
    </div>
  );
};

export default RegisterMascota;
