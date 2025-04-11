import { useEffect, useState } from 'react';

const DarkModeToggle = () => {
  const [enabled, setEnabled] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (enabled) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [enabled]);

  return (
    <button
      onClick={() => setEnabled(!enabled)}
      className="text-sm px-3 py-1 rounded-md bg-gray-700 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-500 transition"
    >
      {enabled ? 'Modo Claro ☀️' : 'Modo Escuro 🌙'}
    </button>
  );
};

export default DarkModeToggle;
