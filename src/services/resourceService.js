import api from './api';

export const getResources = () => api.get('/resources');
export const createResource = (data) => api.post('/resources', data);
export const upvoteResource = (id) => api.put(`/resources/${id}/upvote`);


//  je vais ajouter d'autres fonctions pour les autres opérations CRUD (update, delete) en fonction de kamela
