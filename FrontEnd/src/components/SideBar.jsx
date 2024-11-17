import { Users, FileSpreadsheet, ClipboardList, Receipt, BarChart2, LogOut, Dog } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../styles/Sidebar.css';
import { AiOutlineFileSearch } from 'react-icons/ai';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState(location.pathname);

  // Obtener el rol del usuario desde localStorage
  const userRole = localStorage.getItem('rol');

  useEffect(() => {
    // Establecer el enlace activo al cambiar de ubicación
    setActiveLink(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    // Redirigir solo la primera vez que se accede al sidebar
    const hasRedirected = sessionStorage.getItem('hasRedirected');

    if (!hasRedirected && userRole) {
      if (userRole === 'Veterinario') {
        navigate('/seguimiento-atencion');
      } else if (userRole === 'Administrador') {
        navigate('/consultar-cliente');
      } else if (userRole === 'Cliente') {
        navigate('/seguimiento-atencion');
      } else if (userRole === 'Laboratorista') {
        navigate('/ultimo-analisis');
      }
      sessionStorage.setItem('hasRedirected', 'true'); // Marcar que la redirección inicial se realizó
    }
  }, [userRole, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('nombre');
    localStorage.removeItem('rol');
    sessionStorage.removeItem('hasRedirected'); // Limpiar el estado al cerrar sesión
    navigate('/');
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src="/koala2.png" alt="Koala Vet Logo" className="logo" />
        <h1 className="title">KOALA VET</h1>
      </div>
      <nav className="sidebar-nav">

        {/* Opciones para Administrador */}
        {userRole === 'Administrador' && (
          <>
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
              <h2>GESTIÓN DE PAGOS</h2>
              <Link
                to="/generar-boleta"
                className={`nav-item ${activeLink === '/generar-boleta' ? 'active' : ''}`}
                onClick={() => setActiveLink('/generar-boleta')}
              >
                <BarChart2 size={18} /> Generar boleta de pago
              </Link>

              <Link
                to="/facturacion-dia"
                className={`nav-item ${activeLink === '/facturacion-dia' ? 'active' : ''}`}
                onClick={() => setActiveLink('/facturacion-dia')}
              >
                <Receipt size={18} /> Facturación del Día
              </Link>

            </div>
          </>
        )}

        {/* Opciones para Veterinario */}
        {userRole === 'Veterinario' && (
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
              to="/buscar-citas"
              className={`nav-item ${activeLink === '/buscar-citas' ? 'active' : ''}`}
              onClick={() => setActiveLink('/buscar-citas')}
            >
              <Users size={18} /> Citas del dia
            </Link>
            <Link
              to="/seguimiento-atencion"
              className={`nav-item ${activeLink === '/seguimiento-atencion' ? 'active' : ''}`}
              onClick={() => setActiveLink('/seguimiento-atencion')}
            >
              <FileSpreadsheet size={18} /> Seguimiento de atención
            </Link>
            <Link
              to="/Buscar-Historial-Mascota"
              className={`nav-item ${activeLink === '/Buscar-Historial-Mascota' ? 'active' : ''}`}
              onClick={() => setActiveLink('/Buscar-Historial-Mascota')}
            >
              <FileSpreadsheet size={18} /> Historial Clinico
            </Link>
            <h2>EMPRESA</h2>
            <Link
              to="/buscar-servicios"
              className={`nav-item ${activeLink === '/buscar-servicios' ? 'active' : ''}`}
              onClick={() => setActiveLink('/buscar-servicios')}
            >
              <ClipboardList size={18} /> Consultar servicios
            </Link>
            <Link
              to="/ultimo-analisis"
              className={`nav-item ${activeLink === '/ultimo-analisis' ? 'active' : ''}`}
              onClick={() => setActiveLink('/ultimo-analisis')}
            >
              <AiOutlineFileSearch size={18} /> Consultar Análisis
            </Link>
          </div>
        )}

        {/* Opciones para Laboratorista */}
        {userRole === 'Laboratorista' && (
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
            <h2>EMPRESA</h2>
            <Link
              to="/ultimo-analisis"
              className={`nav-item ${activeLink === '/ultimo-analisis' ? 'active' : ''}`}
              onClick={() => setActiveLink('/ultimo-analisis')}
            >
              <AiOutlineFileSearch size={18} /> Consultar Análisis
            </Link>
          </div>
        )}

        {/* Opciones para Cliente */}
        {userRole === 'Cliente' && (
          <div className="nav-section">
            <h2>USUARIO</h2>
            <Link
              to="/seguimiento-atencion"
              className={`nav-item ${activeLink === '/seguimiento-atencion' ? 'active' : ''}`}
              onClick={() => setActiveLink('/seguimiento-atencion')}
            >
              <FileSpreadsheet size={18} /> Seguimiento de atención
            </Link>
          </div>
        )}

        <div className="nav-section">
          <h2>INICIO DE SESIÓN</h2>
          <span
            className="nav-item"
            onClick={handleLogout}
          >
            <LogOut size={18} /> Cerrar sesión
          </span>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
