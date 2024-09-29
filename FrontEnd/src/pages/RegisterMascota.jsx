import React from 'react';
import Sidebar from '../components/SideBar';
import Navbar from '../components/Navbar';
import RegisterMascota from '../components/RegistrarMascota';
import '../styles/RegisterMascota.css';

const RegisterMascotaPage = () => {
  return (
    <div className="container">
      <Sidebar />
      <div className="mainContent">
        <Navbar />
        <main className="formContainer">
          <RegisterMascota />
        </main>
      </div>
    </div>
  );
};

export default RegisterMascotaPage;
