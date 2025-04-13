import React from 'react';

const PdfContent = ({ books }) => {
  return (
    <div
      style={{
        background: '#fff',
        color: '#000',
        padding: '32px',
        width: '730px',
        fontFamily: 'Arial, sans-serif',
        fontSize: '14px',
      }}
    >
      <h2 style={{ fontSize: '24px', marginBottom: '24px', color: '#333' }}>
        Meus livros 📚
      </h2>

      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          tableLayout: 'fixed',
        }}
      >
        <thead>
          <tr style={{ backgroundColor: '#f3f3f3' }}>
            <th style={{ ...thStyle, width: '60%' }}>Título</th>
            <th style={{ ...thStyle, width: '40%' }}>Autor</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td style={tdStyle}>
                <strong style={{ fontSize: '15px', color: '#222', wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>
                  {book.title}
                </strong>
              </td>
              <td style={{ ...tdStyle, wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>{book.author}</td>
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
  wordBreak: 'break-word',
  whiteSpace: 'pre-wrap',
};

export default PdfContent;
