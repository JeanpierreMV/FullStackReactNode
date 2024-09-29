// frontend/src/components/Sidebar.js
import { Users, FileSpreadsheet, ClipboardList, Receipt, BarChart2, FileText, LogOut, Dog } from 'lucide-react';
import '../styles/Sidebar.css'

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src="/koala2.png" alt="Koala Vet Logo" className="logo" />
        <h1 className="title">KOALA VET</h1>
      </div>
      <nav className="sidebar-nav">
        <div className="nav-section">
          <h2>USUARIO</h2>
          <a href="#" className="nav-item"><Users size={18} /> Clientes</a>
          <a href="#" className="nav-item"><Dog size={18} /> Mascotas</a>
          <a href="#" className="nav-item active"><FileSpreadsheet size={18} /> Seguimiento de atención</a>
        </div>
        <div className="nav-section">
          <h2>EMPRESA</h2>
          <a href="#" className="nav-item"><ClipboardList size={18} /> Consultar servicios</a>
          <a href="#" className="nav-item"><Receipt size={18} /> Registrar atención</a>
        </div>
        <div className="nav-section">
          <h2>GESTION DE PAGOS</h2>
          <a href="#" className="nav-item"><BarChart2 size={18} /> Cuadre del día</a>
          <a href="#" className="nav-item"><FileText size={18} /> Facturas</a>
        </div>
        <div className="nav-section">
          <h2>INICIO DE SESION</h2>
          <a href="#" className="nav-item"><LogOut size={18} /> Cerrar sesión</a>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
