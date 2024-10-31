import React, { useState } from 'react';
import axios from 'axios';

const GenerarBoleta = () => {
  const [showModal, setShowModal] = useState(false);
  const [dni, setDni] = useState('');
  const [mascota, setMascota] = useState('');
  const [services, setServices] = useState([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState('');
  const [boletaGenerada, setBoletaGenerada] = useState(null);

  const handleGenerateBoleta = () => {
    setShowModal(true);
    setError('');
    setServices([]); // Limpiar servicios previos
    setTotal(0); // Reiniciar total
    setBoletaGenerada(null); // Limpiar boleta previa
  };

  const handleSolicitar = async () => {
    setError('');
    try {
      // Realizar llamada a la API para obtener servicios
      const response = await axios.post('/api/servicios/obtener', { dni, mascota });
      const fetchedServices = response.data;

      // Calcular el total
      const totalCost = fetchedServices.reduce((acc, item) => acc + item.costo * item.cantidad, 0);

      setServices(fetchedServices);
      setTotal(totalCost);
      setShowModal(false);
    } catch (err) {
      console.error('Error al solicitar servicios:', err);
      setError('Error al obtener servicios. Asegúrate de que el DNI y la mascota sean correctos.');
    }
  };

  const handleConfirmarBoleta = async () => {
    setError('');
    try {
      // Llamada a la API para generar la boleta
      const response = await axios.post('/api/boleta/generar', {
        clienteId: dni,
        servicios: services,
      });

      setBoletaGenerada(response.data);
    } catch (err) {
      console.error('Error al generar la boleta:', err);
      setError('Error al generar la boleta. Intente de nuevo.');
    }
  };

  return (
    <div>
      {/* Interfaz Principal de la Boleta */}
      <h2>Boleta de Pago</h2>
      <button onClick={handleGenerateBoleta}>Generar Boleta</button>

      <div>
        {services.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Servicio Información</th>
                <th>Descripción</th>
                <th>Costo</th>
                <th>Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, index) => (
                <tr key={index}>
                  <td>{service.nombre}</td>
                  <td>{service.descripcion}</td>
                  <td>S/{service.costo}</td>
                  <td>{service.cantidad}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <p>Total a Pagar: S/{total}.00</p>
        {services.length > 0 && (
          <button onClick={handleConfirmarBoleta} className="confirm-btn">
            Confirmar Boleta
          </button>
        )}
      </div>

      {/* Mostrar boleta generada */}
      {boletaGenerada && (
        <div>
          <h3>Boleta Generada</h3>
          <p>Código de Boleta: {boletaGenerada.codigo}</p>
          <p>Total: S/{boletaGenerada.total}</p>
        </div>
      )}

      {/* Modal para ingresar DNI y Mascota */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Generar Boletas de Pago</h3>
            <label>
              DNI:
              <input value={dni} onChange={(e) => setDni(e.target.value)} />
            </label>
            <label>
              Mascota:
              <input value={mascota} onChange={(e) => setMascota(e.target.value)} />
            </label>
            <button onClick={() => setShowModal(false)} className="close-btn">Cerrar</button>
            <button onClick={handleSolicitar} className="solicitar-btn">Solicitar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerarBoleta;
