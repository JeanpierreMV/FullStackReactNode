// components/RegisterClient.js
import React, { useState } from 'react';

const RegisterClient = ({ onClientAdded }) => {
  const [form, setForm] = useState({
    nombres: '',
    apellidos: '',
    dni: '',
    celular: '',
    email: '',
    direccion: '',
    distrito: '',
    contrasena: '',
    rol: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (!/^[0-9]{8}$/.test(form.dni)) {
      setError('El DNI debe tener 8 dígitos.');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError('El correo electrónico no es válido.');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Simular asignación de código único
      const nuevoCliente = { ...form, codigo: Date.now() };
      onClientAdded(nuevoCliente);
      alert('Cliente registrado correctamente.');
      setForm({
        nombres: '',
        apellidos: '',
        dni: '',
        celular: '',
        email: '',
        direccion: '',
        distrito: '',
        contrasena: '',
        rol: ''
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="nombres" value={form.nombres} onChange={handleChange} placeholder="Ingresar Nombre" required />
      <input name="apellidos" value={form.apellidos} onChange={handleChange} placeholder="Ingresar Apellido" required />
      <input name="dni" value={form.dni} onChange={handleChange} placeholder="Ingresar DNI" required />
      <input name="celular" value={form.celular} onChange={handleChange} placeholder="Ingresar Celular" required />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Ingresar Email" required />
      <input name="direccion" value={form.direccion} onChange={handleChange} placeholder="Ingresar Dirección" required />
      <input name="distrito" value={form.distrito} onChange={handleChange} placeholder="Ingresar Distrito" required />
      <input name="contrasena" type="password" value={form.contrasena} onChange={handleChange} placeholder="Ingresar Contraseña" required />
      <select name="rol" value={form.rol} onChange={handleChange} required>
        <option value="">Seleccionar Rol</option>
        <option value="admin">Admin</option>
        <option value="veterinario">Veterinario</option>
        <option value="cliente">Cliente</option>
      </select>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Guardar no </button>
    </form>
  );
};

export default RegisterClient;
