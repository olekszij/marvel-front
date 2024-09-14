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
    <main className="container mx-auto p-4 mt-28">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((comic) => (
          <div
            key={comic._id}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden relative group"
          >
            {/* Контейнер изображения без фиксированной высоты */}
            <div className="relative w-full">
              <img
                className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105" 
                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                alt={comic.title}
              />
            </div>
            {/* Текст карточки */}
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-900 mb-1">
                {comic.title}
              </h2>
            
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Comicslist;
