import '../../style/login.css'
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';

export const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        repeatPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { firstName, lastName, email, password, confirmPassword } = formData

        if (!firstName.trim() || firstName.length <= 3) {
            return toast.warning("El nombre es obligatorio y debe tener más de 3 letras");
        }
        if (!lastName.trim() || lastName.length <= 3) {
            return toast.warning("El apellido es obligatorio y debe tener más de 3 letras");
        }
        if (!email.trim() || !email.includes('@')) {
            return toast.warning("El email es obligatorio y debe contener @");
        }
        if (!password.trim() || !confirmPassword.trim()) {
            return toast.warning("La contraseña es obligatoria")
        }
        if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
            return toast.warning("La contraseña debe contener al menos una letra mayúscula y una minúscula");
        }
        if (password !== confirmPassword) {
            return toast.error("Las contraseñas no coinciden");
        }

        const result = await register(firstName, lastName, email, password)
        console.log('RESULT: ', result)
        if (result.success) {
            navigate('/profiles')
            toast.success(result.message)
        } else {
            toast.error(result.message)
        }
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
                        name="repeatPassword"
                        placeholder="Repetir contraseña"
                        value={formData.repeatPassword}
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
