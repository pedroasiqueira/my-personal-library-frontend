import { createContext, useContext, useEffect, useState } from 'react';

const BookContext = createContext();

export function BookProvider({ children }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem('access_token');

        const response = await fetch('http://localhost:3000/books/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar livros.');
        }

        const data = await response.json();
        setBooks(data); // ← se precisar ajustar o formato, avise
      } catch (error) {
        console.error('Erro ao buscar livros:', error);
        setBooks([]); // garante que a tela não quebre
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

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
