import PropTypes from 'prop-types';
import '../styles/RegisterClient.css'; // Asegúrate de que tienes un archivo CSS para estilos adicionales.

const ClienteForm = ({ formData, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="client-form">
      <div className="form-section">
        <div className="form-group">
          <label>Código</label>
          <input
            type="text"
            name="codigo"
            value={formData.codigo}
            onChange={handleChange}
            placeholder="DNI"
            required
          />
        </div>
        <div className="form-group">
          <label>Fecha</label>
          <input
            type="text"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            placeholder="DD/MM/YYYY"
            required
          />
        </div>
      </div>
      <div className="form-section">
        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Apellido</label>
          <input
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>DNI</label>
          <input
            type="text"
            name="dni"
            value={formData.dni}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Celular</label>
          <input
            type="text"
            name="celular"
            value={formData.celular}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Dirección</label>
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <button type="submit">Registrar Cliente</button>
    </form>
  );
};

// Definición de PropTypes
ClienteForm.propTypes = {
  formData: PropTypes.shape({
    codigo: PropTypes.string,
    fecha: PropTypes.string,
    nombre: PropTypes.string.isRequired,
    apellido: PropTypes.string.isRequired,
    dni: PropTypes.string.isRequired,
    celular: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    direccion: PropTypes.string.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default ClienteForm;
