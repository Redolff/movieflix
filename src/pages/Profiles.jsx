import "../style/profiles.css"
import { useAuth } from "../context/AuthContext"

export const Profiles = () => {
    const { user } = useAuth()
    console.log('user', user)

    const handleAddProfile = () => {
        console.log('Agregar perfil')
    }

    const handleDeleteProfile = (id) => {
        console.log('Eliminar perfil: ', id)
    }

    const handleAdminProfiles = () => {
        console.log('Administrar perfiles: ', user)
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
                            onClick={handleDeleteProfile(profile._id)}
                        >
                            <i className="fa-solid fa-trash"></i>
                        </button>
                    </div>
                ))}

                {user.profiles.length < 4 && (
                    <div className="profile-card add-profile" onClick={handleAddProfile}>
                        <div className="avatar-container">
                            <span className="plus-sign">+</span>
                        </div>
                        <p className="profile-name">Agregar perfil</p>
                    </div>
                )}
            </section>

            <button
                className="manage-profiles-btn"
                onClick={handleAdminProfiles}
            >
                Administrar perfiles
            </button>
        </div>

    )
}
