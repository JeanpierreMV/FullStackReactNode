import React, { useEffect, useState } from 'react';
import '../styles/ConsultarCliente.css';
import { Link } from 'react-router-dom';
import { listaClientes } from '../services/api';
import { FaEye, FaEdit } from 'react-icons/fa';

export default function ConsultarCliente() {
  const [searchTerm, setSearchTerm] = useState('');
  const [clientes, setClientes] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState(null);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await listaClientes();
        setClientes(response);
      } catch (error) {
        setError('Error al cargar los clientes');
      } finally {
        setLoading(false);
      }
    };

    fetchClientes(); 
  }, []);

  const filteredClientes = clientes.filter(cliente =>
    cliente.dni.includes(searchTerm)
  );

  const handleEditClick = (cliente) => {
    setSelectedCliente(cliente);
    setShowModal(true);
  };

  const handleOpenModal2 = (appointment) => {
    // Lógica para abrir otro modal o realizar otra acción
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCliente(null);
  };

  return (
    <div className="consultar-cliente-page">
      <header className="flex justify-between items-center mb-5">
        <h1>CLIENTES</h1>
        <Link to="/registrar-cliente" className="no-underline text-inherit">
          <button className="new-button mr-5">
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
        {loading ? (
          <p>Cargando clientes...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <table className="min-w-full border border-gray-300 mt-5">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">DNI</th>
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Correo</th>
                <th className="px-4 py-2">Dirección</th>
                <th className="px-4 py-2">Distrito</th>
                <th className="px-4 py-2">Celular</th>
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredClientes.map((cliente, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{cliente.dni}</td>
                  <td className="px-4 py-2">{cliente.nombre}</td>
                  <td className="px-4 py-2">{cliente.email}</td>
                  <td className="px-4 py-2">{cliente.direccion}</td>
                  <td className="px-4 py-2">{cliente.distrito}</td>
                  <td className="px-4 py-2">{cliente.celular}</td>
                  <td className="px-4 py-2">
                   {/* <button className="view-button" onClick={() => handleOpenModal2(cliente)}>👁️</button>*/}
                    <button className="edit-button" onClick={() => handleEditClick(cliente)}>✏️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && selectedCliente && (
        <EditClientModal cliente={selectedCliente} onClose={handleCloseModal} />
      )}
    </div>
  );
}

function EditClientModal({ cliente, onClose }) {
  const [formData, setFormData] = useState({
    nombre: cliente.nombre,
    apellido: cliente.apellido,
    dni: cliente.dni,
    direccion: cliente.direccion,
    celular: cliente.celular,
    distrito: cliente.distrito,
    email: cliente.email,
    contrasena: '',
    rol: cliente.rol || 'ADMIN',
 
    numeroMascotas: '1',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Aquí podrías hacer la llamada para guardar los cambios
    console.log('Datos guardados:', formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className='titulo-editar-cliente'>Editar Cliente</h2>
        <label>Nombre</label>
        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
        
        <label>Apellido</label>
        <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} />
        
        <label>DNI</label>
        <input type="text" name="dni" value={formData.dni} onChange={handleChange} />
        
        <label>Dirección</label>
        <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} />
        
        <label>Celular</label>
        <input type="text" name="celular" value={formData.celular} onChange={handleChange} />
        
        <label>Distrito</label>
        <input type="text" name="distrito" value={formData.distrito} onChange={handleChange} />
        
        <label>Correo Electrónico</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
        
        <label>Contraseña</label>
        <input type="password" name="contrasena" value={formData.contrasena} onChange={handleChange} />
        
        <label>Rol</label>
        <select className="linea" name="rol" value={formData.rol} onChange={handleChange}>
          <option value="ADMIN">ADMIN</option>
          <option value="USER">USER</option>
        </select>
        
              
        <label>Número de Mascotas</label>
        <select name="numeroMascotas" value={formData.numeroMascotas} onChange={handleChange}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
        
        <div className="modal-actions">
          <button onClick={onClose}>Cancelar</button>
          <button onClick={handleSave}>Guardar Cambios</button>
        </div>
      </div>
    </div>
  );
}
