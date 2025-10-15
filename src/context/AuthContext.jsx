import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate()

  const register = async (firstName, lastName, email, password) => {
    const response = await fetch(`http://localhost:3000/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({ firstName, lastName, email, password }),
      credentials: 'include'
    })

    const data = await response.json()
    
    if(response.ok) {
      setUser(data.user)
      setIsAuthenticated(true)
      return { success: true, message: data.message }
    } else {
      setUser(null)
      setIsAuthenticated(false)
      return { success: false, message: data.message }
    }
  }

  const login = async (email, password) => {
    const response = await fetch(`http://localhost:3000/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include'
    })
    
    const data = await response.json()
    
    if (response.ok) {
      setUser(data.user)
      setIsAuthenticated(true)
      return { success: true, message: data.message }
    } else {
      setUser(null)
      setIsAuthenticated(false)
      return { success: false, message: data.message }
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
    <AuthContext.Provider value={{ user, register, login, logout, isAuthenticated }}>
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
