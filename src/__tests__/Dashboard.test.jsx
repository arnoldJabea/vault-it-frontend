import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import DashboardPage from '../pages/DashboardPage';
import { BrowserRouter } from 'react-router-dom';

describe('DashboardPage', () => {
    it('devrait afficher le titre du coffre-fort', () => {
        render(
            <BrowserRouter>
                <DashboardPage />
            </BrowserRouter>
        );

        
        const titleElement = screen.getByText(/Tes Ressources/i);
        expect(titleElement).toBeInTheDocument();
    });
});