import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooks } from '../../context/BookContext';
import { Star, Trash2, Pencil } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const { books, loading } = useBooks();


  const getStatusColor = (status) => {
    switch (status) {
      case 'lido':
        return 'bg-green-100 text-green-700';
      case 'lendo':
        return 'bg-yellow-100 text-yellow-700';
      case 'quero ler':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-gray-100 min-h-[calc(100vh-56px)] p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Minha Estante Digital</h1>
          <button
            onClick={() => navigate('/create')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            Adicionar Livro
          </button>
        </header>

        {loading ? (
          <p className="text-center text-gray-600">Carregando livros...</p>
        ) : (
          <div className="space-y-4">
            {books.map((book) => (
              <div
                key={book.id}
                className="bg-white shadow-md rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center"
              >
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">{book.title}</h2>
                  <p className="text-gray-600">Autor: {book.author}</p>
                </div>
                <div className="flex flex-col sm:items-end sm:text-right mt-2 sm:mt-0">
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      book.status
                    )}`}
                  >
                    {book.status}
                  </span>
                  {book.avaliation > 0 && (
                    <div
                      className="mt-1 flex space-x-1 cursor-default"
                      title="Avaliação"
                    >
                      {Array.from({ length: book.avaliation }).map((_, i) => (
                        <Star  key={i} className="w-5 h-5 text-yellow-500 fill-current stroke-none" />
                      ))}
                    </div>
                  )}
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => navigate(`/edit/${book._id}`)}
                      className="flex items-center gap-1 text-sm bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md"
                    ><Pencil className="w-3.5 mr-1" />
                      Editar
                    </button>
                    <button
                      onClick={() => navigate(`/delete/${book._id}`)}
                      className="flex items-center text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                    ><Trash2 className="w-4 mr-1" />
                      Apagar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;