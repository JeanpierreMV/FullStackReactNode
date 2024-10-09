import React from 'react';
import Sidebar from '../components/SideBar';
import Navbar from '../components/Navbar';
import RegistrarAtencion from '../components/RegistrarAtencion';
import '../styles/RegisterAtencion.css';


const RegisterAtencionPage = () => {
  return (
    <div className="container">
      <Sidebar />
      <div className="mainContent">
        <Navbar />
        <main className="formContainer">
          <RegistrarAtencion />
        </main>
      </div>
    </div>
  );
};

export default RegisterAtencionPage;
