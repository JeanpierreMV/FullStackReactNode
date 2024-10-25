import PropTypes from 'prop-types';
import '../styles/RegisterClient.css'; // Asegúrate de que tienes un archivo CSS para estilos adicionales.

const distritosLima = [
  "Ancón", "Ate", "Barranco", "Breña", "Carabayllo", "Cercado de Lima",
  "Chaclacayo", "Chorrillos", "Cieneguilla", "Comas", "El Agustino", 
  "Independencia", "Jesús María", "La Molina", "La Victoria", "Lince",
  "Los Olivos", "Lurigancho", "Lurín", "Magdalena del Mar", "Miraflores", 
  "Pachacámac", "Pucusana", "Pueblo Libre", "Puente Piedra", "Punta Hermosa", 
  "Punta Negra", "Rímac", "San Bartolo", "San Borja", "San Isidro", 
  "San Juan de Lurigancho", "San Juan de Miraflores", "San Luis", "San Martín de Porres", 
  "San Miguel", "Santa Anita", "Santa María del Mar", "Santa Rosa", 
  "Santiago de Surco", "Surquillo", "Villa El Salvador", "Villa María del Triunfo"
];


const ClienteForm = ({ formData, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="client-form">
      <div className="form-section">
        <div className="form-group">
          <label>Nombres</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Apellidos</label>
          <input
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Ingresar DNI</label>
          <input
            type="text"
            name="dni"
            value={formData.dni}
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
          <label>Distrito</label>
          <select
    name="distrito"
    value={formData.distrito}
    onChange={handleChange}
    required
  >
    <option value="">Selecciona un distrito</option>
    {distritosLima.map((distrito, index) => (
      <option key={index} value={distrito}>
        {distrito}
      </option>
    ))}
  </select>
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
          <label>Contraseña</label>
          <input
            type="password"
            name="contraseña"
            value={formData.contraseña}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Rol</label>
          <select
            name="rol"
            value={formData.rol}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un rol</option>
            <option value="Administrador">Administrador</option>
            <option value="Veterinario">Veterinario</option>
            <option value="Laboratorista">Laboratorista</option>
            <option value="Cliente">Cliente</option>
          </select>
        </div>
      </div>
      <div className="button-section">
        <button type="submit">Guardar</button>
        <button type="submit">Cancelar</button>
      </div>
    </form>
  );
};

// Definición de PropTypes
ClienteForm.propTypes = {
  formData: PropTypes.shape({
    nombre: PropTypes.string.isRequired,
    apellido: PropTypes.string.isRequired,
    dni: PropTypes.string.isRequired,
    direccion: PropTypes.string.isRequired,
    celular: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    contraseña: PropTypes.string.isRequired,
    distrito: PropTypes.string.isRequired, // Actualizado como string por el combobox
    rol: PropTypes.string.isRequired,      // Actualizado como string por el combobox
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default ClienteForm;
