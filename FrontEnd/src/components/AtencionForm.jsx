import React from 'react';

const AtencionForm = ({ formData, handleChange, handleSubmit, clientes, mascotas, veterinarios, servicios }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Cliente</label>
                <select name="clienteId" value={formData.clienteId} onChange={handleChange} required>
                    <option value="">Seleccionar Cliente</option>
                    {clientes.map(cliente => (
                        <option key={cliente.id} value={cliente.id}>{cliente.nombre} {cliente.apellido}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Mascota</label>
                <select name="mascotaId" value={formData.mascotaId} onChange={handleChange} required>
                    <option value="">Seleccionar Mascota</option>
                    {mascotas.map(mascota => (
                        <option key={mascota.id} value={mascota.id}>{mascota.nombre}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Veterinario</label>
                <select name="veterinarioId" value={formData.veterinarioId} onChange={handleChange} required>
                    <option value="">Seleccionar Veterinario</option>
                    {veterinarios.map(veterinario => (
                        <option key={veterinario.id} value={veterinario.id}>{veterinario.nombre}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Servicio</label>
                <select name="servicioId" value={formData.servicioId} onChange={handleChange} required>
                    <option value="">Seleccionar Servicio</option>
                    {servicios.map(servicio => (
                        <option key={servicio.id} value={servicio.id}>{servicio.nombre}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Fecha de Cita</label>
                <input
                    type="datetime-local"
                    name="fechaCita"
                    value={formData.fechaCita}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Consideraciones</label>
                <textarea
                    name="consideraciones"
                    value={formData.consideraciones}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Descripción</label>
                <textarea
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Registrar Atención</button>
        </form>
    );
};

export default AtencionForm;
