import "../style/profiles.css"
import { useAuth } from "../context/AuthContext"
import { toast } from "react-toastify"
import { useState } from "react"

export const Profiles = () => {
    const { user, updatedUser } = useAuth()
    const [showModal, setShowModal] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        avatar: ""
    })

    const handleAddProfile = async (data) => {
        try {
            const response = await fetch(`http://localhost:3000/profiles/${user._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            if (!response.ok) throw new Error(`Error al agregar el Perfil`)
            const newProfile = await response.json()
            toast.success("Perfil agregado correctamente")
            const newUser = {
                ...user,
                profiles: [...user.profiles, newProfile]
            }
            updatedUser(newUser)
            setShowModal(false)
            setFormData({ name: "", avatar: "" })

        } catch (error) {
            console.error(error)
            toast.error(`Hubo un problema al agregar el perfil`)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!formData.name.trim() || !formData.avatar.trim()) {
            toast.warning("Completá todos los campos")
            return;
        }
        handleAddProfile(formData)
    }

    const handleDeleteProfile = async (profileId) => {
        try {
            const response = await fetch(`http://localhost:3000/profiles/${user._id}/${profileId}`, {
                method: 'DELETE'
            })
            if(!response.ok) throw new Error(`Error al eliminar el perfil`)
            toast.success(`Perfil eliminado correctamente`)
            const newUser = {
                ...user,
                profiles: user.profiles.filter(p => p._id !== profileId)
            }
            updatedUser(newUser)
            
        } catch(error) {
            console.error(error)
            toast.error(`Hubo un problema al eliminar el perfil`)
        }
    }

    return (
        <div className="account-container">
            <h1 className="account-title">¿Quién está mirando ahora?</h1>

            <section className="profiles-grid">
                {user.profiles.map((profile) => (
                    <div key={profile._id} className="profile-card">
                        <div className="avatar-container">
                            <img
                                src={profile.avatar}
                                alt={profile.name}
                                className="profile-avatar"
                            />
                        </div>
                        <p className="profile-name">{profile.name}</p>
                        <button
                            className="delete-profile-btn"
                            onClick={() => handleDeleteProfile(profile._id)}
                        >
                            <i className="fa-solid fa-trash"></i>
                        </button>
                    </div>
                ))}

                {user.profiles.length < 4 && (
                    <div className="profile-card add-profile" onClick={() => setShowModal(true)}>
                        <div className="avatar-container">
                            <span className="plus-sign">+</span>
                        </div>
                        <p className="profile-name">Agregar perfil</p>
                    </div>
                )}
            </section>

            { /* Modal de formulario para agregar PERFIL */ }
            {showModal && (
                <div className="form-modal-overlay">
                    <div className="form-modal-content">
                        <form onSubmit={handleSubmit} className="create-profile-form">
                            <div>
                                <label>Nombre</label>
                                <input
                                    id="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Blizer"
                                />
                            </div>
                            <div>
                                <label htmlFor="avatar">Avatar (URL)</label>
                                <input
                                    id="avatar"
                                    type="text"
                                    value={formData.avatar}
                                    onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                                    placeholder="https://..."
                                />
                            </div>

                            <div className="modal-actions">
                                <button type="submit" onClick={handleSubmit}>
                                    Guardar
                                </button>
                                <button type="button" onClick={() => setShowModal(false)}>
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}