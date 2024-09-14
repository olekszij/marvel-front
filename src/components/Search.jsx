import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Search = ({ search, setSearch }) => {
  const location = useLocation();

  // Сбрасываем поисковый запрос при изменении маршрута
  useEffect(() => {
    setSearch('');
  }, [location, setSearch]);

  return (
    <div className="relative w-full max-w-lg bg-gray-100 rounded-full p-2 transition-shadow duration-300 ease-in-out hover:shadow-lg">
      <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
      <input
        className="w-full h-10 pl-12 pr-4 bg-gray-100 text-gray-700 placeholder-gray-500 rounded-full  focus:outline-none transition-all duration-300"
        type="text"
        placeholder="Search"
        onChange={(e) => setSearch(e.target.value)}
        value={search || ''}
      />
    </div>
  );
};

export default Search;

