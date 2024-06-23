import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useState } from 'react';

import './App.css';

// Pages
import Personnages from './pages/Personnages';
import Comics from './pages/Comics';
import Comicslist from './pages/Comicslist';
import Favorits from './pages/Favorits';
import Profile from './pages/Profile';
import Signup from './pages/Signup';

// Components
import Header from './components/Header';

function App() {
  const [token, setToken] = useState(() => Cookies.get('marvel-token') ?? null);

  const handleToken = (token) => {
    if (token) {
      Cookies.set('marvel-token', token, { expires: 15 });
      setToken(token);
    } else {
      Cookies.remove('marvel-token');
      setToken(null);
    }
  };

  return (
    <Router>
      <Header />

      <Routes>
        <Route path='/' element={<Personnages />} />
        <Route path='/comics' element={<Comics />} />
        <Route path='/characters/:id' element={<Comicslist />} />
        <Route path='/comics/:id' element={<Comicslist />} />
        <Route path='/favorites' element={<Favorits />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/signup' element={<Signup handleToken={handleToken} />} />
      </Routes>
    </Router>
  );
}

export default App;
