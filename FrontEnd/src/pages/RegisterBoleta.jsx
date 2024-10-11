import React, { useEffect, useState } from 'react';
import Sidebar from '../components/SideBar';
import Navbar from '../components/Navbar';
import BoletaForm from '../components/BoletaForm'; // Importamos el componente BoletaForm
import { registrarBoleta, obtenerClientes, obtenerServicios } from '../services/api'; // Importamos los servicios necesarios
import '../styles/RegisterBoleta.css';


const RegisterBoleta = () => {
  const [clientes, setClientes] = useState([]); // Estado para almacenar los clientes
  const [servicios, setServicios] = useState([]); // Estado para almacenar los servicios
  const [error, setError] = useState(null); // Estado para manejar errores
  const [success, setSuccess] = useState(false); // Estado para manejar el éxito al generar la boleta

  // Efecto para obtener los clientes y servicios cuando el componente se monta
  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientesData = await obtenerClientes(); // Llamada al servicio de clientes
        const serviciosData = await obtenerServicios(); // Llamada al servicio de servicios
        setClientes(clientesData); // Guardamos los clientes obtenidos en el estado
        setServicios(serviciosData); // Guardamos los servicios obtenidos en el estado
      } catch (error) {
        console.log('Error fetching data:', error);
        setError('Error al obtener los datos'); // Manejo del error
      }
    };
    fetchData(); // Ejecutamos la función fetchData
  }, []);

  // Función que maneja el envío del formulario
  const handleSubmit = async (data) => {
    try {
      await registrarBoleta(data); // Llamada al servicio de registro de boleta
      setSuccess(true); // Marcamos como éxito la operación
      setError(null); // Reiniciamos los errores
    } catch (error) {
      console.error('Error al generar la boleta:', error);
      setError('Error al generar la boleta'); // Mostramos el error si ocurre algo mal
      setSuccess(false); // Marcamos el éxito como falso
    }
  };

  return (
    <div className="container">
    <Sidebar />
    <div className="mainContent">
      <Navbar />
    <div className="generar-boleta-container">
      <h1>Generar Boleta</h1>
      {/* Mensajes de éxito o error según el estado */}
      {success && <p className="success-message">Boleta generada exitosamente</p>}
      {error && <p className="error-message">{error}</p>}
      {/* Renderizamos el formulario, pasando clientes, servicios y la función handleSubmit */}
      <BoletaForm 
        clientes={clientes} 
        servicios={servicios} 
        handleSubmit={handleSubmit} 
      />
    </div>
    </div>
    </div>

  );
};

export default RegisterBoleta;

