import '../style/navbar.css'
import { Link } from 'react-router-dom'
import { NavbarIcons } from './NavbarIcons'

export const Navbar = () => {

    return (
        <>
            <h1 className='navbar-title'>Movieflix</h1>
            <div className='navbar-nav'>
                <ul>
                    <div>
                        <Link to={'/'}> <li> Inicio </li> </Link>
                        <Link to={'/movies'}> <li> Peliculas </li> </Link>
                        <Link to={'/series'}> <li> Series </li> </Link>
                        <Link to={'/games'}> <li> Juegos </li> </Link>
                        <Link to={'/mylist'}> <li> Mi lista </li> </Link>
                    </div>
                    <NavbarIcons />
                </ul>
            </div>
        </>
    )
}