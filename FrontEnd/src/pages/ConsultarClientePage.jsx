import React from 'react';
import Sidebar from '../components/SideBar';
import Navbar from '../components/Navbar';
import ConsultarCliente from '../components/ConsultarCliente';


const ConsultarClientePage = () => {
  return (
    <div className="container">
      <Sidebar />
      <div className="mainContent">
        <Navbar />
        <main className="formContainer">
          <ConsultarCliente />
        </main>
      </div>
    </div>
  );
};

export default ConsultarClientePage;
