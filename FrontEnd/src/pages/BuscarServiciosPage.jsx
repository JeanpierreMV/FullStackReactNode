import React, { useState } from 'react';
import BuscarServicios from '../components/BuscarServicios';
import Sidebar from '../components/SideBar'; // Importa el Sidebar

const BuscarServiciosPage = () => {
  const [formData, setFormData] = useState({
    servicio: '',
    tamano: '',
    tipo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Buscando servicios:', formData);
    // Aquí irá la lógica para la API
  };

  return (
    <div className="page-container">
      <Sidebar /> {/* Incluimos el Sidebar */}
      <div className="content">
        <BuscarServicios
          formData={formData}
          handleChange={handleChange}
          handleSearch={handleSearch}
        />
      </div>
    </div>
  );
};

export default BuscarServiciosPage;
