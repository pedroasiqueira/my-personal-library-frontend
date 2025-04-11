import { createContext, useContext, useEffect, useState } from 'react';
import mockBooks from '../assets/booksArray';

// Criação do contexto
const BookContext = createContext();

// Provider
export function BookProvider({ children }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = () => {
      setTimeout(() => {
        setBooks(mockBooks);
        setLoading(false);
      }, 1000);
    };

    fetchBooks();
  }, []);

  const addBook = (book) => {
    setBooks((prev) => [...prev, book]);
  };

  const editBook = (id, updatedBook) => {
    setBooks((prev) =>
      prev.map((book) => (book.id === id ? { ...book, ...updatedBook } : book))
    );
  };

  const deleteBook = (id) => {
    setBooks((prev) => prev.filter((book) => book.id !== id));
  };

  const getBookById = (id) => books.find((book) => book.id === id);

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
