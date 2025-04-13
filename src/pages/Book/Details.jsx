import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('access_token');

  const [book, setBook] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const bookRes = await fetch(`${apiUrl}/books/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const bookData = await bookRes.json();
        setBook(bookData);

        const commentsRes = await fetch(`${apiUrl}/books/${id}/comments`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const commentsData = await commentsRes.json();
        setComments(commentsData);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const res = await fetch(`${apiUrl}/books/${id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: newComment }),
      });

      if (!res.ok) throw new Error('Erro ao enviar comentário');

      const created = await res.json();
      setComments((prev) => [created, ...prev]);
      setNewComment('');
    } catch (err) {
      console.error(err);
      alert('Erro ao enviar comentário.');
    }
  };

  if (loading) {
    return <p className="text-center mt-10 text-gray-600">Carregando...</p>;
  }

  if (!book) {
    return <p className="text-center mt-10 text-red-500">Livro não encontrado.</p>;
  }

  return (
    <div className="min-h-[calc(100vh-56px)] p-4 md:p-8 bg-gradient-to-b from-indigo-400/60 via-purple-400/40 to-pink-400/20">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6 space-y-6">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:underline text-sm"
        >
          ← Voltar
        </button>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-800">{book.title}</h1>
          <p className="text-gray-600">Autor: {book.author}</p>
          <p className="text-gray-600">Status: {book.status}</p>
          <p className="text-gray-600">Data de início: {new Date(book.startDate).toLocaleDateString('pt-BR')}</p>
          {book.endDate && (
            <p className="text-gray-600">Data de término: {new Date(book.endDate).toLocaleDateString('pt-BR')}</p>
          )}

          {book.avaliation > 0 && (
            <div className="flex gap-1 text-yellow-400">
              {Array.from({ length: book.avaliation }).map((_, i) => (
                <span key={i} className="text-xl">★</span>
              ))}
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Comentários</h2>

          <form onSubmit={handleCommentSubmit} className="mb-6 space-y-2">
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite seu comentário..."
              rows={3}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg"
            >
              Enviar comentário
            </button>
          </form>

          {comments.length === 0 ? (
            <p className="text-sm text-gray-500">Nenhum comentário ainda.</p>
          ) : (
            <ul className="space-y-3">
              {comments.map((comment) => (
                <li
                  key={comment._id}
                  className="bg-gray-100 rounded-md p-3 text-gray-700"
                >
                  {comment.content}
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(comment.createdAt).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Details;
