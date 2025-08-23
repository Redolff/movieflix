import { Carrousels } from "../components/Carrousels"
import { Game } from "../components/Game"
import { Movie } from "../components/Movie"
import { Serie } from "../components/Serie"
import { useFetchData } from "../hooks/useFetchData"

export const Inicio = () => {
    const { data: allMovies } = useFetchData("movies")
    const { data: allSeries } = useFetchData("series")
    const { data: allGames } = useFetchData("games")

    return (
        <>
            <Carrousels 
                title={`Todas las películas`} 
                items={allMovies} 
                renderItem={(allMovies) => <Movie movie={allMovies} key={allMovies.id} />}
            />
            <Carrousels 
                title={`Todas las series`} 
                items={allSeries} 
                renderItem={(allSeries) => <Serie serie={allSeries} key={allSeries.id} />}
            />
            <Carrousels 
                title={`Todos los juegos`} 
                items={allGames} 
                renderItem={(allGames) => <Game game={allGames} key={allGames.id} />}
            />
        </>
    )
}