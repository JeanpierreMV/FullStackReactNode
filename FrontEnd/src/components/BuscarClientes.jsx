import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ClienteDetalles from './ClienteDetalles';

const BuscarClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [error, setError] = useState(null);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [abierto, setAbierto] = useState(null); // Estado para manejar qué acordeón está abierto
  const estiloCliente = {
    cursor: 'pointer',
    padding: '10px',
    border: '1px solid #ccc',
    margin: '5px 0',
    transition: 'background-color 0.3s',
  };
  
  const estiloHover = {
    backgroundColor: '#f0f0f0',
  };



  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get('http://localhost:1234/Koalavet/clientes');
        setClientes(response.data);
      } catch (err) {
        setError('Error al obtener clientes');
      }
    };

    fetchClientes();
  }, []);

  const manejarSeleccionCliente = (clienteId) => {
    setAbierto(abierto === clienteId ? null : clienteId); // Alternar entre abierto y cerrado
  };

  return (
    <div>
      <h1>Buscar Clientes</h1>
      {error && <p>{error}</p>}
      {clientes.length > 0 ? (
        <div>
          {clientes.map(cliente => (
            <div key={cliente.id}>
              <div 
                onClick={() => manejarSeleccionCliente(cliente.id)} 
                style={estiloCliente}>
                {cliente.nombre} {cliente.apellido}
              </div>
              {abierto === cliente.id && <ClienteDetalles cliente={cliente} />}
            </div>
          ))}
        </div>
      ) : (
        <p>No hay clientes disponibles</p>
      )}
    </div>
  );
};

export default BuscarClientes;
