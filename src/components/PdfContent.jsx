import React from 'react';

const PdfContent = ({ books }) => {
  return (
    <div
      style={{
        background: '#fff',
        color: '#000',
        padding: '20px',
        width: '1000px',
        fontFamily: 'Arial, sans-serif',
        fontSize: '14px',
      }}
    >
      <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>Minha Estante de Livros</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Título</th>
            <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Autor</th>
            <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Status</th>
            <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Avaliação</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{book.title}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{book.author}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{book.status}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                {book.avaliation > 0 ? `${book.avaliation} ★` : '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PdfContent;
