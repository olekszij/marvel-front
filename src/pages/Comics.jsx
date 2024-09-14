import axios from 'axios';
import { useState, useEffect } from 'react';
import Search from '../components/Search';

const Comics = () => {
  const [comics, setComics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // Функция для загрузки комиксов
  const fetchComics = async (reset = false) => {
    try {
      setIsLoading(true); // Включаем состояние загрузки

      if (reset) {
        setSkip(0);
        setComics([]); // Сбрасываем текущий список комиксов при новом поиске
        setHasMore(true);
      }

      const response = await axios.get(
        `https://site--marvel-backend--6jkf28t7mc47.code.run/comics?title=${search}&skip=${reset ? 0 : skip}&limit=20`
      );

      const newComics = response.data.results.filter(
        (comic) => comic.thumbnail.path !== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'
      );

      if (newComics.length === 0) {
        setHasMore(false); // Останавливаем загрузку, если больше нет данных
      }

      setComics((prevComics) => (reset ? newComics : [...prevComics, ...newComics]));
      setIsLoading(false); // Выключаем состояние загрузки
    } catch (error) {
      console.error('Error fetching comics:', error);
      setIsLoading(false); // Выключаем состояние загрузки при ошибке
    }
  };

  // Обновляем список при изменении строки поиска
  useEffect(() => {
    fetchComics(true); // Каждый раз при изменении поискового запроса сбрасываем данные
  }, [search]);

  // Функция для подгрузки дополнительных комиксов при скролле
  const loadMoreComics = () => {
    if (hasMore && !isLoading) {
      setSkip((prevSkip) => prevSkip + 20);
      fetchComics();
    }
  };

  // Обработчик скролла для подгрузки
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 200) {
        loadMoreComics();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading, hasMore]);

  return (
    <main className="container mx-auto p-4 mt-28">
      <Search search={search} setSearch={setSearch} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
        {comics.length === 0 && !isLoading && (
          <div className="w-full p-4">
            <p className="text-center mt-40 mb-20 text-xl">
              <span className="text-7xl">🚧</span>
              <br />
              Unfortunately, I couldn&lsquo;t find anything based on your request
            </p>
          </div>
        )}

        {comics.map((comic, index) => (
          <div
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            key={`${comic._id}-${index}`} // Уникальный ключ для каждого элемента списка
          >
            <img
              className="w-full h-auto object-cover"
              src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              alt={comic.title}
            />
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-900">{comic.title}</h2>
            </div>
          </div>
        ))}
      </div>

      {isLoading && <h1>Loading more comics...</h1>}
    </main>
  );
};

export default Comics;
