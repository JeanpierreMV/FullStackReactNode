import React, { useEffect, useState } from 'react';
import '../styles/FilterMascota.css';
import { Link } from 'react-router-dom';
import { 
  listarMascota, 
  actualizarMascota, 
  eliminarMascota, 
  obtenerTiposMascota,
  obtenerTamañoMascota 
} from '../services/api';

export default function FilterMascota() {
  const [searchTerm, setSearchTerm] = useState('');
  const [pets, setPets] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  
  // Estados para los datos de referencia
  const [tipoMascotas, setTipoMascotas] = useState([]);
  const [tamanosMascota, setTamanosMascota] = useState([]);

  // Cargar datos iniciales
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mascotas, tipos, tamanos] = await Promise.all([
          listarMascota(),
          obtenerTiposMascota(),
          obtenerTamañoMascota()
        ]);
        setPets(mascotas);
        setTipoMascotas(tipos);
        setTamanosMascota(tamanos);
      } catch (error) {
        setError('Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredPets = pets.filter(pet =>
    pet.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pet.cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditClick = (pet) => {
    setSelectedPet({
      ...pet,
      tipoMascotaId: pet.especie.id,
      tamaño: pet.size.id
    });
    setShowEditModal(true);
  };

  const handleDeleteClick = (pet) => {
    setSelectedPet(pet);
    setShowDeleteModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const mascotaData = {
        id: selectedPet.id,
        codigo: selectedPet.cliente.codigo,
        nombre: selectedPet.nombre,
        genero: selectedPet.genero,
        raza: selectedPet.raza,
        tipoMascotaId: selectedPet.tipoMascotaId ? parseInt(selectedPet.tipoMascotaId) : undefined,
        edad: selectedPet.edad ? parseInt(selectedPet.edad) : undefined,
        peso: selectedPet.peso ? parseFloat(selectedPet.peso) : undefined,
        sizeId: selectedPet.tamaño ? parseInt(selectedPet.tamaño) : undefined,
      };

      await actualizarMascota(selectedPet.id, mascotaData);
      console.log(mascotaData);
      
      // Actualizar la lista de mascotas
      const updatedPets = await listarMascota();
      setPets(updatedPets);
      
      setSuccess('Mascota actualizada exitosamente');
      setShowEditModal(false);
      
      // Limpiar mensaje de éxito después de 3 segundos
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Error al actualizar la mascota');
    }
  };

  const handleDelete = async () => {
    try {
      await eliminarMascota(selectedPet.id);
      
      // Actualizar la lista de mascotas
      setPets(pets.filter(pet => pet.id !== selectedPet.id));
      
      setSuccess('Mascota eliminada exitosamente');
      setShowDeleteModal(false);
      
      // Limpiar mensaje de éxito después de 3 segundos
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Error al eliminar la mascota');
    }
  };

  return (
    <div className="pet-manager">
      <header>
        <h1>MASCOTAS</h1>
        <Link to="/registrar-mascota" style={{ textDecoration: 'none', color: 'inherit' }}>
          <button className="new-button">Registrar</button>
        </Link>
      </header>

      {success && <div className="success-message">{success}</div>}
      {error && <div className="error-message">{error}</div>}

      <div className="search-container">
        <label htmlFor="search">Buscar Mascota</label>
        <input
          type="text"
          id="search"
          placeholder="Buscar mascota"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="dataContainer" style={{ backgroundColor: '#fff' }}>
        {loading ? (
          <p>Cargando mascotas...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Dueño</th>
                <th>N.Mascota</th>
                <th>Sexo</th>
                <th>Edad</th>
                <th>Raza</th>
                <th>Peso</th>
                <th>Especie</th>
                <th>Tamaño</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredPets.map((pet) => (
                <tr key={pet.id}>
                  <td>{pet.cliente.nombre}</td>
                  <td>{pet.nombre}</td>
                  <td>{pet.genero}</td>
                  <td>{pet.edad}</td>
                  <td>{pet.raza}</td>
                  <td>{pet.peso}</td>
                  <td>{pet.especie.nombre}</td>
                  <td>{pet.size.nombre}</td>
                  <td>
                    <button className="edit-button" onClick={() => handleEditClick(pet)}>✏️</button>
                    <button className="delete-button" onClick={() => handleDeleteClick(pet)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal para Editar Mascota */}
      {showEditModal && selectedPet && (
        <div className="modal">
          <div className="modal-content">
            <h2>Editar Mascota</h2>
            <hr />
            <form onSubmit={handleUpdate}>
              <label htmlFor="nMascota">Nombre:</label>
              <input
                type="text"
                id="nMascota"
                name="nMascota"
                value={selectedPet.nombre}
                onChange={(e) => setSelectedPet({ ...selectedPet, nombre: e.target.value })}
              />

              <label htmlFor="sexo">Sexo:</label>
              <select
                id="sexo"
                name="sexo"
                value={selectedPet.genero}
                onChange={(e) => setSelectedPet({ ...selectedPet, genero: e.target.value })}
              >
                <option value="Macho">Macho</option>
                <option value="Hembra">Hembra</option>
              </select>

              <label htmlFor="edad">Edad:</label>
              <input
                type="number"
                id="edad"
                name="edad"
                value={selectedPet.edad}
                onChange={(e) => setSelectedPet({ ...selectedPet, edad: e.target.value })}
              />

              <label htmlFor="especie">Especie:</label>
              <select
                id="especie"
                name="especie"
                value={selectedPet.tipoMascotaId}
                onChange={(e) => setSelectedPet({ ...selectedPet, tipoMascotaId: e.target.value })}
              >
                <option value="">Seleccione un tipo</option>
                {tipoMascotas.map((tipo) => (
                  <option key={tipo.id} value={tipo.id}>
                    {tipo.nombre}
                  </option>
                ))}
              </select>

              <label htmlFor="peso">Peso:</label>
              <input
                type="number"
                id="peso"
                name="peso"
                value={selectedPet.peso}
                onChange={(e) => setSelectedPet({ ...selectedPet, peso: e.target.value })}
                step="0.1"
              />

              <label htmlFor="raza">Raza:</label>
              <input
                type="text"
                id="raza"
                name="raza"
                value={selectedPet.raza}
                onChange={(e) => setSelectedPet({ ...selectedPet, raza: e.target.value })}
              />

              <label htmlFor="tamano">Tamaño:</label>
              <select
                id="tamano"
                name="tamano"
                value={selectedPet.tamaño}
                onChange={(e) => setSelectedPet({ ...selectedPet, tamaño: e.target.value })}
                style={{ marginBottom: '20px' }}
              >
                <option value="">Seleccione un tamaño</option>
                {tamanosMascota.map((tamano) => (
                  <option key={tamano.id} value={tamano.id}>
                    {tamano.nombre}
                  </option>
                ))}
              </select>

              <div className="modal-buttons">
                <button type="button" onClick={() => setShowEditModal(false)}>Cerrar</button>
                <button className="update-button" type="submit" style={{ marginLeft: '10px' }}>
                  Actualizar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal para Confirmar Eliminación */}
      {showDeleteModal && selectedPet && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirmar Eliminación</h2>
            <hr />
            <p style={{ color: 'black' }}>
              ¿Estás seguro de que deseas eliminar la mascota "{selectedPet.nombre}"?
            </p>
            <hr />
            <div className="modal-buttons">
              <button onClick={() => setShowDeleteModal(false)}>Cancelar</button>
              <button 
                className="delete-confirm-button" 
                style={{ marginLeft: '10px' }}
                onClick={handleDelete}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}