import React, { useState } from 'react';
import { createResource } from '../services/resourceService';

function AddResourceModal({ isOpen, onClose, onSuccess }) {
    const [formData, setFormData] = useState({
        title: '',
        url: '',
        category: 'Frontend',
        description: ''
    });
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        try {
            await createResource(formData);
            toast.success("Ressource ajoutée au coffre ! 🚀"); 
            onSuccess();
            onClose();
        } catch (error) {
            toast.error("Erreur lors de l'ajout...");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-20 p-4">
            <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Ajouter au Coffre</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        required
                        className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Titre de la ressource"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                    <input
                        required
                        type="url"
                        className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="URL (https://...)"
                        value={formData.url}
                        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    />
                    <select
                        className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                        <option>Frontend</option>
                        <option>Backend</option>
                        <option>DevOps</option>
                        <option>Outils</option>
                    </select>
                    <textarea
                        className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Petite description..."
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />

                    <div className="flex gap-3 mt-8">
                        <button type="button" onClick={onClose} className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50">Annuler</button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
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