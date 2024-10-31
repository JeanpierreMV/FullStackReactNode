import React, { useState, useEffect } from 'react';
import '../styles/FilterAtencion.css';
import { Link } from 'react-router-dom';
import { atencionesget } from '../services/api'; // Asegúrate de que la ruta es correcta
import mascotaImage from '../assets/mascota.jpg'; // Asegúrate de tener esta imagen en tu proyecto

export default function FilterAtencion() {
  const [searchTerm, setSearchTerm] = useState('');
  const [appointments, setAppointments] = useState([]); // Cambia a un estado vacío inicialmente
  const [showModal1, setShowModal1] = useState(false); // Primer modal
  const [showModal2, setShowModal2] = useState(false); // Segundo modal
  const [selectedDate, setSelectedDate] = useState(''); // Fecha de cita seleccionada
  const [selectedAppointment, setSelectedAppointment] = useState(null); // Cita seleccionada para el segundo modal

  // Efecto para obtener atenciones
  useEffect(() => {
    const fetchAtenciones = async () => {
      try {
        const response = await atencionesget(); // Llama a tu API aquí
        setAppointments(response); // Asigna la respuesta al estado
      } catch (error) {
        console.error('Error al obtener atenciones:', error);
      }
    };

    fetchAtenciones();
  }, []); // Se ejecuta una vez al montar el componente

  // Filtrar solo por DNI
  const filteredAppointments = appointments.filter(appointment =>
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
        <label htmlFor="search">Buscar Atención por DNI</label>
        <input
          type="text"
          id="search"
          placeholder="Buscar por DNI"
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
                <td>{appointment.nombreDuenio}</td>
                <td>{appointment.nombreMascota}</td>
                <td>{appointment.nombreVeterinario}</td>
                <td>{appointment.fechaCita}</td>
                <td>{appointment.consideraciones}</td> {/* Cambia a consideraciones */}
                <td>
                  <button className="view-button" onClick={() => handleOpenModal2(appointment)}>👁️</button>
                  <button className="edit-button" onClick={() => handleOpenModal1(appointment.fechaCita)}>✏️</button>
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
            <div className="modal-body">
              {/* Columna izquierda: Imagen */}
              <img src={mascotaImage} alt="Mascota" className="mascota-image" />

              {/* Columna derecha: Información */}
              <div className="info-container">
                <h3>Información de la Cita</h3>
                <div className="info-row"><strong>Nombre del Servicio:</strong> {selectedAppointment.servicio}</div>
                <div className="info-row"><strong>Descripción:</strong> {selectedAppointment.descripcion}</div>
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
