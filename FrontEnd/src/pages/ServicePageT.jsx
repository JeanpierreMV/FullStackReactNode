import React from "react";
import Navbar from "../components/SideBar";
import ServiceList from "../components/ServiceListTa"

const ServicePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Contenido principal */}
      <div className="flex-grow p-8 bg-gray-100">
        <ServiceList />
      </div>
    </div>
  );
};

export default ServicePage;
