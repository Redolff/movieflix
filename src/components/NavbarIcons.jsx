import { useOutsideClick } from '../hooks/useOutsideClick'
import '../style/navbarIcons.css'
import { useRef, useState } from "react"

export const NavbarIcons = () => {
    const [showSearch, setShowSearch] = useState(false)
    const [query, setQuery] = useState("")
    // Estado y refs para notificaciones
    const [openNotifications, setOpenNotifications] = useState(false)
    const notifIconRef = useRef(null)
    const notifMenuRef = useRef(null)
    // Estado y refs para usuario
    const [openUserMenu, setOpenUserMenu] = useState(false)
    const userIconRef = useRef(null)
    const userMenuRef = useRef(null)

    const handleSearchClick = () => setShowSearch(!showSearch)
    const handleInputChange = (e) => {
        e.preventDefault()
        const value = e.target.value
        console.log(value)
        setQuery(value)
    }

    useOutsideClick([notifIconRef, notifMenuRef], () => setOpenNotifications(false))
    useOutsideClick([userIconRef, userMenuRef], () => setOpenUserMenu(false))

    const novedades = [
        {
            id: 1,
            title: "Película A",
            date: "10 Ago 2025",
            img: "https://via.placeholder.com/150x80?text=Película+A"
        },
        {
            id: 2,
            title: "Serie B",
            date: "5 Ago 2025",
            img: "https://via.placeholder.com/150x80?text=Serie+B"
        },
        {
            id: 3,
            title: "Juego C",
            date: "1 Ago 2025",
            img: "https://via.placeholder.com/150x80?text=Juego+C"
        }
    ]
    // Simulación de perfiles
    const perfiles = [
        { id: 1, name: "Fede" },
        { id: 2, name: "Invitado" }
    ]

    return (
        <div className='navbar-icons'>
            <li onClick={handleSearchClick}>
                <i className="fa-solid fa-magnifying-glass"></i>
            </li>
            {showSearch && (
                <input
                    type="text"
                    className="search-input"
                    placeholder="Titulos, generos, series..."
                    value={query}
                    onChange={handleInputChange}
                    autoFocus
                />
            )}

            <li
                ref={notifIconRef}
                className='notifications-container'
                onClick={() => setOpenNotifications(prev => !prev)}
            >
                <i className="fa-regular fa-bell"></i>
                {openNotifications && (
                    <div ref={notifIconRef} className="notifications-dropdown">
                        <h4>Últimos estrenos</h4>
                        {novedades.map(item => (
                            <div key={item.id} className="notification-item">
                                <img src={item.img} alt={item.title} />
                                <div>
                                    <p className="notif-title">{item.title}</p>
                                    <span className="notif-date">{item.date}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </li>

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
        </div>
    )
}