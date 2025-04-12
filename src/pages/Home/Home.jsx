import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooks } from '../../context/BookContext';
import { Star, Trash2, Pencil } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import PdfContent from '../../components/PdfContent';
import ReactDOMServer from 'react-dom/server';

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

  const exportToPdf = () => {
    const html = ReactDOMServer.renderToStaticMarkup(<PdfContent books={books} />);
    const container = document.createElement('div');
    container.innerHTML = html;
    document.body.appendChild(container);

    html2pdf()
      .set({
        margin: 10,
        filename: 'meus-livros.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      })
      .from(container)
      .save()
      .then(() => {
        document.body.removeChild(container);
      });
  };


  return (
    <div className="min-h-[calc(100vh-56px)] p-4 md:p-8 bg-gradient-to-b from-indigo-100/60 via-purple-100/40 to-pink-100/20">
      <div className="max-w-5xl mx-auto">
        <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 text-center sm:text-left">
          <h1 className="text-2xl font-bold text-gray-800">Minha Estante Digital</h1>

          {!loading && books.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={exportToPdf}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition"
              >
                Exportar PDF
              </button>
              <button
                onClick={() => navigate('/create')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
              >
                Adicionar Livro
              </button>
            </div>
          )}
        </header>

        {loading ? (
          <p className="text-center text-gray-600">Carregando livros...</p>
        ) : books.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center bg-white/60 backdrop-blur rounded-xl p-10 shadow-sm border border-dashed border-gray-300">
            <div className="text-5xl mb-4 animate-bounce">📚</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Vamos adicionar seu primeiro livro!
            </h2>
            <p className="text-gray-600 mb-4 max-w-xs">
              Comece sua estante digital com um novo título. É rápido e fácil!
            </p>
            <button
              onClick={() => navigate('/create')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
            >
              Adicionar Livro
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
            {books.map((book) => (
              <article
                key={book._id}
                className="relative flex flex-col justify-between rounded-2xl border border-gray-200 bg-white/60 backdrop-blur shadow-sm transition hover:shadow-lg hover:-translate-y-1"
              >
                {/* corpo do card */}
                <div className="p-5">
                  <h2 className="text-lg font-bold text-gray-800 line-clamp-2">{book.title}</h2>
                  <p className="mt-1 text-sm text-gray-500">Autor: {book.author}</p>

                  {/* badge de status */}
                  <span
                    className={`mt-3 inline-flex items-center gap-1 rounded-full px-3 py-0.5 text-xs font-semibold ${getStatusColor(
                      book.status
                    )}`}
                  >
                    {/* pontinho de cor */}
                    <span className="h-1.5 w-1.5 rounded-full bg-current"></span>
                    {book.status}
                  </span>

                  {/* avaliação */}
                  {book.avaliation > 0 && (
                    <div className="mt-3 flex gap-1 text-yellow-400" title="Avaliação">
                      {Array.from({ length: book.avaliation }).map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current stroke-none" />
                      ))}
                    </div>
                  )}
                </div>

                {/* botões */}
                <div className="flex justify-end gap-2 border-t border-gray-200 p-4">
                  <button
                    onClick={() => navigate(`/edit/${book._id}`)}
                    className="flex items-center gap-1 rounded-lg bg-yellow-500 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-yellow-600"
                  >
                    <Pencil className="h-4 w-4" />
                    Editar
                  </button>
                  <button
                    onClick={() => navigate(`/delete/${book._id}`)}
                    className="flex items-center gap-1 rounded-lg bg-red-500 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                    Apagar
                  </button>
                </div>
              </article>
            ))}
          </div>

        )}
      </div>
    </div>
  );
};

export default Home;