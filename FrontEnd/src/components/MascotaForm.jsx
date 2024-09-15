import React from 'react';

const MascotaForm = ({ formData, handleChange, handleSubmit, tipoMascotas, clientes }) => {
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
        <label>Género</label>
        <input
          type="text"
          name="genero"
          value={formData.genero}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Raza</label>
        <input
          type="text"
          name="raza"
          value={formData.raza}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Edad</label>
        <input
          type="number"
          name="edad"
          value={formData.edad}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Peso</label>
        <input
          type="number"
          step="0.1"
          name="peso"
          value={formData.peso}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Tipo de Mascota</label>
        <select name="tipoMascotaId" value={formData.tipoMascotaId} onChange={handleChange} required>
          <option value="">Seleccione una especie</option>
          {tipoMascotas.map((tipo) => (
            <option key={tipo.id} value={tipo.id}>
              {tipo.nombre}
            </option>
          ))}
        </select>

        <select name="clienteId" value={formData.clienteId} onChange={handleChange} required>
          <option value="">Seleccione un cliente</option>
          {clientes.map((cliente) => (
            <option key={cliente.id} value={cliente.id}>
              {cliente.nombre} {cliente.apellido}
            </option>
          ))}
        </select>

      </div>
      <button type="submit">Registrar Mascota</button>
    </form>
  );
};

export default MascotaForm;
