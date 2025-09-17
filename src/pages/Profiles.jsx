import { useAuth } from "../context/AuthContext"
import { useState } from "react"
import "../style/profiles.css"

export const Profiles = () => {
    const { user } = useAuth()
    const [allProfiles, setAllProfiles] = useState([
        { 
            id: 1, 
            name: "Federico", 
            avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZl2VrMLl5aN49YNku-Hfm2oXegj2liUzPXA&s",
            myList: { movies: [], series: [], games: [] }
        },
        { 
            id: 2, 
            name: "Juan Pablo", 
            avatar: "https://e7.pngegg.com/pngimages/729/247/png-clipart-roblox-youtube-oof-smiley-face-roblox-head-smiley-thumbnail.png", 
            myList: { movies: [], series: [], games: [] }
        },
    ])

    const handleAddProfile = () => {
        console.log('Agregar perfil')
    }
    
    const handleAdminProfiles = () => {
        console.log('Administrar perfiles: ', allProfiles)
    }

    return (
        <div className="account-container">
            <h1 className="account-title">¿Quién está mirando ahora?</h1>

            <div className="profiles-grid">
                {allProfiles.map((profile) => (
                    <div key={profile.id} className="profile-card">
                        <img src={profile.avatar} alt={profile.name} className="profile-avatar" />
                        <p className="profile-name">{profile.name}</p>
                    </div>
                ))}

                {allProfiles.length < 4 && (
                    <div
                        className="profile-card add-profile"
                        onClick={handleAddProfile}
                    >
                        <span className="plus-sign">+</span>
                        <p className="profile-name">Agregar perfil</p>
                    </div>
                )}
            </div>

            <button 
                className="manage-profiles-btn"
                onClick={handleAdminProfiles}
            >
                Administrar perfiles
            </button>
        </div>
    )
}
