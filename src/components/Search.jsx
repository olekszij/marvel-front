// eslint-disable-next-line react/prop-types

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const Search = ({ search, setSearch }) => {
  const location = useLocation();

  useEffect(() => {
    setSearch('');
  }, [location, setSearch]);

  return (
    <div className='fixed top-10 right-10 transform -translate-y-1/2 bg-white p-4 shadow-lg rounded z-50'>
      <div className='flex items-center'>
        <i className='fa-solid fa-magnifying-glass mr-2'></i>
        <input
          className='peer h-full w-50 outline-none text-sm text-gray-700 pr-7 pl-6 border-gray-300'
          type='text'
          placeholder='Recherche'
          onChange={(e) => setSearch(e.target.value)}
          value={search || ''}
        />
      </div>
    </div>
  );
};

export default Search;
