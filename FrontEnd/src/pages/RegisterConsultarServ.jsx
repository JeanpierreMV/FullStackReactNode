import React from 'react';
import ConsultarServForm from '../components/consultarServForm';
import useConsultarServForm from '../hooks/useConsultarServForm';
import { agregarServicios, obtenerServicios, obtenerClientes } from '../services/api';

const RegisterConsultarServ = () => {
  const { servicios, loading, error, addServicio, getServicios } = useConsultarServForm();

  const handleAddServicio = (servicio) => {
    addServicio(servicio);
  };

  const handleGetServicios = ({ especie, tamano }) => {
    getServicios(especie, tamano);
  };

  return (
    <div>
      <h1>Registrar y Consultar Servicios</h1>
      <ConsultarServForm onAddServicio={handleAddServicio} onGetServicios={handleGetServicios} />

      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}
      {servicios.length > 0 && (
        <ul>
          {servicios.map((servicio) => (
            <li key={servicio.id}>
              {servicio.nombre}: ${servicio.costo.toFixed(2)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RegisterConsultarServ;
