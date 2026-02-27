import React from 'react'

// Voici tes fausses données pour tester le visuel
const MOCK_RESOURCES = [
  { id: 1, title: "Cours Docker", category: "DevOps", link: "https://docker.com", description: "Tout savoir sur les containers." },
  { id: 2, title: "React Hooks", category: "Frontend", link: "https://react.dev", description: "Guide complet sur useEffect et useState." },
  { id: 3, title: "Node.js Best Practices", category: "Backend", link: "https://nodejs.org", description: "Les bonnes pratiques pour Kamela !" },
];

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <header className="mb-10 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-indigo-600">Vault-IT</h1>
          <p className="text-gray-500">Ton coffre-fort de ressources techniques</p>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
          + Ajouter une ressource
        </button>
      </header>

      {/* Grille des ressources */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_RESOURCES.map((resource) => (
          <div key={resource.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition">
            <span className="text-xs font-semibold uppercase px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full">
              {resource.category}
            </span>
            <h2 className="text-xl font-bold mt-3 text-gray-800">{resource.title}</h2>
            <p className="text-gray-600 mt-2 text-sm">{resource.description}</p>
            <a
              href={resource.link}
              target="_blank"
              className="inline-block mt-4 text-indigo-600 font-medium hover:underline"
            >
              Voir la ressource →
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App