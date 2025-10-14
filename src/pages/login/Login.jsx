import '../../style/login.css'
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';

export const Login = () => {
    const navigate = useNavigate()
    const { login } = useAuth()
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
        if (!password.trim()) return toast.warning("La contraseña es obligatoria")
        if (password !== confirmPassword) return toast.error("Las contraseñas no coinciden")

        login(email, password)
        navigate('/profiles')
    };

    const handleGoogleLogin = () => {
        // Aquí en el futuro agregaremos integración con Google OAuth
        toast.info("Login con Google no implementado todavía");
    };

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
