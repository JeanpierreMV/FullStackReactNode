import React, { useState } from "react";
import Modal from "./ServiceFormT";
import "../styles/ServiceList.css"; // Importamos el archivo CSS

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
    <div className="service-list">
      <h2 className="service-list__title">Consultar Servicios</h2>

      {/* Filtros */}
      <div className="service-list__filters">
        <input
          type="text"
          placeholder="Filtrar por servicio"
          name="service"
          value={filters.service}
          onChange={handleFilterChange}
          className="service-list__filter-input"
        />
        <select
          name="size"
          value={filters.size}
          onChange={handleFilterChange}
          className="service-list__filter-select"
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
          className="service-list__filter-select"
        >
          <option value="">Tipo de Mascota</option>
          <option value="Perro">Perro</option>
          <option value="Gato">Gato</option>
        </select>
      </div>

      {/* Botón para abrir modal */}
      <button
        className="service-list__new-service-btn"
        onClick={handleOpenModal}
      >
        Nuevo Servicio
      </button>

      {/* Lista de servicios */}
      <table className="service-list__table">
        <thead>
          <tr>
            <th className="service-list__table-header">Servicio</th>
            <th className="service-list__table-header">Descripción</th>
            <th className="service-list__table-header">Tamaño Mascota</th>
            <th className="service-list__table-header">Costo</th>
            <th className="service-list__table-header">Opciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredServices.map(service => (
            <tr key={service.id}>
              <td className="service-list__table-cell">{service.name}</td>
              <td className="service-list__table-cell">{service.description}</td>
              <td className="service-list__table-cell">{service.size}</td>
              <td className="service-list__table-cell">{service.cost}</td>
              <td className="service-list__table-cell">
                <button
                  className="service-list__edit-btn"
                  onClick={() => handleEditService(service)}
                >
                  Editar
                </button>
                <button
                  className="service-list__delete-btn"
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
