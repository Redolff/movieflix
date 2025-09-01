export const GameActions = ({ game }) => {

    const handleReproduce = () => {
        console.log('Jugar: ', game)
    }

    return (
        <div className='movie-actions-top'>
            <button
                className="play-btn"
                onClick={(handleReproduce)}
            >
                <i className="fa-solid fa-play"></i>
                Jugar
            </button>
            <button
                className="add-btn"
                onClick={() => console.log('Agregar a mi lista: ', game)}
            >
                <i className="fa-solid fa-plus"></i>
                Mi lista
            </button>
        </div>
    )
}