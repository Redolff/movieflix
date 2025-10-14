import { useFetchData } from "../../../hooks/useFetchData"
import { useState } from "react";
import { CreateUserForm } from "./CreateUserForm";

export const UsersAdmin = () => {
    const { data: allUsers } = useFetchData("users")
    const [showForm, setShowForm] = useState(false);

    const handleSuccess = () => {
        setShowForm(false)
    };

    return (
        <div className="movies-admin">
            <h1 className="admin-title">👤 Administrar Usuarios</h1>
            {/* Mostrar usuarios */}
            <div className="movies-preview">
                {allUsers?.slice(0, 4).map((user) => (
                    <div key={user._id} className="movie-card">
                        <h3>{user.firstName} {user.lastName}</h3>
                        <p>Rol: {user.role}</p>
                        <div>
                            <button onClick={() => console.log('Eliminar: ', user._id)}> Eliminar </button>
                            <button onClick={() => console.log('Editar: ', user._id)}> Editar </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Botón para mostrar formulario */}
            <button
                onClick={() => setShowForm(!showForm)}
                className="btn-add-movie"
            >
                {showForm ? "❌ Cerrar formulario" : "➕ Agregar usuario"}
            </button>

            {/* Formulario */}
            {showForm && (
                <div className="form-modal-overlay" onClick={() => setShowForm(false)}>
                    <div className="form-modal-content" onClick={e => e.stopPropagation()}>
                        {<CreateUserForm onSuccess={handleSuccess} />}
                    </div>
                </div>
            )}
        </div>
    )
}