import { useRef } from "react"
import { Game } from "../components/Game"

export const Games = () => {
    //const [games, setGames] = useState([])
    const rowRef = useRef()

    const games = [
        {
            "id": "3a2b6f74-8d4e-4e5c-9d23-93f84c1e01a7",
            "title": "The Legend of Zelda: Breath of the Wild",
            "developer": "Nintendo",
            "publisher": "Nintendo",
            "release_year": 2017,
            "platforms": ["Nintendo Switch", "Wii U"],
            "genre": ["Action-adventure", "Open world"],
            "multiplayer": false,
            "rating": 9.7,
            "poster": "https://m.media-amazon.com/images/I/81KGsbYEDsL._AC_SL1500_.jpg"
        },
        {
            "id": "7d9c4a21-2a38-4a2b-8b0d-4c123d8b5b2a",
            "title": "The Witcher 3: Wild Hunt",
            "developer": "CD Projekt Red",
            "publisher": "CD Projekt",
            "release_year": 2015,
            "platforms": ["PC", "PS4", "Xbox One", "Nintendo Switch"],
            "genre": ["RPG", "Action-adventure"],
            "multiplayer": false,
            "rating": 9.5,
            "poster": "https://m.media-amazon.com/images/I/91ZpJXnXYwL._AC_SL1500_.jpg"
        },
        {
            "id": "c4d8f8b2-4129-45d9-92b1-d9f3a36c178f",
            "title": "Minecraft",
            "developer": "Mojang Studios",
            "publisher": "Mojang Studios",
            "release_year": 2011,
            "platforms": ["PC", "PS4", "Xbox One", "Nintendo Switch", "Mobile"],
            "genre": ["Sandbox", "Survival"],
            "multiplayer": true,
            "rating": 9.0,
            "poster": "https://m.media-amazon.com/images/I/81LIf4+z8mL._AC_SL1500_.jpg"
        },
        {
            "id": "b9f7a2e4-1f7c-41e9-a0de-f9a45a92251b",
            "title": "God of War Ragnarök",
            "developer": "Santa Monica Studio",
            "publisher": "Sony Interactive Entertainment",
            "release_year": 2022,
            "platforms": ["PS4", "PS5"],
            "genre": ["Action-adventure", "Hack and Slash"],
            "multiplayer": false,
            "rating": 9.6,
            "poster": "https://m.media-amazon.com/images/I/81vbUiqzKYL._AC_SL1500_.jpg"
        },
        {
            "id": "fa6b21a8-2a7c-4524-9187-993f00c3ec67",
            "title": "Fortnite",
            "developer": "Epic Games",
            "publisher": "Epic Games",
            "release_year": 2017,
            "platforms": ["PC", "PS4", "PS5", "Xbox One", "Nintendo Switch", "Mobile"],
            "genre": ["Battle Royale", "Shooter"],
            "multiplayer": true,
            "rating": 8.3,
            "poster": "https://m.media-amazon.com/images/I/81pxJYcaTtL._AC_SL1500_.jpg"
        },
        {
            "id": "5e82b624-0b7c-421f-9af8-2ec4b2b17e22",
            "title": "Red Dead Redemption 2",
            "developer": "Rockstar Games",
            "publisher": "Rockstar Games",
            "release_year": 2018,
            "platforms": ["PC", "PS4", "Xbox One"],
            "genre": ["Action-adventure", "Open world"],
            "multiplayer": true,
            "rating": 9.8,
            "poster": "https://m.media-amazon.com/images/I/81fIGK9fbbL._AC_SL1500_.jpg"
        }
    ]

    const scrollByAmount = (dir) => {
        const row = rowRef.current;
        if (!row) return;
        const amount = Math.round(row.clientWidth * 0.9); // “página” casi completa
        row.scrollBy({ left: dir === "right" ? amount : -amount, behavior: "smooth" });
    };

    return (
        <div className="movies-container">
            <h1> Todas los juegos </h1>

            <div className="movies-slider">
                <button className="arrow-btn arrow-left" onClick={() => scrollByAmount("left")} aria-label="Anterior">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>

                <section className="movies-row" ref={rowRef}>
                    {games.map((game) => {
                        return (
                            <Game game={game} key={game.id} />
                        )
                    })}
                </section>

                <button className="arrow-btn arrow-right" onClick={() => scrollByAmount("right")} aria-label="Siguiente">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
            </div>

        </div>
    )
}