import { Navigate, Outlet } from 'react-router';

export const PublicRoutes = () => {
    const isLogged = localStorage.getItem('isLogged');

    if (isLogged) {
        return <Navigate to="/home" />;
    }

    return <Outlet />;
};