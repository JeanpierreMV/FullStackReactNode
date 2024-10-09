import React from 'react';
import Sidebar from '../components/SideBar';
import Navbar from '../components/Navbar';
import FilterAtencion from '../components/FilterAtencion';


const FilterAtencionPage = () => {
  return (
    <div className="container">
      <Sidebar />
      <div className="mainContent">
        <Navbar />
        <main className="formContainer">
          <FilterAtencion />
        </main>
      </div>
    </div>
  );
};

export default FilterAtencionPage;
