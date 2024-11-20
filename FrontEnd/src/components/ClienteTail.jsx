import React, { useState, useEffect } from 'react';
import '../styles/FormularioRegistro.css'; // Importa el archivo CSS

const FormularioRegistro = ({ cliente, onClose, clientes, onGuardarCliente }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    celular: '',
    email: '',
    direccion: '',
    distrito: '',
    contraseña: '',
  });

  const [errors, setErrors] = useState({});

  // Rellena el formulario con los datos del cliente si está editando
  useEffect(() => {
    if (cliente) {
      setFormData(cliente);
    }
  }, [cliente]);

  const validarFormulario = () => {
    const nuevosErrores = {};

    const clienteExistente = clientes.find((cliente) => cliente.dni === formData.dni);
    if (clienteExistente && clienteExistente.id !== formData.id) {
      nuevosErrores.dni = 'Este cliente ya está registrado.';
    }

    if (!/^\d{8}$/.test(formData.dni)) {
      nuevosErrores.dni = 'El DNI debe tener exactamente 8 dígitos numéricos.';
    }

    if (!formData.email) {
      nuevosErrores.email = 'El correo electrónico es obligatorio.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      nuevosErrores.email = 'El correo electrónico no es válido.';
    }

    setErrors(nuevosErrores);

    return Object.keys(nuevosErrores).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validarFormulario()) {
      onGuardarCliente(formData);
      onClose();
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">{cliente ? 'Editar Cliente' : 'Registrar Cliente'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div>
            <input
              type="text"
              name="nombre"
              placeholder="Ingresar Nombre"
              className="form-input"
              value={formData.nombre}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="apellido"
              placeholder="Ingresar Apellido"
              className="form-input"
              value={formData.apellido}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="dni"
              placeholder="Ingresar DNI"
              className="form-input"
              value={formData.dni}
              onChange={handleChange}
            />
            {errors.dni && <p className="error-text">{errors.dni}</p>}
          </div>
          <div>
            <input
              type="text"
              name="celular"
              placeholder="Ingresar Celular"
              className="form-input"
              value={formData.celular}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Ingresar Email"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>
          <div>
            <input
              type="text"
              name="direccion"
              placeholder="Ingresar Dirección"
              className="form-input"
              value={formData.direccion}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="distrito"
              placeholder="Ingresar Distrito"
              className="form-input"
              value={formData.distrito}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="password"
              name="contraseña"
              placeholder="Contraseña"
              className="form-input"
              value={formData.contraseña}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-buttons">
          <button type="submit" className="save-btn">Guardar Cliente</button>
          <button type="button" className="cancel-btn" onClick={onClose}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default FormularioRegistro;
