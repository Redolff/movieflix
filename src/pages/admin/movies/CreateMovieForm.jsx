import "./createMovieForm.css"
import { useState } from "react";
import { toast } from "react-toastify"
import { useAddData } from "../../../hooks/useAddData";

export const CreateMovieForm = ({ onSuccess }) => {
  const { handleAdd } = useAddData("movies")
  const [formData, setFormData] = useState({
    title: "",
    year: "",
    director: "",
    duration: "",
    poster: "",
    genre: "",
    rate: "",
    trailerUrl: ""
  });

  const VALID_GENRES = [
    "Drama", "Deporte", "History", "Thriller", "Adventure", "Sci-Fi", "Action",
    "Crime", "Romance", "Animation", "Biography", "Fantasy", "Mystery", "War", "Horror"
  ];

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convertimos géneros a array, removemos espacios vacíos
    const genreArray = formData.genre
      .split(",")
      .map((g) => g.trim())
      .filter((g) => g !== "");

    if (!formData.title.trim()) return toast.warning("El título es obligatorio");
    if (!formData.year || formData.year < 1900) return toast.warning("El año no es válido, tiene que ser posterior a 1900");
    if (!formData.director.trim()) return toast.warning("El director es obligatorio");
    if (!formData.duration || formData.duration === 0) return toast.warning("La duracion es obligatoria");
    if (!formData.poster.trim()) return toast.warning("El poster es obligatorio");
    if (!formData.rate || formData.rate < 1 || formData.rate > 10) return toast.warning("El puntaje debe ser entre 1 y 10")
    if (!formData.trailerUrl.trim()) return toast.warning("El trailer es obligatorio");
    if (genreArray.length === 0) return toast.warning("Debes ingresar al menos un género");
    // Validacion para que incluya uno de todos los generos validos
    const invalidGenres = genreArray.filter(g => !VALID_GENRES.includes(g));
    if (invalidGenres.length > 0) {
      return toast.warning(
        `Los generos "${invalidGenres.join(", ")}" no son válidos. Géneros válidos: ${VALID_GENRES.join(", ")}`
      );
    }

    const newMovie = {
      ...formData,
      id: crypto.randomUUID(),
      year: Number(formData.year),
      duration: Number(formData.duration),
      rate: Number(formData.rate),
      genre: genreArray,
    };

    handleAdd(newMovie, {
      onSuccess: () => {
        toast.success("✅ Película creada con éxito");
        setFormData({
          title: "",
          year: "",
          director: "",
          duration: "",
          poster: "",
          genre: "",
          rate: "",
          trailerUrl: ""
        });
        onSuccess?.(newMovie); // cerrar form o redirigir
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="create-movie-form">
      <div>
        <label>Título</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Osito Ted, Gigantes de Acero, Matrix" />
      </div>
      <div>
        <label>Año</label>
        <input type="number" name="year" value={formData.year} onChange={handleChange} placeholder="1950" />
      </div>
      <div>
        <label>Director</label>
        <input type="text" name="director" value={formData.director} onChange={handleChange} placeholder="James Cameron, Damian Ciffron" />
      </div>
      <div>
        <label>Duración (en minutos)</label>
        <input type="number" name="duration" value={formData.duration} onChange={handleChange} placeholder="120" />
      </div>
      <div>
        <label>Poster (URL)</label>
        <input type="text" name="poster" value={formData.poster} onChange={handleChange} placeholder="https://play-lh.googleusercontent.com/..." />
      </div>
      <div>
        <label>Género (separado por comas)</label>
        <input type="text" name="genre" value={formData.genre} onChange={handleChange} placeholder={`Drama, Action, Sci-Fi`} />
      </div>
      <div>
        <label>Puntaje</label>
        <input type="number" name="rate" value={formData.rate} onChange={handleChange} placeholder="9,3" />
      </div>
      <div>
        <label>Trailer (URL)</label>
        <input type="text" name="trailerUrl" value={formData.trailerUrl} onChange={handleChange} placeholder="https://www.youtube.com/watch?v=_0RXbJtBk68" />
      </div>

      <button type="submit">Guardar</button>
    </form>
  );
};
