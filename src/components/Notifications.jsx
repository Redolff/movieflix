import { useFetchData } from '../hooks/useFetchData'
import { useOutsideClick } from '../hooks/useOutsideClick'
import '../style/navbarIcons.css'
import { useRef, useState } from 'react'

export const Notifications = () => {
    const { data: moviesPremiere } = useFetchData("movies", { year: 2019 })
    const [openNotifications, setOpenNotifications] = useState(false)
    const notifIconRef = useRef(null)
    const notifMenuRef = useRef(null)

    useOutsideClick([notifIconRef, notifMenuRef], () => setOpenNotifications(false))

    return (
        <li
            ref={notifIconRef}
            className='notifications-container'
            onClick={() => setOpenNotifications(prev => !prev)}
        >
            <i className="fa-regular fa-bell"></i>
            {openNotifications && (
                <div ref={notifIconRef} className="notifications-dropdown">
                    <h4>Últimos estrenos</h4>
                    {moviesPremiere.map(movie => (
                        <div key={movie.id} className="notification-item">
                            <img src={movie.poster} alt={movie.title} />
                            <div>
                                <p className="notif-title">{movie.title}</p>
                                <span className="notif-date">{movie.year}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </li>
    )
}