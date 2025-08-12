import '../style/navbar.css'

export const Navbar = () => {
    return (
        <>
            <h1 className='navbar-title'>Movieflix</h1>
            <div className='navbar-nav'>
                <ul>
                    <div>
                        <li> Inicio </li>
                        <li> Series </li>
                        <li> Peliculas </li>
                        <li> Juegos </li>
                        <li> Mi lista </li>
                    </div>

                    <div>
                        <li> <i className="fa-solid fa-magnifying-glass"></i>  </li>
                        <li> <i className="fa-regular fa-bell"></i> </li>
                        <li> <i className="fa-solid fa-user"></i> </li>
                    </div>
                </ul>
            </div>
        </>
    )
}