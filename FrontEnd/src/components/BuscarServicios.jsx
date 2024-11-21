import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { consultarServicio, buscarServicioPorNombre } from '../services/api'; 
import '../styles/BuscarServicios.css';

const BuscarServicios = ({ formData, handleChange }) => {
  const [resultados, setResultados] = useState([]);

  // Función para manejar la búsqueda
  const handleSearch = async (e) => {
    e.preventDefault();

    const { servicio, tamano, especie } = formData; 

    try {
      let data;

      // Si se proporciona un nombre, busca por nombre
      if (servicio) {
        data = await buscarServicioPorNombre(servicio, tamano, especie);
      } else {
        // Si no hay nombre, realiza la búsqueda filtrada por tamaño y especie
        data = await consultarServicio(tamano, especie);
      }

      setResultados(data);
    } catch (error) {
      console.error('Error al buscar servicios:', error);
      setResultados([]);
    }
  };

  return (
    <div className="buscar-container">
      <h2 className="title-service">CONSULTAR SERVICIOS BÁSICOS</h2>

      <form className="form-service" onSubmit={handleSearch}>
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
            <option value="pequeño">Pequeño</option>
            <option value="mediano">Mediano</option>
            <option value="grande">Grande</option>
          </select>
        </div>

        <div className="form-group">
          <label>Tipo de mascota:</label>
          <select name="especie" value={formData.especie} onChange={handleChange} className="input-select">
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
            {resultados.length > 0 ? (
              resultados.map((servicio, index) => (
                <tr key={index}>
                  <td>{servicio.nombre}</td>
                  <td>{servicio.descripcion}</td>             
                  <td>{Math.ceil(servicio.costo)}</td>
                  <td>{servicio.consideraciones}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No se encontraron resultados</td>
              </tr>
            )}
          </tbody>
        </table>

        <button className="siguiente-button">Registrar Nuevo Servicio</button>
      </div>
    </div>
  );
};

// Definición de los PropTypes
BuscarServicios.propTypes = {
  formData: PropTypes.shape({
    servicio: PropTypes.string.isRequired,
    tamano: PropTypes.string.isRequired,
    especie: PropTypes.string.isRequired
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default BuscarServicios;
