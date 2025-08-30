import { useState } from "react"
import { useDeleteData } from "../../hooks/useDeleteData"

export const GameActions = ({ game, id }) => {
    const [showConfirmDelete, setShowConfirmDelete] = useState(false)
    const { handleDelete } = useDeleteData("games", id)

    const handleUpdate = (item) => {
        console.log('Editar: ', item)
    }

    const user = {
        name: 'Federico',
        role: 'admin'
    }

    return (
        <div className="movie-actions">
            <div className='movie-actions-top'>
                <button
                    className="play-btn"
                    onClick={() => console.log('Jugar: ', game.title)}
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
            {/* Solo admins ven este botón */}
            {user?.role === "admin" && (
                <div className='movie-actions-bottom'>
                    <button
                        className="btn btn-outline"
                        onClick={(handleUpdate)}
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