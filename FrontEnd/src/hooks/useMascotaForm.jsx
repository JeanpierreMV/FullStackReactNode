import { useState } from 'react';

const useMascotaForm = (initialState) => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return {
    formData,
    handleChange,
  };
};

export default useMascotaForm;
