import { useState } from 'react'
import { useDeleteData } from '../../hooks/useDeleteData'
import '../../style/MovieDetail.css'
import { toast } from 'react-toastify'

export const SerieActions = ({ serie, id }) => {
    const { handleDelete } = useDeleteData("series", id)
    const [showTrailer, setShowTrailer] = useState(false)
    const [showConfirmDelete, setShowConfirmDelete] = useState(false)

    // USER --> AUTHENTICACION
    const user = {
        name: 'Federico',
        role: 'admin'
    }

    const handleReproduce = () => {
        if (!serie.trailerUrl) {
            toast.error("No hay tráiler disponible para esta película");
            return;
        }
        setShowTrailer(true)
    }

    return (
        <div className="movie-actions">
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
            {/* Solo admins ven este botón */}
            {user?.role === "admin" && (
                <div className='movie-actions-bottom'>
                    <button
                        className="btn btn-outline"
                        onClick={() => console.log('Editar serie: ', serie)}
                    >
                        <i className="fa-solid fa-pen"></i>
                        Editar
                    </button>
                    <button
                        className="btn btn-danger"
                        onClick={() => setShowConfirmDelete(true)}
                    >
                        <i className="fa-solid fa-trash"></i>
                        Eliminar
                    </button>
                </div>
            )}
            {showConfirmDelete && (
                <div className="modal-overlay" onClick={() => setShowConfirmDelete(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>¿Seguro que deseas eliminar esta película?</h2>
                        <div className="modal-actions">
                            <button className="btn btn-danger" onClick={handleDelete}>Sí, eliminar</button>
                            <button className="btn btn-outline" onClick={() => setShowConfirmDelete(false)}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}