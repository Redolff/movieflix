import "../../style/profiles.css"
import { useAuth } from "../../context/AuthContext"
import { toast } from "react-toastify"
import { useEffect, useState } from "react"
import { useFetchId } from "../../hooks/useFetchid"
import { ProfileSkeleton } from "./ProfileSkeleton"
import { useAddProfile } from "../../hooks/useAddProfile"
import { useDeleteProfile } from "../../hooks/useDeleteProfile"
import { useDispatch, useSelector } from 'react-redux'
import { setProfile } from "../../slices/profileSlice"
import { useNavigate } from "react-router-dom"
import { useFetchProfileId } from "../../hooks/useFetcProfileId"

export const Profiles = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const currentProfile = useSelector((state) => state.currentProfile)

    const { user } = useAuth()
    const { dataId: allProfiles, loading, refetch } = useFetchId("profiles", user._id)
    const { handleAddProfile } = useAddProfile("profiles", user._id)
    const { handleDeleteProfile } = useDeleteProfile("profiles", user._id)

    const [showModal, setShowModal] = useState(false)
    const [formData, setFormData] = useState({ name: "", avatar: "" })
    const [selectedProfile, setSelectedProfile] = useState(null)

    const { profile: selectedProfileId } = useFetchProfileId(user._id, selectedProfile)

    const handleSelect = (profileId) => {
        setSelectedProfile(profileId)
    }

    useEffect(() => {
        if (selectedProfileId) {
            console.log("Perfil seleccionado:", selectedProfileId)
            dispatch(setProfile(selectedProfileId))
            navigate('/')
        }
    }, [selectedProfileId, dispatch, navigate])

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

    if (loading || !Array.isArray(allProfiles)) {
        return (
            <ProfileSkeleton />
        )
    }

    return (
        <div className="account-container">
            <h1 className="account-title">¿Quién está mirando ahora?</h1>

            <section className="profiles-grid">
                {allProfiles.map((profile) => {
                    const isSelected = currentProfile && currentProfile._id === profile._id

                    return (
                        <div key={profile._id} className={`profile-card ${isSelected ? 'selected' : ''}`} onClick={() => handleSelect(profile._id)}>
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
                                onClick={(e) => {
                                    e.stopPropagation(),
                                        deleteProfile(profile._id)
                                }}
                            >
                                <i className="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    )}
                )}

                {allProfiles.length < 4 && (
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