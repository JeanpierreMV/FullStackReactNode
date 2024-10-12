import React, { useState } from 'react';
import '../styles/FilterMascota.css';
import { Link } from 'react-router-dom';

export default function FilterMascota() {
  const [searchTerm, setSearchTerm] = useState('');
  const [pets] = useState([
    {
      dueno: 'ERIKA',
      nMascota: 'LUA',
      genero: 'hembra',
      edad: 4,
      raza: 'poo',
      peso: 4,
      especie: 'perro',
      tamano: 'pequeño'
    }
  ]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);

  const filteredPets = pets.filter(pet =>
    pet.nMascota.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pet.dueno.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditClick = (pet) => {
    setSelectedPet(pet);
    setShowEditModal(true);
  };

  const handleDeleteClick = (pet) => {
    setSelectedPet(pet);
    setShowDeleteModal(true);
  };

  return (
    <div className="pet-manager">
      <header>
        <h1>MASCOTA</h1>
        <Link to="/registrar-mascota" style={{ textDecoration: 'none', color: 'inherit' }}>
          <button className="new-button">Registrar</button>
        </Link>
      </header>
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
            {filteredPets.map((pet, index) => (
              <tr key={index}>
                <td>{pet.dueno}</td>
                <td>{pet.nMascota}</td>
                <td>{pet.genero}</td>
                <td>{pet.edad}</td>
                <td>{pet.raza}</td>
                <td>{pet.peso}</td>
                <td>{pet.especie}</td>
                <td>{pet.tamano}</td>
                <td>
                  <button className="edit-button" onClick={() => handleEditClick(pet)}>✏️</button>
                  <button className="delete-button" onClick={() => handleDeleteClick(pet)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal para Editar Mascota */}
      {showEditModal && selectedPet && (
  <div className="modal">
    <div className="modal-content">
      <h2>Editar Mascota</h2>
      <hr />
      <form>
        <label htmlFor="nMascota">Nombre:</label>
        <input
          type="text"
          id="nMascota"
          name="nMascota"
          value={selectedPet.nMascota}
          onChange={(e) => setSelectedPet({ ...selectedPet, nMascota: e.target.value })}
        />

        <label htmlFor="sexo">Sexo:</label>
        <select
          id="sexo"
          name="sexo"
          value={selectedPet.genero}
          onChange={(e) => setSelectedPet({ ...selectedPet, genero: e.target.value })}
        >
          <option value="macho">Macho</option>
          <option value="hembra">Hembra</option>
        </select>

        <label htmlFor="edad">Edad:</label>
        <input
          type="text"
          id="edad"
          name="edad"
          value={selectedPet.edad}
          onChange={(e) => setSelectedPet({ ...selectedPet, edad: e.target.value })}
        />

        <label htmlFor="especie">Especie:</label>
        <select
          id="especie"
          name="especie"
          value={selectedPet.especie}
          onChange={(e) => setSelectedPet({ ...selectedPet, especie: e.target.value })}
        >
          <option value="perro">Perro</option>
          <option value="gato">Gato</option>
        </select>

        <label htmlFor="peso">Peso:</label>
        <input
          type="text"
          id="peso"
          name="peso"
          value={selectedPet.peso}
          onChange={(e) => setSelectedPet({ ...selectedPet, peso: e.target.value })}
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
        <input
          type="text"
          id="tamano"
          name="tamano"
          value={selectedPet.tamano}
          onChange={(e) => setSelectedPet({ ...selectedPet, tamano: e.target.value })}
          style={{ marginBottom: '20px' }} // Espacio entre el último input y los botones
        />

        <div className="modal-buttons">
          <button type="button" onClick={() => setShowEditModal(false)}>Cerrar</button>
          <button className="update-button" type="submit" style={{ marginLeft: '10px'}}>Actualizar</button>
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
            <p style={{ color: 'black' }}>¿Estás seguro de que deseas eliminar esta mascota?</p>
            <hr />
            <div className="modal-buttons">
              <button onClick={() => setShowDeleteModal(false)}>Cancelar</button>
              <button className="delete-confirm-button" style={{ marginLeft: '10px'}}>Eliminar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
