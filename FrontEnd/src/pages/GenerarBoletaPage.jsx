import React from 'react';
import Sidebar from '../components/SideBar';
import Navbar from '../components/Navbar';
import GenerarBoleta from '../components/GenerarBoleta';
import '../styles/GenerarBoleta.css';

const GenerarBoletaPage = () => {
  return (
    <div className="container">
      <Sidebar />
      <div className="mainContent">
        <Navbar />
        <main className="formContainer">
          <GenerarBoleta />
        </main>
      </div>
    </div>
  );
};

export default GenerarBoletaPage;
