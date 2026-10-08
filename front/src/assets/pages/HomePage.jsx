import { Navbar } from '../components/Navbar';
import { useFetch } from '../hooks/useFetch';

export const HomePage = () => {
    const { data, isLoading, error } = useFetch('http://localhost:6767/api/articles');

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            
            <main className="max-w-4xl mx-auto p-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Artículos Publicados</h2>

                {isLoading && (
                    <p className="text-blue-600 font-semibold text-center mt-10">Cargando artículos...</p>
                )}
                
                {!isLoading && error && (
                    <p className="text-red-600 font-semibold text-center mt-10">Error: {error}</p>
                )}

                {!isLoading && !error && (!data || data.length === 0) && (
                    <p className="text-gray-600 font-semibold text-center mt-10">
                        No hay artículos publicados en este momento.
                    </p>
                )}

                <div className="grid gap-6">
                    {!isLoading && !error && data && data.length > 0 && data.map((article) => (
                        <article key={article.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">{article.title}</h3>
                            <p className="text-gray-700 mb-4">{article.content}</p>
                            
                            {article.tags && article.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {article.tags.map(tag => (
                                        <span 
                                            key={tag.id} 
                                            className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded"
                                        >
                                            {tag.name}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </article>
                    ))}
                </div>
            </main>
        </div>
    );
};