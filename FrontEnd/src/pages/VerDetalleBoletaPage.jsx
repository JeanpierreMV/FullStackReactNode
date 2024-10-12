import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DetalleBoleta from '../components/DetalleBoleta';
import { obtenerDetalleBoleta } from '../services/api';

const VerDetalleBoletaPage = () => {
  const { id } = useParams();  // Obtener el ID de la boleta desde la URL
  const [boleta, setBoleta] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBoleta = async () => {
      try {
        const data = await obtenerDetalleBoleta(id);
        setBoleta(data);
      } catch (error) {
        setError('Error al obtener los detalles de la boleta');
      }
    };

    fetchBoleta();
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Ver Detalle Boleta</h1>
      <DetalleBoleta boleta={boleta} />
    </div>
  );
};

export default VerDetalleBoletaPage;
