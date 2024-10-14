import React, { useState } from 'react';
import '../styles/SegumientoAtencion.css';
import { Link } from 'react-router-dom';

export default function SeguimientoAtencion() {
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
    <div className="seguimiento-atencion-pag-e">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Atenciones</h1>
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
               
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

 
      {/* Segundo Modal - Detalle de la Cita */}
      {showModal2 && selectedAppointment && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Detalle de la Cita</h2>
            <hr />
            <div className="modal-body">
              <h3>Informacion de la Cita: </h3>
              <p><strong>Nombre del Servicio:</strong> {selectedAppointment.servicio}</p>
              <p><strong>Descripción:</strong> {selectedAppointment.descripcion}</p>
              <p><strong>Especie:</strong> {selectedAppointment.especie}</p>
              <p><strong>Tamaño:</strong> {selectedAppointment.tamaño}</p>
              <p><strong>Costo:</strong> {selectedAppointment.costo}</p>
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
