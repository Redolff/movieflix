import '../style/navbar.css'
import { NavLink } from 'react-router-dom'
import { NavbarIcons } from './NavbarIcons'

export const Navbar = ({ query, setQuery }) => {

    return (
        <>
            <h1 className='navbar-title'>Movieflix</h1>
            <div className='navbar-nav'>
                <ul>
                    <div>
                        <NavLink 
                            to={'/'}
                            className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
                        > 
                            <li> Inicio </li> 
                        </NavLink>
                        <NavLink 
                        to={'/movies'}
                        className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
                        > 
                            <li> Peliculas </li> 
                        </NavLink>
                        <NavLink 
                            to={'/series'}
                            className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
                        > 
                            <li> Series </li> 
                        </NavLink>
                        <NavLink 
                            to={'/games'}
                            className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
                        > 
                        <li> Juegos </li> 
                        </NavLink>
                        <NavLink 
                            to={'/mylist'}
                            className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
                        > 
                            <li> Mi lista </li> 
                        </NavLink>
                    </div>
                    <NavbarIcons query={query} setQuery={setQuery} />
                </ul>
            </div>
        </>
    )
}