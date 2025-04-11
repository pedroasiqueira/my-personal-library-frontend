import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookForm from '../../components/BookForm';
import { useBooks } from '../../context/BookContext';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('access_token');
      const cleanData = { ...formData };

      // Remove campos opcionais se estiverem vazios
      if (!cleanData.endDate) delete cleanData.endDate;
      if (!cleanData.avaliation || cleanData.avaliation === 0) delete cleanData.avaliation;

      const response = await fetch('http://localhost:3000/books', {
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
      console.error('Erro ao criar livro:', err);
      setError(err.message || 'Erro desconhecido.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-[calc(100vh-56px)] p-4 md:p-8 p-4 md:p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Adicionar Novo Livro</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <BookForm
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          isSubmitting={loading}
        />
      </div>
    </div>
  );
};

export default Create;
