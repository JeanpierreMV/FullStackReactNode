import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  registrarMascota,
  obtenerTiposMascota,
  obtenerTamañoMascota,
  obtenerClientePorCodigo
} from '../services/api';
import '../styles/RegisterMascota.css';



const RegisterMascota = () => {
  // Estado principal del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    genero: '',
    edad: '',
    peso: '',
    raza: '',
    tipoMascotaId: '',
    codigo: '',
    tamaño: '',
    nombreDueño: ''
  });

  // Estados para manejar datos y mensajes
  const [tipoMascotas, setTipoMascotas] = useState([]);
  const [tamanosMascota, setTamanosMascota] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [dniError, setDniError] = useState('');

  // Obtener DNI del cliente si viene desde otra página
  const location = useLocation();
  const dniFromLocation = location.state?.dni;

  // Efecto para cargar datos iniciales
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Cargar datos de tipos y tamaños de mascotas
        const [tipos, tamanos] = await Promise.all([
          obtenerTiposMascota(),
          obtenerTamañoMascota()
        ]);
        
        setTipoMascotas(tipos);
        setTamanosMascota(tamanos);

        // Si hay un DNI en la ubicación, buscar cliente
        if (dniFromLocation) {
          setFormData(prev => ({ ...prev, codigo: dniFromLocation }));
          const cliente = await obtenerClientePorCodigo(dniFromLocation);
          setFormData(prev => ({
            ...prev,
            genero: cliente.genero,
          }));
        }
      } catch (err) {
        setError('Error al cargar datos');
      }
    };
    fetchData();
  }, [dniFromLocation]);

  // Manejador para cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Manejador específico para cambios en el campo de código/DNI
  const handleCodigoChange = async (e) => {
    const { value } = e.target;
    setFormData(prev => ({ ...prev, codigo: value }));
    
    if (!value) {
      setFormData(prev => ({ ...prev, nombreDueño: '', genero: '' }));
      setDniError('');
      return;
    }

    try {
      const cliente = await obtenerClientePorCodigo(value);
      setFormData(prev => ({
        ...prev,
        nombreDueño: cliente.nombre,
        genero: cliente.genero
      }));
      setDniError('');
    } catch (err) {
      setDniError('El DNI ingresado no corresponde a ningún cliente registrado.');
    }
  };

  // Manejador para el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones de campos
    const camposRequeridos = ['nombre', 'genero', 'raza', 'tipoMascotaId', 'edad', 'peso', 'tamaño'];
    const camposFaltantes = camposRequeridos.some(campo => !formData[campo]);
    
    if (camposFaltantes) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    if (isNaN(formData.edad) || isNaN(formData.peso) || isNaN(formData.tipoMascotaId)) {
      setError('Edad, peso y tipo de mascota deben ser numéricos.');
      return;
    }

    try {
      const mascotaData = {
        codigo: formData.codigo,
        nombre: formData.nombre,
        genero: formData.genero,
        raza: formData.raza,
        tipoMascotaId: formData.tipoMascotaId,
        edad: formData.edad,
        peso: formData.peso,
        sizeId: formData.tamaño
      };

      await registrarMascota(mascotaData);
      
      // Resetear formulario después del éxito
      setSuccess(true);
      setError('');
      setFormData({
        nombre: '',
        genero: '',
        edad: '',
        peso: '',
        raza: '',
        tipoMascotaId: '',
        codigo: dniFromLocation || '',
        tamaño: '',
        nombreDueño: ''
      });
    } catch (err) {
      setError('Error al registrar la mascota');
      setSuccess(false);
    }
  };

  // Renderizado del componente
  return (
    <div className="dataContainer">
      <form onSubmit={handleSubmit} className="form">
        <h1 className="headerTitle">REGISTRAR MASCOTA</h1>
        
        {/* Sección DNI */}
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

        {/* Información del dueño y género */}
        <div className="formRow">
          <div className="formGroup">
            <label className="label">Dueño</label>
            <input
              type="text"
              name="nombreDueño"
              value={formData.nombreDueño}
              onChange={handleChange}
              className="input"
              disabled
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

        {/* Información básica de la mascota */}
        <div className="formRow">
          <div className="formGroup">
            <label className="label">Nombre de la Mascota</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="input"
              placeholder="Ingresa el nombre de la mascota"
            />
          </div>
          <div className="formGroup">
            <label className="label">Edad</label>
            <input
              type="number"
              name="edad"
              value={formData.edad}
              onChange={handleChange}
              className="input"
              placeholder="Ingresa la edad de la mascota"
            />
          </div>
        </div>

        {/* Características físicas */}
        <div className="formRow">
          <div className="formGroup">
            <label className="label">Peso</label>
            <input
              type="number"
              name="peso"
              value={formData.peso}
              onChange={handleChange}
              className="input"
              placeholder="Ingresa el peso de la mascota"
              step="0.1"
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
              placeholder="Ingresa la raza"
            />
          </div>
        </div>

        {/* Selección de tamaño y especie */}
        <div className="formRow">
          <div className="formGroup">
            <label className="label">Tamaño:</label>
            <select
              name="tamaño"
              value={formData.tamaño}
              onChange={handleChange}
              className="input"
            >
              <option value="">Seleccione un tamaño</option>
              {tamanosMascota.map((tamano) => (
                <option key={tamano.id} value={tamano.id}>
                  {tamano.nombre}
                </option>
              ))}
            </select>
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

        {/* Botón de envío y mensajes */}
        <div className="buttonContainer">
          <button type="submit" className="submitButton">Registrar</button>
          {success && <p className="successText">Mascota registrada exitosamente!</p>}
          
          {error && <p className="errorText">{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default RegisterMascota;