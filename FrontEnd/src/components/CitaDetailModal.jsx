// frontend/src/components/CitaDetailModal.js
import React from 'react';
import PropTypes from 'prop-types';
import '../styles/CitaDetailModal.css';

const CitaDetailModal = ({ cita, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h3>Detalle de la Cita</h3>
        <div className="modal-content">
          <h4>Información de la Cita</h4>
          <p><strong>Dueño:</strong> {cita.dueno}</p>
          <p><strong>Nombre Mascota:</strong> {cita.nombreMascota}</p>
          <p><strong>Edad:</strong> {cita.edad}</p>
          <p><strong>Especie:</strong> {cita.especie}</p>
          <p><strong>Sexo:</strong> {cita.sexo}</p>
          <p><strong>Raza:</strong> {cita.raza}</p>
          <p><strong>Peso:</strong> {cita.peso}</p>
          <p><strong>Servicio:</strong> {cita.servicio}</p>
          <p><strong>Descripción:</strong> {cita.descripcion}</p>

          <h4>Información Adicional</h4>
          <p>¿Requiere algún análisis? {cita.requiereAnalisis ? '✅ Sí' : '❌ No'}</p>
        </div>
        <button onClick={onClose} className="close-btn">Cerrar</button>
      </div>
    </div>
  );
};

// Definir PropTypes
CitaDetailModal.propTypes = {
  cita: PropTypes.shape({
    dueno: PropTypes.string.isRequired,
    nombreMascota: PropTypes.string.isRequired,
    edad: PropTypes.number.isRequired,
    especie: PropTypes.string.isRequired,
    sexo: PropTypes.string.isRequired,
    raza: PropTypes.string.isRequired,
    peso: PropTypes.number.isRequired,
    servicio: PropTypes.string.isRequired,
    descripcion: PropTypes.string.isRequired,
    requiereAnalisis: PropTypes.bool.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CitaDetailModal;
