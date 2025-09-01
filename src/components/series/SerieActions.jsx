import '../../style/MovieDetail.css'
import { useState } from 'react'
import { toast } from 'react-toastify'

export const SerieActions = ({ serie }) => {
    const [showTrailer, setShowTrailer] = useState(false)

    const handleReproduce = () => {
        if (!serie.trailerUrl) {
            toast.error("No hay tráiler disponible para esta película");
            return;
        }
        setShowTrailer(true)
    }

    return (
        <div className='movie-actions-top'>
            <button
                className="play-btn"
                onClick={handleReproduce}
            >
                <i className="fa-solid fa-play"></i>
                Reproducir
            </button>

            {showTrailer && (
                <div className="modal-overlay" onClick={() => setShowTrailer(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <iframe
                            width="100%"
                            height="500"
                            src={serie.trailerUrl.replace("watch?v=", "embed/")}
                            title={serie.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                        <button className="btn btn-outline" onClick={() => setShowTrailer(false)}>
                            Cerrar
                        </button>
                    </div>
                </div>
            )}

            <button
                className="add-btn"
                onClick={() => console.log('Agregar a mi lista: ', serie)}
            >
                <i className="fa-solid fa-plus"></i>
                Mi lista
            </button>
        </div>

    )
}