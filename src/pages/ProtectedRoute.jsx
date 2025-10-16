import '../style/loading.css'
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = ({ children, adminOnly = false }) => {
    const { isAuthenticated, user, loading } = useAuth();

    if(loading) {
        return <div className="div-spinner"> <span className="loader"></span> </div>
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (adminOnly && user?.role !== "admin") {
        return <Navigate to="/" replace />;
    }

    return children;
};
