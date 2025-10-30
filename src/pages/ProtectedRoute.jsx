import '../style/loading.css'
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useSelector } from 'react-redux';

export const ProtectedRoute = ({ children, adminOnly = false, requiresProfile = false }) => {
    const { isAuthenticated, user, loading } = useAuth();
    const currentProfile = useSelector((state) => state.currentProfile)

    if(loading) {
        return <div className="div-spinner"> <span className="loader"></span> </div>
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (adminOnly && user?.role !== "admin") {
        return <Navigate to="/" replace />;
    }

    if(requiresProfile && !currentProfile?._id) {
        return <Navigate to="/profiles" replace />
    }

    return children;
};
