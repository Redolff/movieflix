import '../movies/createMovieForm.css'
import { useState } from "react"
import { useAddData } from "../../../hooks/useAddData"
import { toast } from 'react-toastify'

export const CreateGameForm = ({ onSuccess }) => {
    const { handleAdd } = useAddData('games')
    const [formData, setFormData] = useState({
        title: "",
        developer: "",
        publisher: "",
        year: "",
        platform: "",
        genre: "",
        multiplayer: null,
        rating: "",
        poster: ""
    })

    const VALID_PLATFORMS = [
        "PS4", "PS5", "PC", "Xbox One", "Nintendo Switch", "Mobile", "Nintendo 64", "3DS", "Xbox", "Switch",
        "PlayStation", "Xbox Series X", "PS2", "GameCube", "Wii", "SNES", "Arcade", "Genesis", "Xbox 360"
    ]

    const VALID_GENRES = [
        "Action", "RPG", "Fantasy", "Metroidvania", "Platformer", "Fantasy", "Shooter",
        "MMO", "Fighting", "Adventure", "Sci-Fi", "Puzzle", "Simulation", "Racing", "Strategy", "RTS",
        "Horror", "Open world", "Battle Royale", "Hack and Slash", "Survival", "Sandbox"
    ]

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "number" ? Number(value) : value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const genreArray = formData.genre
            .split(",")
            .map((g) => g.trim())
            .filter((g) => g !== "");

        const platformArray = formData.platform
            .split(",")
            .map((p) => p.trim())
            .filter((p) => p !== "");

        if (!formData.title.trim()) return toast.warning("El título es obligatorio");
        if (!formData.developer.trim()) return toast.warning("El desarrollador es obligatorio");
        if (!formData.publisher.trim()) return toast.warning("El editor o publicador es obligatorio");
        if (!formData.year || formData.year < 1900) return toast.warning("El año no es válido, tiene que ser posterior a 1900");
        if (formData.multiplayer === undefined || formData.multiplayer === null) return toast.warning("Debe decidir si es o no multijugador");
        if (!formData.poster.trim()) return toast.warning("El poster es obligatorio");
        if (!formData.rating || (formData.rating < 1 || formData.rating > 10)) return toast.warning("El puntaje debe ser entre 1 y 10")
        if (genreArray.length === 0) return toast.warning("Debes ingresar al menos un género");
        const invalidGenres = genreArray.filter(g => !VALID_GENRES.includes(g));
        if (invalidGenres.length > 0) {
            return toast.warning(
                `Los generos "${invalidGenres.join(", ")}" no son válidos. Géneros válidos: ${VALID_GENRES.join(", ")}`
            );
        }
        if (platformArray.length === 0) return toast.warning("Debes ingresar al menos una plataforma");
        const invalidPlatforms = platformArray.filter(g => !VALID_PLATFORMS.includes(g));
        if (invalidPlatforms.length > 0) {
            return toast.warning(
                `Las plataformas "${invalidPlatforms.join(", ")}" no son válidas. Plataformas válidas: ${VALID_PLATFORMS.join(", ")}`
            );
        }

        const newGame = {
            ...formData,
            year: Number(formData.year),
            rating: Number(formData.rating),
            genre: genreArray,
            platform: platformArray
        };

        handleAdd(newGame, {
            onSuccess: () => {
                toast.success("Juego creado con éxito ✅");
                setFormData({
                    title: "",
                    developer: "",
                    publisher: "",
                    year: "",
                    platform: "",
                    genre: "",
                    multiplayer: null,
                    rating: "",
                    poster: ""
                });
                onSuccess?.(newGame); // cerrar form o redirigir
            },
        });
    };


    return (
        <form onSubmit={handleSubmit} className="create-movie-form">
            <div>
                <label>Título</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Karts, Fifa 25, NBA 2K" />
            </div>
            <div>
                <label>Año</label>
                <input type="number" name="year" value={formData.year} onChange={handleChange} placeholder="2025" />
            </div>
            <div>
                <label>Desarrollador</label>
                <input type="text" name="developer" value={formData.developer} onChange={handleChange} placeholder="Nintendo, CD Projekt Red" />
            </div>
            <div>
                <label>Publicador/Editor</label>
                <input type="text" name="publisher" value={formData.publisher} onChange={handleChange} placeholder="Mojang Studios, Sony Interactive Entertainment" />
            </div>
            <div>
                <label>Plataforma (separado por comas)</label>
                <input type="text" name="platform" value={formData.platform} onChange={handleChange} placeholder={`PS4, PS5, PC`} />
            </div>
            <div>
                <label>Género (separado por comas)</label>
                <input type="text" name="genre" value={formData.genre} onChange={handleChange} placeholder={`RPG, Battle Royale, Shooter`} />
            </div>
            <div>
                <label>Puntaje</label>
                <input type="number" name="rating" value={formData.rating} onChange={handleChange} placeholder="8,4" />
            </div>
            <div>
                <label>Poster (URL)</label>
                <input type="text" name="poster" value={formData.poster} onChange={handleChange} placeholder="https://play-lh.googleusercontent.com/..." />
            </div>
            <div>
                <label>¿Es multijugador?</label>
                <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
                    <label style={{ display: "flex", gap: "1rem", marginTop: "0.5rem"}}>
                        <input
                            type="radio"
                            name="multiplayer"
                            value="true"
                            checked={formData.multiplayer === true}
                            onChange={() => setFormData((prev) => ({ ...prev, multiplayer: true }))}
                        />
                        Sí
                    </label>
                    <label style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
                        <input
                            type="radio"
                            name="multiplayer"
                            value="false"
                            checked={formData.multiplayer === false}
                            onChange={() => setFormData((prev) => ({ ...prev, multiplayer: false }))}
                        />
                        No
                    </label>
                </div>
            </div>

            <button type="submit">Guardar</button>
        </form>
    )
}