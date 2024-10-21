import React from "react";
import Navbar from "../components/SideBar";
import AppointmentList from "../components/BuscarCitaTail";

const Page = () => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <Navbar />

      {/* Contenido Principal */}
      <div className="flex-1 p-6 bg-gray-100">
        <AppointmentList />
      </div>
    </div>
  );
};

export default Page;
