import './userAdmin.css'
import { useFetchData } from "../../../hooks/useFetchData"
import { useEffect, useState } from "react";
import { CreateUserForm } from "./CreateUserForm";
import { useDeleteData } from '../../../hooks/useDeleteData';
import { useUpdateData } from '../../../hooks/useUpdateData';

export const UsersAdmin = () => {
    const { data: allUsers } = useFetchData("users")
    const { handleDelete } = useDeleteData("users")
    const { handleUpdate } = useUpdateData("users")
    const [users, setUsers] = useState([])
    const [showForm, setShowForm] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [editingUserId, setEditingUserId] = useState(null)

    console.log('editingUserId: ', editingUserId)

    useEffect(() => {
        if (allUsers?.length) {
            setUsers(allUsers)
        }
    }, [allUsers])

    const handleSuccess = (newUser) => {
        setUsers((prev) => [...prev, newUser])
        setShowForm(false)
    }

    const handleConfirmDelete = async (id) => {
        await handleDelete(id);
        setUsers((prev) => prev.filter((u) => u._id !== id));
        setConfirmDelete(false);
    };

    const handleRoleChange = async (userId, newRole) => {
        handleUpdate(userId, { role: newRole }, {
            onSucces: (updatedUser) => {
                setUsers(prev => prev.map(u => u._id === userId ? updatedUser : u))
                setEditingUserId(null)
            },
            onError: (err) => console.error(err)
        })
    }

    return (
        <div className="users-admin">
            <h1 className="admin-title">👤 Administrar Usuarios</h1>

            <div className="users-grid">
                {users?.map((user) => (
                    <div key={user._id} className="user-card">
                        <div className="user-info">
                            <h3>{user.firstName} {user.lastName}</h3>
                            <p className="user-email">{user.email}</p>
                            {editingUserId !== user._id
                                ?
                                (
                                    <p> Rol: {user.role} </p>
                                )
                                :
                                (
                                    <div className="user-role">
                                        <select
                                            name="role-select"
                                            value={user.role}
                                            onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                            className="role-select"
                                        >
                                            <option value="admin">Admin</option>
                                            <option value="user">User</option>
                                        </select>
                                    </div>
                                )
                            }
                        </div>

                        <div className="user-actions">
                            {editingUserId === user._id
                                ? (
                                    <>
                                        <button
                                            className="btn-edit"
                                            onClick={(e) => handleRoleChange(user._id, e.target.value)}
                                        >
                                            <i className="fa-solid fa-check"></i> Guardar
                                        </button>
                                        <button className="btn-delete" onClick={() => setEditingUserId(null)}>
                                            <i className="fa-solid fa-xmark"></i> Cancelar
                                        </button>
                                    </>
                                )
                                :
                                (
                                    <>
                                        <button
                                            className="btn-edit"
                                            onClick={() => setEditingUserId(user._id)}
                                        >
                                            <i className="fa-solid fa-pen"></i> Editar
                                        </button>
                                        <button
                                            className="btn-delete"
                                            onClick={() => setConfirmDelete(user._id)}
                                        >
                                            <i className="fa-solid fa-trash"></i> Eliminar
                                        </button>
                                    </>
                                )
                            }
                        </div>
                    </div>
                ))}
            </div>

            {confirmDelete && (
                <div className="modal-overlay" onClick={() => setConfirmDelete(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>¿Seguro que deseas eliminar esta usuario?</h2>
                        <div className="modal-actions">
                            <button
                                className="btn btn-danger"
                                onClick={() => {
                                    handleConfirmDelete(confirmDelete),
                                        setConfirmDelete(true)
                                }}>
                                Sí, eliminar
                            </button>
                            <button className="btn btn-outline" onClick={() => setConfirmDelete(false)}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}

            <button
                onClick={() => setShowForm(!showForm)}
                className="btn-add-user"
            >
                {showForm ? "❌ Cerrar formulario" : "➕ Agregar usuario"}
            </button>

            {showForm && (
                <div className="form-modal-overlay" onClick={() => setShowForm(false)}>
                    <div className="form-modal-content" onClick={(e) => e.stopPropagation()}>
                        {<CreateUserForm onSuccess={handleSuccess} />}
                    </div>
                </div>
            )}
        </div>

    )
}