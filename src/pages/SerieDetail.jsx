import '../style/movieDetail.css'
import { Link, useParams } from "react-router-dom"
import { useFetchId } from '../hooks/useFetchid'
import { SerieActions } from '../components/series/SerieActions'

export const SerieDetail = () => {
    const { id } = useParams()
    const { dataId: serie, loading } = useFetchId("series", id)

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
                <h1>{serie.title}</h1>
                <p className="movie-year"><strong>Año:</strong> {serie.year}</p>
                <p className="movie-director"><strong>Director:</strong> {serie.director}</p>
                <p className="movie-genre"><strong>Generos:</strong> {serie.genre.join(", ")}</p>
                <p className="movie-duration"><strong>Temporadas:</strong> {serie.seasons} </p>
                <p className="movie-duration"><strong>Episodios totales:</strong> {serie.episodes} </p>

                <SerieActions serie={serie} id={id} />
            </div>
        </div>
    )
}