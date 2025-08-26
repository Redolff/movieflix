import '../style/movieDetail.css'
import { Link, useParams } from "react-router-dom"
import { useFetchId } from "../hooks/useFetchid"
import { useDeleteData } from '../hooks/useDeleteData'

export const GameDetail = () => {
    const { id } = useParams()
    const { dataId: game, loading } = useFetchId("games", id)
    const { handleDelete } = useDeleteData("games", id)

    const handleUpdate = (item) => {
        console.log('Editar: ', item)
    }

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
                <h1>{game.title}</h1>
                <p className="movie-year"><strong>Año:</strong> {game.year}</p>
                <p className="movie-duration"><strong>Desarrollador:</strong> {game.developer} </p>
                <p className="movie-duration"><strong>Genero:</strong> {game.genre[0]} </p>
                <p className="movie-director"><strong>Multijugador:</strong> {game.multiplayer === false ? 'No' : 'Si'}</p>
                <p className="movie-duration"><strong>Plataforma:</strong> {game.platform[0]} </p>
                <div className="movie-actions">
                    <div className='movie-actions-top'>
                        <button
                            className="play-btn"
                            onClick={() => console.log('Reproducir: ', game.title)}
                        >
                            <i className="fa-solid fa-play"></i>
                            Reproducir
                        </button>
                        <button
                            className="add-btn"
                            onClick={() => console.log('Agregar a mi lista: ', game)}
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
                                onClick={(handleUpdate)}
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