import React, { useState } from 'react';
import { createResource } from '../services/resourceService';
import { toast } from 'react-toastify';

function AddResourceModal({ isOpen, onClose, onSuccess }) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const [formData, setFormData] = useState({
        title: '',
        type: 'link', // Par défaut c'est un lien
        url: '',
        content: '',
        category: 'Documentation',
        description: '',
        author: user.username || 'sys_admin' // On ajoute l'auteur automatiquement
    });
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await createResource(formData);
            toast.success("Ressource ajoutée au coffre ! 🚀"); 
            onSuccess();
            onClose();
            setFormData({ title: '', type: 'link', url: '', content: '', category: 'Documentation', description: '' });
        } catch (error) {
            console.error(error);
            toast.error("Erreur lors de l'ajout. Vérifie les champs !");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-20 p-4">
            <div className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-2xl">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Ajouter au Coffre</h2>

                {/* Onglets pour choisir le type */}
                <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
                    <button 
                        type="button"
                        onClick={() => setFormData({ ...formData, type: 'link', category: 'Documentation' })}
                        className={`flex-1 py-2 rounded-md text-sm font-bold transition ${formData.type === 'link' ? 'bg-white shadow text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        🔗 Lien Web
                    </button>
                    <button 
                        type="button"
                        onClick={() => setFormData({ ...formData, type: 'snippet', category: 'Snippet' })}
                        className={`flex-1 py-2 rounded-md text-sm font-bold transition ${formData.type === 'snippet' ? 'bg-white shadow text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        💻 Bout de code
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        required
                        className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                        placeholder="Titre (ex: Setup Docker, Doc React...)"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />

                    {/* Affichage conditionnel : URL ou Code ? */}
                    {formData.type === 'link' ? (
                        <input
                            required
                            type="url"
                            className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="URL (https://...)"
                            value={formData.url}
                            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                        />
                    ) : (
                        <textarea
                            required
                            rows="5"
                            className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm bg-gray-50"
                            placeholder="Colle ton code ici..."
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        />
                    )}

                    <div className="flex gap-4">
                        <select
                            className="w-1/2 p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        >
                            <option value="Documentation">Documentation</option>
                            <option value="Outil">Outil</option>
                            <option value="Tuto">Tutoriel</option>
                            <option value="Snippet">Snippet</option>
                        </select>
                        <input
                            className="w-1/2 p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Petite description (optionnelle)"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div className="flex gap-3 mt-8 pt-4">
                        <button type="button" onClick={onClose} className="flex-1 px-4 py-3 border border-gray-200 rounded-lg font-medium hover:bg-gray-50 transition">Annuler</button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 px-4 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 transition"
                        >
                            {loading ? "Envoi..." : "Enregistrer"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddResourceModal;