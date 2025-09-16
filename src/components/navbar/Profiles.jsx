import '../../style/profiles.css'
import { useRef, useState } from 'react'
import { useOutsideClick } from '../../hooks/useOutsideClick'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
export const Profiles = () => {
    const [openUserMenu, setOpenUserMenu] = useState(false)
    const userIconRef = useRef(null)
    const userMenuRef = useRef(null)

    useOutsideClick([userIconRef, userMenuRef], () => setOpenUserMenu(false))

    const { user, isAuthenticated, logout } = useAuth()

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
                                <span>{user?.firstName} {user?.lastName}</span>
                            </div>

                            {user?.role === 'admin' && (
                                <NavLink to={'/admin'}>
                                    <div className='user-item'>Administrar</div>
                                </NavLink>
                            )}

                            <div className="user-item">Cuenta</div>

                            <hr />
                            <div className="user-item logout" onClick={logout}>
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
