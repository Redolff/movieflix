import '../style/login.css'
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

export const Login = () => {
    const navigate = useNavigate()
    const { login } = useAuth()
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.firstName.trim()) return toast.warning("El nombre es obligatorio");
        if (!formData.lastName.trim()) return toast.warning("El apellido es obligatorio");
        if (!formData.email.trim()) return toast.warning("El email es obligatorio");
        if (!formData.password.trim()) return toast.warning("La contraseña es obligatoria");
        if (formData.password !== formData.confirmPassword)
            return toast.error("Las contraseñas no coinciden");

        // Simulamos login - en el futuro acá llamaríamos a nuestra API
        login({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            role: "user", // o "admin" si es admin
        });
        navigate("/profiles"); // redirigir a creación de perfiles
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
                        type="text"
                        name="firstName"
                        placeholder="Nombre"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="login-input"
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Apellido"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="login-input"
                    />
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
                        placeholder="Repetir contraseña"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="login-input"
                    />

                    <button
                        type="submit"
                        className="login-button"
                    >
                        Iniciar Sesión
                    </button>
                </form>

                <div className="login-google">
                    <p className="login-divider">o</p>
                    <button
                        onClick={handleGoogleLogin}
                        className="google-button"
                    >
                        Continuar con Google
                    </button>
                </div>
            </div>
        </div>
    );
};
