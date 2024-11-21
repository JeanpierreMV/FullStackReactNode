import React, { useState } from 'react';
import '../styles/RegistrarServicio.css';
import Sidebar from '../components/SideBar'; // Importamos el Sidebar
import Navbar from '../components/Navbar'; // Importamos el Navbar

const RegistrarServicio = () => {
  const [formData, setFormData] = useState({
    nombreServicio: '',
    costo: '',
    especie: '',
    descripcion: '',
    tamano: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del formulario:', formData);
    alert('Formulario enviado');
  };

  const handleCancel = () => {
    setFormData({
      nombreServicio: '',
      costo: '',
      especie: '',
      descripcion: '',
      tamano: '',
    });
  };

  return (
    <div className="container min-h-screen bg-gray-100 p-6 flex">
      <Sidebar /> {/* Sidebar a la izquierda */}
      
      <div className="mainContent bg-white shadow-lg rounded-lg p-6 flex-1">
        <Navbar /> {/* Navbar arriba */}

        <div className="form-container mt-6">
          <h2 className="form-title">Registrar Servicio</h2>
          <form onSubmit={handleSubmit} className="form-grid">
            {/* Primera columna */}
            <div className="form-group">
              <label htmlFor="nombreServicio">Nombre de servicio</label>
              <input
                type="text"
                id="nombreServicio"
                name="nombreServicio"
                value={formData.nombreServicio}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="costo">Costo</label>
              <input
                type="number"
                id="costo"
                name="costo"
                value={formData.costo}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="especie">Especie</label>
              <select
                id="especie"
                name="especie"
                value={formData.especie}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona una especie</option>
                <option value="Perro">Perro</option>
                <option value="Gato">Gato</option>
              </select>
            </div>

            {/* Segunda columna */}
            <div className="form-group">
              <label htmlFor="descripcion">Descripción</label>
              <input
                type="text"
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="tamano">Tamaño</label>
              <select
                id="tamano"
                name="tamano"
                value={formData.tamano}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona un tamaño</option>
                <option value="Pequeño">Pequeño</option>
                <option value="Mediano">Mediano</option>
                <option value="Grande">Grande</option>
              </select>
            </div>

            {/* Botones de acción */}
            <div className="form-actions">
              <button type="submit" className="btn btn-guardar">
                Guardar
              </button>
              <button type="button" className="btn btn-cancelar" onClick={handleCancel}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrarServicio;