import React, { useState } from 'react';

const BoletaForm = ({ clientes, servicios, handleSubmit }) => {
  const [selectedCliente, setSelectedCliente] = useState('');
  const [selectedServicios, setSelectedServicios] = useState([]);
  const [boletaNumero, setBoletaNumero] = useState('');
  const [fechaCreacion, setFechaCreacion] = useState('');
  const [fechaVencimiento, setFechaVencimiento] = useState('');

  const handleServicioChange = (servicioId, cantidad) => {
    setSelectedServicios((prev) => {
      const index = prev.findIndex(s => s.id === servicioId);
      if (index > -1) {
        return prev.map((s, i) => i === index ? { ...s, cantidad } : s);
      }
      return [...prev, { id: servicioId, cantidad, costo: servicios.find(s => s.id === servicioId).costo }];
    });
  };

  const calcularSubtotal = () => {
    return selectedServicios.reduce((total, servicio) => total + (servicio.costo * servicio.cantidad), 0);
  };

  const calcularIGV = (subtotal) => {
    return subtotal * 0.18;
  };

  const calcularTotal = (subtotal, igv) => {
    return subtotal + igv;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit({
      boletaNumero,
      clienteId: selectedCliente,
      servicios: selectedServicios,
      fechaCreacion,
      fechaVencimiento,
    });
  };

  const subtotal = calcularSubtotal();
  const igv = calcularIGV(subtotal);
  const total = calcularTotal(subtotal, igv);

  return (
    <form onSubmit={onSubmit} className="boleta-form">
      <div className="boleta-header">
        <div>
          <label>Boleta #</label>
          <input 
            type="text" 
            value={boletaNumero} 
            onChange={(e) => setBoletaNumero(e.target.value)} 
            required
          />
        </div>
        <div>
          <label>Fecha de creación</label>
          <input 
            type="date" 
            value={fechaCreacion} 
            onChange={(e) => setFechaCreacion(e.target.value)} 
            required
          />
        </div>
        <div>
          <label>Fecha de vencimiento</label>
          <input 
            type="date" 
            value={fechaVencimiento} 
            onChange={(e) => setFechaVencimiento(e.target.value)} 
            required
          />
        </div>
      </div>

      <div className="boleta-details">
        <label>Cliente</label>
        <select 
          onChange={(e) => setSelectedCliente(e.target.value)} 
          required
        >
          <option value="">Seleccione un cliente</option>
          {clientes.map(cliente => (
            <option key={cliente.id} value={cliente.id}>{cliente.nombre}</option>
          ))}
        </select>
      </div>

      <div className="boleta-items">
        <label>Servicios</label>
        <table>
          <thead>
            <tr>
              <th>ITEM</th>
              <th>DESCRIPCIÓN</th>
              <th>COSTO</th>
              <th>CANTIDAD</th>
              <th>TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {servicios.map((servicio, index) => (
              <tr key={servicio.id}>
                <td>{index + 1}</td>
                <td>{servicio.nombre}</td>
                <td>${servicio.costo}</td>
                <td>
                  <input
                    type="number"
                    min="0"
                    placeholder="Cantidad"
                    onChange={(e) => handleServicioChange(servicio.id, parseInt(e.target.value))}
                  />
                </td>
                <td>
                  ${(selectedServicios.find(s => s.id === servicio.id)?.cantidad || 0) * servicio.costo}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="boleta-totals">
        <p>Subtotal: ${subtotal.toFixed(2)}</p>
        <p>IGV: ${igv.toFixed(2)}</p>
        <p>Total: ${total.toFixed(2)}</p>
      </div>

      <button type="submit" className="pagar-btn">Pagar</button>
    </form>
  );
};

export default BoletaForm;
