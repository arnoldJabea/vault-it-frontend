import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import AddResourceModal from '../components/AddResourceModal';
import { getResources } from '../services/resourceService'; 
import { toast } from 'react-toastify';

function DashboardPage() {
    const [resources, setResources] = useState([]); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true); 

   
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await getResources();
            setResources(response.data.data);
        } catch (error) {
            console.error("Erreur lors de la récupération :", error);
            toast.error("Impossible de charger les ressources. Vérifie si l'API de Kamela est lancée !");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12">
            <Navbar onAddClick={() => setIsModalOpen(true)} />

            <main className="max-w-6xl mx-auto px-8">
                <div className="flex justify-between items-end mb-8">
                    <h2 className="text-2xl font-bold text-gray-800">Tes Ressources</h2>
                    <span className="text-sm text-gray-500">{resources.length} éléments sauvegardés</span>
                </div>

                {loading ? (
                    <p className="text-center py-10 text-gray-500 italic">Chargement des ressources...</p>
                ) : resources.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {resources.map((resource) => (
                            <div key={resource.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                                <span className="text-xs font-semibold uppercase px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full">
                                    {resource.category}
                                </span>
                                <h2 className="text-xl font-bold mt-3">{resource.title}</h2>
                                <p className="text-gray-600 mt-2 text-sm">{resource.description}</p>
                                <a href={resource.url} target="_blank" className="text-indigo-600 mt-4 block font-medium">
                                    Voir la ressource →
                                </a>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* État vide si aucune donnée n'est trouvée */
                    <div className="p-12 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center text-gray-400">
                        <p>Ton coffre-fort est vide pour le moment.</p>
                        <button onClick={() => setIsModalOpen(true)} className="text-indigo-600 font-medium hover:underline mt-2">
                            Ajoute ta première ressource !
                        </button>
                    </div>
                )}
            </main>

            <AddResourceModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={fetchData}
            />
        </div>
    );
}

export default DashboardPage;