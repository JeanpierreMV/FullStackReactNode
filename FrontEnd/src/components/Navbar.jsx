import React from 'react';
import { User } from 'lucide-react';
import '../styles/Navbar.css'; // Asegúrate de importar tu archivo CSS

const Navbar = () => {
  return (
    <header className="header">
      <div className="userInfo">
        <div className="userName">
          <span>J Moreno</span>
          <span className="userRole">jean pierre Montalvo....</span>
        </div>
        <div className="userAvatar">
          <User size={24} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
