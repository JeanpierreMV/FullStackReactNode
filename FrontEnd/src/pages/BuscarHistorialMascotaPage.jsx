import React from 'react';
import Sidebar from '../components/SideBar';
import Navbar from '../components/Navbar';
import BuscarHistorialMascota from '../components/BuscarHistorialMascota'; // Asegúrate de que la ruta sea correcta
import '../styles/BuscarHistorialMascota.css';

const BuscarHistorialMascotaPage = () => {
  return (
    <div className="container">
      <Sidebar />
      <div className="mainContent">
        <Navbar />
        <div className="historial-mascota-page">
          <h1>Buscar Historial de Mascota</h1>
          {/* Aquí renderizamos el componente BuscarHistorialMascota */}
          <BuscarHistorialMascota />
        </div>
      </div>
    </div>
  );
};

export default BuscarHistorialMascotaPage;


