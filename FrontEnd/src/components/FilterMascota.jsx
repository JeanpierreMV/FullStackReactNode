import React, { useState } from 'react';
import '.././styles/FilterMascota.css';


export default function FilterMascota() {
  const [searchTerm, setSearchTerm] = useState('')
  const [pets] = useState([
    {
      dueno: 'ERIKA',
      nMascota: 'LUA',
      genero: 'hembra',
      edad: 4,
      raza: 'poo',
      peso: 4,
      especie: 'Nombre de la especie no encontrado',
      tamano: 'Nombre del tamaño no encontrado'
    }
  ])

  const filteredPets = pets.filter(pet =>
    pet.nMascota.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pet.dueno.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="pet-manager">
      
      <header>
        <h1>MASCOTA</h1>
        <button className="new-button">Registrar</button>
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
      <table>
        <thead>
          <tr>
            <th>Dueño</th>
            <th>N.Mascota</th>
            <th>Genero</th>
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
                <button className="edit-button">✏️</button>
                <button className="delete-button">🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}