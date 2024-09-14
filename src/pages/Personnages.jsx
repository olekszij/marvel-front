/* eslint-disable react/prop-types */
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Search from '../components/Search'; 

const Characters = () => {
  const [data, setData] = useState([]); // Массив персонажей
  const [isLoading, setIsLoading] = useState(false); // Состояние загрузки
  const [skip, setSkip] = useState(50); // Смещение для запроса новых данных
  const [hasMore, setHasMore] = useState(true); // Состояние для отслеживания, есть ли еще данные для загрузки
  const [search, setSearch] = useState(''); // Состояние для поискового запроса
  const [isSearchMode, setIsSearchMode] = useState(false); // Режим поиска
  const limit = 50; // Лимит персонажей за один запрос

  useEffect(() => {
    if (search.trim() !== '') {
      // Если есть поисковый запрос, включаем режим поиска
      setIsSearchMode(true);
      searchCharacters();
    } else {
      // Иначе используем логику подгрузки персонажей
      setIsSearchMode(false);
      loadMoreCharacters();
    }

    window.addEventListener('scroll', handleScroll); // Добавляем обработчик скролла
    return () => {
      window.removeEventListener('scroll', handleScroll); // Очищаем обработчик скролла при размонтировании компонента
    };
  }, [search]); // Выполняем эффект при изменении поискового запроса

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 200 &&
      !isLoading && 
      hasMore && 
      !isSearchMode // Подгрузка работает только если мы не в режиме поиска
    ) {
      loadMoreCharacters(); // Загружаем больше данных
    }
  };

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const loadMoreCharacters = async () => {
    setIsLoading(true); // Включаем индикатор загрузки
    try {
      // Получаем случайное смещение, чтобы загружать случайных персонажей
      const randomSkip = Math.floor(Math.random() * 1000); // Диапазон можно настроить

      const response = await axios.get(
        `https://site--marvel-backend--6jkf28t7mc47.code.run/characters?limit=${limit}&skip=${randomSkip}`
      );

      const filteredData = shuffle(
        response.data.results.filter(
          (character) =>
            character.thumbnail.path !==
            'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available' &&
            !data.some((existingChar) => existingChar._id === character._id)
        )
      );

      if (filteredData.length === 0) {
        setHasMore(false); // Если новых персонажей нет, останавливаем дальнейшую загрузку
      } else {
        setData((prevData) => [...prevData, ...filteredData]); // Добавляем уникальных персонажей в массив данных
        setSkip((prevSkip) => prevSkip + limit); // Увеличиваем skip для следующего запроса
      }

      setIsLoading(false); // Отключаем индикатор загрузки
    } catch (error) {
      console.error("Error fetching more characters:", error);
      setIsLoading(false); // Отключаем индикатор загрузки в случае ошибки
    }
  };

  const searchCharacters = async () => {
    setIsLoading(true); // Включаем индикатор загрузки
    try {
      const response = await axios.get(
        `https://site--marvel-backend--6jkf28t7mc47.code.run/characters?name=${search}`
      );

      const filteredData = response.data.results.filter(
        (character) =>
          character.thumbnail.path !==
          'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'
      );

      setData(filteredData); // Заменяем данные найденными персонажами

      if (filteredData.length === 0) {
        setHasMore(false); // Если новых персонажей нет, останавливаем дальнейшую загрузку
      }

      setIsLoading(false); // Отключаем индикатор загрузки
    } catch (error) {
      console.error("Error searching characters:", error);
      setIsLoading(false); // Отключаем индикатор загрузки в случае ошибки
    }
  };

  return (
    <div className="container mx-auto p-4 mt-28">
      {/* Компонент поиска */}
      <Search search={search} setSearch={setSearch} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {data.length === 0 && !isLoading && (
          <p>No characters available.</p>
        )}

        {data.map((character) => (
          <Link
            to={`/comics/${character._id}`} // Переход на страницу комиксов персонажа
            key={character._id}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 overflow-hidden relative group"
          >
            <div className="relative z-10">
              <img
                className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-110"
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                alt={character.name}
              />
              <div className="p-4 absolute bottom-0 left-0 right-0 bg-white bg-opacity-80 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                <h2 className="text-xl font-bold text-gray-900">{character.name}</h2>
                <p className="text-sm text-gray-600 mb-2">
                  {character.description
                    ? character.description
                    : ''}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {isLoading && <h1>Loading more characters...</h1>} {/* Показать индикатор при загрузке */}
      {!hasMore && <p className="text-center mt-4">No more characters to load.</p>} {/* Сообщение, когда больше нет данных */}
    </div>
  );
};

export default Characters;
