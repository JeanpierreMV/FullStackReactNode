// components/DeleteClient.js
import React, { useState } from 'react';

const DeleteClient = ({ cliente, onClientDeleted }) => {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    setShowModal(true);
  };

  const confirmDelete = () => {
    onClientDeleted(cliente.codigo);
    setShowModal(false);
    alert('Cliente eliminado correctamente.');
  };

  const cancelDelete = () => {
    setShowModal(false);
  };

  return (
    <>
      <button onClick={handleDelete}>Eliminar</button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>¿Estás seguro que deseas eliminar al cliente {cliente.nombres}?</h2>
            <button onClick={confirmDelete}>Sí, eliminar</button>
            <button onClick={cancelDelete}>No, cancelar</button>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteClient;
