import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// import DarkModeToggle from './DarkModeToggle';

const Header = () => {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // limpa localStorage e contexto
    navigate('/');
  };

  if (!isAuthenticated) return null;

  return (
    <header className="w-full bg-gray-800 text-white px-6 py-3 flex justify-between items-center shadow-md">
      <div className="text-sm font-semibold text-gray-200">Estante Digital</div>

      <div className="flex items-center gap-4">
        {/* <DarkModeToggle /> */}
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-1 rounded-md text-sm"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
