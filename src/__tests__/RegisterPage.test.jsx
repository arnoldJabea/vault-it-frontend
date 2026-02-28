import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ToastContainer } from 'react-toastify';
import RegisterPage from '../pages/RegisterPage';
import api from '../services/api';

vi.mock('../services/api');

const renderRegisterPage = () => {
    return render(
        <BrowserRouter>
            <RegisterPage />
            <ToastContainer />
        </BrowserRouter>
    );
};

describe('RegisterPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
    });

    it('affiche le formulaire d\'inscription avec tous les champs', () => {
        renderRegisterPage();

        expect(screen.getByText('Inscription')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Nom d\'utilisateur')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Mot de passe')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /créer mon compte/i })).toBeInTheDocument();
    });

    it('met à jour les champs de saisie', () => {
        renderRegisterPage();

        const usernameInput = screen.getByPlaceholderText('Nom d\'utilisateur');
        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Mot de passe');

        fireEvent.change(usernameInput, { target: { value: 'john_doe' } });
        fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        expect(usernameInput.value).toBe('john_doe');
        expect(emailInput.value).toBe('john@example.com');
        expect(passwordInput.value).toBe('password123');
    });

    it('soumet le formulaire avec les données correctes', async () => {
        api.post.mockResolvedValue({ data: { success: true } });

        renderRegisterPage();

        fireEvent.change(screen.getByPlaceholderText('Nom d\'utilisateur'), {
            target: { value: 'john_doe' }
        });
        fireEvent.change(screen.getByPlaceholderText('Email'), {
            target: { value: 'john@example.com' }
        });
        fireEvent.change(screen.getByPlaceholderText('Mot de passe'), {
            target: { value: 'password123' }
        });

        fireEvent.click(screen.getByRole('button', { name: /créer mon compte/i }));

        await waitFor(() => {
            expect(api.post).toHaveBeenCalledWith('/auth/register', {
                username: 'john_doe',
                email: 'john@example.com',
                password: 'password123'
            });
        });
    });

    it('affiche un message de succès après inscription réussie', async () => {
        api.post.mockResolvedValue({ data: { success: true } });

        renderRegisterPage();

        fireEvent.change(screen.getByPlaceholderText('Nom d\'utilisateur'), {
            target: { value: 'john_doe' }
        });
        fireEvent.change(screen.getByPlaceholderText('Email'), {
            target: { value: 'john@example.com' }
        });
        fireEvent.change(screen.getByPlaceholderText('Mot de passe'), {
            target: { value: 'password123' }
        });

        fireEvent.click(screen.getByRole('button', { name: /créer mon compte/i }));

        await waitFor(() => {
            expect(screen.getByText(/compte créé avec succès/i)).toBeInTheDocument();
        });
    });

    it('affiche un message d\'erreur si l\'email existe déjà', async () => {
        api.post.mockRejectedValue({
            response: { data: { message: 'Email déjà utilisé' } }
        });

        renderRegisterPage();

        fireEvent.change(screen.getByPlaceholderText('Nom d\'utilisateur'), {
            target: { value: 'john_doe' }
        });
        fireEvent.change(screen.getByPlaceholderText('Email'), {
            target: { value: 'existing@example.com' }
        });
        fireEvent.change(screen.getByPlaceholderText('Mot de passe'), {
            target: { value: 'password123' }
        });

        fireEvent.click(screen.getByRole('button', { name: /créer mon compte/i }));

        await waitFor(() => {
            expect(screen.getByText(/erreur lors de l'inscription/i)).toBeInTheDocument();
        });
    });

    it('affiche un message d\'erreur si le serveur est injoignable', async () => {
        api.post.mockRejectedValue({
            response: undefined
        });

        renderRegisterPage();

        fireEvent.change(screen.getByPlaceholderText('Nom d\'utilisateur'), {
            target: { value: 'john_doe' }
        });
        fireEvent.change(screen.getByPlaceholderText('Email'), {
            target: { value: 'john@example.com' }
        });
        fireEvent.change(screen.getByPlaceholderText('Mot de passe'), {
            target: { value: 'password123' }
        });

        fireEvent.click(screen.getByRole('button', { name: /créer mon compte/i }));

        await waitFor(() => {
            expect(screen.getByText(/serveur injoignable/i)).toBeInTheDocument();
        });
    });

    it('requiert tous les champs', () => {
        renderRegisterPage();

        const usernameInput = screen.getByPlaceholderText('Nom d\'utilisateur');
        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Mot de passe');

        expect(usernameInput.required).toBe(true);
        expect(emailInput.required).toBe(true);
        expect(passwordInput.required).toBe(true);
    });
});
