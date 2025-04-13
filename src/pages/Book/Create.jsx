import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookForm from '../../components/BookForm';
import { useBooks } from '../../context/BookContext';
import { useEffect } from 'react';
import ErrorMessage from '../Auth/ErrorMessage';
import { getErrorMessage } from '../../utils/getErrorMessage';


const Create = () => {
  const navigate = useNavigate();
  const { addBook } = useBooks();

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    startDate: '',
    endDate: '',
    status: '',
    avaliation: 0,
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!searchTerm) return setSearchResults([]);
      setSearching(true);
  
      try {
        const res = await fetch(`${apiUrl}/google-books/search?q=${encodeURIComponent(searchTerm)}`);
        const data = await res.json();
        setSearchResults(data);
      } catch (err) {
        console.error('Erro ao buscar sugestões:', err);
      } finally {
        setSearching(false);
      }
    };
  
    const delay = setTimeout(fetchSuggestions, 500); // debounce
    return () => clearTimeout(delay);
  }, [searchTerm, apiUrl]);

  const handleSuggestionClick = (book) => {
    setFormData((prev) => ({
      ...prev,
      title: book.title || '',
      author: book.authors?.[0] || '',
    }));
    setSearchTerm('');
    setSearchResults([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.avaliation === 0) {
      setError('Por favor, selecione uma avaliação.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('access_token');
      const cleanData = { ...formData };

      // Remove campos opcionais se estiverem vazios
      if (!cleanData.endDate) delete cleanData.endDate;
      if (!cleanData.avaliation || cleanData.avaliation === 0) delete cleanData.avaliation;

      const response = await fetch(`${apiUrl}/books`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cleanData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Erro ao criar livro.');
      }

      const newBook = await response.json();
      addBook(newBook); // adiciona no contexto
      navigate('/home');
    } catch (err) {
      setError(getErrorMessage(err, 'Erro ao criar livro.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-56px)] p-4 md:p-8 bg-gradient-to-b from-indigo-100/60 via-purple-100/40 to-pink-100/20 p-4 md:p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Adicionar Novo Livro</h1>
        {error && !error.toLowerCase().includes('avaliação') && (
          <ErrorMessage message={error} />
        )}

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Buscar livro no Google Books</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Digite o título do livro"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />

          {searching && (
            <p className="text-sm text-gray-500 mt-1">Buscando...</p>
          )}

          {searchResults.length > 0 && (
            <ul className="mt-2 border border-gray-300 rounded-lg divide-y bg-white max-h-60 overflow-y-auto shadow">
              {searchResults.map((book, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(book)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  <strong>{book.title}</strong>
                  {book.authors && <span className="text-sm text-gray-600"> – {book.authors.join(', ')}</span>}
                </li>
              ))}
            </ul>
          )}
        </div>

        <BookForm
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          isSubmitting={loading}
          error={error}
        />
      </div>
    </div>
  );
};

export default Create;
