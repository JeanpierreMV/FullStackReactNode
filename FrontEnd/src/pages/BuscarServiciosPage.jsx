import React, { useState } from 'react';
import BuscarServicios from '../components/BuscarServicios';
import Sidebar from '../components/SideBar'; // Importa el Sidebar
import Navbar from '../components/Navbar';

const BuscarServiciosPage = () => {
  const [formData, setFormData] = useState({
    servicio: '',
    tamano: '',
    especie: ''
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
    
  };

  return (
    <div className="page-container">
       
      <Sidebar />
      
      <div className="content">
      <Navbar />  
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
