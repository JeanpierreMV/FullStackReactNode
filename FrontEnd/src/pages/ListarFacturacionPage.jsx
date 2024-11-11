import React, { useState, useEffect } from 'react';
import { obtenerFacturacionDelDia } from '../services/api'; // Asegúrate de que la ruta sea correcta
import ListarFacturas from '../components/ListarFacturas'; // Importamos el componente ListarFacturas
import Sidebar from '../components/SideBar'; // Importamos el Sidebar
import Navbar from '../components/Navbar'; // Importamos el Navbar

const ListarFacturacionPage = () => {
  const [facturas, setFacturas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFacturacion = async () => {
      try {
        const facturasDelDia = await obtenerFacturacionDelDia();
        setFacturas(facturasDelDia);
        setLoading(false);
      } catch (err) {
        setError('Error al obtener la facturación del día');
        setLoading(false);
      }
    };

    fetchFacturacion();
  }, []);

 
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      <Sidebar /> {/* Sidebar a la izquierda */}
      <div className="mainContent">
        <Navbar /> {/* Navbar arriba */}
        <main className="formContainer">
          <ListarFacturas facturas={facturas} /> {/* Aquí renderizas las facturas */}
        </main>
      </div>
    </div>
  );
};

export default ListarFacturacionPage;
