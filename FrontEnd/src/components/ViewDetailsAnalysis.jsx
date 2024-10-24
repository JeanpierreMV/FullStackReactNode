import React, { useState } from 'react';
import '../styles/ViewDetailsAnalysis.css';
import mascotaImage from '../assets/mascota.jpg'; // Asegúrate de tener esta imagen en tu proyecto

export default function ViewDetailsAnalysis() {
  const [searchTerm, setSearchTerm] = useState('');
  const [appointments] = useState([
    {
      dni: '12345678',
      dueno: 'ERIKA',
      nMascota: 'LUA',
      veterinario: 'Dr. Carlos',
      fechaCita: '2024-10-10',
      estado: 'Pendiente',
      servicio: 'Consulta General',
      descripcion: 'Revisión médica general',
      especie: 'Canino',
      tamaño: 'Mediano',
      costo: '$50'
    },
    {
      dni: '87654321',
      dueno: 'JUAN',
      nMascota: 'MAX',
      veterinario: 'Dr. Gomez',
      fechaCita: '2024-10-12',
      estado: 'Completado',
      servicio: 'Vacunación',
      descripcion: 'Aplicación de vacuna antirrábica',
      especie: 'Felino',
      tamaño: 'Pequeño',
      costo: '$30'
    }
  ]);

  const [showModal2, setShowModal2] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const filteredAppointments = appointments.filter(appointment =>
    appointment.nMascota.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.dueno.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.dni.includes(searchTerm)
  );

  const handleOpenModal2 = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal2(true);
  };

  const handleCloseModal2 = () => {
    setShowModal2(false);
  };

  return (
    <div className="seguimiento-atencion-page">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Mis Análisis</h1>
      </header>
      <h4 className="custom-h4" style={{ color: 'orange' }}>* Pendiente de Pago</h4>
      <h4 className="custom-h4" style={{ color: 'purple' }}>* Pendiente de Cita</h4>
      <h4 className="custom-h4" style={{ color: 'green' }}>* Atendiendo</h4>
      <h4 className="custom-h4" style={{ color: 'red' }}>* Terminado</h4>

      <div className="search-container">
        <label htmlFor="search">Buscar Atención</label>
        <input
          type="text"
          id="search"
          placeholder="Buscar por DNI, Dueño o Mascota"
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
              <th>Laboratorista</th>
              <th>Fecha de Cita</th>
              <th>Estado</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((appointment, index) => (
              <tr key={index}>
                <td>{appointment.dni}</td>
                <td>{appointment.dueno}</td>
                <td>{appointment.nMascota}</td>
                <td>{appointment.veterinario}</td>
                <td>{appointment.fechaCita}</td>
                <td>{appointment.estado}</td>
                <td>
                  <button className="view-button" onClick={() => handleOpenModal2(appointment)}>👁️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de Detalle de la Cita */}
      {showModal2 && selectedAppointment && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Detalle de la Cita</h2>
            <hr />
            <div className="modal-body">
              {/* Columna izquierda: Imagen */}
              <img src={mascotaImage} alt="Mascota" className="mascota-image" />

              {/* Columna derecha: Información */}
              <div className="info-container">
                <h3>Información de la Cita</h3>
                <div className="info-row"><strong>Dueño:</strong> {selectedAppointment.dueno}</div>
                <div className="info-row"><strong>Nombre Mascota:</strong> {selectedAppointment.nMascota}</div>
                <div className="info-row"><strong>Edad:</strong> 21</div> {/* Ejemplo de edad fija */}
                <div className="info-row"><strong>Especie:</strong> {selectedAppointment.especie}</div>
                <div className="info-row"><strong>Tamaño:</strong> {selectedAppointment.tamaño}</div>
                <div className="info-row"><strong>Servicio:</strong> {selectedAppointment.servicio}</div>
                <div className="info-row"><strong>Descripción:</strong> {selectedAppointment.descripcion}</div>
                <div className="info-row"><strong>Costo:</strong> {selectedAppointment.costo}</div>
                <h3>Información Adicional</h3>
                Requiere alguna analisis?
              </div>
              
              </div>
           
            <hr />
            <div className="modal-actions">
              <button onClick={handleCloseModal2} className="modal-button close-button">Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
