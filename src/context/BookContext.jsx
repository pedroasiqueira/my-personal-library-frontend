import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext'; // certifique-se de que o caminho esteja correto

const BookContext = createContext();

export function BookProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true); // <- importante caso precise recarregar após login

      try {
        const token = localStorage.getItem('access_token');

        const response = await fetch(`${apiUrl}/books/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar livros.');
        }

        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Erro ao buscar livros:', error);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchBooks();
    }
  }, [isAuthenticated, apiUrl]); // ← vai reexecutar sempre que o login acontecer

  const addBook = (book) => {
    setBooks((prev) => [...prev, book]);
  };

  const editBook = (id, updatedBook) => {
    setBooks((prev) =>
      prev.map((book) => (book._id === id ? { ...book, ...updatedBook } : book))
    );
  };

  const deleteBook = (id) => {
    setBooks((prev) => prev.filter((book) => book._id !== id));
  };

  const getBookById = (id) => books.find((book) => book._id === id);

  return (
    <BookContext.Provider
      value={{ books, addBook, editBook, deleteBook, getBookById, loading }}
    >
      {children}
    </BookContext.Provider>
  );
}

export function useBooks() {
  return useContext(BookContext);
}
