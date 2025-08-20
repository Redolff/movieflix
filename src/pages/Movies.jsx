import '../style/movies.css'
import { useMovies } from "../hooks/useMovies"
import { MovieCarrousel } from "../components/MovieCarrousel"
import { useMoviesByYear } from '../hooks/useMoviesByYear'
import { useState } from 'react'
import { useMoviesByGenre } from '../hooks/useMoviesByGenre'

export const Movies = () => {
    const [year, setYear] = useState(2006)
    const { movies } = useMovies()
    const { moviesYear } = useMoviesByYear(1994)
    const { moviesGenre: actionMovies } = useMoviesByGenre("action")
    const { moviesGenre: dramaMovies } = useMoviesByGenre("drama")
    const { moviesGenre: comediaMovies } = useMoviesByGenre("crime")

    return (
        <div>
            <MovieCarrousel title={`Todas las peliculas`} movies={movies} />
            
            <MovieCarrousel title={`Películas de Accion`} movies={actionMovies} />
            <MovieCarrousel title={`Películas de Comedia`} movies={comediaMovies} />
            <MovieCarrousel title={`Películas de Drama`} movies={dramaMovies} />

            <MovieCarrousel title={`Películas del año 1994`} movies={moviesYear} />
        </div>
    )
}