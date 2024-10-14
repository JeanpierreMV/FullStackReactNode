import React from 'react';
import Sidebar from '../components/SideBar';
import Navbar from '../components/Navbar';
import MostDetallUltAnaRealizado from '../components/MostDetallUltAnaRealizado.jsx';

const MostDetallUltAnaRealizadoPage = () => {
    return (
      <div className="container">
        <Sidebar />
        <div className="mainContent">
          <Navbar />
          <main className="formContainer">
            <MostDetallUltAnaRealizado />
          </main>
        </div>
      </div>
    );
  };

export default MostDetallUltAnaRealizadoPage;
