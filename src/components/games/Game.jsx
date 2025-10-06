import '../../style/movies.css'
import { useNavigate } from "react-router-dom"

export const Game = ({ game }) => {
    const navigate = useNavigate()

    const handleNavigate = (game) => {
        navigate(`/games/${game._id}`)
    }

    return (
        <div onClick={() => handleNavigate(game)}
            key={game._id}
            className="movie-card"
        >
            <img src={game.poster} alt={game.title} />
            <div className="movie-info">
                <strong>{game.title}</strong>
            </div>
        </div>
    )
}