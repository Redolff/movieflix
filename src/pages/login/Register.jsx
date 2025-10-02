import '../../style/login.css'
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';

export const Register = () => {
    const navigate = useNavigate();
    const { login } = useAuth(); 
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.firstName.trim() || formData.firstName.length <= 3) {
            return toast.warning("El nombre es obligatorio y debe tener más de 3 letras");
        }
        if (!formData.lastName.trim() || formData.lastName.length <= 3) {
            return toast.warning("El apellido es obligatorio y debe tener más de 3 letras");
        }
        if (!formData.email.trim() || !formData.email.includes('@')) {
            return toast.warning("El email es obligatorio y debe contener @");
        }
        if (!formData.password.trim()) {
            return toast.warning("La contraseña es obligatoria");
        }
        if (formData.password !== formData.confirmPassword) {
            return toast.error("Las contraseñas no coinciden");
        }

        // Simulación de registro
        login({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            role: "user", // todos los que se registran van como user
        });

        navigate("/profiles"); // Redirigir a perfiles después de registrarse
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h1 className="login-title">Crear cuenta</h1>

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

                    <button type="submit" className="login-button">
                        Registrarse
                    </button>
                </form>

                <p className="login-switch">
                    ¿Ya tienes una cuenta?
                    <span onClick={() => navigate("/login")}>Inicia sesión</span>
                </p>
            </div>
        </div>
    );
};
