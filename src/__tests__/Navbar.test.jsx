import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Navbar from '../components/Navbar';

const renderNavbar = (props = {}) => {
    return render(
        <BrowserRouter>
            <Navbar onAddClick={props.onAddClick || vi.fn()} />
        </BrowserRouter>
    );
};

describe('Navbar', () => {
    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
    });

    it('affiche le logo/titre VAULT-IT', () => {
        renderNavbar();

        expect(screen.getByText('VAULT-IT')).toBeInTheDocument();
    });

    it('affiche le bouton "+ Ajouter"', () => {
        renderNavbar();

        expect(screen.getByRole('button', { name: /\+ Ajouter/i })).toBeInTheDocument();
    });

    it('affiche le bouton "Déconnexion"', () => {
        renderNavbar();

        expect(screen.getByRole('button', { name: /déconnexion/i })).toBeInTheDocument();
    });

    it('appelle onAddClick quand on clique sur le bouton "+ Ajouter"', () => {
        const mockOnAddClick = vi.fn();
        render(
            <BrowserRouter>
                <Navbar onAddClick={mockOnAddClick} />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByRole('button', { name: /\+ Ajouter/i }));

        expect(mockOnAddClick).toHaveBeenCalledTimes(1);
    });

    it('supprime le token du localStorage quand on clique sur Déconnexion', () => {
        localStorage.setItem('token', 'fake-token-123');

        renderNavbar();

        fireEvent.click(screen.getByRole('button', { name: /déconnexion/i }));

        expect(localStorage.getItem('token')).toBeNull();
    });

    it('redirige vers /login après déconnexion', async () => {
        localStorage.setItem('token', 'fake-token-123');

        const { container } = render(
            <BrowserRouter>
                <Navbar onAddClick={vi.fn()} />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByRole('button', { name: /déconnexion/i }));

        await waitFor(() => {
            expect(window.location.pathname).toBe('/login');
        }, { timeout: 100 });
    });

    it('le logo est un lien vers la page d\'accueil', () => {
        renderNavbar();

        const logoLink = screen.getByText('VAULT-IT').closest('a');
        expect(logoLink).toHaveAttribute('href', '/');
    });

    it('a une structure de navigation correcte', () => {
        const { container } = renderNavbar();

        const nav = container.querySelector('nav');
        expect(nav).toBeInTheDocument();
        expect(nav).toHaveClass('fixed', 'top-0');
    });

    it('les boutons sont accessibles au clavier', () => {
        renderNavbar();

        const ajouterBtn = screen.getByRole('button', { name: /\+ Ajouter/i });
        const deconnexionBtn = screen.getByRole('button', { name: /déconnexion/i });

        expect(ajouterBtn.tagName).toBe('BUTTON');
        expect(deconnexionBtn.tagName).toBe('BUTTON');
    });
});
