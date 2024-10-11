import React from 'react';
import Sidebar from '../components/SideBar';

const PetAttentionResultTable = () => {
  return (
    <div className="result-table">
      <table>
        <thead>
          <tr>
            <th>Fecha de atención</th>
            <th>Nombres Especialista</th>
            <th>Motivo de visita</th>
            <th>En tratamiento</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="5">No hay resultados</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PetAttentionResultTable;
