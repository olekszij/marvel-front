import { useState, useEffect } from 'react';
import Logo from '../assets/img/logo.png';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Эффект для отслеживания скролла
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Функция для проверки активного маршрута
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header
      className={`flex justify-between items-center p-4 fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-white'
        }`}
    >
      <div className="flex justify-between items-center w-full max-w-7xl mx-auto">
        {/* Логотип с улучшенной анимацией */}
        <Link
          to="/"
          onClick={closeMenu}
          className="focus:outline-none focus:ring-2 focus:ring-red-600 rounded-lg
                   transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]
                   md:hover:scale-105 md:active:scale-95"
        >
          <img
            className="w-24 md:w-40 transition-transform duration-300"
            src={Logo}
            alt="Marvel Logo"
          />
        </Link>

        {/* Навигация для десктопа с улучшенными стилями */}
        <nav className="hidden md:flex gap-6 items-center">
          <Link
            to="/characters"
            className={`relative p-2 text-black transition-all duration-300 ease-in-out group
              ${isActive('/characters') ? 'text-red-600' : 'hover:text-red-600'}`}
            aria-current={isActive('/characters') ? 'page' : undefined}
          >
            Characters
            <span className={`absolute left-0 bottom-0 h-1 transition-all duration-300 ease-in-out
              ${isActive('/characters') ? 'w-full bg-red-600' : 'w-0 group-hover:w-full bg-red-600'}`}></span>
          </Link>
          <Link
            to="/comics"
            className={`relative p-2 text-black transition-all duration-300 ease-in-out group
              ${isActive('/comics') ? 'text-red-600' : 'hover:text-red-600'}`}
            aria-current={isActive('/comics') ? 'page' : undefined}
          >
            Comics
            <span className={`absolute left-0 bottom-0 h-1 transition-all duration-300 ease-in-out
              ${isActive('/comics') ? 'w-full bg-red-600' : 'w-0 group-hover:w-full bg-red-600'}`}></span>
          </Link>
        </nav>

        {/* Улучшенное мобильное меню */}
        <div className="md:hidden">
          <button
            className="p-3 rounded-full bg-red-600 text-white shadow-lg hover:bg-red-500 
                     active:bg-red-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-600
                     w-12 h-12 flex items-center justify-center"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <i className={`fas ${menuOpen ? 'fa-times text-xl' : 'fa-bars text-xl'}`}></i>
          </button>

          {/* Полноэкранное мобильное меню */}
          <div
            className={`fixed inset-0 bg-white transition-all duration-300 z-40
              ${menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={closeMenu}
          >
            <nav
              className={`h-full w-full flex flex-col items-center justify-center fixed top-0 left-0
                transition-all duration-300 transform
                ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
              onClick={e => e.stopPropagation()}
            >
              {/* Кнопка закрытия */}
              <button
                onClick={closeMenu}
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center
                         bg-red-600 text-white rounded-full hover:bg-red-500 active:bg-red-700 
                         transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-600"
                aria-label="Close menu"
              >
                <i className="fas fa-times text-lg"></i>
              </button>

              <Link
                to="/characters"
                className={`text-3xl font-medium text-gray-800 mb-8 relative group
                  transition-all duration-300 hover:text-red-600
                  ${isActive('/characters') ? 'text-red-600' : ''}`}
                onClick={closeMenu}
                aria-current={isActive('/characters') ? 'page' : undefined}
              >
                Characters
                <span className={`absolute bottom-0 left-0 h-0.5 bg-red-600 transition-all duration-300
                  ${isActive('/characters') ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </Link>
              <Link
                to="/comics"
                className={`text-3xl font-medium text-gray-800 relative group
                  transition-all duration-300 hover:text-red-600
                  ${isActive('/comics') ? 'text-red-600' : ''}`}
                onClick={closeMenu}
                aria-current={isActive('/comics') ? 'page' : undefined}
              >
                Comics
                <span className={`absolute bottom-0 left-0 h-0.5 bg-red-600 transition-all duration-300
                  ${isActive('/comics') ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
