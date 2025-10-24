import "../../style/profiles.css"
import { useAuth } from "../../context/AuthContext"
import { toast } from "react-toastify"
import { useState } from "react"
import { useFetchId } from "../../hooks/useFetchid"
import { ProfileSkeleton } from "./ProfileSkeleton"
import { useAddProfile } from "../../hooks/useAddProfile"
import { useDeleteProfile } from "../../hooks/useDeleteProfile"

export const Profiles = () => {
    const { user } = useAuth()
    const { dataId: profiles, loading, refetch } = useFetchId("profiles", user._id)
    const { handleAddProfile } = useAddProfile("profiles", user._id)
    const { handleDeleteProfile } = useDeleteProfile("profiles", user._id)
    
    const [showModal, setShowModal] = useState(false)
    const [formData, setFormData] = useState({ name: "", avatar: "" })

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!formData.name.trim() || !formData.avatar.trim()) {
            toast.warning("Completá todos los campos")
            return;
        }
        
        await handleAddProfile(formData)
        refetch()
        setShowModal(false)
        setFormData({ name: '', avatar: '' })
    }

    const deleteProfile = async (profileId) => {
        await handleDeleteProfile(profileId)
        refetch()
    }

    if (loading || !Array.isArray(profiles)) {
        return (
            <ProfileSkeleton />
        )
    }

    return (
        <div className="account-container">
            <h1 className="account-title">¿Quién está mirando ahora?</h1>

            <section className="profiles-grid">
                {profiles.map((profile) => (
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
                            onClick={() => deleteProfile(profile._id)}
                        >
                            <i className="fa-solid fa-trash"></i>
                        </button>
                    </div>
                ))}

                {profiles.length < 4 && (
                    <div className="profile-card add-profile" onClick={() => setShowModal(true)}>
                        <div className="avatar-container">
                            <span className="plus-sign">+</span>
                        </div>
                        <p className="profile-name">Agregar perfil</p>
                    </div>
                )}
            </section>

            { /* Modal de formulario para agregar PERFIL */}
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