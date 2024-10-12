import React from 'react';
import Sidebar from '../components/SideBar';
import Navbar from '../components/Navbar';
import SeguimientoAtencion from '../components/SeguimientoAtencion';


const SeguimientoAtencionPage = () => {
  return (
    <div className="container">
      <Sidebar />
      <div className="mainContent">
        <Navbar />
        <main className="formContainer">
          <SeguimientoAtencion />
        </main>
      </div>
    </div>
  );
};

export default SeguimientoAtencionPage;
