import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { registrarMascota, obtenerTiposMascota, obtenerClientes } from '../services/api';
import '../styles/RegisterMascota.css';

const RegisterMascota = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    genero: '',
    edad: '',
    peso: '',
    raza: '',
    tipoMascotaId: '',
    codigo: ''
  });

  const [currentDate, setCurrentDate] = useState('');
  const [tipoMascotas, setTipoMascotas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [dniError, setDniError] = useState(''); 

  const location = useLocation();
  const dniFromLocation = location.state?.dni;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tipos = await obtenerTiposMascota();
        const clients = await obtenerClientes();
        setTipoMascotas(tipos);
        setClientes(clients);
        if (dniFromLocation) {
          setFormData((prevFormData) => ({ ...prevFormData, codigo: dniFromLocation }));
        }
      } catch (err) {
        setError('Error al cargar datos');
      }
    };
    fetchData();
  }, [dniFromLocation]);

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('es-ES'); // Formato DD/MM/YYYY
    setCurrentDate(formattedDate);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Verificar si el cliente existe
    const cliente = clientes.find((c) => c.dni === formData.codigo);
    if (!cliente) {
      setDniError('El DNI ingresado no corresponde a ningún cliente registrado.');
      return; // Evita el envío si el cliente no existe
    } else {
      setDniError('');
    }

    // Validar campos obligatorios
    if (!formData.nombre || !formData.genero || !formData.raza || !formData.tipoMascotaId || !formData.edad || !formData.peso) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    // Validar tipos de datos
    if (isNaN(formData.edad) || isNaN(formData.peso) || isNaN(formData.tipoMascotaId)) {
      setError('Edad, peso y tipo de mascota deben ser numéricos.');
      return; // Evita el envío si hay valores no numéricos
    }

    try {
      await registrarMascota(formData);
      setSuccess(true);
      setError('');
      setFormData({
        nombre: '',
        genero: '',
        edad: '',
        peso: '',
        raza: '',
        tipoMascotaId: '',
        codigo: dniFromLocation || '' // Limpiamos el campo de DNI si no viene de location
      });
    } catch (err) {
      setError('Error al registrar la mascota');
      setSuccess(false);
    }
  };

  return (
    <div className="dataContainer">
      <div className="formHeader">
        <div className="formHeaderGroup">
          <div className="formGroup">
            <label>DNI del Cliente</label>
            {dniFromLocation ? (
              <p>DNI del Cliente: {dniFromLocation}</p>
            ) : (
              <input
                type="text"
                name="codigo"
                value={formData.codigo}
                onChange={handleChange}
                className="input"
                placeholder="Ingresa el DNI del cliente"
              />
            )}
            {dniError && <p className="errorText">{dniError}</p>}
          </div>
          <div className="formGroup">
            <label>FECHA</label>
            <input type="text" value={currentDate} readOnly className="input" />
          </div>
        </div>
      </div>

      <h2 className="formTitle">Datos de la mascota:</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="formRow">
          <div className="formGroup">
            <label>Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div className="formGroup">
            <label>Género:</label>
            <input
              type="text"
              name="genero"
              value={formData.genero}
              onChange={handleChange}
              className="input"
            />
          </div>
        </div>

        <div className="formRow">
          <div className="formGroup">
            <label>Edad:</label>
            <input
              type="number"
              name="edad"
              value={formData.edad}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div className="formGroup">
            <label>Peso:</label>
            <input
              type="number"
              step="0.01"
              name="peso"
              value={formData.peso}
              onChange={handleChange}
              className="input"
            />
          </div>
        </div>

        <div className="formRow">
          <div className="formGroup">
            <label>Raza:</label>
            <input
              type="text"
              name="raza"
              value={formData.raza}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div className="formGroup">
            <label>Tipo de Mascota:</label>
            <select
              name="tipoMascotaId"
              value={formData.tipoMascotaId}
              onChange={handleChange}
              className="input"
            >
              <option value="">Seleccione un tipo</option>
              {tipoMascotas.map((tipo) => (
                <option key={tipo.id} value={tipo.id}>
                  {tipo.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button type="submit" className="submitButton">
          REGISTRAR MASCOTA
        </button>
      </form>

      {success && <p className="successText">Mascota registrada exitosamente</p>}
      {error && <p className="errorText">{error}</p>}
    </div>
  );
};

export default RegisterMascota;
