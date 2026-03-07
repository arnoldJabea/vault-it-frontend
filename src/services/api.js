import axios from 'axios';

// On ajoute /api à la fin de l'URL par défaut
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'; 

const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;