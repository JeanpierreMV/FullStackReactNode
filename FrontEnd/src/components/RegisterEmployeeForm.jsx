// components/RegisterEmployeeForm.jsx

import React from 'react';

const roles = [
  { id: 1, nombre: 'Veterinario' },
  { id: 2, nombre: 'Administrador' },
  { id: 3, nombre: 'Laboratorista' }
];

const RegisterEmployeeForm = ({ formData, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Contraseña:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Rol:</label>
        <select
          name="rol"
          value={formData.rol}
          onChange={handleChange}
        >
          <option value="">Seleccionar Rol</option>
          {roles.map(role => (
            <option key={role.id} value={role.id}>
              {role.nombre}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Registrar</button>
    </form>
  );
};

export default RegisterEmployeeForm;
