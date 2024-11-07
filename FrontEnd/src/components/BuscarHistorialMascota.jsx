import React, { useState } from 'react';
import '../styles/BuscarHistorialMascota.css';
import mascotaImage from '../assets/mascota.jpg'; // Asegúrate de tener esta imagen en tu proyecto

export default function BuscarHistorialMascota() {
  const [searchTerm, setSearchTerm] = useState('');
  const [mascotas] = useState([
    {
      dni: '12345678',
      dueno: 'ERIKA',
      nombreMascota: 'LUA',
      veterinario: 'Dr. Carlos',
      fechaAtencion: '2024-10-10',
      servicio: 'Consulta General',
      descripcion: 'Revisión médica general',
      especie: 'Canino',
      tamaño: 'Mediano',
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
      especie: 'Felino',
      tamaño: 'Pequeño',
      costo: '$30',
      estado: 'Completado',
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedMascota, setSelectedMascota] = useState(null);

  const filteredMascotas = mascotas.filter((mascota) =>
    mascota.nombreMascota.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mascota.dueno.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mascota.dni.includes(searchTerm)
  );

  const handleOpenModal = (mascota) => {
    setSelectedMascota(mascota);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="buscar-historial-page">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Buscar Historial de Mascota</h1>
      </header>

      <h4 className="custom-h4" style={{ color: 'orange' }}>* Pendiente de Pago</h4>
      <h4 className="custom-h4" style={{ color: 'purple' }}>* Pendiente de Cita</h4>
      <h4 className="custom-h4" style={{ color: 'green' }}>* Atendiendo</h4>
      <h4 className="custom-h4" style={{ color: 'red' }}>* Terminado</h4>

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
            {filteredMascotas.map((mascota, index) => (
              <tr key={index}>
                <td>{mascota.dni}</td>
                <td>{mascota.dueno}</td>
                <td>{mascota.nombreMascota}</td>
                <td>{mascota.veterinario}</td>
                <td>{mascota.fechaAtencion}</td>
                <td>{mascota.estado}</td>
                <td>
                  <button className="view-button" onClick={() => handleOpenModal(mascota)}>👁️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de Detalle de Mascota */}
      {showModal && selectedMascota && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Detalle del Historial</h2>
            <hr />
            <div className="modal-body">
              {/* Columna izquierda: Imagen */}
              <img src={mascotaImage} alt="Mascota" className="mascota-image" />

              {/* Columna derecha: Información */}
              <div className="info-container">
                <h3>Información de la Mascota</h3>
                <div className="info-row"><strong>Dueño:</strong> {selectedMascota.dueno}</div>
                <div className="info-row"><strong>Nombre Mascota:</strong> {selectedMascota.nombreMascota}</div>
                <div className="info-row"><strong>Edad:</strong> 3</div> {/* Ejemplo de edad */}
                <div className="info-row"><strong>Especie:</strong> {selectedMascota.especie}</div>
                <div className="info-row"><strong>Tamaño:</strong> {selectedMascota.tamaño}</div>
                <div className="info-row"><strong>Servicio:</strong> {selectedMascota.servicio}</div>
                <div className="info-row"><strong>Descripción:</strong> {selectedMascota.descripcion}</div>
                <div className="info-row"><strong>Costo:</strong> {selectedMascota.costo}</div>
                <h3>Información Adicional</h3>
                <p>Requiere análisis adicional? No</p>
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

