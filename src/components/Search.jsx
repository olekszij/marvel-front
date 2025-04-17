import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const Search = ({ search, setSearch }) => {
  const location = useLocation();
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  // Сбрасываем поисковый запрос при изменении маршрута
  useEffect(() => {
    setSearch('');
  }, [location, setSearch]);

  const handleClear = () => {
    setSearch('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      handleClear();
    }
  };

  return (
    <div
      className={`relative w-full max-w-lg transition-all duration-300 ease-in-out
        ${isFocused ? 'scale-105' : 'scale-100'}`}
    >
      <div
        className={`relative bg-gray-100 rounded-full p-2 transition-all duration-300
          ${isFocused ? 'shadow-lg ring-2 ring-red-500' : 'hover:shadow-md'}`}
      >
        <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
        <input
          ref={inputRef}
          className="w-full h-10 pl-12 pr-10 bg-transparent text-gray-700 placeholder-gray-500 rounded-full focus:outline-none transition-all duration-300"
          type="text"
          placeholder="Search characters..."
          onChange={(e) => setSearch(e.target.value)}
          value={search || ''}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          aria-label="Search characters"
        />
        {search && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-full p-1"
            aria-label="Clear search"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        )}
      </div>
      {isFocused && (
        <div className="absolute left-0 right-0 mt-2 text-sm text-gray-500 text-center">
          Press <kbd className="px-2 py-1 bg-gray-200 rounded">Esc</kbd> to clear
        </div>
      )}
    </div>
  );
};

Search.propTypes = {
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired
};

export default Search;

