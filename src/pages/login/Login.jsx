import '../../style/login.css'
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../firebase';

export const Login = () => {
    const navigate = useNavigate()
    const { login, loginGoogle } = useAuth()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password, confirmPassword } = formData

        if (!email.trim() || !email.includes('@')) return toast.warning("El email es obligatorio y debe contener @")
        if (!password.trim() || !confirmPassword.trim()) return toast.warning("La contraseña es obligatoria")
        if (password !== confirmPassword) return toast.error("Las contraseñas no coinciden")

        const result = await login(email, password)
        if (result.success) {
            navigate('/profiles')
            toast.success(result.message)
        } else {
            toast.error(result.message)
        }
    }

    const handleGoogleLogin = async () => {
        try {
            // Inicia sesión con Google (Firebase)
            const result = await signInWithPopup(auth, googleProvider)

            // Envía los datos del usuario a tu backend
            const { success, message } = await loginGoogle(result.user)

            if (success) {
                toast.success(`Login con Google exitoso`)
                navigate("/profiles")
            } else {
                toast.error(`Error: ${message}`)
            }
        } catch (error) {
            console.error("Error en handleGoogleLogin:", error)
            toast.error("Error al iniciar sesión con Google")
        }
    }

    return (
        <div className="login-container">
            <div className="login-card">
                <h1 className="login-title">
                    Iniciar Sesión
                </h1>

                <form className="login-form" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Correo electrónico"
                        value={formData.email}
                        onChange={handleChange}
                        className="login-input"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        value={formData.password}
                        onChange={handleChange}
                        className="login-input"
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Repetir Contraseña"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="login-input"
                    />

                    <button type="submit" className="login-button">
                        Iniciar Sesión
                    </button>
                </form>

                <div className="login-google">
                    <p className="login-divider">o</p>
                    <button
                        onClick={handleGoogleLogin}
                        className="google-button"
                    >
                        <i className="fa-brands fa-google"></i>
                        Continuar con Google
                    </button>
                </div>

                <p className="login-switch">
                    ¿No tienes cuenta?
                    <span onClick={() => navigate("/register")}>Regístrate</span>
                </p>
            </div>
        </div>
    );
};
