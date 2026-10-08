import { useState, useEffect } from 'react';

export const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(url, {
                method: 'GET',
                credentials: 'include'
            });

            const result = await response.json();

            if (response.ok) {
                setData(result.data || result);
            } else {
                setError(result.msg || "Error al obtener los datos.");
            }
        } catch (err) {
            setError("Error interno del servidor o de conexión.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [url]);

    return {
        data,
        isLoading,
        error
    };
};