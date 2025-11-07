import { createContext, useContext, useEffect, useState } from "react";

const API = `http://localhost:3000/auth`

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      try {
        const response = await fetch(`${API}/refresh`, {
          method: 'POST',
          credentials: 'include',
        })
        if (!response.ok) {
          setUser(null)
          setIsAuthenticated(false)
          setLoading(false)
        }

        const data = await response.json()
        if (data.user) {
          setUser(data.user);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }

      } catch (error) {
        console.error('Initial Auth error: ', error)
        setUser(null)
        setIsAuthenticated(false)
      }
      finally {
        setLoading(false)
      }
    }

    initAuth()
  }, [])

  const register = async (firstName, lastName, email, password) => {
    setLoading(true)
    const response = await fetch(`${API}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ firstName, lastName, email, password }),
      credentials: 'include'
    })

    const data = await response.json()

    if (response.ok) {
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
    const response = await fetch(`${API}/login`, {
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

      const response = await fetch(`${API}/loginGoogle`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(normalizedUser),
        credentials: 'include',
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.message)
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
    const response = await fetch(`${API}/logout`, {
      method: 'POST',
      credentials: "include"
    })
    if (response.ok) {
      setUser(null)
      setIsAuthenticated(false)
    }
  }

  const updatedUser = (newUser) => {
    setUser(newUser)
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
