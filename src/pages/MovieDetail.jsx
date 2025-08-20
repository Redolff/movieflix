import '../style/movieDetail.css'
import { useParams } from "react-router-dom"
import { useMovie } from '../hooks/useMovie'

export const MovieDetail = () => {
    const { id } = useParams()
    const { movieId, loading } = useMovie(id)

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

    if (!movieId) return (
        <div className="container">
            <div className="icon">🎬</div>
            <h1>404 - Película no encontrada</h1>
            <p>Parece que la película que buscas no está en nuestra base de datos.
                Verifica el nombre o vuelve a la página principal para seguir explorando.</p>
            <a href="/">Volver al inicio</a>
        </div>
    )

    return (
        <div key={movieId.id} className="movie-detail">
            <img src={movieId.poster} alt={movieId.title} className="movie-detail-poster" />
            <div className="movie-detail-info">
                <h1>{movieId.title}</h1>
                <p className="movie-year"><strong>Año:</strong> {movieId.year}</p>
                <p className="movie-director"><strong>Director:</strong> {movieId.director}</p>
                <p className="movie-duration"><strong>Duración:</strong> {movieId.duration} min</p>
                <div className="movie-actions">
                    <button
                        className="play-btn"
                        onClick={() => console.log('Reproducir: ', movieId.title)}
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