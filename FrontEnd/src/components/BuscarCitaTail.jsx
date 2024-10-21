import React, { useState } from 'react';

const AppointmentList = () => {
  // Simulamos la lista de atenciones
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      dni: '41731930',
      owner: 'ERIKA',
      petName: 'LUA',
      vet: 'WILLIAM',
      date: '2024-06-20 16:30:00',
      status: 'Pendiente de Cita',
    },
  ]);

  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState('');

  // Función para manejar la edición del estado
  const handleEditStatus = (id) => {
    const appointment = appointments.find((appt) => appt.id === id);
    setEditingId(id);
    setStatus(appointment.status);
  };

  // Función para guardar el nuevo estado
  const handleSaveStatus = (id) => {
    setAppointments(
      appointments.map((appt) =>
        appt.id === id ? { ...appt, status } : appt
      )
    );
    setEditingId(null);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Tus Atenciones</h2>
      <input
        type="text"
        placeholder="Buscar Citas"
        className="mb-4 p-2 border border-gray-300 rounded-md w-full"
      />

      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">DNI</th>
            <th className="px-4 py-2 text-left">Dueño</th>
            <th className="px-4 py-2 text-left">Nombre Mascota</th>
            <th className="px-4 py-2 text-left">Veterinario</th>
            <th className="px-4 py-2 text-left">Fecha Cita</th>
            <th className="px-4 py-2 text-left">Estado</th>
            <th className="px-4 py-2 text-left">Opciones</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appt) => (
            <tr key={appt.id} className="border-t">
              <td className="px-4 py-2">{appt.dni}</td>
              <td className="px-4 py-2">{appt.owner}</td>
              <td className="px-4 py-2">{appt.petName}</td>
              <td className="px-4 py-2">{appt.vet}</td>
              <td className="px-4 py-2">{appt.date}</td>
              <td className="px-4 py-2">
                {editingId === appt.id ? (
                  <select
                    className="p-2 border border-gray-300 rounded-md"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="Pendiente de Cita">Pendiente</option>
                    <option value="Proceso">Proceso</option>
                    <option value="Terminado">Terminado</option>
                  </select>
                ) : (
                  appt.status
                )}
              </td>
              <td className="px-4 py-2">
                {editingId === appt.id ? (
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-md"
                    onClick={() => handleSaveStatus(appt.id)}
                  >
                    Guardar
                  </button>
                ) : (
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    onClick={() => handleEditStatus(appt.id)}
                  >
                    Editar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentList;
