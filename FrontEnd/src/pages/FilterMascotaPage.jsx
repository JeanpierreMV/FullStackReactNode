import React from 'react';
import Sidebar from '../components/SideBar';
import Navbar from '../components/Navbar';
import FilterMascota from '../components/FilterMascota';
import '../styles/RegisterMascota.css';

const FilterMascotaPage = () => {
  return (
    <div className="container">
      <Sidebar />
      <div className="mainContent">
        <Navbar />
        <main className="formContainer">
          <FilterMascota />
        </main>
      </div>
    </div>
  );
};

export default FilterMascotaPage;
