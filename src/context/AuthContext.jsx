import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user-movieflix'))
    if (storedUser) {
      setUser(storedUser)
      setIsAuthenticated(true)
    }
    setLoading(false); // terminó de cargar
  }, [])

  const saveUserToLocalStorage = (user) => {
    localStorage.setItem('user-movieflix', JSON.stringify(user))
    setUser(user)
    setIsAuthenticated(true)
  }

  const register = async (firstName, lastName, email, password) => {
    setLoading(true)
    const response = await fetch(`http://localhost:3000/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ firstName, lastName, email, password }),
      credentials: 'include'
    })

    const data = await response.json()

    if (response.ok) {
      saveUserToLocalStorage(data.user)
      setUser(data.user)
      setIsAuthenticated(true)
      setLoading(true)
      return { success: true, message: data.message }
    } else {
      setUser(null)
      setIsAuthenticated(false)
      setLoading(false)
      return { success: false, message: data.message }
    }
  }

  const login = async (email, password) => {
    setLoading(true)
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
      saveUserToLocalStorage(data.user)
      setUser(data.user)
      setIsAuthenticated(true)
      setLoading(false)
      return { success: true, message: data.message }
    } else {
      setUser(null)
      setIsAuthenticated(false)
      setLoading(false)
      return { success: false, message: data.message }
    }
  }

  const logout = async () => {
    const response = await fetch(`http://localhost:3000/auth/logout`, {
      method: 'POST',
      credentials: "include"
    })
    if (response.ok) {
      localStorage.removeItem('user-movieflix')
      setUser(null)
      setIsAuthenticated(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, register, login, logout, isAuthenticated, loading }}>
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
