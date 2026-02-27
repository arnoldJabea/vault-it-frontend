import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            
            const response = await api.post('/auth/login', { email, password });

           
            localStorage.setItem('token', response.data.token);

            
            navigate('/');
        } catch (error) {
            toast.error("Identifiants incorrects ou serveur éteint ❌");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <form onSubmit={handleLogin} className="p-10 bg-white rounded-xl shadow-lg border border-gray-100 w-full max-w-md">
                <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center">Connexion</h2>
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
                    Se connecter
                </button>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Pas encore de compte ? <Link to="/register" className="text-indigo-600 hover:underline">S'inscrire</Link>
                </p>
            </form>
        </div>
    );
    
}

export default LoginPage;