// pages/RegisterEmployee.jsx

import React from 'react';
import RegisterEmployeeForm from '../components/RegisterEmployeeForm';
import useRegisterEmployee from '../hooks/useRegisterEmployee';

const RegisterEmployee = () => {
  const { formData, handleChange, handleSubmit, error } = useRegisterEmployee();

  return (
    <div>
      <h1>Registrar Empleado</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <RegisterEmployeeForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default RegisterEmployee;
