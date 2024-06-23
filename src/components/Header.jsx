import Logo from '../assets/img/logo.png';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='flex justify-between w-full mx-auto p-4  pl-10 pr-96 fixed top-10  transform -translate-y-1/2 shadow-lg rounded z-50 bg-white '>
      <Link to='/'>
        <img className='w-40  ' src={Logo} alt='Logo' />
      </Link>

      <nav>
        <ul className='flex gap-4 p-2'>
          <Link to='/'>
            <li className='p-2 hover:border-none hover:bg-slate-200 rounded-md'>
              Home
            </li>
          </Link>

          <Link to='/'>
            <li className='p-2 hover:border-none hover:bg-slate-200 rounded-md'>
              Characters
            </li>
          </Link>

          <Link to='/comics'>
            <li className='p-2 hover:border-none hover:bg-slate-200 rounded-md'>
              Comics
            </li>
          </Link>

          <Link to='/favorites'>
            <li className='p-2 hover:border-none hover:bg-slate-200 rounded-md'>
              <i className='fa-regular fa-heart'></i>
            </li>
          </Link>

          <Link to='/profile'>
            <li className='p-2 hover:border-none hover:bg-slate-200 rounded-md'>
              <i className='fa-regular fa-user'></i>{' '}
            </li>
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
