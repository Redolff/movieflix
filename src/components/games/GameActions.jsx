import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { addToMyLIst } from "../../slices/profileSlice"
import { useUpdateMyList } from "../../hooks/useUpdateMyList"

export const GameActions = ({ game }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isAuthenticated } = useAuth()
    const currentProfile = useSelector((state) => state.currentProfile)
    const { updatedMyList } = useUpdateMyList()

    const myListProfile = currentProfile?.myList?.games?.some(m => m._id === game._id);

    const handleAddOrRemove = async () => {
        if (!currentProfile?._id) {
            toast.warning("Seleccioná un perfil primero");
            return;
        }

        const updated = await updatedMyList({
            userId: user._id,
            profileId: currentProfile._id,
            category: 'games',
            item: game
        })

        if (updated) {
            dispatch(addToMyLIst({ type: 'games', item: game }));
            toast.success(
                myListProfile
                    ? "Juego eliminada de mi lista"
                    : "Juego agregada a mi lista"
            );
        }
    };

    const handleBuy = () => {
        console.log('Comprar: ', game)
    }

    return (
        <div className='movie-actions-top'>
            {isAuthenticated
                ? (
                    <button
                        className="play-btn"
                        onClick={(handleBuy)}
                    >
                        <i className="fa-solid fa-shop"></i>
                        Comprar
                    </button>
                )
                : (
                    <button
                        className="play-btn"
                        onClick={() => navigate("/login")}
                    >
                        <i className="fa-solid fa-shop"></i>
                        Iniciar sesion para comprar
                    </button>
                )
            }
            {
                isAuthenticated ?
                    (
                        <button
                            className="add-btn"
                            onClick={handleAddOrRemove}
                        >
                            <i className="fa-solid fa-plus"></i>
                            Mi lista
                        </button>
                    )
                    :
                    (
                        <button
                            className="add-btn"
                            onClick={() => navigate('/login')}
                        >
                            <i className="fa-solid fa-plus"></i>
                            Iniciar sesion para agregar a la lista
                        </button>
                    )
            }
        </div>
    )
}