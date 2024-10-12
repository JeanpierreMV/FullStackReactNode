import React, { useEffect, useState } from 'react';
import { obtenerFacturacionDelDia } from '../services/api';
import ListarBoletas from '../components/ListarBoletas';

const ListarFacturacionPage = () => {
  const [boletas, setBoletas] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFacturacion = async () => {
      try {
        const data = await obtenerFacturacionDelDia();
        setBoletas(data);
      } catch (error) {
        setError('Error al obtener la facturación del día.');
      }
    };

    fetchFacturacion();
  }, []);

  return (
    <div>
      <h1>Facturación del Día</h1>
      {error ? <p>{error}</p> : <ListarBoletas boletas={boletas} />}
    </div>
  );
};

export default ListarFacturacionPage;
