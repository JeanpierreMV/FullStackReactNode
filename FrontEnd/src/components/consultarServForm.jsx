import React, { useState } from 'react';

const ConsultarServForm = ({ onAddServicio, onGetServicios }) => {
  // Estados para agregar un nuevo servicio
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [costo, setCosto] = useState('');
  const [consideraciones, setConsideraciones] = useState('');

  // Estados para consultar servicios
  const [especie, setEspecie] = useState('');
  const [tamano, setTamano] = useState('');

  const handleAddServicio = (e) => {
    e.preventDefault();
    onAddServicio({ nombre, descripcion, costo, consideraciones });
  };

  const handleGetServicios = (e) => {
    e.preventDefault();
    onGetServicios({ especie, tamano });
  };

  return (
    <div>
      <h2>Agregar Servicio</h2>
      <form onSubmit={handleAddServicio}>
        <div>
          <label>Nombre:</label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </div>
        <div>
          <label>Descripción:</label>
          <input type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
        </div>
        <div>
          <label>Costo:</label>
          <input type="number" value={costo} onChange={(e) => setCosto(e.target.value)} />
        </div>
        <div>
          <label>Consideraciones:</label>
          <textarea value={consideraciones} onChange={(e) => setConsideraciones(e.target.value)}></textarea>
        </div>
        <button type="submit">Agregar Servicio</button>
      </form>

      <h2>Consultar Servicios</h2>
      <form onSubmit={handleGetServicios}>
        <div>
          <label>Especie:</label>
          <select value={especie} onChange={(e) => setEspecie(e.target.value)}>
            <option value="">Selecciona especie</option>
            <option value="perro">Perro</option>
            <option value="gato">Gato</option>
          </select>
        </div>
        <div>
          <label>Tamaño:</label>
          <select value={tamano} onChange={(e) => setTamano(e.target.value)}>
            <option value="">Selecciona tamaño</option>
            <option value="pequeño">Pequeño</option>
            <option value="mediano">Mediano</option>
            <option value="grande">Grande</option>
          </select>
        </div>
        <button type="submit">Consultar Servicios</button>
      </form>
    </div>
  );
};

export default ConsultarServForm;

