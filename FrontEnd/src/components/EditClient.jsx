// components/EditClient.js
import React, { useState } from 'react';

const EditClient = ({ cliente, onClientUpdated }) => {
  const [form, setForm] = useState(cliente);
  const [isEditing, setIsEditing] = useState(false); // Controla si el formulario es visible

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!/^[0-9]{8}$/.test(form.dni)) {
      alert('El DNI debe tener 8 dígitos.');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      alert('El correo electrónico no es válido.');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onClientUpdated(form);
      setIsEditing(false); // Oculta el formulario después de editar
      alert('Cliente editado correctamente.');
    }
  };

  return (
    <>
      <button onClick={() => setIsEditing(true)}>Editar</button>

      {isEditing && (
        <div className="modal">
          <div className="modal-content">
            <h2>Editar Cliente</h2>
            <form onSubmit={handleSubmit}>
              <input
                name="nombres"
                value={form.nombres}
                onChange={handleChange}
                required
              />
              <input
                name="apellidos"
                value={form.apellidos}
                onChange={handleChange}
                required
              />
              <input
                name="dni"
                value={form.dni}
                onChange={handleChange}
                required
              />
              <input
                name="celular"
                value={form.celular}
                onChange={handleChange}
                required
              />
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <input
                name="direccion"
                value={form.direccion}
                onChange={handleChange}
                required
              />
              <input
                name="distrito"
                value={form.distrito}
                onChange={handleChange}
                required
              />
              <input
                name="contrasena"
                type="password"
                value={form.contrasena}
                onChange={handleChange}
                required
              />
              <select
                name="rol"
                value={form.rol}
                onChange={handleChange}
                required
              >
                <option value="admin">Admin</option>
                <option value="veterinario">Veterinario</option>
                <option value="cliente">Cliente</option>
              </select>
              <button type="submit">Guardar Cambios</button>
              <button type="button" onClick={() => setIsEditing(false)}>Cancelar</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditClient;
