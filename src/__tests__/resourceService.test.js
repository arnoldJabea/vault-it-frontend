import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as resourceService from '../services/resourceService';
import api from '../services/api';

vi.mock('../services/api');

describe('resourceService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('getResources()', () => {
        it('appelle l\'endpoint /resources avec GET', async () => {
            api.get.mockResolvedValue({
                data: [
                    { _id: '1', title: 'Resource 1', category: 'Tutoriel' },
                    { _id: '2', title: 'Resource 2', category: 'Article' }
                ]
            });

            const response = await resourceService.getResources();

            expect(api.get).toHaveBeenCalledWith('/resources');
            expect(response.data).toHaveLength(2);
            expect(response.data[0].title).toBe('Resource 1');
        });

        it('retourne les ressources avec les bonnes propriétés', async () => {
            const mockResources = [
                {
                    _id: 'abc123',
                    title: 'Mon Article',
                    description: 'Description complète',
                    category: 'Tutoriel',
                    url: 'https://example.com',
                    createdAt: '2026-02-28T10:00:00Z'
                }
            ];

            api.get.mockResolvedValue({ data: mockResources });

            const response = await resourceService.getResources();

            expect(response.data[0]).toHaveProperty('_id');
            expect(response.data[0]).toHaveProperty('title');
            expect(response.data[0]).toHaveProperty('category');
            expect(response.data[0]).toHaveProperty('url');
        });

        it('gère les erreurs API', async () => {
            api.get.mockRejectedValue({
                response: { status: 500, data: { message: 'Erreur serveur' } }
            });

            try {
                await resourceService.getResources();
            } catch (error) {
                expect(error.response.status).toBe(500);
            }
        });

        it('retourne un tableau vide si pas de ressources', async () => {
            api.get.mockResolvedValue({ data: [] });

            const response = await resourceService.getResources();

            expect(response.data).toEqual([]);
        });
    });

    describe('createResource()', () => {
        it('appelle l\'endpoint /resources avec POST', async () => {
            const newResource = {
                title: 'Nouvelle Resource',
                description: 'Description',
                category: 'Tutoriel',
                url: 'https://example.com'
            };

            api.post.mockResolvedValue({
                data: { _id: 'new-id', ...newResource }
            });

            await resourceService.createResource(newResource);

            expect(api.post).toHaveBeenCalledWith('/resources', newResource);
        });

        it('retourne la ressource créée avec un ID', async () => {
            const newResource = {
                title: 'Nouvelle Resource',
                description: 'Description',
                category: 'Tutoriel',
                url: 'https://example.com'
            };

            api.post.mockResolvedValue({
                data: { _id: 'abc123', ...newResource }
            });

            const response = await resourceService.createResource(newResource);

            expect(response.data._id).toBe('abc123');
            expect(response.data.title).toBe('Nouvelle Resource');
        });

        it('envoie tous les champs requis', async () => {
            const newResource = {
                title: 'Resource Complète',
                description: 'Description détaillée',
                category: 'Article',
                url: 'https://example.com'
            };

            api.post.mockResolvedValue({ data: { _id: '1', ...newResource } });

            await resourceService.createResource(newResource);

            expect(api.post).toHaveBeenCalledWith('/resources', {
                title: newResource.title,
                description: newResource.description,
                category: newResource.category,
                url: newResource.url
            });
        });

        it('gère les erreurs de validation', async () => {
            const invalidResource = {
                title: '',
                description: '',
                category: '',
                url: ''
            };

            api.post.mockRejectedValue({
                response: { status: 400, data: { message: 'Champs requis manquants' } }
            });

            try {
                await resourceService.createResource(invalidResource);
            } catch (error) {
                expect(error.response.status).toBe(400);
            }
        });

        it('gère les erreurs d\'authentification (401)', async () => {
            const newResource = {
                title: 'Test',
                description: 'Test',
                category: 'Test',
                url: 'https://test.com'
            };

            api.post.mockRejectedValue({
                response: { status: 401, data: { message: 'Non autorisé' } }
            });

            try {
                await resourceService.createResource(newResource);
            } catch (error) {
                expect(error.response.status).toBe(401);
            }
        });

        it('gère les erreurs serveur (500)', async () => {
            const newResource = {
                title: 'Test',
                description: 'Test',
                category: 'Test',
                url: 'https://test.com'
            };

            api.post.mockRejectedValue({
                response: { status: 500, data: { message: 'Erreur serveur' } }
            });

            try {
                await resourceService.createResource(newResource);
            } catch (error) {
                expect(error.response.status).toBe(500);
            }
        });
    });

    describe('Integration', () => {
        it('récupère et crée des ressources correctement', async () => {
            const initialResources = [
                { _id: '1', title: 'Resource 1', category: 'Tutoriel' }
            ];

            api.get.mockResolvedValue({ data: initialResources });

            const getResponse = await resourceService.getResources();
            expect(getResponse.data).toHaveLength(1);

            const newResource = {
                title: 'Resource 2',
                description: 'New',
                category: 'Article',
                url: 'https://example.com'
            };

            api.post.mockResolvedValue({
                data: { _id: '2', ...newResource }
            });

            const createResponse = await resourceService.createResource(newResource);
            expect(createResponse.data._id).toBe('2');
        });
    });
});
