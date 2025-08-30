import '../../style/navbarIcons.css'
import { useFetchData } from '../../hooks/useFetchData'
import { useOutsideClick } from '../../hooks/useOutsideClick'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export const Notifications = () => {
    const { data: moviesPremiere } = useFetchData("movies", { fromYear: 2025 })
    const { data: seriesPremiere } = useFetchData("series", { fromYear: 2025 })
    const { data: gamesPremiere } = useFetchData("games", { fromYear: 2025 })
    const [openNotifications, setOpenNotifications] = useState(false)
    const notifIconRef = useRef(null)
    const notifMenuRef = useRef(null)
    const navigate = useNavigate()

    useOutsideClick([notifIconRef, notifMenuRef], () => setOpenNotifications(false))

    const handleClick = (type, id) => {
        setOpenNotifications(false)
        navigate(`/${type.toLowerCase()}s/${id}`)
    }

    const renderItem = (item, type) => (

        <div
            key={item.id}
            className="notification-item"
            onClick={() => handleClick(type, item.id)}
        >
            <img src={item.poster} alt={item.title} className="notif-img" />
            <div className="notif-info">
                <p className="notif-title">{item.title}</p>
                <span className={`notif-badge ${type.toLowerCase()}`}>
                    {type}
                </span>
                <span className="notif-date">{item.year}</span>
            </div>
        </div>
    )

    return (
        <li
            ref={notifIconRef}
            className='notifications-container'
            onClick={() => setOpenNotifications(prev => !prev)}
        >
            <i className="fa-regular fa-bell"></i>
            <AnimatePresence>
                {openNotifications && (
                    <motion.div
                        ref={notifIconRef}
                        className="notifications-dropdown"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                    >
                        <h3> 📢 Últimos estrenos </h3>
                        <div className='notif-list'>
                            {moviesPremiere.map(movies => renderItem(movies, "Movie"))}
                            {seriesPremiere.map(series => renderItem(series, "Serie"))}
                            {gamesPremiere.map(games => renderItem(games, "Game"))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </li>
    )
}