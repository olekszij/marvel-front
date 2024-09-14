import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Search = ({ search, setSearch }) => {
  const location = useLocation();

  // Сбрасываем поисковый запрос при изменении маршрута
  useEffect(() => {
    setSearch(''); // Проверяем, что setSearch передан правильно
  }, [location, setSearch]);

  return (
    <div className="w-full md:w-auto flex items-center bg-white p-2 shadow-md rounded-md mt-4 md:mt-0 border-2 border-gray-600">
      <i className="fa-solid fa-magnifying-glass mr-2 text-gray-600"></i>
      <input
        className="w-full md:w-64 h-8 px-2 text-sm outline-none border-none text-gray-700 placeholder-gray-600 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-gray-600 focus:outline-none rounded-md"
        type="text"
        placeholder="Search"
        onChange={(e) => setSearch(e.target.value)} // Используем setSearch для обновления состояния
        value={search || ''}
      />
    </div>
  );
};

export default Search;
