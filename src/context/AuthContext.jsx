import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedGetUser = localStorage.getItem('user-movieflix')
    if (storedGetUser) {
      try {
        const storedUser = JSON.parse(storedGetUser)
        setUser(storedUser)
        setIsAuthenticated(true)
      } catch (error) {
        console.error("Error al parsear el usuario de localStorage", error)
        localStorage.removeItem('user-movieflix')
        setUser(null)
        setIsAuthenticated(false)
      }
    }
    setLoading(false)
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
      setLoading(false)
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

  const loginGoogle = async (firebaseUser) => {
    try {

      const normalizedUser = {
        firstName: firebaseUser.displayName?.split(" ")[0] || "",
        lastName: firebaseUser.displayName?.split(" ")[1] || "",
        email: firebaseUser.email,
        avatar: firebaseUser.photoURL,
      }

      const response = await fetch('http://localhost:3000/auth/loginGoogle', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(normalizedUser),
        credentials: 'include',
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.message)
      localStorage.setItem("user-movieflix", JSON.stringify(data.user));
      setUser(data.user)  
      setIsAuthenticated(true)
      setLoading(false)
      return { success: true, message: data.message }
    } catch (error) {
      console.error(`Error en el Login Google: ${error}`)
      setUser(null)
      setIsAuthenticated(false)
      setLoading(false)
      return { success: false, message: error.message }
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

  const updatedUser = (newUser) => {
    setUser(newUser)
    localStorage.setItem('user-movieflix', JSON.stringify(newUser))
  }

  return (
    <AuthContext.Provider value={{ user, updatedUser, register, login, loginGoogle, logout, isAuthenticated, loading }}>
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
