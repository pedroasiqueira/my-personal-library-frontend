import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// 🧠 Importa os contextos globais
import { AuthProvider } from './context/AuthContext';
import { BookProvider } from './context/BookContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BookProvider>
        <App />
      </BookProvider>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
