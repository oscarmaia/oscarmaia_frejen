import { useContext, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


const ProtectedRouteGuard = ({ children }: { children: ReactNode }) => {
    const authContext = useContext(AuthContext);
    const isAuthenticated = authContext?.isAuthenticated;
    const loading = authContext?.loading;

    if (loading) {
        return <div>Loading...</div>;
    }
    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRouteGuard;
