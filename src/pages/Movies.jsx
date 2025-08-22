import '../style/movies.css'
import { MovieCarrousel } from "../components/MovieCarrousel"
import { useFetchData } from '../hooks/useFetchData'

export const Movies = () => {
    const { data: allMovies } = useFetchData("movies")
    const { data: actionMovies } = useFetchData("movies", { genre: "action" })
    const { data: crimeMovies } = useFetchData("movies", { genre: "crime" })
    const { data: dramaMovies } = useFetchData("movies", { genre: "drama" })
    const { data: moviesYear } = useFetchData("movies", { year: 2000 })

    return (
        <div>
            <MovieCarrousel title={`Todas las peliculas`} movies={allMovies} />

            <MovieCarrousel title={`Películas de Accion`} movies={actionMovies} />
            <MovieCarrousel title={`Películas de Crimen`} movies={crimeMovies} />
            <MovieCarrousel title={`Películas de Drama`} movies={dramaMovies} />

            <MovieCarrousel title={`Películas del año 2000`} movies={moviesYear} />
        </div>
    )
}