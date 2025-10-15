import '../../style/movieDetail.css'
import { Link, useParams } from "react-router-dom"
import { useFetchId } from '../../hooks/useFetchid'
import { SerieActions } from '../../components/series/SerieActions'
import { useState } from 'react'
import { useDeleteData } from '../../hooks/useDeleteData'
import { toast } from 'react-toastify'
import { useUpdateData } from '../../hooks/useUpdateData'
import { useAuth } from '../../context/AuthContext'

export const SerieDetail = () => {
    const { id } = useParams()
    const { dataId: serie, loading } = useFetchId("series", id)
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState(null)
    const [showConfirmDelete, setShowConfirmDelete] = useState(false)
    const { handleDelete } = useDeleteData("series")
    const { handleUpdate } = useUpdateData("series", id)
    const { user } = useAuth()

    const handleEditClick = () => {
        setFormData({ ...serie }) // Clonamos el juego actual
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
        if (!formData.seasons || formData.seasons <= 0) return toast.warning("La temporada es obligatoria");
        if (!formData.genre || (Array.isArray(formData.genre) && formData.genre.length === 0) || formData.genre === "") {
            return toast.warning("Debe ingresar al menos un género");
        }
        if(!formData.episodes || formData.episodes <= 0) return toast.warning("Los episodios son obligatorios")
        const plainData = { ...formData };
        if (typeof plainData.genre === "string") {
            plainData.genre = plainData.genre
                .split(",")
                .map((g) => g.trim())
                .filter(Boolean);
        }

        handleUpdate(plainData, {
            onSucces: (updatedSerie) => {
                setFormData(null);
                setIsEditing(false);
                Object.assign(serie, updatedSerie);
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

    if (!serie) return (
        <div className="container">
            <div className="icon">🎬</div>
            <h1>404 - Serie no encontrada</h1>
            <p>Parece que la serie que buscas no está en nuestra base de datos.
                Verifica el nombre o vuelve a la página principal para seguir explorando.</p>
            <Link to="/" className="link-home">
                Volver al inicio
            </Link>
        </div>
    )



    return (
        <div key={serie.id} className="movie-detail">
            <img src={serie.poster} alt={serie.title} className="movie-detail-poster" />
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
                            <label>Temporadas</label>
                            <input
                                type="number"
                                name="seasons"
                                value={formData.seasons}
                                onChange={handleChange}
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <label>Episodios totales</label>
                            <input
                                type="number"
                                name="episodes"
                                value={formData.episodes}
                                onChange={handleChange}
                                className="form-input"
                            />
                        </div>
                    </form>
                ) : (
                    <>
                        <h1>{serie.title}</h1>
                        <p className="movie-year"><strong>Año:</strong> {serie.year}</p>
                        <p className="movie-director"><strong>Director:</strong> {serie.director}</p>
                        <p className="movie-genre"><strong>Generos:</strong> {serie.genre.join(", ")}</p>
                        <p className="movie-duration"><strong>Temporadas:</strong> {serie.seasons} </p>
                        <p className="movie-duration"><strong>Episodios totales:</strong> {serie.episodes} </p>
                    </>
                )}
                <div className="movie-actions">
                    <SerieActions serie={serie} />
                    {/* Solo admins ven este botón */}
                    {user?.role === "admin" && (
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
                            <button className="btn btn-danger" onClick={() => handleDelete(id)}>Sí, eliminar</button>
                            <button className="btn btn-outline" onClick={() => setShowConfirmDelete(false)}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}