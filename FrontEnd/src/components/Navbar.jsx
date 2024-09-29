import React from 'react';
import { User } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="header">
      <h1 className="headerTitle">REGISTRAR MASCOTA</h1>
      <div className="userInfo">
        <span>J Moreno</span>
        <span className="userRole">jean pierre Montalvo....</span>
        <div className="userAvatar">
          <User size={24} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
