//Harolt Kruchinsky
import React, { useEffect, useState } from 'react';
import { obtenerVeterinarios, obtenerServicios, registrarAtencion } from '../services/api';
import '../styles/RegisterAtencion.css';
import { Link } from 'react-router-dom'; // Asegúrate de importar Link
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
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vets = await obtenerVeterinarios();
        const services = await obtenerServicios();
        setVeterinarios(vets);
        setServicios(services);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar campos obligatorios
    if (!formData.fechaCita || !formData.dniDuenio || !formData.duenio || !formData.nombreMascota || !formData.sexo || !formData.especie || !formData.tamaño || !formData.servicio || !formData.veterinario) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    try {
      await registrarAtencion(formData);
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
    } catch (err) {
      setError('Error al registrar la atención');
      setSuccess(false);
    }
  };

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
              onChange={handleChange}
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
          <label className="label">Nombre</label>
            <input
              type="text"
              name="nombreMascota"
              value={formData.nombreMascota}
              onChange={handleChange}
              className="input"
              readOnly
            />


        
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
