import { Carrousels } from "../../components/Carrousels"
import { Game } from "../../components/games/Game"
import { Movie } from "../../components/movies/Movie"
import { Serie } from "../../components/series/Serie"
import { useSelector } from "react-redux"

export const Mylist = () => {
    const profile = useSelector((state) => state.currentProfile)

    const movies = profile?.myList?.movies
    const series = profile?.myList?.series
    const games = profile?.myList?.games

    return (
        <div className="container-my-list">
            <Carrousels
                title="Mis Películas"
                items={movies}
                renderItem={(movie) => <Movie movie={movie} key={movie._id} />}
            />

            <Carrousels
                title="Mis Series"
                items={series}
                renderItem={(serie) => <Serie serie={serie} key={serie._id} />}
            />

            <Carrousels
                title="Mis Juegos"
                items={games}
                renderItem={(game) => <Game game={game} key={game._id} />}
            />
        </div>
    )
}