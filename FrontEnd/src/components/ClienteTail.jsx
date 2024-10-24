import React, { useState } from 'react';

const FormularioRegistro = ({ onClose, clientes, onGuardarCliente }) => {
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

  const validarFormulario = () => {
    const nuevosErrores = {};

    // Verificar si el cliente ya está registrado (por DNI)
    const clienteExistente = clientes.find((cliente) => cliente.dni === formData.dni);
    if (clienteExistente) {
      nuevosErrores.dni = 'Este cliente ya está registrado.';
    }

    // Validar que el DNI tenga exactamente 8 dígitos numéricos
    if (!/^\d{8}$/.test(formData.dni)) {
      nuevosErrores.dni = 'El DNI debe tener exactamente 8 dígitos numéricos.';
    }

    // Validar que el correo sea obligatorio y tenga un formato válido
    if (!formData.email) {
      nuevosErrores.email = 'El correo electrónico es obligatorio.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      nuevosErrores.email = 'El correo electrónico no es válido.';
    }

    setErrors(nuevosErrores);

    // Si no hay errores, devuelve true
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
      // Si no hay errores, guardamos el cliente
      onGuardarCliente(formData);
      onClose(); // Cerramos el formulario al guardar
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow mt-4">
      <h2 className="text-xl font-bold mb-4">Registrar Cliente</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              name="nombre"
              placeholder="Ingresar Nombre"
              className="border p-2 rounded w-full"
              value={formData.nombre}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="apellido"
              placeholder="Ingresar Apellido"
              className="border p-2 rounded w-full"
              value={formData.apellido}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="dni"
              placeholder="Ingresar DNI"
              className="border p-2 rounded w-full"
              value={formData.dni}
              onChange={handleChange}
            />
            {errors.dni && <p className="text-red-500 text-sm">{errors.dni}</p>}
          </div>
          <div>
            <input
              type="text"
              name="celular"
              placeholder="Ingresar Celular"
              className="border p-2 rounded w-full"
              value={formData.celular}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Ingresar Email"
              className="border p-2 rounded w-full"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div>
            <input
              type="text"
              name="direccion"
              placeholder="Ingresar Dirección"
              className="border p-2 rounded w-full"
              value={formData.direccion}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="distrito"
              placeholder="Ingresar Distrito"
              className="border p-2 rounded w-full"
              value={formData.distrito}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="password"
              name="contraseña"
              placeholder="Ingresar Contraseña"
              className="border p-2 rounded w-full"
              value={formData.contraseña}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            type="button"
            className="bg-red-500 text-white px-4 py-2 rounded mr-2"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioRegistro;
