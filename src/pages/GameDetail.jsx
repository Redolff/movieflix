import '../style/movieDetail.css'
import { Link, useParams } from "react-router-dom"
import { useFetchId } from "../hooks/useFetchid"
import { GameActions } from '../components/games/GameActions'

export const GameDetail = () => {
    const { id } = useParams()
    const { dataId: game, loading } = useFetchId("games", id)

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
                <p className="movie-duration"><strong>Generos:</strong> {game.genre.join(", ")} </p>
                <p className="movie-director"><strong>Multijugador:</strong> {game.multiplayer === false ? 'No' : 'Si'}</p>
                <p className="movie-duration"><strong>Plataformas:</strong> {game.platform.join(", ")} </p>
                <GameActions game={game} id={id} />
            </div>
        </div>
    )
}