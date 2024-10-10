import React, { useState } from 'react';
import '../styles/ConsultarCliente.css';

export default function ConsultarCliente() {
  const [searchTerm, setSearchTerm] = useState('');
  const [appointments] = useState([
    {
      dni: '41890829',
      nombre: 'ERIKA',
      correo: 'mila@hotmail.com',
      direccion: 'Av. Los Pinos 116',
      distrito: 'Los Olivos',
      celular: '958658969'
    },
  
  ]);

  const filteredAppointments = appointments.filter(appointment =>
    appointment.dni.includes(searchTerm)
  );

  return (
    <div className="filter-atencion-page">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>CLIENTES</h1>
       
       
      </header>
      
      <div className="search-container">
        <label htmlFor="search">Buscar Clientes</label>
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
              <th>Nombre</th>
              <th>Correo</th>
              <th>Dirección</th>
              <th>Distrito</th>
              <th>Celular</th>
             
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((appointment, index) => (
              <tr key={index}>
                <td>{appointment.dni}</td>
                <td>{appointment.nombre}</td>
                <td>{appointment.correo}</td>
                <td>{appointment.direccion}</td>
                <td>{appointment.distrito}</td>
                <td>{appointment.celular}</td>
             
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
