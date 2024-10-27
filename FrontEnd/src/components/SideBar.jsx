import { Users, FileSpreadsheet, ClipboardList, Receipt, BarChart2, FileText, LogOut, Dog } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Importa useNavigate
import { useState, useEffect } from 'react';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Hook para la navegación
  const [activeLink, setActiveLink] = useState(location.pathname);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  // Función para cerrar sesión
  const handleLogout = () => {
    // Limpia el token y otros datos en localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('nombre');
    localStorage.removeItem('rol');

    // Redirige a la página de login
    navigate('/'); 
  };

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
            to="/buscar-servicios" 
            className={`nav-item ${activeLink === '/buscar-servicios' ? 'active' : ''}`} 
            onClick={() => setActiveLink('/buscar-servicios')}
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
          <span 
            className={`nav-item`} 
            onClick={handleLogout} // Cambia el onClick para manejar el cierre de sesión
          >
            <LogOut size={18} /> Cerrar sesión
          </span>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
