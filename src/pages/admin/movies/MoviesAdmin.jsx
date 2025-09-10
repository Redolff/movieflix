import "./moviesAdmin.css"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { CreateMovieForm } from "./CreateMovieForm"
import { useFetchData } from "../../../hooks/useFetchData"
import { toast } from "react-toastify"

export const MoviesAdmin = () => {
  const [showForm, setShowForm] = useState(false);
  const { data: allMovies } = useFetchData("movies");
  const navigate = useNavigate();

  const handleSuccess = () => {
    setShowForm(false); // cierra el modal
    navigate("/movies"); // redirige al listado general
  };

  return (
    <div className="movies-admin">
      <h1 className="admin-title">🎬 Administrar Películas</h1>

      {/* Mostrar un preview de algunas películas */}
      <div className="movies-preview">
        {allMovies?.slice(0, 4).map((movie) => (
          <div key={movie.id} className="movie-card">
            <img src={movie.poster} alt={movie.title} />
            <h3>{movie.title}</h3>
            <p>{movie.year}</p>
          </div>
        ))}
      </div>

      {/* Botón para mostrar formulario */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="btn-add-movie"
      >
        {showForm ? "❌ Cerrar formulario" : "➕ Agregar Película"}
      </button>

      {/* Formulario */}
      {showForm && (
        <div className="form-modal-overlay" onClick={() => setShowForm(false)}>
          <div className="form-modal-content" onClick={e => e.stopPropagation()}>
            <CreateMovieForm onSuccess={handleSuccess} />
          </div>
        </div>
      )}
    </div>
  );
};
