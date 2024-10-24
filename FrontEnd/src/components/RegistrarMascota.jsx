import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  registrarMascota,
  obtenerTiposMascota,
  obtenerTamañoMascota,
  obtenerClientes,
  obtenerClientePorCodigo
} from '../services/api';
import '../styles/RegisterMascota.css';

const RegisterMascota = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    genero: '',
    edad: '',
    peso: '',
    raza: '',
    tipoMascotaId: '',
    codigo: '',
    tamaño: '' // Cambiado para incluir tamaño
  });

  const [currentDate, setCurrentDate] = useState('');
  const [tipoMascotas, setTipoMascotas] = useState([]);
  const [tamanosMascota, setTamanosMascota] = useState([]); // Estado para tamaños
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
        const tamanos = await obtenerTamañoMascota(); // Obtiene tamaños de mascota
        const clients = await obtenerClientes();
        setTipoMascotas(tipos);
        setTamanosMascota(tamanos); // Guarda los tamaños obtenidos
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

  const handleCodigoChange = async (e) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, codigo: value }));
    if (value) {
      try {
        const cliente = await obtenerClientePorCodigo(value);
        setFormData((prevFormData) => ({
          ...prevFormData,
          nombre: cliente.nombre,
          genero: cliente.genero
        }));
        setDniError('');
      } catch (err) {
        setDniError('El DNI ingresado no corresponde a ningún cliente registrado.');
      }
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        nombre: '',
        genero: ''
      }));
      setDniError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar campos obligatorios
    if (!formData.nombre || !formData.genero || !formData.raza || !formData.tipoMascotaId || !formData.edad || !formData.peso || !formData.tamaño) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    // Validar tipos de datos
    if (isNaN(formData.edad) || isNaN(formData.peso) || isNaN(formData.tipoMascotaId)) {
      setError('Edad, peso y tipo de mascota deben ser numéricos.');
      return; 
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
        codigo: dniFromLocation || '', // Limpiamos el campo de DNI si no viene de location
        tamaño: '' 
      });
    } catch (err) {
      setError('Error al registrar la mascota');
      setSuccess(false);
    }
  };

  return (
    <div className="dataContainer">
      <form onSubmit={handleSubmit} className="form">
        <h1 className="headerTitle">REGISTRAR MASCOTA</h1>
        <div className="formHeader">
          <div className="formHeaderGroup">
            <div className="formGroup">
              <label className="label"></label>
              {dniFromLocation ? (
                <p>DNI del Cliente: {dniFromLocation}</p>
              ) : (
                <input
                  type="text"
                  name="codigo"
                  value={formData.codigo}
                  onChange={handleCodigoChange}
                  className="input"
                  placeholder="Ingresa el DNI del cliente"
                />
              )}
              {dniError && <p className="errorText">{dniError}</p>}
            </div>
          </div>
        </div>
        <div className="formRow">
          <div className="formGroup">
            <label className="label">Dueño</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="input"
              disabled // Deshabilitado para que no se pueda editar
            />
          </div>
          <div className="formGroup">
            <label className="label">Sexo</label>
            <select
              name="genero"
              value={formData.genero}
              onChange={handleChange}
              className="input"
            >
              <option value="">Seleccione el sexo</option>
              <option value="Macho">Macho</option>
              <option value="Hembra">Hembra</option>
            </select>
          </div>
        </div>

        <div className="formRow">
          <div className="formGroup">
            <label className="label">Edad</label>
            <input
              type="text"
              name="edad"
              value={formData.edad}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div className="formGroup">
            <label className="label">Elegir Especie:</label>
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

        <div className="formRow">
          <div className="formGroup">
            <label className="label">Peso</label>
            <input
              type="text"
              name="peso"
              value={formData.peso}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div className="formGroup">
            <label className="label">Raza</label>
            <input
              type="text"
              name="raza"
              value={formData.raza}
              onChange={handleChange}
              className="input"
            />
          </div>
        </div>

        <div className="formRow">
          <div className="formGroup">
            <label className="label">Tamaño:</label>
            <select
              name="tamaño" // Manteniendo el nombre del campo "tamaño"
              value={formData.tamaño}
              onChange={handleChange}
              className="input"
            >
              <option value="">Seleccione un tamaño</option>
              {tamanosMascota.map((tamanos) => (
                <option key={tamanos.id} value={tamanos.id}>
                  {tamanos.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="buttonContainer">
          <button type="submit" className="submitButton">
            GUARDAR
          </button>
          <Link to="/filter-mascota">
            <button type="button" className="submitButton">
              CANCELAR
            </button>
          </Link>
        </div>
      </form>

      {success && <p className="successText">Mascota registrada exitosamente</p>}
      {error && <p className="errorText">{error}</p>}
    </div>
  );
};

export default RegisterMascota;
