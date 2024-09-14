import { useState } from 'react';
import Logo from '../assets/img/logo.png';
import { Link } from 'react-router-dom';
import Search from './Search';

const Header = () => {
  const [search, setSearch] = useState(''); // Создаем состояние для поиска
  const [menuOpen, setMenuOpen] = useState(false); // Для мобильного меню

  // Функция для закрытия меню
  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="flex justify-between items-center p-4 fixed top-0 w-full bg-white shadow-lg z-50">
      <div className="flex justify-between items-center w-full max-w-7xl mx-auto">
        {/* Логотип */}
        <Link to="/" onClick={closeMenu}>
          <img className="w-24 md:w-40 transition-transform duration-500 hover:scale-110" src={Logo} alt="Logo" />
        </Link>

        {/* Навигация для десктопа */}
        <nav className="hidden md:flex gap-6 items-center">
        
          <Link 
            to="/characters" 
            className="relative p-2 text-black hover:text-black transition-all duration-300 ease-in-out group"
          >
            Characters
            <span className="absolute left-0 bottom-0 h-1 w-0 bg-red-600 group-hover:w-full transition-all duration-300 ease-in-out"></span>
          </Link>
          <Link 
            to="/comics" 
            className="relative p-2 text-black hover:text-black transition-all duration-300 ease-in-out group"
          >
            Comics
            <span className="absolute left-0 bottom-0 h-1 w-0 bg-red-600 group-hover:w-full transition-all duration-300 ease-in-out"></span>
          </Link>
        </nav>

        {/* Мобильное меню */}
        <div className="md:hidden">
          <button
            className="p-2 rounded-full bg-red-600 text-white shadow-lg hover:bg-red-500 transition duration-300"
            onClick={() => setMenuOpen(!menuOpen)} // Открытие/закрытие меню
          >
            <i className="fas fa-bars"></i> {/* Иконка меню */}
          </button>

          {/* Выпадающее меню для мобильных устройств */}
          {menuOpen && (
            <nav className="absolute right-4 top-16 bg-white shadow-lg rounded-lg p-4">
             
              <Link 
                to="/characters" 
                className="block p-2 text-gray-700 hover:bg-red-600 hover:text-white transition-all duration-300 ease-in-out rounded-md"
                onClick={closeMenu}
              >
                Characters
              </Link>
              <Link 
                to="/comics" 
                className="block p-2 text-gray-700 hover:bg-red-600 hover:text-white transition-all duration-300 ease-in-out rounded-md"
                onClick={closeMenu}
              >
                Comics
              </Link>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
