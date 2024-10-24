import React, { useState } from 'react';
import '../styles/FilterAtencion.css';
import { Link } from 'react-router-dom';
import mascotaImage from '../assets/mascota.jpg'; // Asegúrate de tener esta imagen en tu proyecto
export default function FilterAtencion() {
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

  const [showModal1, setShowModal1] = useState(false); // Primer modal
  const [showModal2, setShowModal2] = useState(false); // Segundo modal
  const [selectedDate, setSelectedDate] = useState(''); // Fecha de cita seleccionada
  const [selectedAppointment, setSelectedAppointment] = useState(null); // Cita seleccionada para el segundo modal

  const filteredAppointments = appointments.filter(appointment =>
    appointment.nMascota.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.dueno.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.dni.includes(searchTerm)
  );

  const handleOpenModal1 = (fechaCita) => {
    setSelectedDate(fechaCita);
    setShowModal1(true);
  };

  const handleOpenModal2 = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal2(true);
  };

  const handleCloseModal1 = () => {
    setShowModal1(false);
  };

  const handleCloseModal2 = () => {
    setShowModal2(false);
  };

  const handleSaveChanges = () => {
    console.log('Fecha de Cita guardada:', selectedDate);
    setShowModal1(false);
  };

  return (
    <div className="filter-atencion-page">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Tus Atenciones</h1>
        <Link to="/registrar-atencion" style={{ textDecoration: 'none', color: 'inherit' }}>
          <button className="new-button" style={{ marginRight: '20px' }}>
            Registrar Nueva Atención
          </button>
        </Link>
      </header>
      
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
              <th>Veterinario</th>
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
                  <button className="view-button" onClick={() => handleOpenModal2(appointment.fechaCita)}>👁️</button>
                  <button className="edit-button" onClick={() => handleOpenModal1(appointment)}>✏️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Primer Modal - Editar Fecha de Cita */}
      {showModal1 && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Editar Fecha de Cita</h2>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="fechaCita">Fecha de Cita</label>
              </div>
              <div className="form-group">
                <input
                  type="date"
                  id="fechaCita"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="date-input"
                />
              </div>
            </div>
            <div className="modal-actions">
              <button onClick={handleCloseModal1} className="modal-button close-button">Cerrar</button>
              <button onClick={handleSaveChanges} className="modal-button save-button">Guardar Cambios</button>
            </div>
          </div>
        </div>
      )}

      {showModal2 && selectedAppointment && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Detalle de la Cita</h2>
           {/* <hr />*/}
            <div className="modal-body">
              {/* Columna izquierda: Imagen */}
              <img src={mascotaImage} alt="Mascota" className="mascota-image" />

              {/* Columna derecha: Información */}
              <div className="info-container">
                <h3>Información de la Cita</h3>
                <div className="info-row"><strong>Nombre del Servicio:</strong> {selectedAppointment.dueno}</div>
                <div className="info-row"><strong>Descripcion:</strong> {selectedAppointment.nMascota}</div>
                <div className="info-row"><strong>Especie:</strong> {selectedAppointment.especie}</div>
                <div className="info-row"><strong>Tamaño:</strong> {selectedAppointment.tamaño}</div>
                <div className="info-row"><strong>Costo:</strong> {selectedAppointment.costo}</div>
              
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
