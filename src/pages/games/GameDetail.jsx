import '../../style/movieDetail.css'
import { Link, useParams } from "react-router-dom"
import { useFetchId } from "../../hooks/useFetchid"
import { GameActions } from '../../components/games/GameActions'
import { useState } from 'react'
import { useDeleteData } from '../../hooks/useDeleteData'
import { useUpdateData } from '../../hooks/useUpdateData'
import { toast } from 'react-toastify'
import { useAuth } from '../../context/AuthContext'

export const GameDetail = () => {
    const { id } = useParams()
    const { dataId: game, loading } = useFetchId("games", id)
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState(null)
    const [showConfirmDelete, setShowConfirmDelete] = useState(false)
    const { handleDelete } = useDeleteData("games", id)
    const { handleUpdate } = useUpdateData("games", id)
    const { isAuthenticated } = useAuth()

    const user = {
        name: 'Federico',
        role: 'admin'
    }

    const handleEditClick = () => {
        setFormData({ ...game }) // Clonamos el juego actual
        setIsEditing(true)
    }

    const handleCancel = () => {
        setIsEditing(false)
        setFormData(null)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSave = () => {
        if (!formData.title?.trim()) return toast.warning("El título es obligatorio");
        if (!formData.year || formData.year <= 0) return toast.warning("El año es obligatorio y debe ser entre 1900 y 2026");
        if (!formData.developer?.trim()) return toast.warning("El desarrollador es obligatorio");
        if (!formData.genre || (Array.isArray(formData.genre) && formData.genre.length === 0) || formData.genre === "") {
            return toast.warning("Debe ingresar al menos un género");
        }
        if (formData.multiplayer === undefined || formData.multiplayer === null) {
            return toast.warning("Decidir si es multijugador es obligatorio");
        } if (!formData.platform || (Array.isArray(formData.platform) && formData.platform.length === 0) || formData.platform === "") {
            return toast.warning("Debe ingresar al menos una plataforma");
        }
        const plainData = { ...formData };
        if (typeof plainData.genre === "string") {
            plainData.genre = plainData.genre
                .split(",")
                .map((g) => g.trim())
                .filter(Boolean);
        }
        if (typeof plainData.platforms === "string") {
            plainData.platforms = plainData.platforms
                .split(",")
                .map((g) => g.trim())
                .filter(Boolean);
        }

        handleUpdate(plainData, {
            onSucces: (updatedGame) => {
                setFormData(null);
                setIsEditing(false);
                Object.assign(game, updatedGame);
            },
        });
    }

    if (loading) {
        return (
            <div className="movie-skeleton">
                <div className="skeleton-poster"></div>
                <div className="skeleton-info">
                    <div className="skeleton-title"></div>
                    <div className="skeleton-line"></div>
                    <div className="skeleton-line"></div>
                    <div className="skeleton-line short"></div>
                </div>
            </div>
        )
    }

    if (!game) return (
        <div className="container">
            <div className="icon">🎬</div>
            <h1>404 - Juego no encontrado</h1>
            <p>Parece que el juego que buscas no está en nuestra base de datos.
                Verifica el nombre o vuelve a la página principal para seguir explorando.</p>
            <Link to="/" className="link-home">
                Volver al inicio
            </Link>
        </div>
    )

    return (
        <div key={game.id} className="movie-detail">
            <img src={game.poster} alt={game.title} className="movie-detail-poster" />
            <div className="movie-detail-info">

                {isEditing ? (
                    <form className="edit-form">
                        <div className="form-group">
                            <label>Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <label>Año</label>
                            <input
                                type="number"
                                name="year"
                                value={formData.year}
                                onChange={handleChange}
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <label>Desarrollador</label>
                            <input
                                type="text"
                                name="developer"
                                value={formData.developer}
                                onChange={handleChange}
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <label>Géneros</label>
                            <input
                                type="text"
                                name="genre"
                                value={formData.genre}
                                onChange={handleChange}
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <label>¿Es multijugador?</label>
                            <div>
                                <label>
                                    <input
                                        type="radio"
                                        name="multiplayer"
                                        value="true"
                                        checked={formData.multiplayer === true || formData.multiplayer === "true"}
                                        onChange={() =>
                                            setFormData((prev) => ({ ...prev, multiplayer: true }))
                                        }
                                    />
                                    Sí
                                </label>
                                <label style={{ marginLeft: "1rem" }}>
                                    <input
                                        type="radio"
                                        name="multiplayer"
                                        value="false"
                                        checked={formData.multiplayer === false || formData.multiplayer === "false"}
                                        onChange={() =>
                                            setFormData((prev) => ({ ...prev, multiplayer: false }))
                                        }
                                    />
                                    No
                                </label>
                            </div>

                        </div>
                        <div className="form-group">
                            <label>Plataformas</label>
                            <input
                                type="text"
                                name="platform"
                                value={formData.platform}
                                onChange={handleChange}
                                className="form-input"
                            />
                        </div>
                    </form>
                ) : (
                    <>
                        <h1>{game.title}</h1>
                        <p className="movie-year"><strong>Año:</strong> {game.year}</p>
                        <p className="movie-duration"><strong>Desarrollador:</strong> {game.developer} </p>
                        <p className="movie-duration"><strong>Generos:</strong> {game.genre.join(", ")} </p>
                        <p className="movie-director"><strong>Multijugador:</strong> {game.multiplayer === false ? 'No' : 'Si'}</p>
                        <p className="movie-duration"><strong>Plataformas:</strong> {game.platform.join(", ")} </p>
                    </>
                )}
                <div className='movie-actions'>
                    <GameActions game={game} />
                    {/* Solo admins ven este botón */}
                    {isAuthenticated.role === "admin" && (
                        <div className='movie-actions-bottom'>
                            {isEditing ? (
                                <>
                                    <button className="btn btn-success" onClick={handleSave}>
                                        <i className="fa-solid fa-check"></i> Guardar
                                    </button>
                                    <button className="btn btn-outline" onClick={handleCancel}>
                                        <i className="fa-solid fa-xmark"></i> Cancelar
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button className="btn btn-outline" onClick={handleEditClick}>
                                        <i className="fa-solid fa-pen"></i> Editar
                                    </button>
                                    <button className="btn btn-danger" onClick={() => setShowConfirmDelete(true)}>
                                        <i className="fa-solid fa-trash"></i> Eliminar
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
            {showConfirmDelete && (
                <div className="modal-overlay" onClick={() => setShowConfirmDelete(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>¿Seguro que deseas eliminar esta película?</h2>
                        <div className="modal-actions">
                            <button className="btn btn-danger" onClick={handleDelete}>Sí, eliminar</button>
                            <button className="btn btn-outline" onClick={() => setShowConfirmDelete(false)}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}