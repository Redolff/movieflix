import { Carrousels } from "../components/Carrousels"
import { Game } from "../components/Game"
import { Movie } from "../components/Movie"
import { Serie } from "../components/Serie"
import { useFetchData } from "../hooks/useFetchData"

export const Inicio = ({ query }) => {
    const { data: allMovies } = useFetchData("movies")
    const { data: allSeries } = useFetchData("series")
    const { data: allGames } = useFetchData("games")

    const q = query.toLowerCase()
    const filteredMovies = allMovies?.filter((m) => m.title.toLowerCase().includes(q)) || []
    const filteredSeries = allSeries?.filter((s) => s.title.toLowerCase().includes(q)) || []
    const filteredGames = allGames?.filter((g) => g.title.toLowerCase().includes(q)) || []

    return (
        <>
            <Carrousels 
                title={`Todas las películas`} 
                items={filteredMovies} 
                renderItem={(allMovies) => <Movie movie={allMovies} key={allMovies.id} />}
            />
            <Carrousels 
                title={`Todas las series`} 
                items={filteredSeries} 
                renderItem={(allSeries) => <Serie serie={allSeries} key={allSeries.id} />}
            />
            <Carrousels 
                title={`Todos los juegos`} 
                items={filteredGames} 
                renderItem={(allGames) => <Game game={allGames} key={allGames.id} />}
            />
        </>
    )
}