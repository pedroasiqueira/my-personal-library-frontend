import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBooks } from '../../context/BookContext';
import BookForm from '../../components/BookForm';

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getBookById, editBook, loading } = useBooks();

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
    setIsSubmitting(true);
    setError('');

    try {
      const token = localStorage.getItem('access_token');

      const updatedData = { ...formData, _id: id };

      // Remove campos opcionais se não preenchidos
      if (!updatedData.endDate) delete updatedData.endDate;
      if (!updatedData.avaliation || updatedData.avaliation === 0) delete updatedData.avaliation;

      const response = await fetch(`http://localhost:3000/books/${id}`, {
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
      console.error('Erro ao editar livro:', err);
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
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Editar Livro</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <BookForm
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          isEdit
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};

export default Edit;
