import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useForm } from '../hooks/useForm';

export const RegisterPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMsgs, setErrorMsgs] = useState([]);

    const { 
        username, email, password, first_name, last_name, 
        formState, handleInputChange, handleReset 
    } = useForm({
        username: '',
        email: '',
        password: '',
        first_name: '',
        last_name: ''
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setErrorMsgs([]);

        try {
            const response = await fetch('http://localhost:6767/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formState)
            });

            const data = await response.json();

            if (response.ok && data.ok) {
                handleReset();
                navigate('/login');
            } else {
                
                if (Array.isArray(data.errors)) {
                    setErrorMsgs(data.errors.map(err => err.msg));
                } else if (data.msg) {
                    setErrorMsgs([data.msg]);
                } else {
                    setErrorMsgs(["Error al registrar el usuario."]);
                }
            }
        } catch (error) {
            setErrorMsgs(["Error interno del servidor o de conexión."]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Registro de Usuario</h1>
                
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="first_name"
                        placeholder="Nombre"
                        value={first_name}
                        onChange={handleInputChange}
                        className="border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                        required
                    />
                    <input
                        type="text"
                        name="last_name"
                        placeholder="Apellido"
                        value={last_name}
                        onChange={handleInputChange}
                        className="border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                        required
                    />
                    <input
                        type="text"
                        name="username"
                        placeholder="Nombre de usuario"
                        value={username}
                        onChange={handleInputChange}
                        className="border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                        required
                    />
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
                    
                    {errorMsgs.length > 0 && (
                        <div className="bg-red-100 p-2 rounded text-red-600 text-sm font-semibold">
                            <ul className="list-disc pl-5">
                                {errorMsgs.map((msg, index) => (
                                    <li key={index}>{msg}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <button 
                        type="submit" 
                        className="bg-green-600 text-white font-semibold py-2 rounded hover:bg-green-700 transition-colors disabled:bg-green-400"
                        disabled={loading}
                    >
                        {loading ? "Registrando..." : "Crear cuenta"}
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <Link to="/login" className="text-sm text-blue-600 hover:underline">
                        ¿Ya tienes cuenta? Inicia sesión aquí
                    </Link>
                </div>
            </div>
        </div>
    );
};