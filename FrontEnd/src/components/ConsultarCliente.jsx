import React, { useEffect, useState } from 'react';
import '../styles/ConsultarCliente.css';
import { Link } from 'react-router-dom';
import { listaClientes, obtenerMascotasPorDni, ActualizarCliente } from '../services/api';

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
        
        // Agregar la cantidad de mascotas para cada cliente
        const clientesConMascotas = await Promise.all(response.map(async (cliente) => {
          try {
            const mascotas = await obtenerMascotasPorDni(cliente.dni);
            return { ...cliente, cantidadMascotas: mascotas.length > 0 ? mascotas.length : "Aún no ha registrado mascotas" };
          } catch {
            return { ...cliente, cantidadMascotas: "Error al obtener mascotas" };
          }
        }));
        
        setClientes(clientesConMascotas);
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

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCliente(null);
  };

  const handleUpdateCliente = async (formData) => {
    try {
      
      await ActualizarCliente(selectedCliente.id, formData); 
      
      const updatedClientes = clientes.map((cliente) =>
        cliente.id === selectedCliente.id ? { ...cliente, ...formData } : cliente
      );
      setClientes(updatedClientes); 
      handleCloseModal(); 
    } catch (error) {
      console.error('Error al actualizar el cliente:', error);
      throw error; // Propagar el error al modal
    }
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
                <th className="px-4 py-2">Cantidad de Mascotas</th>
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredClientes.map((cliente, index) => (
                
                <tr key={cliente.id} className="border-t">
                  <td className="px-4 py-2">{cliente.dni}</td>
                  <td className="px-4 py-2">{cliente.nombre}</td>
                  <td className="px-4 py-2">{cliente.email}</td>
                  <td className="px-4 py-2">{cliente.direccion}</td>
                  <td className="px-4 py-2">{cliente.distrito}</td>
                  <td className="px-4 py-2">{cliente.celular}</td>
                  <td className="px-4 py-2">
                    {cliente.cantidadMascotas}
                  </td>
                  <td className="px-4 py-2">
                    <button className="edit-button" onClick={() => handleEditClick(cliente)}>✏️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && selectedCliente && (
        <EditClientModal cliente={selectedCliente} onClose={handleCloseModal} onSave={handleUpdateCliente} />
      )}
    </div>
  );
}


function EditClientModal({ cliente, onClose, onSave }) {
  const [formData, setFormData] = useState({
    nombre: cliente.nombre,
    apellido: cliente.apellido,
    dni: cliente.dni,
    direccion: cliente.direccion,
    celular: cliente.celular,
    distrito: cliente.distrito,
    email: cliente.email,
    contrasena: '',
    rol: cliente.rol,
    numeroMascotas: '1',
  });

  const [mascotas, setMascotas] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchMascotas = async () => {
      try {
        const response = await obtenerMascotasPorDni(cliente.dni);
        setMascotas(response);
      } catch (error) {
        console.error('Error al obtener mascotas:', error);
      }
    };

    fetchMascotas();
  }, [cliente.dni]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await onSave(formData);  // Solo llamar a onSave, no actualizar aquí
      // No cerrar el modal aquí, se cerrará en el padre
    } catch (error) {
      console.error('Error al actualizar el cliente:', error);
    } finally {
      setSaving(false);
    } 
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
          <select
            name="rol"
            value={formData.rol}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un rol</option>
            <option value="1">Veterinario</option> {/* Usa el ID del rol en lugar del nombre */}
            <option value="2">Laboratorista</option>
            <option value="3">Administrador</option>
            <option value="4">Cliente</option>
          </select>
          
        
        
              
        <label>Mascotas</label>
        <select name="numeroMascotas" value={formData.numeroMascotas} onChange={handleChange}>
          {mascotas.map((mascota, index) => (
            <option key={index} value={mascota.id}>{mascota.nombre}</option>
          ))}
        </select>

        <div className="modal-actions">
          <button onClick={onClose} disabled={saving}>
            Cancelar
          </button>
          <button onClick={handleSave} disabled={saving}>
            {saving ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </div>
      </div>
    </div>
  );
}
