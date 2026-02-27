import React from 'react'

const MOCK_RESOURCES = [
    { id: 1, title: "Cours Docker", category: "DevOps", url: "https://docker.com", description: "Tout savoir sur les containers." },
    { id: 2, title: "React Hooks", category: "Frontend", url: "https://react.dev", description: "Guide complet." },
];

function DashboardPage() {
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold text-indigo-600">Vault-IT - Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {MOCK_RESOURCES.map((res) => (
                    <div key={res.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <h2 className="text-xl font-bold">{res.title}</h2>
                        <p className="text-gray-600">{res.description}</p>
                        <a href={res.url} target="_blank" className="text-indigo-600 mt-4 block">Lien →</a>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DashboardPage; // IMPORTANT : Ne pas oublier l'export