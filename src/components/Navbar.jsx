import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Navbar({ onAddClick }) {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : { username: '?' };

    const getInitials = (name) => {
        if (!name || name === '?') return 'U';
        return name.substring(0, 2).toUpperCase();
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user'); 
        navigate('/login');
    };

    return (
        <nav className="bg-[#0d1117]/95 backdrop-blur-md border-b border-gray-800 px-8 py-3 flex justify-between items-center fixed top-0 w-full z-30">
            <Link to="/" className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-500 tracking-tighter flex items-center gap-2">
                <span className="text-3xl">📦</span> VAULT-IT
            </Link>

            <div className="flex items-center gap-6">
                <button
                    onClick={onAddClick}
                    className="hidden sm:flex items-center gap-2 bg-green-500/10 text-green-400 border border-green-500/30 px-4 py-2 rounded-lg font-mono text-sm hover:bg-green-500/20 hover:border-green-400 transition-all shadow-[0_0_10px_rgba(34,197,94,0.05)]"
                >
                    + add_resource
                </button>

                {/* ZONE AVATAR ET MENU DÉROULANT EN DARK MODE */}
                <div className="relative">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-10 h-10 rounded-lg bg-[#161b22] border border-gray-700 text-green-400 font-mono font-bold flex items-center justify-center hover:border-green-500 hover:text-green-300 transition-all focus:outline-none focus:ring-1 focus:ring-green-500"
                    >
                        {getInitials(user.username)}
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-3 w-56 bg-[#161b22] border border-gray-700 rounded-xl shadow-2xl py-2 overflow-hidden z-50">
                            <div className="px-4 py-3 text-xs font-mono text-gray-500 border-b border-gray-800 bg-[#0d1117]/50 mb-1">
                                LOGGED_IN_AS: <br/>
                                <span className="font-bold text-green-400 text-sm">@{user.username}</span>
                            </div>
                            
                            <button 
                                onClick={() => setIsDropdownOpen(false)} 
                                className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-green-400 font-mono transition-colors"
                            >
                                👤 /profile
                            </button>
                            
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-950/30 font-mono transition-colors mt-1"
                            >
                                🚪 exit()
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;