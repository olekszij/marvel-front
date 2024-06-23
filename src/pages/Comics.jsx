import axios from 'axios';
import { useState, useEffect } from 'react';
import Search from '../components/Search';

const Comics = () => {
  const [comics, setComics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchComics = async () => {
      const name = search || '';

      try {
        const response = await axios.get(
          `https://site--marvel-backend--6jkf28t7mc47.code.run/comics?title=${name}`
        );

        setComics(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchComics();
  }, [search]);

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <main className=' flex  flex-wrap w-full  mt-24'>
      <Search search={search} setSearch={setSearch} />

      <div className='flex flex-wrap w-fit'>
        {comics.results.length === 0 && (
          <div className=' w-full p-4   '>
            <p className='text-center mt-40  mb-20 text-xl'>
              <span className='mt-40 text-7xl'>🚧</span>
              <br />
              Unfortunately, I couldn&lsquo;t find anything based on your
              request
            </p>
          </div>
        )}
        {comics.results.map((comic) => (
          <div
            className=' w-1/3 p-1 rounded  group relative  overflow-hidden'
            key={comic._id}
          >
            <img
              className=' w-full rounded '
              src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              alt={comic.title}
            />
            <div className='space-y-3 absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 bg-black bg-opacity-75 text-white transition-opacity duration-300 '>
              <h2 className=' text-xl uppercase font-bold mb-4'>
                {comic.title}
              </h2>
              <p className=' text-balance line-clamp-3 '>
                {' '}
                {comic.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Comics;
