import "../movies/moviesAdmin.css"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useFetchData } from "../../../hooks/useFetchData"
import { CreateGameForm } from "./CreateGameForm";

export const GamesAdmin = () => {
  const { data: allGames } = useFetchData("games");
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => {
    setShowForm(false)
    navigate("/games")
  };

  return (
    <div className="movies-admin">
      <h1 className="admin-title">🎮 Administrar Juegos </h1>

      <div className="movies-preview">
        {allGames?.slice(0, 4).map((game) => (
          <div key={game._id} className="movie-card">
            <img src={game.poster} alt={game.title} />
            <h3>{game.title}</h3>
            <p>{game.year}</p>
          </div>
        ))}
      </div>

      {/* Botón para mostrar formulario */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="btn-add-movie"
      >
        {showForm ? "❌ Cerrar formulario" : "➕ Agregar Juego"}
      </button>

      {/* Formulario */}
      {showForm && (
        <div className="form-modal-overlay" onClick={() => setShowForm(false)}>
          <div className="form-modal-content" onClick={e => e.stopPropagation()}>
            <CreateGameForm onSuccess={handleSuccess} />
          </div>
        </div>
      )}
    </div>
  );
};
