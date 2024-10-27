
import React, { useEffect, useState } from 'react';
import '../styles/ConsultarCliente.css';
import { Link } from 'react-router-dom';
import { listaClientes } from '../services/api';

export default function ConsultarCliente() {
  const [searchTerm, setSearchTerm] = useState('');
  const [clientes, setClientes] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await listaClientes(); // Llama a la API
        setClientes(response); // Asigna la respuesta al estado de clientes
      } catch (error) {
        setError('Error al cargar los clientes');
      } finally {
        setLoading(false); // Cambia el estado de carga
      }
    };

    fetchClientes(); 
  }, []);

  const filteredClientes = clientes.filter(cliente =>
    cliente.dni.includes(searchTerm)
  );

  return (
    <div className="consultar-cliente-page">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>CLIENTES</h1>
        <Link to="/registrar-cliente" style={{ textDecoration: 'none', color: 'inherit' }}>
          <button className="new-button" style={{ marginRight: '20px' }}>
            Registrar Nuevo Cliente
          </button>
        </Link>
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
        {loading ? ( // Muestra un mensaje de carga
          <p>Cargando clientes...</p>
        ) : error ? ( // Muestra un mensaje de error
          <p>{error}</p>
        ) : (
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
              {filteredClientes.map((cliente, index) => (
                <tr key={index}>
                  <td>{cliente.dni}</td>
                  <td>{cliente.nombre}</td>
                  <td>{cliente.email}</td>
                  <td>{cliente.direccion}</td>
                  <td>{cliente.distrito}</td>
                  <td>{cliente.celular}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
