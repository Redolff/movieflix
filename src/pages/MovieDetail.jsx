import '../style/movieDetail.css'
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const MovieDetail = () => {
    const { id } = useParams()
    const [movie, setMovie] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchMovie = async () => {
            setLoading(true)
            try {
                const response = await fetch(`https://movies-api-xnrw.onrender.com/movies/${id}`)
                if (!response.ok) {
                    console.error('Error fetching response')
                }
                const data = await response.json()
                setMovie(data)
            } catch (error) {
                console.error('Error cargando la pelicula: ', error)
            } finally {
                setLoading(false)
            }
        }
        fetchMovie()
    }, [id])


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
            <a href="/">Volver al inicio</a>
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
                                <button className="play-btn"><i className="fa-solid fa-play"></i> Reproducir</button>
                                <button className="add-btn"><i className="fa-solid fa-plus"></i> Mi lista</button>
                            </div>
                        </div>
                    </div>
    )
}