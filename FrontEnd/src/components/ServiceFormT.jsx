import React, { useState, useEffect } from "react";

const Modal = ({ service, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    cost: "",
    description: "",
    size: "Grande",
    type: "Perro",
  });

  useEffect(() => {
    if (service) {
      setFormData(service);
    }
  }, [service]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">{service ? "Editar Servicio" : "Nuevo Servicio"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Nombre del servicio</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Costo</label>
            <input
              type="number"
              name="cost"
              value={formData.cost}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Descripción</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Tamaño</label>
            <select
              name="size"
              value={formData.size}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            >
              <option value="Grande">Grande</option>
              <option value="Mediano">Mediano</option>
              <option value="Pequeño">Pequeño</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Especie</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            >
              <option value="Perro">Perro</option>
              <option value="Gato">Gato</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded mr-2" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
