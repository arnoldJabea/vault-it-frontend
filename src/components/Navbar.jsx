import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Navbar({ onAddClick }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-sm border-b border-gray-200 px-8 py-4 flex justify-between items-center fixed top-0 w-full z-10">
            <Link to="/" className="text-2xl font-black text-indigo-600 tracking-tighter">
                VAULT-IT
            </Link>

            <div className="flex items-center gap-4">
                <button
                    onClick={onAddClick}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
                >
                    + Ajouter
                </button>
                <button
                    onClick={handleLogout}
                    className="text-gray-500 hover:text-red-600 text-sm font-medium"
                >
                    Déconnexion
                </button>
            </div>
        </nav>
    );
}

export default Navbar;