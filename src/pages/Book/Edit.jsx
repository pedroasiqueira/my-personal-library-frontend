import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBooks } from '../../context/BookContext';
import BookForm from '../../components/BookForm';

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getBookById, editBook } = useBooks();

  const book = getBookById(Number(id));

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    startDate: '',
    endDate: '',
    status: '',
    avaliation: 0,
  });

  useEffect(() => {
    if (book) setFormData({ ...book });
  }, [book]);

  const handleSubmit = (e) => {
    e.preventDefault();
    editBook(Number(id), formData);
    navigate('/home');
  };

  if (!book) {
    return <p className="text-center mt-10 text-gray-600">Livro não encontrado.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Editar Livro</h1>
        <BookForm
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          isEdit
        />
      </div>
    </div>
  );
};

export default Edit;
