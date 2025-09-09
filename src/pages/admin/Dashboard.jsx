import { Link } from "react-router-dom";

export const Dashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6"> Dashboard</h1>
      <div className="grid grid-cols-2 gap-6">
        
        <Link to="/admin/movies" className="p-6 bg-white rounded shadow hover:bg-gray-100">
          <h2 className="text-xl font-semibold">🎬 Administrar Películas</h2>
          <p className="text-gray-600">Agregar, editar o eliminar películas</p>
        </Link>

        <Link to="/admin/series" className="p-6 bg-white rounded shadow hover:bg-gray-100">
          <h2 className="text-xl font-semibold">📺 Administrar Series</h2>
          <p className="text-gray-600">Agregar, editar o eliminar series</p>
        </Link>

        <Link to="/admin/games" className="p-6 bg-white rounded shadow hover:bg-gray-100">
          <h2 className="text-xl font-semibold">🎮 Administrar Juegos</h2>
          <p className="text-gray-600">Agregar, editar o eliminar juegos</p>
        </Link>

        <Link to="/admin/users" className="p-6 bg-white rounded shadow hover:bg-gray-100">
          <h2 className="text-xl font-semibold">👤 Administrar Usuarios</h2>
          <p className="text-gray-600">Ver usuarios y perfiles asociados</p>
        </Link>
      </div>
    </div>
  );
};
