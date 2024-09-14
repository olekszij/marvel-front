import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Pages
import Personnages from './pages/Personnages';
import Comics from './pages/Comics';
import Comicslist from './pages/Comicslist';

// Components
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        {/* Главная страница с персонажами */}
        <Route path="/" element={<Personnages />} />
        
        {/* Маршрут для страницы Characters (Персонажи) */}
        <Route path="/characters" element={<Personnages />} />
        
        {/* Страница с комиксами */}
        <Route path="/comics" element={<Comics />} />
        
        {/* Страница отдельного комикса */}
        <Route path="/comics/:id" element={<Comicslist />} />
      </Routes>
    </Router>
  );
}

export default App;

