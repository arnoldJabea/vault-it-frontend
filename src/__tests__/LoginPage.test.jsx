import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ToastContainer } from 'react-toastify';
import LoginPage from '../pages/LoginPage';
import api from '../services/api';

vi.mock('../services/api');

const renderLoginPage = () => {
    return render(
        <BrowserRouter>
            <LoginPage />
            <ToastContainer />
        </BrowserRouter>
    );
};

describe('LoginPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
    });

    it('affiche le formulaire de connexion avec les champs requis', () => {
        renderLoginPage();

        expect(screen.getByText('Connexion')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Mot de passe')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /se connecter/i })).toBeInTheDocument();
    });

    it('affiche le lien vers l\'inscription', () => {
        renderLoginPage();

        const registerLink = screen.getByText(/pas encore de compte/i);
        expect(registerLink).toBeInTheDocument();
    });

    it('met à jour les champs de saisie', () => {
        renderLoginPage();

        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Mot de passe');

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        expect(emailInput.value).toBe('test@example.com');
        expect(passwordInput.value).toBe('password123');
    });

    it('soumet le formulaire avec les identifiants corrects', async () => {
        api.post.mockResolvedValue({ data: { token: 'fake-token-123' } });

        renderLoginPage();

        fireEvent.change(screen.getByPlaceholderText('Email'), {
            target: { value: 'user@example.com' }
        });
        fireEvent.change(screen.getByPlaceholderText('Mot de passe'), {
            target: { value: 'password123' }
        });

        fireEvent.click(screen.getByRole('button', { name: /se connecter/i }));

        await waitFor(() => {
            expect(api.post).toHaveBeenCalledWith('/auth/login', {
                email: 'user@example.com',
                password: 'password123'
            });
        });
    });

    it('sauvegarde le token dans localStorage après connexion réussie', async () => {
        api.post.mockResolvedValue({ data: { token: 'fake-token-123' } });

        renderLoginPage();

        fireEvent.change(screen.getByPlaceholderText('Email'), {
            target: { value: 'user@example.com' }
        });
        fireEvent.change(screen.getByPlaceholderText('Mot de passe'), {
            target: { value: 'password123' }
        });

        fireEvent.click(screen.getByRole('button', { name: /se connecter/i }));

        await waitFor(() => {
            expect(localStorage.getItem('token')).toBe('fake-token-123');
        });
    });

    it('affiche un message d\'erreur si la connexion échoue', async () => {
        api.post.mockRejectedValue({
            response: { data: { message: 'Email ou mot de passe incorrect' } }
        });

        renderLoginPage();

        fireEvent.change(screen.getByPlaceholderText('Email'), {
            target: { value: 'wrong@example.com' }
        });
        fireEvent.change(screen.getByPlaceholderText('Mot de passe'), {
            target: { value: 'wrongpassword' }
        });

        fireEvent.click(screen.getByRole('button', { name: /se connecter/i }));

        await waitFor(() => {
            expect(screen.getByText(/email ou mot de passe incorrect/i)).toBeInTheDocument();
        });
    });

    it('requiert les champs email et password', () => {
        renderLoginPage();

        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Mot de passe');

        expect(emailInput.required).toBe(true);
        expect(passwordInput.required).toBe(true);
    });
});
