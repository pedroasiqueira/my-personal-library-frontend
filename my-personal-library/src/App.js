import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1 className="text-2xl font-bold text-center mt-10">Página Inicial</h1>} />
        <Route path="/sobre" element={<h1 className="text-xl text-green-600 text-center mt-10">Sobre</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
