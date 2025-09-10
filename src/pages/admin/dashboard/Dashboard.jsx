import { Link } from "react-router-dom"
import "./dashboard.css"

export const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Panel de Administración</h1>

      <div className="dashboard-grid">
        <Link to="/admin/movies" className="dashboard-card">
          <h2>🎬 Administrar Películas</h2>
          <p>Agregar películas</p>
        </Link>

        <Link to="/admin/series" className="dashboard-card">
          <h2>📺 Administrar Series</h2>
          <p>Agregar series</p>
        </Link>

        <Link to="/admin/games" className="dashboard-card">
          <h2>🎮 Administrar Juegos</h2>
          <p>Agregar juegos</p>
        </Link>

        <Link to="/admin/users" className="dashboard-card">
          <h2>👤 Administrar Usuarios</h2>
          <p>Ver usuarios y perfiles asociados</p>
        </Link>
      </div>
    </div>
  );
};
