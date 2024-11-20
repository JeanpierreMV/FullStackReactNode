import React, { useState } from 'react';
import '../styles/ClientServiceList.css'; // Importamos el archivo CSS

const ClientServiceList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedType, setSelectedType] = useState('');

  // Datos estáticos de servicios de ejemplo
  const services = [
    { name: 'Análisis de Sangre', description: 'Examen completo de sangre', cost: 150, size: 'Grande', type: 'Perro' },
    { name: 'Corte de Uñas', description: 'Corte y cuidado de uñas', cost: 50, size: 'Mediano', type: 'Gato' },
    { name: 'Consulta General', description: 'Revisión médica general', cost: 100, size: 'Pequeño', type: 'Perro' },
    { name: 'Vacunación', description: 'Vacuna contra rabia', cost: 80, size: 'Mediano', type: 'Gato' },
  ];

  // Filtrar servicios por búsqueda, tamaño y tipo
  const filteredServices = services.filter((service) => {
    return (
      (service.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedSize === '' || service.size === selectedSize) &&
      (selectedType === '' || service.type === selectedType)
    );
  });

  return (
    <div className="client-service-list-container">
      {/* Filtros */}
      <div className="filters-container">
        {/* Filtro por nombre de servicio */}
        <input
          type="text"
          placeholder="Buscar servicio..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        {/* Filtro por tamaño de mascota */}
        <select
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
        >
          <option value="">Filtrar por tamaño</option>
          <option value="Grande">Grande</option>
          <option value="Mediano">Mediano</option>
          <option value="Pequeño">Pequeño</option>
        </select>

        {/* Filtro por tipo de mascota */}
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="">Filtrar por tipo</option>
          <option value="Perro">Perro</option>
          <option value="Gato">Gato</option>
        </select>
      </div>

      {/* Tabla de servicios */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Costo</th>
              <th>Tamaño</th>
              <th>Tipo de Mascota</th>
            </tr>
          </thead>
          <tbody>
            {filteredServices.length > 0 ? (
              filteredServices.map((service, index) => (
                <tr key={index}>
                  <td>{service.name}</td>
                  <td>{service.description}</td>
                  <td>{service.cost}</td>
                  <td>{service.size}</td>
                  <td>{service.type}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-services">No se encontraron servicios.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientServiceList;
