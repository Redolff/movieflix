import { Carrousels } from "../components/Carrousels"
import { Game } from "../components/games/Game"
import { Movie } from "../components/movies/Movie"
import { Serie } from "../components/series/Serie"

export const Mylist = () => {

    const myList = [
        {
            id: "s15-1v2w-3x4y-5z6a-543bc210de15",
            title: "The Man in the High Castle",
            year: 2015,
            director: "Frank Spotnitz",
            seasons: 4,
            episodes: 40,
            poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS533R_6RDZAYsEwtOU5UsVANRbj9wodg_umA&s",
            genrd: [
                "Drama",
                "Sci-Fi",
                "Thriller"
            ],
            rate: 8.0,
            trailerUrl: "https://www.youtube.com/watch?v=zzayf9GpXCI",
            category: "serie",
        },
        {
            id: "ed2f9c3a-6e94-44cd-a9c6-7a2343bb8b10",
            title: "Happy Gilmore 2",
            year: 2025,
            director: "Fernando Meirelles",
            duration: 117,
            poster: "https://m.media-amazon.com/images/M/MV5BYTQyNTRmYjItMDBjYi00YWNhLWEwMmQtNzJhODNiNjEzOWJlXkEyXkFqcGc@._V1_QL75_UX190_CR0,0,190,281_.jpg",
            genre: [
                "Deporte"
            ],
            rate: 8.1,
            trailerUrl: "https://www.youtube.com/watch?v=UNFUzrVrmgQ",
            category: "movie"
        },
        {
            id: "b9f7a2e4-1f7c-41e9-a0de-f9a45a92251b",
            title: "God of War Ragnarök",
            developer: "Santa Monica Studio",
            publisher: "Sony Interactive Entertainment",
            year: 2022,
            platform: [
                "PS4",
                "PS5"
            ],
            genre: [
                "Action-adventure",
                "Hack and Slash"
            ],
            multiplayer: false,
            rating: 9.6,
            poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEmHlaYwsOI5Bdtt7HY5TzBP4RCBLsB9sN2w&s",
            category: "game"
        }
    ]

    const movies = myList.filter(item => item.category === "movie")
    const series = myList.filter(item => item.category === "serie")
    const games = myList.filter(item => item.category === "game")

    return (
        <div className="container-my-list">
            <Carrousels
                title="Mis Películas"
                items={movies}
                renderItem={(movie) => <Movie movie={movie} key={movie.id} />}
            />

            <Carrousels
                title="Mis Series"
                items={series}
                renderItem={(serie) => <Serie serie={serie} key={serie.id} />}
            />

            <Carrousels
                title="Mis Juegos"
                items={games}
                renderItem={(game) => <Game game={game} key={game.id} />}
            />
        </div>
    )
}