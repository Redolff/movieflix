import '../style/navbarIcons.css'
import { useRef, useState } from 'react'
import { useOutsideClick } from '../hooks/useOutsideClick'

export const Profiles = () => {
    const [openUserMenu, setOpenUserMenu] = useState(false)
    const userIconRef = useRef(null)
    const userMenuRef = useRef(null)

    useOutsideClick([userIconRef, userMenuRef], () => setOpenUserMenu(false))

    const perfiles = [
        { id: 1, name: "Fede" },
        { id: 2, name: "Invitado" }
    ]

    return (
        <li
            ref={userIconRef}
            className='user-container'
            onClick={() => setOpenUserMenu(prev => !prev)}
        >
            <i className="fa-solid fa-user"></i>
            {openUserMenu && (
                <div ref={userMenuRef} className="user-dropdown">
                    {perfiles.map(p => (
                        <div key={p.id} className="user-item">
                            <span>{p.name}</span>
                        </div>
                    ))}
                    <hr />
                    <div className="user-item">Administrar perfiles</div>
                    <div className="user-item">Cuenta</div>
                    <hr />
                    <div className="user-item logout">Cerrar sesión</div>
                </div>
            )}
        </li>
    )
}