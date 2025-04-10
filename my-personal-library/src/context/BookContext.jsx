import { createContext, useContext, useState } from 'react';

// Criação do contexto
const BookContext = createContext();

// Provider
export function BookProvider({ children }) {
  const [books, setBooks] = useState([]);

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
      value={{ books, addBook, editBook, deleteBook, getBookById }}
    >
      {children}
    </BookContext.Provider>
  );
}

// Hook personalizado para consumir o contexto
export function useBooks() {
  return useContext(BookContext);
}
