import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

export const GameActions = ({ game }) => {
    const navigate = useNavigate()
    const { isAuthenticated } = useAuth()

    const handleBuy = () => {
        console.log('Comprar: ', game)
    }

    return (
        <div className='movie-actions-top'>
            {isAuthenticated
                ? <button
                    className="play-btn"
                    onClick={(handleBuy)}
                >
                    <i className="fa-solid fa-shop"></i>
                    Comprar
                </button>
                : <button
                    className="play-btn"
                    onClick={() => navigate("/login")}
                >
                    <i className="fa-solid fa-shop"></i>
                    Iniciar sesion para comprar
                </button>
            }
            {
                isAuthenticated ?
                    <button
                        className="add-btn"
                        onClick={() => console.log('Agregar a mi lista: ', game)}
                    >
                        <i className="fa-solid fa-plus"></i>
                        Mi lista
                    </button>
                    : <button
                        className="add-btn"
                        onClick={() => navigate('/login')}
                    >
                        <i className="fa-solid fa-plus"></i>
                        Iniciar sesion para agregar a la lista
                    </button>
            }
        </div>
    )
}