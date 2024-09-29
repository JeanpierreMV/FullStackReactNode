
import React from 'react';

const ClienteForm = ({ formData, handleChange, handleSubmit }) => {
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Apellido</label>
        <input
          type="text"
          name="apellido"
          value={formData.apellido}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>DNI</label>
        <input
          type="text"
          name="dni"
          value={formData.dni}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Celular</label>
        <input
          type="text"
          name="celular"
          value={formData.celular}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Dirección</label>
        <input
          type="text"
          name="direccion"
          value={formData.direccion}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Registrar Cliente</button>
    </form>
  );
};

export default ClienteForm;
