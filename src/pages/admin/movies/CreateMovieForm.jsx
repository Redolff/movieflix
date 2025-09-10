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

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return toast.warning("El título es obligatorio");
    if (!formData.year || formData.year < 1900) return toast.warning("El año no es válido, tiene que ser posterior a 1900");
    if (!formData.director.trim()) return toast.warning("El director es obligatorio");
    if (!formData.duration || formData.duration === 0) return toast.warning("La duracion es obligatoria");
    if (!formData.poster.trim()) return toast.warning("El poster es obligatorio");
    if (!formData.rate || formData.rate < 1 || formData.rate > 10) return toast.warning("El puntaje debe ser entre 1 y 10")
    if (!formData.genre || (Array.isArray(formData.genre) && formData.genre.length === 0) || formData.genre === "") return toast.warning("Debes ingresar al menos un género");
    if (!formData.trailerUrl.trim()) return toast.warning("El trailer es obligatorio");

    const newMovie = {
      ...formData,
      id: crypto.randomUUID(),
      year: Number(formData.year),
      duration: Number(formData.duration),
      rate: Number(formData.rate),
      genre: formData.genre.split(",").map(g => g.trim()),
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
        <input type="text" name="title" value={formData.title} onChange={handleChange} />
      </div>
      <div>
        <label>Año</label>
        <input type="number" name="year" value={formData.year} onChange={handleChange} />
      </div>
      <div>
        <label>Director</label>
        <input type="text" name="director" value={formData.director} onChange={handleChange} />
      </div>
      <div>
        <label>Duración (en minutos)</label>
        <input type="number" name="duration" value={formData.duration} onChange={handleChange} />
      </div>
      <div>
        <label>Poster (URL)</label>
        <input type="text" name="poster" value={formData.poster} onChange={handleChange} />
      </div>
      <div>
        <label>Género (separado por comas)</label>
        <input type="text" name="genre" value={formData.genre} onChange={handleChange} />
      </div>
      <div>
        <label>Puntaje</label>
        <input type="number" name="rate" value={formData.rate} onChange={handleChange} />
      </div>
      <div>
        <label>Trailer (URL)</label>
        <input type="text" name="trailerUrl" value={formData.trailerUrl} onChange={handleChange} />
      </div>

      <button type="submit">Guardar</button>
    </form>
  );
};
