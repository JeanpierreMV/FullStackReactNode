import React, { useEffect, useState } from 'react';
import BoletaForm from '../components/BoletaForm';
import { registrarBoleta, obtenerClientes, obtenerServicios } from '../services/api';

const RegisterBoleta = () => {
  const [clientes, setClientes] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientesData = await obtenerClientes();
        const serviciosData = await obtenerServicios();
        setClientes(clientesData);
        setServicios(serviciosData);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (data) => {
    try {
      await registrarBoleta(data);
      setSuccess(true);
      setError(null);
    } catch (error) {
      console.error('Error al generar la boleta:', error);
      setError('Error al generar la boleta');
      setSuccess(false);
    }
  };

  return (
    <div>
      <h1>Generar Boleta</h1>
      {success && <p>Boleta generada exitosamente</p>}
      {error && <p>{error}</p>}
      <BoletaForm clientes={clientes} servicios={servicios} handleSubmit={handleSubmit} />
    </div>
  );
};

export default RegisterBoleta;
