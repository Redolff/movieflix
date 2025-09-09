import { useState } from "react";
import { CreateMovieForm } from "./CreateMovieForm";

export const MoviesAdmin = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Administrar Películas</h1>

      <button
        onClick={() => setShowForm(!showForm)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {showForm ? "Cerrar formulario" : "➕ Agregar Película"}
      </button>

      {showForm && (
        <div className="mt-6">
          <CreateMovieForm onSuccess={() => setShowForm(false)} />
        </div>
      )}
    </div>
  );
};