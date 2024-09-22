import { useState } from 'react';
import axios from 'axios';

const useConsultarServForm = () => {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addServicio = async (servicio) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/agregarServicio', servicio);
      alert('Servicio agregado correctamente');
    } catch (err) {
      setError('Error al agregar el servicio');
    } finally {
      setLoading(false);
    }
  };

  const getServicios = async (especie, tamano) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/obtenerServicios?especie=${especie}&tamano=${tamano}`);
      setServicios(response.data);
    } catch (err) {
      setError('Error al obtener los servicios');
    } finally {
      setLoading(false);
    }
  };

  return { servicios, loading, error, addServicio, getServicios };
};

export default useConsultarServForm;
