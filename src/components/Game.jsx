export const Game = ({ game }) => {
    return (
        <div onClick={() => console.log('id: ', game.id)}
            key={game.id}
            className="movie-card"
        >
            <img src={game.poster} alt={game.title} />
            <div className="movie-info">
                <strong>{game.title}</strong>
            </div>
        </div>
    )
}