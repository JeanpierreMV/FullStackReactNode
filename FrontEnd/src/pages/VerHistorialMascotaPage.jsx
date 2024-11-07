import React from 'react';
import Sidebar from '../components/SideBar';
import Navbar from '../components/Navbar';
import VerHistorialMascota from '../components/VerHistorialMascota'; // Make sure the path is correct
import '../styles/VerHistorialMascota.css'; // Update the stylesheet if needed

const VerHistorialMascotaPage = () => {
  return (
    <div className="container">
      <Sidebar />
      <div className="mainContent">
        <Navbar />
        <div className="historial-mascota-page">
          <h1>Ver Historial de Mascota</h1>
          {/* Here we render the VerHistorialMascota component */}
          <VerHistorialMascota />
        </div>
      </div>
    </div>
  );
};

export default VerHistorialMascotaPage;
