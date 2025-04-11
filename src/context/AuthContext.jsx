import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // novo

  // Recupera o token do localStorage ao iniciar
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setUser({ token });
    }
    setIsLoading(false); // sinaliza que terminou de checar
  }, []);

  const login = (email, password) => {
    // Aqui você faria a requisição de login real
    console.warn('Use loginComToken para autenticar com token.');
  };

  const loginComToken = (token) => {
    localStorage.setItem('access_token', token);
    setUser({ token });
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setUser(null);
  };

  const register = (email, password) => {
    console.warn('O register foi substituído pela requisição direta no componente Register.');
  };

  const isAuthenticated = !!user;

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Carregando...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        loginComToken,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
