import React, { useState } from 'react';

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
    <div className="w-full max-w-7xl mx-auto">
      <div className="mb-4 grid grid-cols-3 gap-4">
        {/* Filtro por nombre de servicio */}
        <input
          type="text"
          placeholder="Buscar servicio..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full"
        />
        
        {/* Filtro por tamaño de mascota */}
        <select
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full"
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
          className="p-2 border border-gray-300 rounded w-full"
        >
          <option value="">Filtrar por tipo</option>
          <option value="Perro">Perro</option>
          <option value="Gato">Gato</option>
        </select>
      </div>

      {/* Tabla de servicios */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-3 px-6 border-b text-left text-lg">Nombre</th>
              <th className="py-3 px-6 border-b text-left text-lg">Descripción</th>
              <th className="py-3 px-6 border-b text-left text-lg">Costo</th>
              <th className="py-3 px-6 border-b text-left text-lg">Tamaño</th>
              <th className="py-3 px-6 border-b text-left text-lg">Tipo de Mascota</th>
            </tr>
          </thead>
          <tbody>
            {filteredServices.length > 0 ? (
              filteredServices.map((service, index) => (
                <tr key={index}>
                  <td className="py-4 px-6 border-b text-lg">{service.name}</td>
                  <td className="py-4 px-6 border-b text-lg">{service.description}</td>
                  <td className="py-4 px-6 border-b text-lg">{service.cost}</td>
                  <td className="py-4 px-6 border-b text-lg">{service.size}</td>
                  <td className="py-4 px-6 border-b text-lg">{service.type}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-4 px-6 text-center text-lg">No se encontraron servicios.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientServiceList;
