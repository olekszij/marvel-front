import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path || (path !== '/comics' && location.pathname.startsWith(path));
    };

    return (
        <nav className="bg-red-600 text-white shadow-lg fixed w-full z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center space-x-3">
                        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M21.91,4.09C19.97,2.15,17.07,1,14,1S8.03,2.15,6.09,4.09C4.15,6.03,3,8.93,3,12s1.15,5.97,3.09,7.91C8.03,21.85,10.93,23,14,23 s5.97-1.15,7.91-3.09C23.85,17.97,25,15.07,25,12S23.85,6.03,21.91,4.09z M14,21c-4.96,0-9-4.04-9-9s4.04-9,9-9s9,4.04,9,9 S18.96,21,14,21z" />
                        </svg>
                        <span className="text-xl font-bold">Marvel Explorer</span>
                    </Link>

                    <div className="flex space-x-8">
                        <Link
                            to="/characters"
                            className={`text-lg font-medium hover:text-red-200 transition-colors duration-200 ${isActive('/characters') ? 'text-white border-b-2 border-white' : 'text-red-100'
                                }`}
                        >
                            Characters
                        </Link>
                        <Link
                            to="/comics"
                            className={`text-lg font-medium hover:text-red-200 transition-colors duration-200 ${isActive('/comics') ? 'text-white border-b-2 border-white' : 'text-red-100'
                                }`}
                        >
                            Comics
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar; 