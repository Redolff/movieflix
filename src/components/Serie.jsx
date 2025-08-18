import '../style/movies.css'

export const Serie = ({ serie }) => {

    return (
        <div onClick={() => console.log('id: ', serie.id)}   
            key={serie.id}
            className="movie-card"
        >
            <img src={serie.poster} alt={serie.title} />
            <div className="movie-info">
                <strong>{serie.title}</strong>
            </div>
        </div>
    )
}