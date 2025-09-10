import { Outlet, NavLink } from "react-router-dom";
import { Film, Tv, Gamepad2, Users, LayoutDashboard } from "lucide-react";
import "./adminLayout.css";

export const AdminLayout = () => {
    return (
        <div className="admin-container">
            <aside className="admin-sidebar">
                <div className="sidebar-header">
                    <h2>🎬 Admin Panel</h2>
                </div>

                <nav className="sidebar-nav">
                    <NavLink to="/admin" end className="sidebar-link">
                        <LayoutDashboard size={18} /> Dashboard
                    </NavLink>
                    <NavLink to="/admin/movies" className="sidebar-link">
                        <Film size={18} /> Movies
                    </NavLink>
                    <NavLink to="/admin/series" className="sidebar-link">
                        <Tv size={18} /> Series
                    </NavLink>
                    <NavLink to="/admin/games" className="sidebar-link">
                        <Gamepad2 size={18} /> Games
                    </NavLink>
                    <NavLink to="/admin/users" className="sidebar-link">
                        <Users size={18} /> Users
                    </NavLink>
                </nav>
            </aside>

            {/* Contenido */}
            <main className="admin-main">
                <div className="main-header">
                    <h1>Dashboard</h1>
                    <p>Gestiona tus contenidos y usuarios</p>
                </div>

                <div className="main-content">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

