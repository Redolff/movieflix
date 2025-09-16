import { Game } from "../../components/games/Game"
import { useFetchData } from "../../hooks/useFetchData"
import { Carrousels } from "../../components/Carrousels"

export const Games = () => {
    const { data: allGames } = useFetchData("games")
    const { data: ps4Games } = useFetchData("games", { platform: "ps4" })
    const { data: pcGames } = useFetchData("games", { platform: "pc" })

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
            <Carrousels
                title={`Todos los juegos para PC`}
                items={pcGames}
                renderItem={(pcGames) => <Game game={pcGames} key={pcGames.id} />}
            />
        </div>
    )
}