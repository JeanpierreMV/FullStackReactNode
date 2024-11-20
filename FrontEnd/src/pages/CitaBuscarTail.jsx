import React from "react";
import Navbar from "../components/SideBar";
import AppointmentList from "../components/BuscarCitaTail"; // Cambié el nombre del componente si corresponde

const Page = () => {
  return (
    <div className="page-container">
      {/* Sidebar */}
      <Navbar className="sidebar" />

      {/* Contenido Principal */}
      <div className="appointment-list-container">
        <AppointmentList />
      </div>
    </div>
  );
};

export default Page;
