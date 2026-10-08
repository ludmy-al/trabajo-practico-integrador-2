import { Link, useNavigate } from 'react-router';

export const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await fetch('http://localhost:6767/api/auth/logout', {
                method: 'POST',
                credentials: 'include'
            });
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        } finally {
            localStorage.removeItem('isLogged');
            navigate('/login');
        }
    };

    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">
                <Link to="/home">Sistema de Blog</Link>
            </h1>
            <button 
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-semibold"
            >
                Logout
            </button>
        </nav>
    );
};