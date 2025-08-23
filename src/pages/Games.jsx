import { Game } from "../components/Game"
import { useFetchData } from "../hooks/useFetchData"
import { Carrousels } from "../components/Carrousels"

export const Games = () => {
    const { data: allGames } = useFetchData("games")
    const { data: ps4Games } = useFetchData("games", { platform: "ps4" })

    return (
        <div>
            <Carrousels
                title={`Todos los juegos`}
                items={allGames}
                renderItem={(allGames) => <Game game={allGames} key={allGames.id} />}
            />
            <Carrousels
                title={`Todos los juegos para PS4`}
                items={ps4Games}
                renderItem={(ps4Games) => <Game game={ps4Games} key={ps4Games.id} />}
            />
        </div>
    )
}