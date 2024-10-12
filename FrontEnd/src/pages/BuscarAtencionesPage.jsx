import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { obtenerAtenciones } from '../services/api';
import AtencionList from '../components/AtencionList';

const BuscarAtencionesPage = () => {
  const { mascotaId } = useParams(); // Obtener el ID de la mascota desde la URL
  const [atenciones, setAtenciones] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAtenciones = async () => {
      try {
        const data = await obtenerAtenciones(mascotaId);
        setAtenciones(data);
      } catch (error) {
        setError('Error al obtener atenciones');
      }
    };

    fetchAtenciones();
  }, [mascotaId]);

  return (
    <div>
      <h1>Buscar Atenciones para la Mascota {mascotaId}</h1>
      {error ? <p>{error}</p> : <AtencionList atenciones={atenciones} />}
    </div>
  );
};

export default BuscarAtencionesPage;
