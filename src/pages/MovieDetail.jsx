import '../style/movieDetail.css'

import { Link, useParams } from "react-router-dom"
import { useFetchId } from '../hooks/useFetchid'

export const MovieDetail = () => {
    const { id } = useParams()
    const { dataId: movie, loading } = useFetchId("movies", id)

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
                <h1>{movie.title}</h1>
                <p className="movie-year"><strong>Año:</strong> {movie.year}</p>
                <p className="movie-director"><strong>Director:</strong> {movie.director}</p>
                <p className="movie-duration"><strong>Duración:</strong> {movie.duration} min</p>
                <div className="movie-actions">
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
            </div>
        </div>
    )
}