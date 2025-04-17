import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ComicDetail = () => {
    const { id } = useParams();
    const [comic, setComic] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchComic = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await axios.get(`https://site--marvel-backend--6jkf28t7mc47.code.run/comic/${id}`);
                setComic(response.data);
            } catch (err) {
                setError('Failed to load comic details. Please try again later.');
                console.error('Error fetching comic:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchComic();
    }, [id]);

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 pt-24 flex justify-center items-center min-h-[60vh]">
                <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 pt-24">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <span className="block sm:inline">{error}</span>
                </div>
            </div>
        );
    }

    if (!comic) {
        return (
            <div className="container mx-auto px-4 pt-24">
                <div className="text-center text-gray-600">Comic not found</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 pt-24 pb-12">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="md:flex">
                    {/* Comic Cover */}
                    <div className="md:w-1/3">
                        <div className="relative pb-[150%] md:pb-[150%]">
                            <img
                                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                                alt={comic.title}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Comic Details */}
                    <div className="md:w-2/3 p-6">
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">{comic.title}</h1>
                            {comic.description && (
                                <p className="text-gray-700 text-lg mb-4">{comic.description}</p>
                            )}
                        </div>

                        {/* Additional Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {comic.characters && comic.characters.length > 0 && (
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900 mb-3">Featured Characters</h2>
                                    <div className="space-y-2">
                                        {comic.characters.map(character => (
                                            <Link
                                                key={character}
                                                to={`/characters/${character}`}
                                                className="block text-red-600 hover:text-red-800 transition-colors duration-200"
                                            >
                                                {character}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-3">Details</h2>
                                <div className="space-y-2 text-gray-700">
                                    {comic.pageCount > 0 && (
                                        <p>Pages: {comic.pageCount}</p>
                                    )}
                                    {comic.price && (
                                        <p>Price: ${comic.price}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Back Button */}
            <div className="mt-8">
                <Link
                    to="/comics"
                    className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Comics
                </Link>
            </div>
        </div>
    );
};

export default ComicDetail; 