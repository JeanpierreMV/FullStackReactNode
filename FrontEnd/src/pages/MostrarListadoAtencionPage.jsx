import React from 'react';
import Sidebar from '../components/SideBar';
import Navbar from '../components/Navbar';
import MostrarListadoAtencion from '../components/MostrarListadoAtencion'; // Asegúrate de que la ruta sea correcta
import '../styles/MostrarListadoAtencion.css'; // Asegúrate de tener este archivo de estilos

const MostrarListadoAtencionPage = () => {
  return (
    <div className="container">
      <Sidebar />
      <div className="mainContent">
        <Navbar />
        <div className="listado-atencion-page">
          <h1>Listado de Atenciones</h1>
          {/* Aquí renderizamos el componente MostrarListadoAtencion */}
          <MostrarListadoAtencion />
        </div>
      </div>
    </div>
  );
};

export default MostrarListadoAtencionPage;
