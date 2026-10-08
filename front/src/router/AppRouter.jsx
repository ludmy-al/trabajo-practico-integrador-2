import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { HomePage } from '../pages/HomePage';
import { PublicRoutes } from './PublicRoutes';
import { PrivateRoutes } from './PrivateRoutes';

export const AppRouter = () => {
    const isLogged = localStorage.getItem('isLogged');

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PublicRoutes />}>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Route>

                <Route element={<PrivateRoutes />}>
                    <Route path="/home" element={<HomePage />} />
                </Route>

                <Route path="*" element={<Navigate to={isLogged ? "/home" : "/login"} />} />
            </Routes>
        </BrowserRouter>
    );
};