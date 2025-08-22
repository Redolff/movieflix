import { MovieCarrousel } from "../components/MovieCarrousel"
import { useFetchData } from "../hooks/useFetchData"

export const Inicio = () => {
    const { data: allMovies } = useFetchData("movies")
    const { data: allSeries } = useFetchData("series")
    const { data: allGames } = useFetchData("games")

    return (
        <>
            <MovieCarrousel title={`Todas las películas`} movies={allMovies} />
            <MovieCarrousel title={`Todas las series`} movies={allSeries} />
            <MovieCarrousel title={`Todos los juegos`} movies={allGames} />
        </>
    )
}