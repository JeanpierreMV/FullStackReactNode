import React from 'react';
import Sidebar from '../components/SideBar';
import Navbar from '../components/Navbar';
import BuscarCitaMasc from '../components/BuscarCitaTail';



const BuscarCitasMasc = () => {
  return (
    <div className="container">
      <Sidebar />
      <div className="mainContent">
        <Navbar />
        <main className="formContainer">
          <BuscarCitaMasc />
        </main>
      </div>
    </div>
  );
};

export default BuscarCitasMasc;