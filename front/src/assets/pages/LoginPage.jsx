import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useForm } from '../hooks/useForm';

export const LoginPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    const { email, password, formState, handleInputChange, handleReset } = useForm({
        email: '',
        password: ''
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setErrorMsg(null);

        try {
            const response = await fetch('http://localhost:6767/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(formState)
            });

            const data = await response.json();

            if (response.ok && data.ok) {
                localStorage.setItem('isLogged', 'true');
                handleReset();
                navigate('/home');
            } else {
                setErrorMsg(data.msg || "Credenciales incorrectas.");
            }
        } catch (error) {
            setErrorMsg("Error interno del servidor o de conexión.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Iniciar Sesión</h1>
                
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={handleInputChange}
                        className="border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={handleInputChange}
                        className="border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                        required
                    />
                    
                    {errorMsg && (
                        <p className="text-red-600 text-sm font-semibold text-center">{errorMsg}</p>
                    )}

                    <button 
                        type="submit" 
                        className="bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition-colors disabled:bg-blue-400"
                        disabled={loading}
                    >
                        {loading ? "Cargando..." : "Ingresar"}
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <Link to="/register" className="text-sm text-blue-600 hover:underline">
                        ¿No tienes cuenta? Regístrate aquí
                    </Link>
                </div>
            </div>
        </div>
    );
};