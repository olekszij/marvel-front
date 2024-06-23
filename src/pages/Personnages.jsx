/* eslint-disable react/prop-types */
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Search from '../components/Search';

const Personnages = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchPersonnages = async () => {
      try {
        const name = search || '';

        const response = await axios.get(
          `https://site--marvel-backend--6jkf28t7mc47.code.run/characters?name=${name}`
        );

        if (response.data && response.data.results) {
          setData(response.data);
        } else {
          console.error('Invalid response data');
          setData(null);
        }
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setData(null);
      }
    };
    fetchPersonnages();
  }, [search]);

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <main className=' flex  flex-wrap w-fit mx-auto  mt-24'>
      <Search search={search} setSearch={setSearch} />

      {data === null && (
        <div className=' w-full p-4   '>
          <p className='text-center mt-40  mb-20 text-xl'>
            <span className='mt-40 text-7xl'>🚧</span>
            <br />
            Sorry, we couldn&lsquo;t find anything based on your request
          </p>
        </div>
      )}

      {data &&
        data.results &&
        data.results.map((personnage) => (
          <div className=' w-1/3  overflow-hidden' key={personnage._id}>
            <Link
              to={`/comics/${personnage._id}`}
              key={personnage._id}
              className='shadow-md'
            >
              <div className=' p-1 rounded  group relative  overflow-hidden'>
                <img
                  className='w-full  rounded'
                  src={`${personnage.thumbnail.path}.${personnage.thumbnail.extension}`}
                  alt={personnage.name}
                />
                <div className=' space-y-3 absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 bg-black bg-opacity-75 text-white transition-opacity duration-300  '>
                  <h3 className='text-xl uppercase font-bold mb-4'>
                    {personnage.name}
                  </h3>

                  <p className=' text-balance line-clamp-3 '>
                    {personnage.description}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
    </main>
  );
};

export default Personnages;
