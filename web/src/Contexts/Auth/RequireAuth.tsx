import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const auth = useContext(AuthContext);
    let location = useLocation();

    if (!auth.user) {
        return <Navigate to={'/'} state={{ from: location }} />
    }

    return children;
}

export const NotRequireAuth = ({ children }: { children: JSX.Element }) => {
    const auth = useContext(AuthContext);
    let location = useLocation();

    const lastLocation = localStorage.getItem('lastVisitedRoute') || '/home';

    if (auth.user) {
        return <Navigate to={lastLocation} state={{ from: location }} />
    }

    return children;
}