import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import AddResourceModal from '../components/AddResourceModal';
import { getResources, upvoteResource } from '../services/resourceService'; 
import { toast } from 'react-toastify';
// On remplace l'import global lourd par la version Light
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// On importe juste les langages qu'on veut supporter (ça pèse 100x moins lourd !)
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python';

// On enregistre les langages
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('python', python);

function DashboardPage() {
    const [resources, setResources] = useState([]); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true); 
    const [selectedSnippet, setSelectedSnippet] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    
    // NOUVEAU : État pour la catégorie sélectionnée dans le menu de gauche
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Liste des catégories pour la Sidebar
    const categories = [
        { id: 'All', icon: '📁', label: 'Toutes les ressources' },
        { id: 'Snippet', icon: '💻', label: 'Bouts de code' },
        { id: 'Documentation', icon: '📚', label: 'Documentation' },
        { id: 'Outil', icon: '🛠️', label: 'Outils & Liens' },
        { id: 'Tuto', icon: '🎓', label: 'Tutoriels' }
    ];

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await getResources();
            if (response.data.success) {
                setResources([...response.data.data].reverse());
            } else {
                toast.error("Erreur renvoyée par le serveur. 💥");
            }
            const sortedData = [...response.data.data].sort((a, b) => {
                if (b.upvotes !== a.upvotes) return (b.upvotes || 0) - (a.upvotes || 0);
                return new Date(b.createdAt) - new Date(a.createdAt);
            });
            setResources(sortedData);
        } catch (error) {
            console.error("Erreur :", error);
            toast.error("Serveur down. Vérifie tes conteneurs ! 🐳");
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = (code) => {
        navigator.clipboard.writeText(code);
        toast.success("Code copié ! 📋⚡");
    };

    const handleUpvote = async (id) => {
        try {
            await upvoteResource(id);
            // On met à jour l'affichage en temps réel sans recharger toute la page !
            setResources(resources.map(r => 
                r.id === id ? { ...r, upvotes: (r.upvotes || 0) + 1 } : r
            ).sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0)));
        } catch {
            toast.error("Erreur lors du vote !");
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'date_unknown';
        const date = new Date(dateString);
        return date.toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    // NOUVEAU : Filtre par Recherche ET par Catégorie
    const filteredResources = resources.filter((resource) => {
        const term = searchTerm.toLowerCase();
        const matchSearch = (
            resource.title?.toLowerCase().includes(term) ||
            resource.description?.toLowerCase().includes(term) ||
            resource.author?.toLowerCase().includes(term)
        );
        const matchCategory = selectedCategory === 'All' || resource.category === selectedCategory;
        
        return matchSearch && matchCategory;
    });

    // Fonction pour tester une API
    const pingApi = async (url) => {
        try {
            const toastId = toast.loading(`📡 Ping de ${url}...`);
            const startTime = Date.now();
            
            // On tente une requête GET
            await axios.get(url);
            
            const time = Date.now() - startTime;
            toast.update(toastId, { render: `✅ API en ligne ! (${time}ms)`, type: "success", isLoading: false, autoClose: 3000 });
        } catch {
            // Note : Dans la vraie vie, les navigateurs bloquent souvent ça à cause des "CORS".
            // Mais pour une démo avec des API publiques, c'est génial !
            toast.dismiss();
            toast.error("❌ Impossible de joindre l'API (ou bloquée par sécurité CORS).");
        }
    };

    return (
        <div className="h-screen flex flex-col bg-[#0d1117] text-gray-300 font-sans selection:bg-green-500/30 overflow-hidden">
            <Navbar onAddClick={() => setIsModalOpen(true)} />

            {/* Layout Divisé : Sidebar + Contenu */}
            <div className="flex flex-1 pt-[72px] overflow-hidden">
                
                {/* LA SIDEBAR (MENU GAUCHE) */}
                <aside className="w-64 bg-[#161b22] border-r border-gray-800 flex flex-col overflow-y-auto hidden md:flex shrink-0">
                    <div className="p-4 border-b border-gray-800">
                        <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">Navigation</p>
                    </div>
                    <nav className="flex-1 p-4 space-y-2">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-mono text-sm transition-all ${
                                    selectedCategory === cat.id 
                                    ? 'bg-green-500/10 text-green-400 border border-green-500/30 shadow-[0_0_10px_rgba(34,197,94,0.05)]' 
                                    : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200 border border-transparent'
                                }`}
                            >
                                <span className="text-lg">{cat.icon}</span>
                                {cat.label}
                                {selectedCategory === cat.id && <span className="ml-auto text-green-400 text-xs">●</span>}
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* ZONE DE CONTENU CENTRALE (Scrollable) */}
                <main className="flex-1 overflow-y-auto p-8 relative">
                    <div className="max-w-6xl mx-auto">
                        
                        {/* EN-TÊTE ET BREADCRUMB (Chemin) */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 border-b border-gray-800 pb-4 gap-4">
                            <div>
                                <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-500 tracking-tight flex items-center gap-2">
                                    <span className="text-gray-500 font-mono text-xl">{`~/vault-it/resources${selectedCategory === 'All' ? '' : `/${selectedCategory.toLowerCase()}`}`}</span>
                                </h2>
                            </div>
                            <span className="text-xs font-mono text-green-400 bg-green-400/10 border border-green-400/20 px-3 py-1.5 rounded">
                                {filteredResources.length} élément(s)
                            </span>
                        </div>

                        {/* BARRE DE RECHERCHE */}
                        <div className="mb-8 relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <span className="text-green-500 font-mono text-lg">{'>'}</span>
                            </div>
                            <input
                                type="text"
                                placeholder={`grep "${selectedCategory === 'All' ? 'everything' : selectedCategory.toLowerCase()}" ...`}
                                className="w-full bg-[#161b22] border border-gray-800 text-green-400 font-mono text-sm rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-green-500/50 focus:shadow-[0_0_15px_rgba(34,197,94,0.15)] transition-all placeholder-gray-600"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* LISTE DES RESSOURCES */}
                        {loading ? (
                            <div className="flex flex-col justify-center items-center py-20 gap-4">
                                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-500"></div>
                                <p className="font-mono text-green-500/70 animate-pulse">Fetching data...</p>
                            </div>
                        ) : filteredResources.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
                                {filteredResources.map((resource) => (
                                    <div key={resource.id} className="bg-[#161b22] p-5 rounded-xl border border-gray-800 hover:border-green-500/50 hover:shadow-[0_0_15px_rgba(34,197,94,0.1)] transition-all duration-300 flex flex-col h-full group">
                                        <div className="flex justify-between items-start mb-3">
                                            <span className={`text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded border ${
                                                resource.type === 'snippet' ? 'bg-black text-green-400 border-green-500/30' : 'bg-blue-950/30 text-cyan-400 border-cyan-500/30'
                                            }`}>
                                                {resource.category === 'Snippet' ? '⚙️ Snippet' : `🔗 ${resource.category}`}
                                            </span>
                                        </div>
                                        
                                        <h2 className="text-base font-bold text-gray-100 mb-2 line-clamp-2 group-hover:text-green-400 transition-colors" title={resource.title}>
                                            {resource.title}
                                        </h2>
                                        
                                        {resource.description && (
                                            <div className="text-gray-400 text-xs mb-4 line-clamp-2 prose prose-invert prose-p:leading-relaxed">
                                                <ReactMarkdown>{resource.description}</ReactMarkdown>
                                            </div>
                                        )}

                                        <div className="mt-auto pt-4 border-t border-gray-800/50 flex flex-col gap-3">
                                            {resource.type === 'snippet' ? (
                                                <button onClick={() => setSelectedSnippet(resource)} className="w-full inline-flex justify-center items-center gap-2 bg-[#0d1117] hover:bg-gray-800 text-green-400 font-mono text-xs border border-gray-700 hover:border-green-500 py-2 rounded transition-all">
                                                    💻 view_code()
                                                </button>
                                            ) : (
                                                <div className="flex gap-2 w-full">
                                                    <a href={resource.url} target="_blank" rel="noreferrer" className="flex-1 inline-flex justify-center items-center gap-2 bg-[#0d1117] hover:bg-gray-800 text-cyan-400 font-mono text-xs border border-gray-700 hover:border-cyan-500 py-2 rounded transition-all">
                                                        🌐 open_link()
                                                    </a>

                                                    {/* Si c'est un Outil ou une Doc, on ajoute le bouton Ping */}
                                                    {(resource.category === 'Outil' || resource.category === 'Documentation') && (
                                                        <button 
                                                            onClick={() => pingApi(resource.url)}
                                                            className="inline-flex justify-center items-center bg-gray-800 hover:bg-gray-700 text-yellow-400 border border-gray-700 hover:border-yellow-500 px-3 py-2 rounded transition-all"
                                                            title="Tester l'URL (Ping)"
                                                        >
                                                            ⚡
                                                        </button>
                                                    )}
                                                </div>
                                            )}

                                            <div className="flex justify-between items-center text-[9px] font-mono text-gray-500">

                                                <span>{formatDate(resource.createdAt)}</span>

                                                                                                <div className="flex items-center gap-3">
                                                    <span className="flex items-center gap-1">
                                                        <span className="text-green-500/70">author@ :</span>{resource.author || 'sys_admin'}
                                                    </span>
                                                    {/* LE BOUTON UPVOTE */}
                                                    <button 
                                                        onClick={() => handleUpvote(resource.id)}
                                                        className="flex items-center gap-1 text-gray-500 hover:text-green-400 transition-colors bg-gray-800/50 hover:bg-gray-800 px-2 py-0.5 rounded"
                                                        title="Voter pour cette ressource"
                                                    >
                                                        <span>Votes ▲</span>
                                                        <span className="font-bold text-gray-300">{resource.upvotes || 0}</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-[#161b22] p-12 border border-dashed border-gray-700 rounded-2xl flex flex-col items-center justify-center text-center mt-10">
                                <div className="text-5xl mb-4 opacity-80">🕳️</div>
                                <h3 className="text-xl font-bold text-gray-200 mb-2 font-mono">{`> 404_not_found`}</h3>
                                <p className="text-gray-500 mb-6 text-sm max-w-sm">Aucune donnée trouvée pour "{selectedCategory}".</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>

            <AddResourceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSuccess={fetchData} />

            {/* MODALE DE CODE (Inchangée) */}
            {selectedSnippet && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-[#0d1117] rounded-xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-gray-700">
                        <div className="flex justify-between items-center p-3 border-b border-gray-800 bg-[#161b22]">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                            </div>
                            <h3 className="text-sm font-mono text-gray-400">{selectedSnippet.title.toLowerCase().replace(/\s+/g, '_')}.js</h3>
                            <div className="flex items-center gap-3">
                                <button onClick={() => handleCopy(selectedSnippet.content)} className="bg-gray-800 text-gray-300 text-xs px-3 py-1.5 rounded border border-gray-700 hover:text-green-400 hover:border-green-500 transition font-mono">
                                    [ copy ]
                                </button>
                                <button onClick={() => setSelectedSnippet(null)} className="text-gray-500 hover:text-red-400 transition text-lg px-1 font-bold">✕</button>
                            </div>
                        </div>
                        <div className="overflow-y-auto w-full text-sm">
                            <SyntaxHighlighter language="javascript" style={vscDarkPlus} showLineNumbers={true} customStyle={{ margin: 0, padding: '1.5rem', background: '#0d1117', fontSize: '0.875rem' }}>
                                {selectedSnippet.content}
                            </SyntaxHighlighter>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DashboardPage;