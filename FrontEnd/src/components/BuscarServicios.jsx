import React from 'react';
import PropTypes from 'prop-types';
import '../styles/BuscarServicios.css';

const BuscarServicios = ({ formData, handleChange, handleSearch }) => {
  return (
    <div className="buscar-container">
      <h2 className="title">CONSULTAR SERVICIOS BÁSICOS</h2>

      <form className="form" onSubmit={handleSearch}>
        <div className="form-group">
          <label>Nombre de servicios:</label>
          <input
            type="text"
            name="servicio"
            value={formData.servicio}
            onChange={handleChange}
            placeholder="Buscar servicios"
            className="input-invisible"
          />
        </div>

        <div className="form-group">
          <label>Tamaño de la mascota:</label>
          <select name="tamano" value={formData.tamano} onChange={handleChange} className="input-select">
            <option value="" disabled>Seleccionar</option>
            <option value="pequeno">Pequeño</option>
            <option value="mediano">Mediano</option>
            <option value="grande">Grande</option>
          </select>
        </div>

        <div className="form-group">
          <label>Tipo de mascota:</label>
          <select name="tipo" value={formData.tipo} onChange={handleChange} className="input-select">
            <option value="" disabled>Seleccionar</option>
            <option value="perro">Perro</option>
            <option value="gato">Gato</option>
          </select>
        </div>

        <button type="submit" className="buscar-button">BUSCAR</button>
      </form>

      <div className="results">
        <h3 className="subtitle">Resultado de búsqueda</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Nombre de Servicios</th>
              <th>Descripción</th>
              <th>Costo</th>
              <th>Consideraciones</th>
            </tr>
          </thead>
          <tbody>
            {/* Aquí se renderizarán los resultados de la búsqueda cuando lleguen desde la API */}
          </tbody>
        </table>

        <button className="siguiente-button">Siguiente</button>
      </div>
    </div>
  );
};

// Definición de los PropTypes
BuscarServicios.propTypes = {
  formData: PropTypes.shape({
    servicio: PropTypes.string.isRequired,
    tamano: PropTypes.string.isRequired,
    tipo: PropTypes.string.isRequired
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired
};

export default BuscarServicios;
