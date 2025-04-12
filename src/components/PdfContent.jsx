// src/components/PdfContent.jsx
import React from 'react';

const PdfContent = ({ books }) => {
  return (
    <div
      style={{
        background: '#fff',
        color: '#000',
        padding: '32px',
        width: '1000px',
        fontFamily: 'Arial, sans-serif',
        fontSize: '14px',
      }}
    >
      <h2 style={{ fontSize: '24px', marginBottom: '24px', color: '#333' }}>
        Meus livros 📚
      </h2>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f3f3f3' }}>
            <th style={thStyle}>Título</th>
            <th style={thStyle}>Autor</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Avaliação</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td style={tdStyle}>
                <strong style={{ fontSize: '15px', color: '#222' }}>{book.title}</strong>
              </td>
              <td style={tdStyle}>
                <span style={{ color: '#555' }}>{book.author}</span>
              </td>
              <td style={tdStyle}>
                <span
                  style={{
                    backgroundColor: '#eee',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontSize: '12px',
                  }}
                >
                  {book.status}
                </span>
              </td>
              <td style={tdStyle}>
                {book.avaliation > 0 ? '★'.repeat(book.avaliation) : '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const thStyle = {
  padding: '10px',
  textAlign: 'left',
  borderBottom: '2px solid #ccc',
  fontSize: '14px',
  color: '#444',
};

const tdStyle = {
  padding: '10px',
  borderBottom: '1px solid #ddd',
  verticalAlign: 'top',
};

export default PdfContent;
