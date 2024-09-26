// Importaciones necesarias
import React, { useEffect, useState } from 'react';
import { registrarMascota, obtenerTiposMascota, obtenerClientes } from '../services/api';
import { User } from 'lucide-react';
//import Sidebar from './Sidebar';
// Importa el archivo CSS
import '../styles/RegisterMascota.css';

const RegisterMascota = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    genero: '',
    edad: '',
    peso: '',
    raza: '',
    tipoMascotaId: '',
    clienteId: '',
  });

  const [tipoMascotas, setTipoMascotas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tipos = await obtenerTiposMascota();
        const clients = await obtenerClientes();
        setTipoMascotas(tipos);
        setClientes(clients);
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
        clienteId: '',
      }); // Limpiar el formulario después del envío
    } catch (err) {
      setError('Error al registrar la mascota');
      setSuccess(false);
    }
  };

  return (
    <div className="container">
      
     { /*<Sidebar />*/}
      <div className="mainContent">
        <header className="header">
          <h1 className="headerTitle">REGISTRAR MASCOTA</h1>
          <div className="userInfo">
            <span>J Moreno</span>
            <span className="userRole">jean pierre Montalvo</span>
            <div className="userAvatar">
              <User size={24} />
            </div>
          </div>
        </header>
        <main className="formContainer">
          <div className="dataContainer">
            <div className="formHeader">
              <div className="formHeaderGroup">
                <div className="formGroup">
                  <label>CÓDIGO</label>
                  <input type="text" value="DNI" readOnly className="input" />
                </div>
                <div className="formGroup">
                  <label>FECHA</label>
                  <input type="text" value="19/05/2023" readOnly className="input" />
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
              <div className="formGroup">
                <label>Cliente:</label>
                <select
                  name="clienteId"
                  value={formData.clienteId}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="">Seleccione un cliente</option>
                  {clientes.map((cliente) => (
                    <option key={cliente.id} value={cliente.id}>
                      {cliente.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="submitButton">
                REGISTRAR MASCOTA
              </button>
            </form>
            {success && <p>Mascota registrada exitosamente</p>}
            {error && <p>{error}</p>}
          </div>
        </main>
      </div>
    </div>
  );
};

export default RegisterMascota;
