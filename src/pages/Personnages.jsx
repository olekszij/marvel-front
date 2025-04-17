/* eslint-disable react/prop-types */
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Search from '../components/Search';

// Компонент скелетона для загрузки
const CharacterSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
    <div className="w-full h-64 bg-gray-200"></div>
    <div className="p-4">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
    </div>
  </div>
);

const Characters = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState('');
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const limit = 50;
  const containerRef = useRef(null);

  useEffect(() => {
    if (search.trim() !== '') {
      setIsSearchMode(true);
      searchCharacters();
    } else {
      setIsSearchMode(false);
      loadMoreCharacters();
    }

    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 200 &&
        !isLoading &&
        hasMore &&
        !isSearchMode
      ) {
        loadMoreCharacters();
      }
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [search]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const loadMoreCharacters = async () => {
    setIsLoading(true);
    try {
      const randomSkip = Math.floor(Math.random() * 1000);

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
        setHasMore(false);
      } else {
        setData((prevData) => [...prevData, ...filteredData]);
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching more characters:", error);
      setIsLoading(false);
    }
  };

  const searchCharacters = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://site--marvel-backend--6jkf28t7mc47.code.run/characters?name=${search}`
      );

      const filteredData = response.data.results.filter(
        (character) =>
          character.thumbnail.path !==
          'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'
      );

      setData(filteredData);

      if (filteredData.length === 0) {
        setHasMore(false);
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error searching characters:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 mt-28" ref={containerRef}>
      <Search search={search} setSearch={setSearch} />

      {isLoading && data.length === 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {[...Array(8)].map((_, index) => (
            <CharacterSkeleton key={index} />
          ))}
        </div>
      ) : (
        <>
          {data.length === 0 ? (
            <div className="text-center mt-12">
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">No characters found</h2>
              <p className="text-gray-600">Try adjusting your search or check back later</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
              {data.map((character, index) => (
                <Link
                  to={`/comics/${character._id}`}
                  key={character._id}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden relative group"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animation: 'fadeIn 0.5s ease-out forwards',
                    opacity: 0
                  }}
                >
                  <div className="relative z-10">
                    <img
                      className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-110"
                      src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                      alt={character.name}
                      loading="lazy"
                    />
                    <div className="p-4 absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h2 className="text-xl font-bold">{character.name}</h2>
                      <p className="text-sm line-clamp-2">
                        {character.description || 'No description available'}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
      )}

      {isLoading && data.length > 0 && (
        <div className="flex justify-center mt-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
        </div>
      )}

      {!hasMore && data.length > 0 && (
        <p className="text-center mt-8 text-gray-600">No more characters to load</p>
      )}

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-600"
          aria-label="Scroll to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Characters;
