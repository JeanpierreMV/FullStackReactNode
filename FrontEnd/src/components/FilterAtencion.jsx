import React, { useState } from 'react';
import '../styles/FilterAtencion.css';

export default function FilterAtencion() {
  const [searchTerm, setSearchTerm] = useState('');
  const [appointments] = useState([
    {
      dni: '12345678',
      dueno: 'ERIKA',
      nMascota: 'LUA',
      veterinario: 'Dr. Carlos',
      fechaCita: '2024-10-10',
      estado: 'Pendiente'
    },
    {
      dni: '87654321',
      dueno: 'JUAN',
      nMascota: 'MAX',
      veterinario: 'Dr. Gomez',
      fechaCita: '2024-10-12',
      estado: 'Completado'
    }
  ]);

  const filteredAppointments = appointments.filter(appointment =>
    appointment.nMascota.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.dueno.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.dni.includes(searchTerm)
  );

  return (
    <div className="filter-atencion-page">
      <header>
        <h1>Gestión de Atenciones</h1>
        <button className="new-button">Registrar Nueva Atención</button>
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
                  <button className="view-button">👁️</button>
                  <button className="edit-button">✏️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
