import { Navigate, Outlet } from 'react-router';

export const PrivateRoutes = () => {
    const isLogged = localStorage.getItem('isLogged');

    if (!isLogged) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
};