import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBooks } from '../../context/BookContext';
import BookForm from '../../components/BookForm';
import ErrorMessage from '../Auth/ErrorMessage';
import { getErrorMessage } from '../../utils/getErrorMessage';

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getBookById, editBook, loading } = useBooks();
  const apiUrl = process.env.REACT_APP_API_URL;

  const book = getBookById(id);

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    startDate: '',
    endDate: '',
    status: '',
    avaliation: 0,
  });

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (book) setFormData({ ...book });
  }, [book]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.avaliation === 0) {
      setError('Por favor, selecione uma avaliação.');
      return;
    }
    setIsSubmitting(true);
    setError('');

    try {
      const token = localStorage.getItem('access_token');

      const updatedData = { ...formData, _id: id };

      // Remove campos opcionais se não preenchidos
      if (!updatedData.endDate) delete updatedData.endDate;
      if (!updatedData.avaliation || updatedData.avaliation === 0) delete updatedData.avaliation;

      const response = await fetch(`${apiUrl}/books/${id}`, {
        method: 'PATCH', // <- atualizado para PATCH
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Erro ao editar livro.');
      }

      const updatedBook = await response.json();
      editBook(id, updatedBook); // atualiza no contexto
      navigate('/home');
    } catch (err) {
      setError(getErrorMessage(err, 'Erro ao criar livro.'));
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
    <div className="min-h-[calc(100vh-56px)] p-4 md:p-8 bg-gradient-to-b from-indigo-100/60 via-purple-100/40 to-pink-100/20">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Editar Livro</h1>
        {error && !error.toLowerCase().includes('avaliação') && (
          <ErrorMessage message={error} />
        )}

        <BookForm
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          isEdit
          isSubmitting={isSubmitting}
          error={error}
        />
      </div>
    </div>
  );
};

export default Edit;
