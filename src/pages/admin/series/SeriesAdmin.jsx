import "../movies/moviesAdmin.css"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useFetchData } from "../../../hooks/useFetchData"
import { CreateSerieForm } from "./CreateSerieForm"

export const SeriesAdmin = () => {
    const { data: allSeries } = useFetchData("series");
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();

    const handleSuccess = () => {
        setShowForm(false)
        navigate("/series")
    };

    return (
        <div className="movies-admin">
            <h1 className="admin-title">📺 Administrar Series </h1>

            {/* Mostrar un preview de algunas películas */}
            <div className="movies-preview">
                {allSeries?.slice(0, 4).map((serie) => (
                    <div key={serie._id} className="movie-card">
                        <img src={serie.poster} alt={serie.title} />
                        <h3>{serie.title}</h3>
                        <p>{serie.year}</p>
                    </div>
                ))}
            </div>

            {/* Botón para mostrar formulario */}
            <button
                onClick={() => setShowForm(!showForm)}
                className="btn-add-movie"
            >
                {showForm ? "❌ Cerrar formulario" : "➕ Agregar Serie"}
            </button>

            {/* Formulario */}
            {showForm && (
                <div className="form-modal-overlay" onClick={() => setShowForm(false)}>
                    <div className="form-modal-content" onClick={e => e.stopPropagation()}>
                        {<CreateSerieForm onSuccess={handleSuccess} />}
                    </div>
                </div>
            )}
        </div>
    );
};
