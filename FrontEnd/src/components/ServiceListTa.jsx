import React, { useState } from "react";
import Modal from "./ServiceFormT";

const ServiceList = () => {
  const [services, setServices] = useState([
    { id: 1, name: "Consulta", cost: 50, description: "Revisión general", size: "Grande", type: "Perro" },
    { id: 2, name: "Vacunación", cost: 30, description: "Vacuna anual", size: "Mediano", type: "Gato" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editService, setEditService] = useState(null);
  const [filters, setFilters] = useState({
    service: "",
    size: "",
    type: "",
  });

  const handleOpenModal = () => {
    setEditService(null);
    setIsModalOpen(true);
  };

  const handleEditService = (service) => {
    setEditService(service);
    setIsModalOpen(true);
  };

  const handleDeleteService = (id) => {
    setServices(services.filter(service => service.id !== id));
  };

  const handleSaveService = (serviceData) => {
    if (editService) {
      setServices(
        services.map(service => (service.id === editService.id ? serviceData : service))
      );
    } else {
      setServices([...services, { id: Date.now(), ...serviceData }]);
    }
    setIsModalOpen(false);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredServices = services.filter(service => {
    return (
      (filters.service ? service.name.toLowerCase().includes(filters.service.toLowerCase()) : true) &&
      (filters.size ? service.size === filters.size : true) &&
      (filters.type ? service.type === filters.type : true)
    );
  });

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Consultar Servicios</h2>

      {/* Filtros */}
      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          placeholder="Filtrar por servicio"
          name="service"
          value={filters.service}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        />
        <select
          name="size"
          value={filters.size}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        >
          <option value="">Tamaño</option>
          <option value="Grande">Grande</option>
          <option value="Mediano">Mediano</option>
          <option value="Pequeño">Pequeño</option>
        </select>
        <select
          name="type"
          value={filters.type}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        >
          <option value="">Tipo de Mascota</option>
          <option value="Perro">Perro</option>
          <option value="Gato">Gato</option>
        </select>
      </div>

      {/* Botón para abrir modal */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={handleOpenModal}
      >
        Nuevo Servicio
      </button>

      {/* Lista de servicios */}
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="border px-4 py-2">Servicio</th>
            <th className="border px-4 py-2">Descripción</th>
            <th className="border px-4 py-2">Tamaño Mascota</th>
            <th className="border px-4 py-2">Costo</th>
            <th className="border px-4 py-2">Opciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredServices.map(service => (
            <tr key={service.id}>
              <td className="border px-4 py-2">{service.name}</td>
              <td className="border px-4 py-2">{service.description}</td>
              <td className="border px-4 py-2">{service.size}</td>
              <td className="border px-4 py-2">{service.cost}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => handleEditService(service)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDeleteService(service.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <Modal
          service={editService}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveService}
        />
      )}
    </div>
  );
};

export default ServiceList;
