import React, { useState, useEffect } from 'react';
import { obtenerFacturacionDelDia } from '../services/api'; // Asegúrate de que la ruta sea correcta
import ListarFacturas from '../components/ListarFacturas'; // Importamos el componente ListarFacturas
import Sidebar from '../components/SideBar'; // Importamos el Sidebar
import Navbar from '../components/Navbar'; // Importamos el Navbar

const ListarFacturacionPage = () => {
  const [facturas, setFacturas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFacturacion = async () => {
      try {
        const facturasDelDia = await obtenerFacturacionDelDia();
        setFacturas(facturasDelDia);
      } catch (err) {
        // Si hay un error, solo asegúrate de que loading sea false
        setFacturas([]);  // Asegúrate de vaciar las facturas en caso de error
      } finally {
        setLoading(false);
      }
    };

    fetchFacturacion();
  }, []);

  

  return (
    <div className="container">
      <Sidebar /> {/* Sidebar a la izquierda */}
      <div className="mainContent">
        <Navbar /> {/* Navbar arriba */}
        <main className="formContainer">
          {facturas.length === 0 ? (
            
            <p>No se han generado facturas hoy.</p>
          ) : (
            <ListarFacturas facturas={facturas} /> 
          )}
        </main>
      </div>
    </div>
  );
};

export default ListarFacturacionPage;
