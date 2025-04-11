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

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = { ...formData, id: Date.now() };
    addBook(newBook);
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Adicionar Novo Livro</h1>
        <BookForm
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Create;
