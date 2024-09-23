import React, { useState, useEffect } from 'react';

const BoletaForm = ({ clientes, servicios, handleSubmit }) => {
  const [selectedCliente, setSelectedCliente] = useState('');
  const [selectedServicios, setSelectedServicios] = useState([]);
  
  const handleServicioChange = (servicioId, cantidad) => {
    setSelectedServicios((prev) => {
      const index = prev.findIndex(s => s.id === servicioId);
      if (index > -1) {
        return prev.map((s, i) => i === index ? { ...s, cantidad } : s);
      }
      return [...prev, { id: servicioId, cantidad, costo: servicios.find(s => s.id === servicioId).costo }];
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit({ clienteId: selectedCliente, servicios: selectedServicios });
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>Cliente</label>
        <select onChange={(e) => setSelectedCliente(e.target.value)} required>
          <option value="">Seleccione un cliente</option>
          {clientes.map(cliente => (
            <option key={cliente.id} value={cliente.id}>{cliente.nombre}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Servicios</label>
        {servicios.map(servicio => (
          <div key={servicio.id}>
            <input
              type="number"
              min="0"
              placeholder="Cantidad"
              onChange={(e) => handleServicioChange(servicio.id, parseInt(e.target.value))}
            />
            <span>{servicio.nombre} - ${servicio.costo}</span>
          </div>
        ))}
      </div>
      <button type="submit">Generar Boleta</button>
    </form>
  );
};

export default BoletaForm;
