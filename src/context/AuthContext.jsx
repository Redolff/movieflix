import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate()

  const login = async (email, password) => {
    const response = await fetch(`http://localhost:3000/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include'
    })

    if (response.ok) {
      const data = await response.json()
      setUser(data.safeUser)
      setIsAuthenticated(true)
      return true
    } else {
      setUser(null)
      setIsAuthenticated(false)
      return false
    }
  }

  const logout = async () => {
    const response = await fetch(`http://localhost:3000/auth/logout`, {
      method: 'POST',
      credentials: "include"
    })
    if(response.ok) {
      setUser(null)
      setIsAuthenticated(false)
      navigate('/login')
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
};
