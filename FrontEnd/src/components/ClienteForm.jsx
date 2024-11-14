import PropTypes from 'prop-types';
import '../styles/RegisterClient.css';
import validator from 'validator';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Importar useNavigate

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
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();  // Inicializar navigate

  const validateInput = (name, value) => {
    let error = '';
    switch (name) {
      case "nombre":
      case "apellido":
        if (!value.trim()) {
          error = 'Este campo no puede estar vacío.';
        } else if (!validator.isAlpha(value, 'es-ES', { ignore: ' ' })) {
          error = 'Solo se permiten letras y espacios.';
        }
        break;
      case "dni":
        if (value.length > 0 && value.length < 8) {
          error = 'DNI debe tener 8 dígitos.';
        } else if (value.length === 8 && !validator.isNumeric(value)) {
          error = 'DNI debe ser un número de 8 dígitos.';
        }
        break;
      case "celular":
        if (value.length > 0 && value.length < 9) {
          error = 'Celular debe tener 9 dígitos.';
        } else if (value.length === 9 && !validator.isNumeric(value)) {
          error = 'Celular debe ser un número de 9 dígitos.';
        }
        break;
      case "email":
        if (value && !validator.isEmail(value)) {
          error = 'Formato de email no válido.';
        }
        break;
      case "direccion":
        if (value && validator.isEmpty(value)) {
          error = 'La dirección no puede estar vacía.';
        }
        break;
      default:
        break;
    }
    setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
    return error === '';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Filtrar la entrada para que solo se permitan letras y espacios en nombres y apellidos
    let filteredValue = value;
    if (name === "nombre" || name === "apellido") {
      filteredValue = value.replace(/[^a-zA-ZáéíóúñÁÉÍÓÚÑ ]/g, ''); // Solo letras y espacios
    } else if (name === "dni" || name === "celular") {
      filteredValue = value.replace(/[^0-9]/g, ''); // Solo números
    }

    // Actualizar el valor en el formulario
    handleChange({ target: { name, value: filteredValue } });

    // Validar el campo
    validateInput(name, filteredValue);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const isValid = Object.keys(formData).every(key => validateInput(key, formData[key]));
    if (isValid) {
      alert("Cliente Registrado Correctamente");  // Mostrar mensaje de confirmación
      handleSubmit(e);
    }
  };

  // Función para redirigir al cancelar
  const handleCancel = () => {
    navigate('/consultar-cliente');  // Redirigir a la ruta /consultar-cliente
  };

  return (
    <form onSubmit={handleSubmitForm} className="client-form">
      <div className="form-section">
        <div className="form-group">
          <label>Nombres</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
          />
          {errors.nombre && <span className="error">{errors.nombre}</span>}
        </div>
        <div className="form-group">
          <label>Apellidos</label>
          <input
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleInputChange}
          />
          {errors.apellido && <span className="error">{errors.apellido}</span>}
        </div>
        <div className="form-group">
          <label>Ingresar DNI</label>
          <input
            type="text"
            name="dni"
            value={formData.dni}
            onChange={handleInputChange}
            maxLength={8} // Limitar a 8 dígitos
            required
          />
          {errors.dni && <span className="error">{errors.dni}</span>}
        </div>
        <div className="form-group">
          <label>Dirección</label>
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleInputChange}
          />
          {errors.direccion && <span className="error">{errors.direccion}</span>}
        </div>
        <div className="form-group">
          <label>Celular</label>
          <input
            type="text"
            name="celular"
            value={formData.celular}
            onChange={handleInputChange}
            maxLength={9} // Limitar a 9 dígitos
            required
          />
          {errors.celular && <span className="error">{errors.celular}</span>}
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
            onChange={handleInputChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={formData.password}
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
            <option value="1">Veterinario</option> {/* Usa el ID del rol en lugar del nombre */}
            <option value="2">Laboratorista</option>
            <option value="3">Administrador</option>
            <option value="4">Cliente</option>
          </select>
        </div>
      </div>
      <div className="button-section">
        <button type="submit">Guardar</button>
        <button
          type="button"
          onClick={handleCancel}
          style={{ marginLeft: '10px' }}
        >
          Cancelar
        </button>
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
    password: PropTypes.string.isRequired,
    rol: PropTypes.string.isRequired,
    distrito: PropTypes.string.isRequired
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default ClienteForm;
