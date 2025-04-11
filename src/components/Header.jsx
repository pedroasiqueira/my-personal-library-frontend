import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // limpa localStorage e contexto
    navigate('/');
  };

  if (!isAuthenticated) return null;

  return (
    <header className="w-full bg-gray-800 text-white px-6 py-3 flex justify-end shadow-md">
      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-1 rounded-md text-sm"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
