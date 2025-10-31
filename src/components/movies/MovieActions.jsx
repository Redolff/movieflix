import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToMyLIst } from "../../slices/profileSlice";
import { useUpdateMyList } from "../../hooks/useUpdateMyList";

export const MovieActions = ({ movie }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isAuthenticated } = useAuth()
    const currentProfile = useSelector((state) => state.currentProfile)
    const { updatedMyList } = useUpdateMyList()

    const [showTrailer, setShowTrailer] = useState(false)

    const myListProfile = currentProfile?.myList?.movies?.some(m => m._id === movie._id);

    const handleReproduce = () => {
        if (!movie.trailerUrl) {
            toast.error("No hay tráiler disponible para esta película");
            return;
        }
        setShowTrailer(true)
    }

    const handleAddOrRemove = async () => {
        if (!currentProfile?._id) {
            toast.warning("Seleccioná un perfil primero");
            return;
        }


        const updated = await updatedMyList({
            userId: user?._id,
            profileId: currentProfile?._id,
            category: 'movies',
            item: movie
        })

        if (updated) {
            dispatch(addToMyLIst({ type: 'movies', item: movie }));
            toast.success(
                myListProfile
                    ? "Pelicula eliminada de mi lista"
                    : "Pelicula agregada a mi lista"
            );
        }
    };

    return (
        <div className='movie-actions-top'>
            {isAuthenticated
                ? (
                    <button
                        className="play-btn"
                        onClick={(handleReproduce)}
                    >
                        <i className="fa-solid fa-play"></i>
                        Reproducir
                    </button>
                ) :
                (
                    <button
                        className="play-btn"
                        onClick={() => navigate('/login')}
                    >
                        <i className="fa-solid fa-play"></i>
                        Iniciar sesion para reproducir
                    </button>
                )
            }

            {showTrailer && (
                <div className="modal-overlay" onClick={() => setShowTrailer(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <iframe
                            width="100%"
                            height="500"
                            src={movie.trailerUrl.replace("watch?v=", "embed/")}
                            title={movie.title}
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

            {isAuthenticated
                ? (
                    <button
                        className="add-btn"
                        onClick={handleAddOrRemove}
                    >
                        <i className={`fa-solid ${myListProfile ? 'fa-minus' : 'fa-plus'}`}></i>
                        Mi lista
                    </button>
                )
                : (
                    <button
                        className="add-btn"
                        onClick={() => navigate('/login')}
                    >
                        <i className="fa-solid fa-plus"></i>
                        Iniciar sesion para agregar a tu lista
                    </button>
                )

            }
        </div>
    )
}