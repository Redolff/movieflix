import '../style/movieDetail.css'
import { Link, useParams } from "react-router-dom"
import { useFetchId } from '../hooks/useFetchid'
import { useDeleteData } from '../hooks/useDeleteData'

export const SerieDetail = () => {
    const { id } = useParams()
    const { dataId: serie, loading } = useFetchId("series", id)
    const { handleDelete } = useDeleteData("series", id)

    // USER --> AUTHENTICACION
    const user = {
        name: 'Federico',
        role: 'admin'
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
                <h1>{serie.title}</h1>
                <p className="movie-year"><strong>Año:</strong> {serie.year}</p>
                <p className="movie-director"><strong>Director:</strong> {serie.director}</p>
                <p className="movie-genre"><strong>Genero:</strong> {serie.genre[0]}</p>
                <p className="movie-duration"><strong>Temporadas:</strong> {serie.seasons} </p>
                <p className="movie-duration"><strong>Episodios totales:</strong> {serie.episodes} </p>
                <div className="movie-actions">
                    <div className='movie-actions-top'>
                        <button
                            className="play-btn"
                            onClick={() => console.log('Reproducir: ', serie.title)}
                        >
                            <i className="fa-solid fa-play"></i>
                            Reproducir
                        </button>
                        <button
                            className="add-btn"
                            onClick={() => console.log('Agregar a mi lista: ', serie)}
                        >
                            <i className="fa-solid fa-plus"></i>
                            Mi lista
                        </button>
                    </div>
                    {/* Solo admins ven este botón */}
                    {user?.role === "admin" && (
                        <div className='movie-actions-bottom'>
                            <button
                                className="btn btn-outline"
                                onClick={() => console.log('Editar serie: ', serie)}
                            >
                                <i className="fa-solid fa-pen"></i>
                                Editar
                            </button>
                            <button
                                className="btn btn-danger"
                                onClick={(handleDelete)}
                            >
                                <i className="fa-solid fa-trash"></i>
                                Eliminar
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}