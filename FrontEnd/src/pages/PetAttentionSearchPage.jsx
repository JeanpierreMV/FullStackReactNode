import React from 'react';
import Sidebar from '../components/SideBar'; // Importa el Sidebar
import PetAttentionSearchForm from '../components/PetAttentionSearchForm';
import PetAttentionResultTable from '../components/PetAttentionResultTable';
import '../styles/PetAttentionSearchPage.css'; // Asegúrate de agregar estilos para la distribución

const PetAttentionSearchPage = () => {
  return (
    <div className="page-container">
      <Sidebar /> {/* Incluir el Sidebar */}
      <div className="content-container">
        <h2>BUSCAR ATENCIÓN DE LA MASCOTA</h2>
        <PetAttentionSearchForm />
        <PetAttentionResultTable />
      </div>
    </div>
  );
};

export default PetAttentionSearchPage;
