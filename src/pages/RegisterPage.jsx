import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';

function RegisterPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            
            await api.post('/auth/register', { username, email, password });

            toast.success("Compte créé avec succès ! Connecte-toi maintenant.");
            navigate('/login');
        } catch (error) {
            toast.error("Erreur lors de l'inscription : " + (error.response?.data?.message || "Serveur injoignable"));
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <form onSubmit={handleRegister} className="p-10 bg-white rounded-xl shadow-lg border border-gray-100 w-full max-w-md">
                <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center">Inscription</h2>

                <input
                    type="text"
                    placeholder="Nom d'utilisateur"
                    className="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    className="w-full p-3 mb-6 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit" className="w-full bg-indigo-600 text-white p-3 rounded-lg font-bold hover:bg-indigo-700 transition">
                    Créer mon compte
                </button>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Déjà un compte ? <Link to="/login" className="text-indigo-600 hover:underline">Se connecter</Link>
                </p>
            </form>
        </div>
    );
}

export default RegisterPage;