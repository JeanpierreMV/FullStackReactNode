import React, { useState } from 'react';

const GenerarBoleta = () => {
  const [showModal, setShowModal] = useState(false);
  const [dni, setDni] = useState('');
  const [mascota, setMascota] = useState('');
  const [services, setServices] = useState([]);
  const [total, setTotal] = useState(0);

  const handleGenerateBoleta = () => setShowModal(true);

  const handleSolicitar = () => {
    // Simulación de llamada a una API para obtener servicios según DNI y Mascota
    const fetchedServices = [
      { nombre: 'Corte', descripcion: 'Corte de Pelo y uñas', costo: 15 }
    ];
    const totalCost = fetchedServices.reduce((acc, item) => acc + item.costo, 0);

    setServices(fetchedServices);
    setTotal(totalCost);
    setShowModal(false);
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
              </tr>
            </thead>
            <tbody>
              {services.map((service, index) => (
                <tr key={index}>
                  <td>{service.nombre}</td>
                  <td>{service.descripcion}</td>
                  <td>{service.costo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <p>Total a Pagar: S/{total}.00</p>
      </div>

      {/* Modal para ingresar DNI y Mascota */}
      {showModal && (
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
          <button onClick={() => setShowModal(false)}>Cerrar</button>
          <button onClick={handleSolicitar}>Solicitar</button>
        </div>
      )}
    </div>
  );
};

export default GenerarBoleta;
