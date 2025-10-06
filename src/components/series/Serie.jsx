import '../../style/movies.css'
import { useNavigate } from 'react-router-dom'

export const Serie = ({ serie }) => {
    const navigate = useNavigate()

    const handleNavigate = (serie) => {
        navigate(`/series/${serie._id}`)
    }

    return (
        <div onClick={() => handleNavigate(serie)}   
            key={serie._id}
            className="movie-card"
        >
            <img src={serie.poster} alt={serie.title} />
            <div className="movie-info">
                <strong>{serie.title}</strong>
            </div>
        </div>
    )
}