import React from 'react';
import Sidebar from '../components/SideBar';
import Navbar from '../components/Navbar';
import BuscarUltimaAtencionMascota from '../components/BuscarUltimaAtencionMascota'; // Asegúrate de que la ruta sea correcta
import '../styles/BuscarUltimaAtencionMascota.css';

const BuscarUltimaAtencionMascotaPage = () => {
  return (
    <div className="container">
      <Sidebar />
      <div className="mainContent">
        <Navbar />
        <div className="ultima-atencion-mascota-page">
          <h1>Buscar Última Atención de la Mascota</h1>
          {/* Aquí renderizamos el componente BuscarUltimaAtencionMascota */}
          <BuscarUltimaAtencionMascota />
        </div>
      </div>
    </div>
  );
};


export default BuscarUltimaAtencionMascotaPage;

