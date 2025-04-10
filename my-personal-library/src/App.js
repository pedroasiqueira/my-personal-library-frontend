import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register'; // se quiser usar depois

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sobre" element={<h1 className="text-xl text-green-600 text-center mt-10">Sobre</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
