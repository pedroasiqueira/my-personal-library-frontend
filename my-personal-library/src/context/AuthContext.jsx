import { createContext, useContext, useState } from 'react';

// Criação do contexto
const AuthContext = createContext();

// Provider
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    // Aqui você pode fazer chamada para API real
    setUser({ email }); // mock de login
  };

  const logout = () => {
    setUser(null);
  };

  const register = (email, password) => {
    // Simulação de registro
    setUser({ email });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para consumir o contexto
export function useAuth() {
  return useContext(AuthContext);
}
