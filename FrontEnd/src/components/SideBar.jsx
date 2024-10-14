import { Users, FileSpreadsheet, ClipboardList, Receipt, BarChart2, FileText, LogOut, Dog } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom'; // Importa Link y useLocation
import { useState, useEffect } from 'react'; // Importa useState y useEffect
import '../styles/Sidebar.css';

const Sidebar = () => {
  const location = useLocation(); // Hook para obtener la ubicación actual
  const [activeLink, setActiveLink] = useState(location.pathname); // Estado para la opción activa

  useEffect(() => {
    setActiveLink(location.pathname); // Actualiza la opción activa cuando cambia la ubicación
  }, [location]);

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src="/koala2.png" alt="Koala Vet Logo" className="logo" />
        <h1 className="title">KOALA VET</h1>
      </div>
      <nav className="sidebar-nav">
        <div className="nav-section">
          <h2>USUARIO</h2>
          <Link 
            to="/consultar-cliente" 
            className={`nav-item ${activeLink === '/consultar-cliente' ? 'active' : ''}`} 
            onClick={() => setActiveLink('/consultar-cliente')}
          >
            <Users size={18} /> Clientes
          </Link>
          <Link 
            to="/filter-mascota" 
            className={`nav-item ${activeLink === '/filter-mascota' ? 'active' : ''}`} 
            onClick={() => setActiveLink('/filter-mascota')}
          >
            <Dog size={18} /> Mascotas
          </Link>

          <Link 
            to="/seguimiento-atencion" 
            className={`nav-item ${activeLink === '/seguimiento-atencion' ? 'active' : ''}`} 
            onClick={() => setActiveLink('/seguimiento-atencion')}
          >
            <FileSpreadsheet size={18} /> Seguimiento de atención
          </Link>

        </div>
        <div className="nav-section">
          <h2>EMPRESA</h2>
          <Link 
            to="#" 
            className={`nav-item ${activeLink === '/consultar-servicios' ? 'active' : ''}`} 
            onClick={() => setActiveLink('/consultar-servicios')}
          >
            <ClipboardList size={18} /> Consultar servicios
          </Link>
          <Link 
            to="/filter-atencion" 
            className={`nav-item ${activeLink === '/filter-atencion' ? 'active' : ''}`} 
            onClick={() => setActiveLink('/filter-atencion')}
          >
            <Receipt size={18} /> Registrar atención
          </Link>
        </div>
        <div className="nav-section">
          <h2>GESTION DE PAGOS</h2>
          <Link 
            to="/ver-factura" 
            className={`nav-item ${activeLink === '/ver-factura' ? 'active' : ''}`} 
            onClick={() => setActiveLink('/ver-factura')}
          >
            <BarChart2 size={18} /> Cuadre del día
          </Link>
          <Link 
            to="#" 
            className={`nav-item ${activeLink === '/facturas' ? 'active' : ''}`} 
            onClick={() => setActiveLink('/facturas')}
          >
            <FileText size={18} /> Facturas
          </Link>
        </div>
        <div className="nav-section">
          <h2>INICIO DE SESION</h2>
          <Link 
            to="#" 
            className={`nav-item ${activeLink === '/cerrar-sesion' ? 'active' : ''}`} 
            onClick={() => setActiveLink('/cerrar-sesion')}
          >
            <LogOut size={18} /> Cerrar sesión
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
