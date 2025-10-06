import '../../style/movies.css'
import { useNavigate } from 'react-router-dom'

export const Movie = ({ movie }) => {
    const navigate = useNavigate()

    const handleNavigate = (movie) => {
        navigate(`/movies/${movie._id}`)
    }

    return (
        <div onClick={() => handleNavigate(movie)}   
            key={movie._id}
            className="movie-card"
        >
            <img src={movie.poster} alt={movie.title} />
            <div className="movie-info">
                <strong>{movie.title}</strong>
            </div>
        </div>
    )
}