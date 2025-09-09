import { useState } from "react";
import { toast } from "react-toastify";

export const CreateMovieForm = ({ onSuccess }) => {
  //const { handleAdd } = useAddData("movies"); // endpoint: movies.json
  const [formData, setFormData] = useState({
    title: "",
    year: "",
    director: "",
    genre: "",
    duration: "",
    poster: "",
    trailer: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) return toast.warning("El título es obligatorio");
    if (!formData.year || formData.year < 1900) return toast.warning("El año no es válido");
    if (!formData.director.trim()) return toast.warning("El director es obligatorio");
    if (!formData.genre.trim()) return toast.warning("Debes ingresar al menos un género");

    const newMovie = {
      ...formData,
      id: crypto.randomUUID(),
      genre: formData.genre.split(",").map((g) => g.trim()).filter(Boolean)
    };

    
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
      <div>
        <label className="block mb-1">Título</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full border px-2 py-1 rounded" />
      </div>
      <div>
        <label className="block mb-1">Año</label>
        <input type="number" name="year" value={formData.year} onChange={handleChange} className="w-full border px-2 py-1 rounded" />
      </div>
      <div>
        <label className="block mb-1">Director</label>
        <input type="text" name="director" value={formData.director} onChange={handleChange} className="w-full border px-2 py-1 rounded" />
      </div>
      <div>
        <label className="block mb-1">Género (separado por comas)</label>
        <input type="text" name="genre" value={formData.genre} onChange={handleChange} className="w-full border px-2 py-1 rounded" />
      </div>
      <div>
        <label className="block mb-1">Duración</label>
        <input type="text" name="duration" value={formData.duration} onChange={handleChange} className="w-full border px-2 py-1 rounded" />
      </div>
      <div>
        <label className="block mb-1">Poster (URL)</label>
        <input type="text" name="poster" value={formData.poster} onChange={handleChange} className="w-full border px-2 py-1 rounded" />
      </div>
      <div>
        <label className="block mb-1">Trailer (URL)</label>
        <input type="text" name="trailer" value={formData.trailer} onChange={handleChange} className="w-full border px-2 py-1 rounded" />
      </div>

      <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
        Guardar
      </button>
    </form>
  );
};
