import React, { useState } from 'react';
import '../styles/MostrarListadoAtencion.css'; // Cambia el nombre del archivo CSS si es necesario
import mascotaImage from '../assets/mascota.jpg'; // Asegúrate de tener esta imagen en tu proyecto

export default function MostrarListadoAtencion() {
  const [searchTerm, setSearchTerm] = useState('');
  const [atenciones] = useState([
    {
      dni: '12345678',
      dueno: 'ERIKA',
      nombreMascota: 'LUA',
      veterinario: 'Dr. Carlos',
      fechaAtencion: '2024-10-10',
      servicio: 'Consulta General',
      descripcion: 'Revisión médica general',
      costo: '$50',
      estado: 'Completado',
    },
    {
      dni: '87654321',
      dueno: 'JUAN',
      nombreMascota: 'MAX',
      veterinario: 'Dr. Gomez',
      fechaAtencion: '2024-10-12',
      servicio: 'Vacunación',
      descripcion: 'Aplicación de vacuna antirrábica',
      costo: '$30',
      estado: 'Completado',
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedAtencion, setSelectedAtencion] = useState(null);

  const filteredAtenciones = atenciones.filter((atencion) =>
    atencion.nombreMascota.toLowerCase().includes(searchTerm.toLowerCase()) ||
    atencion.dueno.toLowerCase().includes(searchTerm.toLowerCase()) ||
    atencion.dni.includes(searchTerm)
  );

  const handleOpenModal = (atencion) => {
    setSelectedAtencion(atencion);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="mostrar-listado-atencion-page">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Mostrar Listado de Atención</h1>
      </header>

      <div className="status-legend">
        <h4 className="legend-item" style={{ color: 'orange' }}>* Pendiente de Pago</h4>
        <h4 className="legend-item" style={{ color: 'purple' }}>* Pendiente de Cita</h4>
        <h4 className="legend-item" style={{ color: 'green' }}>* Atendiendo</h4>
        <h4 className="legend-item" style={{ color: 'red' }}>* Terminado</h4>
      </div>


      <div className="search-container">
        <label htmlFor="search">Buscar por DNI, Dueño o Mascota</label>
        <input
          type="text"
          id="search"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="data-container">
        <table>
          <thead>
            <tr>
              <th>DNI</th>
              <th>Dueño</th>
              <th>Nombre de la Mascota</th>
              <th>Veterinario</th>
              <th>Fecha de Atención</th>
              <th>Estado</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredAtenciones.map((atencion, index) => (
              <tr key={index}>
                <td>{atencion.dni}</td>
                <td>{atencion.dueno}</td>
                <td>{atencion.nombreMascota}</td>
                <td>{atencion.veterinario}</td>
                <td>{atencion.fechaAtencion}</td>
                <td>{atencion.estado}</td>
                <td>
                  <button className="view-button" onClick={() => handleOpenModal(atencion)}>👁️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de Detalle de Atención */}
      {showModal && selectedAtencion && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Detalle de la Atención</h2>
            <hr />
            <div className="modal-body">
              {/* Columna izquierda: Imagen */}
              <img src={mascotaImage} alt="Mascota" className="mascota-image" />

              {/* Columna derecha: Información */}
              <div className="info-container">
                <h3>Información de la Atención</h3>
                <div className="info-row"><strong>Dueño:</strong> {selectedAtencion.dueno}</div>
                <div className="info-row"><strong>Nombre Mascota:</strong> {selectedAtencion.nombreMascota}</div>
                <div className="info-row"><strong>Servicio:</strong> {selectedAtencion.servicio}</div>
                <div className="info-row"><strong>Descripción:</strong> {selectedAtencion.descripcion}</div>
                <div className="info-row"><strong>Costo:</strong> {selectedAtencion.costo}</div>
              </div>
            </div>
            <hr />
            <div className="modal-actions">
              <button onClick={handleCloseModal} className="modal-button close-button">Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
