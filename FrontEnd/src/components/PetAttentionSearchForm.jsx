import React from 'react';

const PetAttentionSearchForm = () => {
  return (
    <div className="search-form">
      <div className="form-group">
        <label htmlFor="petCode">Código de la mascota</label>
        <input type="text" id="petCode" />
      </div>

      <div className="form-group">
        <label htmlFor="petName">Nombre</label>
        <input type="text" id="petName" />
      </div>

      <div className="form-group">
        <label htmlFor="date">Fecha</label>
        <input type="date" id="date" />
      </div>
    </div>
  );
};

export default PetAttentionSearchForm;
