import '../../style/navbarIcons.css'
import { useState } from 'react'

export const Searcher = ({ query, setQuery }) => {
    const [showSearch, setShowSearch] = useState(false)

    const handleSearchClick = () => setShowSearch(!showSearch)

    const handleInputChange = (e) => {
        e.preventDefault()
        const value = e.target.value
        setQuery(value)
    }

    return (
        <>
            <li onClick={handleSearchClick}>
                <i className="fa-solid fa-magnifying-glass"></i>
            </li>
            {showSearch && (
                <input
                    type="text"
                    className="search-input"
                    placeholder="Peliculas, series, juegos..."
                    value={query}
                    onChange={handleInputChange}
                    autoFocus
                />
            )}
        </>
    )
}