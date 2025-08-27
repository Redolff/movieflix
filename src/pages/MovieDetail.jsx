import '../style/movieDetail.css'

import { Link, useParams } from "react-router-dom"
import { useFetchId } from '../hooks/useFetchid'
import { useDeleteData } from '../hooks/useDeleteData'
import { useState } from 'react'

export const MovieDetail = () => {
    const { id } = useParams()
    const { dataId: movie, loading } = useFetchId("movies", id)
    const { handleDelete } = useDeleteData("movies", id)
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState(null)

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

    const handleUpdate = async () => {
        try {
            const plainData = { ...formData }

            // Validación rápida antes de enviar
            if (!plainData.title?.trim()) return alert("El título es obligatorio");
            if (!plainData.year || plainData.year <= 0) return alert("El año es obligatorio y debe ser entre 1900 y 2026");
            if (!plainData.director?.trim()) return alert("El director es obligatorio");
            if (!plainData.duration || plainData.duration <= 0) return alert("La duración es obligatoria");
            if (!plainData.genre || (Array.isArray(plainData.genre) && plainData.genre.length === 0) || plainData.genre === "") {
                return alert("Debe ingresar al menos un género");
            }

            // Transformamos string a array si corresponde
            if (typeof plainData.genre === "string") {
                plainData.genre = plainData.genre
                    .split(",")
                    .map(g => g.trim())
                    .filter(Boolean) // elimina vacíos
            }

            const response = await fetch(`http://localhost:3000/movies/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(plainData)
            })
            if (!response.ok) throw new Error("Error al actualizar la pelicula")

            alert("Pelicula actualizada correctamente ✅")
            setIsEditing(false)
            window.location.reload() // refrescamos para ver cambios
        } catch (error) {
            console.error(error)
            alert("Hubo un problema al actualizar ❌")
        }
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
                Verifica el nombre o vuelve a la página principal para seguir explorando.</p>
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
                        <p><strong>Duracion:</strong> {movie.duration} min</p>
                    </>
                )}
                <div className="movie-actions">
                    <div className='movie-actions-top'>
                        <button
                            className="play-btn"
                            onClick={() => console.log('Reproducir: ', movie.title)}
                        >
                            <i className="fa-solid fa-play"></i>
                            Reproducir
                        </button>
                        <button
                            className="add-btn"
                            onClick={() => console.log('Agregar a mi lista: ', movie)}
                        >
                            <i className="fa-solid fa-plus"></i>
                            Mi lista
                        </button>
                    </div>
                    {/* Solo admins ven este botón */}
                    {user?.role === "admin" && (
                        <div className='movie-actions-bottom'>
                            {isEditing ? (
                                <>
                                    <button className="btn btn-success" onClick={handleUpdate}>
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
                                    <button className="btn btn-danger" onClick={handleDelete}>
                                        <i className="fa-solid fa-trash"></i> Eliminar
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}