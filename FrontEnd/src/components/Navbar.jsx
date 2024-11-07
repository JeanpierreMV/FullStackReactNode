import React from 'react';
import { User } from 'lucide-react';
import '../styles/Navbar.css'; // Asegúrate de importar tu archivo CSS.

const Navbar = () => {
  
  const nombre = localStorage.getItem('nombre');
  const rol = localStorage.getItem('rol');

  return (
    <header className="header">
      <div className="userInfo">
        <div className="userDetails">
          <span className="userName">{nombre}</span> 
          <span className="userRole">{rol}</span>  
        </div>
       {/* <div className="userAvatar">
          <User size={24} />
        </div>*/}
      </div>
    </header>
  );
};

export default Navbar;
