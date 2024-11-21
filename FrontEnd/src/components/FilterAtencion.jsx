import React, { useState, useEffect } from 'react';
import '../styles/FilterAtencion.css';
import { Link } from 'react-router-dom';
import { atencionesget, getAtencionDetalle, ActualizarCita } from '../services/api';
import mascotaImage from '../assets/mascota.jpg';

export default function FilterAtencion() {
  const [searchTerm, setSearchTerm] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    const fetchAtenciones = async () => {
      try {
        const response = await atencionesget();
        setAppointments(response);
      } catch (error) {
        console.error('Error al obtener atenciones:', error);
      }
    };

    fetchAtenciones();
  }, []);

  const fetchAtencionDetalles = async (atencionId) => {
    try {
      const response = await getAtencionDetalle(atencionId);
      setSelectedAppointment(response);
    } catch (error) {
      console.error('Error al obtener los detalles de la atención:', error);
    }
  };

  const filteredAppointments = appointments.filter(appointment =>
    appointment.dni.includes(searchTerm)
  );

  const handleOpenModal1 = (appointment) => {
    setSelectedAppointment(appointment);
    const localDateTime = new Date(appointment.fechaCita).toISOString().slice(0, 16);
  setSelectedDate(localDateTime);
  setShowModal1(true);
  };

  const handleOpenModal2 = async (appointment) => {
    if (appointment) {
      setSelectedAppointment(appointment);
      setShowModal2(true);
      await fetchAtencionDetalles(appointment.id); // Usar appointment.id directamente
    }
  };

  const handleCloseModal1 = () => {
    setShowModal1(false);
  };

  const handleCloseModal2 = () => {
    setShowModal2(false);
  };

  const handleSaveChanges = async () => {
    try {
     
      const payload = {
        fechaCita: new Date(selectedDate).toISOString(), // Formato ISO
      };
  
      await ActualizarCita(selectedAppointment.id, payload);
      const updatedAppointments = await atencionesget();
      setAppointments(updatedAppointments);
  
    
        console.log('Cita actualizada exitosamente:');
        alert('Cita actualizada correctamente');
        setShowModal1(false);
      
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
      alert('Error al guardar la cita');
    }
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
        {  [...filteredAppointments]
        .sort((a, b) => a.id - b.id) 
        .map((appointment, index) => (
          <tr key={appointment.id}> 
                <td>{appointment.dni}</td>
                <td>{appointment.nombreDuenio}</td>
                <td>{appointment.nombreMascota}</td>
                <td>{appointment.nombreVeterinario}</td>
                <td>{appointment.fechaCita.split('T')[0]}</td>
                <td>{appointment.consideraciones}</td>
                <td>
                  <button
                    className="view-button"
                    onClick={() => handleOpenModal2(appointment, index)}
                  >
                    👁️
                  </button>
                  <button
                    className="edit-button"
                    onClick={() => handleOpenModal1(appointment)}
                  >
                    ✏️
                  </button>
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
                <label htmlFor="fechaCita">Fecha y Hora de la Cita</label>
              </div>
              <div className="form-group">
                <input
                  type="datetime-local" // Cambiado de date a datetime-local
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

      {/* Segundo Modal - Detalles de la Cita */}
      {showModal2 && selectedAppointment && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Detalle de la Cita</h2>
            <div className="modal-body">
              <img src={mascotaImage} alt="Mascota" className="mascota-image" />
              <div className="info-container">
                <h3>Información de la Cita</h3>
                <div className="info-row"><strong>Nombre del Servicio:</strong> {selectedAppointment.nombreServicio || 'No disponible'}</div>
                <div className="info-row"><strong>Descripción:</strong> {selectedAppointment.descripcion || 'No disponible'}</div>
                <div className="info-row"><strong>Especie:</strong> {selectedAppointment.especie || 'No disponible'}</div>
                <div className="info-row"><strong>Tamaño:</strong> {selectedAppointment.tamaño || 'No disponible'}</div>
                <div className="info-row"><strong>Costo:</strong> {selectedAppointment.costo || 'No disponible'}</div>
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
