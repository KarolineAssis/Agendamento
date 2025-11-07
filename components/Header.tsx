import React from 'react';
import logo from './public/Logo2.png';

interface HeaderProps {
  onAdminClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAdminClick }) => {
  return (
    <header className="bg-white shadow-md w-full">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
  <img src={logo} alt="Logo Karoline Assis" className="w-40 h-20" />
        <h1 className="text-3xl font-bold text-pink-500 tracking-wider font-serif">
          Karoline Assis
        </h1>
        <button
          onClick={onAdminClick}
          className="bg-pink-100 text-pink-600 hover:bg-pink-200 px-4 py-2 rounded-lg transition-colors text-sm font-semibold"
        >
          Área do Profissional
        </button>
      </div>
    </header>
  );
};

export default Header;