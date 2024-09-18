// hooks/useRegisterEmployee.jsx

import { useState } from 'react';
import { registrarEmpleado } from '../services/api';

const useRegisterEmployee = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    rol: ''
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registrarEmpleado(formData);
      alert('Empleado registrado con éxito');
    } catch (err) {
      setError(err.message);
    }
  };

  return { formData, handleChange, handleSubmit, error };
};

export default useRegisterEmployee;
