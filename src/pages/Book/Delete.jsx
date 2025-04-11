import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBooks } from '../../context/BookContext';

const Delete = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getBookById, deleteBook, loading } = useBooks();

  const book = getBookById(id); // ID como string
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDelete = async () => {
    setIsSubmitting(true);
    setError('');

    try {
      const token = localStorage.getItem('access_token');

      const response = await fetch(`http://localhost:3000/books/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Erro ao apagar o livro.');
      }

      deleteBook(id); // remove do contexto
      navigate('/home');
    } catch (err) {
      console.error('Erro ao apagar livro:', err);
      setError(err.message || 'Erro desconhecido.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <p className="text-center mt-10 text-gray-600">Carregando livro...</p>;
  }

  if (!book) {
    return <p className="text-center mt-10 text-gray-600">Livro não encontrado.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-xl p-6 max-w-md w-full">
        <h1 className="text-xl font-bold text-gray-800 mb-4 text-center">Confirmar exclusão</h1>
        <p className="text-center text-gray-700 mb-6">
          Você realmente deseja excluir o livro <strong>{book.title}</strong> de{' '}
          <strong>{book.author}</strong>?
        </p>

        {error && <p className="text-center text-red-500 mb-4">{error}</p>}

        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate('/home')}
            disabled={isSubmitting}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
          >
            Cancelar
          </button>
          <button
            onClick={handleDelete}
            disabled={isSubmitting}
            className={`px-4 py-2 rounded-lg text-white ${
              isSubmitting ? 'bg-red-400' : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            {isSubmitting ? 'Apagando...' : 'Apagar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Delete;
