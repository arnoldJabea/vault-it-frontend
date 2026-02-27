import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AddResourceModal from '../components/AddResourceModal';

describe('AddResourceModal', () => {
    it('devrait permettre de saisir une URL et un titre', () => {
        const onClose = vi.fn(); 
        render(<AddResourceModal isOpen={true} onClose={onClose} />);

        
        const urlInput = screen.getByPlaceholderText(/https:\/\/\.\.\./i);
        const titleInput = screen.getByPlaceholderText(/Titre de la ressource/i);

       
        fireEvent.change(urlInput, { target: { value: 'https://google.com' } });
        fireEvent.change(titleInput, { target: { value: 'Mon super lien' } });

        
        expect(urlInput.value).toBe('https://google.com');
        expect(titleInput.value).toBe('Mon super lien');
    });
});