import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Comicslist = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchComics = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--6jkf28t7mc47.code.run/comics/${id}`
        );

        setData(response.data.comics);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchComics();
  }, [id]);

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <main className='comicslist flex flex-wrap w-fit mt-24'>
      {data.map((comic) => (
        <div key={comic._id} className='w-1/3 p-4 border-2 '>
          <img
            src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
            alt={comic.title}
          />
          <h2 className=' font-bold mb-2 uppercase'>{comic.title}</h2>
          <p className=' text-balance line-clamp-3 '>{comic.description}</p>
        </div>
      ))}
    </main>
  );
};

export default Comicslist;
