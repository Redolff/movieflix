import '../../style/account.css'
import { useRef, useState } from 'react'
import { useOutsideClick } from '../../hooks/useOutsideClick'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useDispatch, useSelector } from 'react-redux'
import { clearProfile } from '../../slices/profileSlice'

export const Account = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isAuthenticated, logout } = useAuth()
    const currentProfile = useSelector((state) => state.currentProfile)
    const [openUserMenu, setOpenUserMenu] = useState(false)
    const userIconRef = useRef(null)
    const userMenuRef = useRef(null)

    useOutsideClick([userIconRef, userMenuRef], () => setOpenUserMenu(false))

    const handleLogout = () => {
        dispatch(clearProfile())
        logout()
        navigate('/login')
    }
 
    return (
        <li
            ref={userIconRef}
            className='user-container'
            onClick={() => setOpenUserMenu(prev => !prev)}
        >
            <i className="fa-solid fa-user"></i>

            {openUserMenu && (
                <div ref={userMenuRef} className="user-dropdown">

                    {/* Mostrar perfiles si hay sesión */}
                    {isAuthenticated ? (
                        <>
                            {/* Nombre del usuario logueado */}
                            <div className="user-item">
                                <span>
                                    {currentProfile?.name 
                                        ? `${currentProfile.name} (${user.lastName})`
                                        : `${user?.firstName} ${user?.lastName}`
                                    }
                                </span>
                            </div>

                            {user?.role === 'admin' && (
                                <NavLink to={'/admin'}>
                                    <div className='user-item'>Administrar</div>
                                </NavLink>
                            )}

                            <NavLink to={'/profiles'}>
                                <div className="user-item">Perfiles</div>
                            </NavLink>

                            <hr />
                            <div className="user-item logout" onClick={handleLogout}>
                                Cerrar sesión
                            </div>
                        </>
                    ) : (
                        <>
                            <NavLink to={'/login'}>
                                <div className="user-item">Iniciar sesión</div>
                            </NavLink>
                        </>
                    )}
                </div>
            )}
        </li>
    )
}
