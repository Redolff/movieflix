import '../../style/movieDetail.css'
import { Link, useParams } from "react-router-dom"
import { useFetchId } from '../../hooks/useFetchid'
import { useDeleteData } from '../../hooks/useDeleteData'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useUpdateData } from '../../hooks/useUpdateData'
import { MovieActions } from '../../components/movies/MovieActions'
import { useAuth } from '../../context/AuthContext'

export const MovieDetail = () => {
    const { id } = useParams()
    const { dataId: movie, loading } = useFetchId("movies", id)
    const { handleDelete } = useDeleteData("movies", id)
    const { handleUpdate } = useUpdateData("movies", id)
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState(null)
    const [showConfirmDelete, setShowConfirmDelete] = useState(false)
    const { isAuthenticated } = useAuth()

    const user = {
        name: 'Federico',
        role: 'admin'
    }

    const handleEditClick = () => {
        setFormData({ ...movie }) // Clonamos el juego actual
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
        if (!formData.director?.trim()) return toast.warning("El director es obligatorio");
        if (!formData.duration || formData.duration <= 0) return toast.warning("La duración es obligatoria");
        if (!formData.genre || (Array.isArray(formData.genre) && formData.genre.length === 0) || formData.genre === "") {
            return toast.warning("Debe ingresar al menos un género");
        }
        const plainData = { ...formData };
        if (typeof plainData.genre === "string") {
            plainData.genre = plainData.genre
                .split(",")
                .map((g) => g.trim())
                .filter(Boolean);
        }

        handleUpdate(plainData, {
            onSucces: (updatedMovie) => {
                setFormData(null);
                setIsEditing(false);
                Object.assign(movie, updatedMovie);
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

    if (!movie) return (
        <div className="container">
            <div className="icon">🎬</div>
            <h1>404 - Película no encontrada</h1>
            <p>Parece que la película que buscas no está en nuestra base de datos.
                Verifica el nombre o vuelve a la página principal para seguir explorando.
            </p>
            <Link to="/" className="link-home">
                Volver al inicio
            </Link>
        </div>
    )

    return (
        <div key={movie.id} className="movie-detail">
            <img src={movie.poster} alt={movie.title} className="movie-detail-poster" />
            <div className="movie-detail-info">
                {isEditing ? (
                    <form className="edit-form">
                        <div className="form-group">
                            <label>Título</label>
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
                            <label>Director</label>
                            <input
                                type="text"
                                name="director"
                                value={formData.director}
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
                            <label>Duración (min)</label>
                            <input
                                type="number"
                                name="duration"
                                value={formData.duration}
                                onChange={handleChange}
                                className="form-input"
                            />
                        </div>
                    </form>
                ) : (
                    <>
                        <h1>{movie.title}</h1>
                        <p><strong>Año:</strong> {movie.year}</p>
                        <p><strong>Director:</strong> {movie.director}</p>
                        <p><strong>Generos:</strong> {movie.genre.join(", ")}</p>
                        <p><strong>Duracion:</strong> {movie.duration} (min)</p>
                    </>
                )}
                <div className="movie-actions">
                    <MovieActions movie={movie} />
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