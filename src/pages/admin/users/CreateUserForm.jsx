import '../movies/createMovieForm.css'
import { useState } from "react"
import { useAddData } from "../../../hooks/useAddData"
import { toast } from "react-toastify"

export const CreateUserForm = ({ onSuccess }) => {
    const { handleAdd } = useAddData('users')
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: ""
    })

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "number" ? Number(value) : value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const { firstName, lastName, email, password, confirmPassword, role } = formData

        if (!firstName.trim()) return toast.warning("El nombre es obligatorio");
        if (!lastName.trim()) return toast.warning("El apellido es obligatorio");
        if (!email.trim() || !email.includes('@')) return toast.warning("El email es obligatorio y debe contener @")
        if (!password.trim()) return toast.warning("La contraseña es obligatoria")
        if (password !== confirmPassword) return toast.error("Las contraseñas no coinciden")
        if (role !== 'user' && role !== 'admin') return toast.error('El usuario debe tener un rol como admin o user')

        const newUser = {
            firstName,
            lastName,
            email,
            password,
            role
        };

        handleAdd(newUser, {
            onSuccess: (createdUser) => {
                toast.success("Usuario creado con éxito ✅");
                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    role: ""
                });
                onSuccess?.(createdUser); // cerrar form o redirigir
            },
        })
    }


    return (
        <form onSubmit={handleSubmit} className="create-movie-form">
            <div>
                <input
                    type="text"
                    name="firstName"
                    placeholder="Nombre"
                    value={formData.firstName}
                    onChange={handleChange}
                />
            </div>
            <div>
                <input
                    type="text"
                    name="lastName"
                    placeholder="Apellido"
                    value={formData.lastName}
                    onChange={handleChange}
                />
            </div>
            <div>
                <input
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>
            <div>
                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={formData.password}
                    onChange={handleChange}
                />
            </div>
            <div>
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Repetir contraseña"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                />
            </div>
            <div>
                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    style={{ marginBottom: '1rem', fontSize: '1rem', borderRadius: '6px' }}
                >
                    <option value="">Selecciona un rol</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
            </div>

            <button type="submit">Guardar</button>
        </form>
    )
}