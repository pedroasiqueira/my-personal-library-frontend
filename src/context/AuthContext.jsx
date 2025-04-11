import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Recupera o token do localStorage ao iniciar
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      // Se quiser, aqui você pode decodificar o token e recuperar infos do usuário
      setUser({ token });
    }
  }, []);

  const login = (email, password) => {
    // Aqui você faria a requisição de login real
    // Mas se já tem um token vindo de fora, use loginComToken()
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
