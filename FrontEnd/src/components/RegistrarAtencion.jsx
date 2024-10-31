import React, { useEffect, useState } from 'react';
import { obtenerVeterinarios, obtenerServicios, registrarAtencion, obtenerMascotasPorDni, obtenerClientePorCodigo } from '../services/api';
import '../styles/RegisterAtencion.css';
import { Link } from 'react-router-dom';

const tipoMascotaMap = {
  1: 'Perro',
  2: 'Gato'
};

const sizeMap = {
  1: 'Grande',
  2: 'Mediano',
  3: 'Pequeño'
};

const RegistrarAtencion = () => {
  const [formData, setFormData] = useState({
    fechaCita: '',
    dniDuenio: '',
    duenio: '',
    nombreMascota: '',
    sexo: '',
    especie: '',
    tamaño: '',
    servicio: '',
    veterinario: ''
  });

  const [veterinarios, setVeterinarios] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [mascotas, setMascotas] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Mantener un mapeo de nombres a IDs
  const [veterinariosMap, setVeterinariosMap] = useState({});
  const [serviciosMap, setServiciosMap] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vets = await obtenerVeterinarios();
        const services = await obtenerServicios();
        
        // Crear mapeos de nombres a IDs
        const vetMap = {};
        vets.forEach(vet => {
          vetMap[vet.nombre] = vet.id;
        });
        
        const servMap = {};
        services.forEach(serv => {
          servMap[serv.nombre] = serv.id;
        });
        
        setVeterinarios(vets);
        setServicios(services);
        setVeterinariosMap(vetMap);
        setServiciosMap(servMap);
      } catch (err) {
        setError('Error al cargar datos');
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMascotaChange = (e) => {
    const selectedMascota = mascotas.find(mascota => mascota.nombre === e.target.value);
    if (selectedMascota) {
      setFormData(prev => ({
        ...prev,
        nombreMascota: selectedMascota.nombre,
        tamaño: sizeMap[selectedMascota.sizeId] || 'Desconocido',
        sexo: selectedMascota.genero,
        especie: tipoMascotaMap[selectedMascota.tipoMascotaId] || 'Desconocido'
      }));
    }
  };

  const handleDniChange = async (e) => {
    const { value } = e.target;
    setFormData({ ...formData, dniDuenio: value });

    if (value) {
      try {
        const cliente = await obtenerClientePorCodigo(value);
        setFormData(prev => ({
          ...prev,
          duenio: cliente.nombre,
        }));

        const mascotasData = await obtenerMascotasPorDni(value);
        setMascotas(mascotasData);

        if (mascotasData.length > 0) {
          const primeraMascota = mascotasData[0];
          setFormData(prev => ({
            ...prev,
            nombreMascota: primeraMascota.nombre,
            tamaño: sizeMap[primeraMascota.sizeId] || 'Desconocido',
            sexo: primeraMascota.genero,
            especie: tipoMascotaMap[primeraMascota.tipoMascotaId] || 'Desconocido'
          }));
        } else {
          setError('No se encontraron mascotas para este dueño.');
          setFormData(prev => ({
            ...prev,
            nombreMascota: '',
            tamaño: '',
            sexo: '',
            especie: ''
          }));
        }
      } catch (err) {
        setError('El DNI ingresado no corresponde a ningún cliente registrado.');
        setFormData(prev => ({
          ...prev,
          duenio: '',
          nombreMascota: '',
          sexo: '',
          tamaño: '',
          especie: ''
        }));
        setMascotas([]);
      }
    } else {
      setFormData(prev => ({
        ...prev,
        duenio: '',
        nombreMascota: '',
        sexo: '',
        tamaño: '',
        especie: ''
      }));
      setMascotas([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar campos obligatorios
    if (!formData.fechaCita || !formData.dniDuenio || !formData.nombreMascota || !formData.servicio || !formData.veterinario) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    try {
      // Preparar datos en el formato que espera la API
      const apiData = {
        dniDuenio: formData.dniDuenio,
        nombreMascota: formData.nombreMascota,
        veterinarioId: veterinariosMap[formData.veterinario], // Convertir nombre a ID
        servicioId: serviciosMap[formData.servicio], // Convertir nombre a ID
        fechaCita: formData.fechaCita
      };

      await registrarAtencion(apiData);
      setSuccess(true);
      setError('');
      setFormData({
        fechaCita: '',
        dniDuenio: '',
        duenio: '',
        nombreMascota: '',
        sexo: '',
        especie: '',
        tamaño: '',
        servicio: '',
        veterinario: ''
      });
      setMascotas([]);
    } catch (err) {
      setError('Error al registrar la atención');
      setSuccess(false);
    }
  };

  // El resto del JSX permanece igual...
  return (
    <div className="dataContainer">
      <form onSubmit={handleSubmit} className="form">
        <h1 className="headerTitle">Registrar Cita</h1>

        <div className="formRow">
          <div className="formGroup">
            <label className="label">Fecha de Cita</label>
            <input
              type="datetime-local"
              name="fechaCita"
              value={formData.fechaCita}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div className="formGroup">
            <label className="label">Especie</label>
            <input
              type="text"
              name="especie"
              value={formData.especie}
              onChange={handleChange}
              className="input"
              readOnly
            />
          </div>
        </div>

        <div className="formRow">
          <div className="formGroup">
            <label className="label">DNI del Dueño</label>
            <input
              type="text"
              name="dniDuenio"
              value={formData.dniDuenio}
              onChange={handleDniChange}
              className="input"
              placeholder="Ingresa el DNI"
            />
          </div>
          <div className="formGroup">
            <label className="label">Tamaño</label>
            <input
              type="text"
              name="tamaño"
              value={formData.tamaño}
              onChange={handleChange}
              className="input"
              readOnly
            />
          </div>
        </div>

        <div className="formRow">
          <div className="formGroup">
            <label className="label">Dueño</label>
            <input
              type="text"
              name="duenio"
              value={formData.duenio}
              onChange={handleChange}
              className="input"
              readOnly
            />
          </div>
          <div className="formGroup">
            <label className="label">Servicio</label>
            <select
              name="servicio"
              value={formData.servicio}
              onChange={handleChange}
              className="input"
            >
              <option value="">Seleccione un servicio</option>
              {servicios.map((serv) => (
                <option key={serv.id} value={serv.nombre}>
                  {serv.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="formRow">
          <div className="formGroup">
            <label className="label">Nombre de la Mascota</label>
            {mascotas.length > 0 ? (
              <select
                name="nombreMascota"
                value={formData.nombreMascota}
                onChange={handleMascotaChange}
                className="input"
              >
                <option value="">Seleccione una mascota</option>
                {mascotas.map((mascota) => (
                  <option key={mascota.id} value={mascota.nombre}>
                    {mascota.nombre}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                name="nombreMascota"
                value={formData.nombreMascota}
                onChange={handleChange}
                className="input"
                readOnly
              />
            )}
          </div>
          <div className="formGroup">
            <label className="label">Veterinario</label>
            <select
              name="veterinario"
              value={formData.veterinario}
              onChange={handleChange}
              className="input"
            >
              <option value="">Seleccione un veterinario</option>
              {veterinarios.map((vet) => (
                <option key={vet.id} value={vet.nombre}>
                  {vet.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="formRow">
          <div className="formGroup">
            <label className="label">Sexo</label>
            <input
              type="text"
              name="sexo"
              value={formData.sexo}
              onChange={handleChange}
              className="input"
              readOnly
            />
          </div>
        </div>

        <div className="buttonContainer">
          <button type="submit" className="submitButton">
            Guardar
          </button>
          <Link to="/filter-atencion">
            <button type="button" className="submitButton">
              Cancelar
            </button>
          </Link>
          <button type="button" className="generateButton">
            Generar Proforma
          </button>
        </div>

        {success && <p className="successText">Cita registrada exitosamente</p>}
        {error && <p className="errorText">{error}</p>}
      </form>
    </div>
  );
};

export default RegistrarAtencion;