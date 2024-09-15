// frontend/src/components/TipoMascotaForm.jsx
import React from 'react';

const TipoMascotaForm = ({ formData, handleChange, handleSubmit }) => {
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
      <button type="submit">Registrar Tipo de Mascota</button>
    </form>
  );
};

export default TipoMascotaForm;
