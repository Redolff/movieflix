import '../style/movies.css'

export const Movie = ({ movie }) => {
    return (
        <div key={movie.id} className="movie-card">
            <img src={movie.poster} alt={movie.title} />
            <div className="movie-info">
                <strong>{movie.title}</strong>
            </div>
        </div>
    )
}