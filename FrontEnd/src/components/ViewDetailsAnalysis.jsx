import React, { useState } from 'react';
import '../styles/ViewDetailsAnalysis.css';
import mascotaImage from '/src/assets/mascota.jpg';
import felinoImage from '/src/assets/felino.png'

export default function ViewDetailsAnalysis() {
  const [searchTerm, setSearchTerm] = useState('');
  const [appointments] = useState([
    {
      dni: '12345678',
      dueno: 'ERIKA',
      nMascota: 'LUA',
      edad:'21',
      laboratorista: 'Dr. Carlos',
      fechaCita: '2024-10-10',
      estado: 'Pendiente',
      servicio: 'Analisis',
      tipo_analisis: 'Sangre',
      resultado_analisis: 'Revisión médica general',
      especie: 'Canino',
      tamaño: 'Mediano'
      
    },
    {
      dni: '87654321',
      dueno: 'JUAN',
      nMascota: 'MAX',
      edad:'10',
      laboratorista: 'Dr. Gomez',
      fechaCita: '2024-10-12',
      estado: 'Completado',
      servicio: 'Analisis',
      tipo_analisis: 'Sangre',
      resultado_analisis: 'Aplicación de vacuna antirrábica',
      especie: 'Felino',
      tamaño: 'Pequeño'
      
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
        <label htmlFor="search">Buscar Analisis</label>
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
                <td>{appointment.laboratorista}</td>
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
      <h2>Detalle de Análisis</h2>
      <hr />
      <div className="modal-body">
        {/* Columna izquierda: Imagen */}
        <img 
          src={selectedAppointment.especie === 'Canino' ? mascotaImage : felinoImage} 
          alt="Mascota" 
          className="mascota-image" 
        />

        {/* Columna derecha: Información */}
        <div className="info-container">
          <div className="info-row"><strong>Nombre Mascota:</strong> {selectedAppointment.nMascota}</div>
          <div className="info-row"><strong>Edad:</strong> {selectedAppointment.edad}</div>
          <div className="info-row"><strong>Especie:</strong> {selectedAppointment.especie}</div>
          <div className="info-row"><strong>Tamaño:</strong> {selectedAppointment.tamaño}</div>
          <div className="info-row"><strong>Servicio:</strong> {selectedAppointment.servicio}</div>
          <div className="info-row"><strong>Tipo Análisis:</strong> {selectedAppointment.tipo_analisis}</div>
          <div className="info-row"><strong>Resultado Análisis:</strong> {selectedAppointment.resultado_analisis}</div>
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
