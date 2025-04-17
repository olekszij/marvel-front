import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Characters = () => {
    const [characters, setCharacters] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const observer = useRef();
    const searchTimeout = useRef(null);
    const characterIds = useRef(new Set());

    // Debounce search
    useEffect(() => {
        if (searchTimeout.current) clearTimeout(searchTimeout.current);
        searchTimeout.current = setTimeout(() => {
            setDebouncedSearch(searchQuery);
        }, 500);
        return () => {
            if (searchTimeout.current) clearTimeout(searchTimeout.current);
        };
    }, [searchQuery]);

    // Reset when search changes
    useEffect(() => {
        setCharacters([]);
        setPage(0);
        setHasMore(true);
        characterIds.current.clear();
    }, [debouncedSearch]);

    const loadCharacters = useCallback(async () => {
        if (isLoading || !hasMore) return;

        setIsLoading(true);
        setError(null);

        try {
            const endpoint = debouncedSearch
                ? `https://site--marvel-backend--6jkf28t7mc47.code.run/characters?name=${encodeURIComponent(debouncedSearch)}`
                : `https://site--marvel-backend--6jkf28t7mc47.code.run/characters?limit=20&skip=${page * 20}`;

            const response = await axios.get(endpoint);

            if (!response.data.results || response.data.results.length === 0) {
                setHasMore(false);
                return;
            }

            // Filter out invalid images and duplicates
            const newCharacters = response.data.results.filter(char => {
                if (!char._id ||
                    characterIds.current.has(char._id) ||
                    char.thumbnail.path === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available') {
                    return false;
                }
                characterIds.current.add(char._id);
                return true;
            });

            if (newCharacters.length === 0) {
                setHasMore(false);
                return;
            }

            setCharacters(prev => [...prev, ...newCharacters]);
            setPage(prev => prev + 1);
        } catch (err) {
            setError('Failed to load characters. Please try again later.');
            console.error('Error loading characters:', err);
        } finally {
            setIsLoading(false);
        }
    }, [debouncedSearch, page, isLoading, hasMore]);

    const lastCharacterRef = useCallback(node => {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                loadCharacters();
            }
        });
        if (node) observer.current.observe(node);
    }, [isLoading, hasMore, loadCharacters]);

    // Initial load
    useEffect(() => {
        loadCharacters();
    }, [debouncedSearch]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="container mx-auto px-4 pt-24 pb-12">
            <div className="mb-8">
                <input
                    type="text"
                    placeholder="Search characters..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
            </div>

            {error && (
                <div className="text-red-500 mb-4">{error}</div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {characters.map((character, index) => (
                    <Link
                        key={`${character._id}-${index}`}
                        to={`/characters/${character._id}`}
                        ref={index === characters.length - 1 ? lastCharacterRef : null}
                        className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
                    >
                        <div className="relative pb-[100%]">
                            <img
                                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                                alt={character.name}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <h2 className="absolute bottom-0 left-0 right-0 p-4 text-white font-bold text-lg">
                                {character.name}
                            </h2>
                        </div>
                    </Link>
                ))}
            </div>

            {isLoading && (
                <div className="flex justify-center my-8">
                    <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}

            {!hasMore && characters.length > 0 && (
                <div className="text-center text-gray-600 mt-8">
                    No more characters to load
                </div>
            )}

            {!isLoading && characters.length === 0 && (
                <div className="text-center text-gray-600 mt-8">
                    No characters found
                </div>
            )}
        </div>
    );
};

export default Characters; 