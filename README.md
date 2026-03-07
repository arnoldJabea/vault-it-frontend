# 🔒 Vault-IT Frontend

Application React moderne construite avec Vite pour gérer l'interface utilisateur.

## 📋 À propos

Ce projet frontend fournit :
- 📄 **Page de connexion** - `LoginPage.jsx`
- 📝 **Page d'inscription** - `RegisterPage.jsx`
- 🎯 **Tableau de bord** - `DashboardPage.jsx`
- 🎨 **Composants** - Navbar, Modal d'ajout
- 🔧 **Services API** - Configuration Axios et appels HTTP
- 📱 **Design responsive** - Tailwind CSS

**Status :** Prototype

---

## 🛠️ Stack Technique

| Dépendance | Version | Rôle |
|-----------|---------|------|
| React | ^19.2.0 | Framework UI |
| Vite | ^7.3.1 | Build & dev server |
| React Router | ^7.13.1 | Routage client |
| Tailwind CSS | ^4.2.1 | Styling |
| Axios | ^1.13.5 | Client HTTP |
| React Toastify | ^11.0.5 | Notifications |
| Vitest | ^4.0.18 | Tests unitaires |
| ESLint | ^9.39.1 | Linting |

---

## 📂 Architecture du Code

```
src/
├── pages/
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   └── DashboardPage.jsx
├── components/
│   ├── Navbar.jsx
│   └── AddResourceModal.jsx
├── services/
│   ├── api.js
│   └── resourceService.js
├── __tests__/
│   ├── LoginPage.test.jsx
│   ├── Dashboard.test.jsx
│   └── AddResourceModal.test.jsx
├── App.jsx
├── main.jsx
└── styles/
    ├── App.css
    └── index.css
```

---

## 🚀 Démarrage

### Prérequis
- Node.js v18+
- npm ou yarn

### Installation

1. Clone le projet
```bash
git clone https://github.com/arnoldJabea/vault-it-frontend.git
cd vault-it-frontend
```

2. Installe les dépendances
```bash
npm install
```

3. Lance le serveur
```bash
npm run dev
```

L'app est accessible sur `http://localhost:5173`

### Configuration (optionnel)

Créez `.env.local` pour changer l'URL API :
```env
VITE_API_URL=http://votre-api:5000
```

---

## 📋 Pages et Composants

### Routes principales

| Route | Composant | Description |
|-------|-----------|-------------|
| `/login` | LoginPage | Formulaire de connexion |
| `/register` | RegisterPage | Formulaire d'inscription |
| `/` | DashboardPage | Affichage des ressources |

### Composants

| Nom | Fichier | Utilité |
|-----|---------|---------|
| Navbar | `components/Navbar.jsx` | Barre de navigation |
| AddResourceModal | `components/AddResourceModal.jsx` | Modal d'ajout de ressource |

### Services

| Service | Fichier | Fonction |
|---------|---------|----------|
| api | `services/api.js` | Instance Axios avec intercepteurs |
| getResources | `services/resourceService.js` | Récupération des ressources |

---

## 📦 Commandes

```bash
npm run dev      # Serveur local avec hot reload
npm run build    # Build production (dist/)
npm run preview  # Prévisualiser la build
npm run lint     # Linte le code
npm run test     # Tests Vitest
```

---

## ✅ Tests

Tests avec **Vitest** et **React Testing Library** pour assurer la qualité du code frontend.

### 🚀 Lancer les tests

```bash
npm run test              # Exécute tous les tests (une fois)
npm run test -- --watch  # Mode watch : réexécute auto à chaque changement
npm run test -- --ui     # Ouvre l'UI Vitest pour une meilleure visualisation
npm run test -- --coverage  # Génère un rapport de couverture de code
```

### 📊 Fichiers de tests et couverture

| Fichier | Tests | Détails |
|---------|-------|---------|
| **LoginPage.test.jsx** | 6 | Formulaire connexion, validation, erreurs |
| **RegisterPage.test.jsx** | 7 | Formulaire inscription, validation, erreurs |
| **Navbar.test.jsx** | 8 | Navigation, déconnexion, accessibilité |
| **Dashboard.test.jsx** | ? | Affichage ressources, chargement |
| **AddResourceModal.test.jsx** | ? | Modal, soumission, validation |
| **resourceService.test.js** | 8+ | Appels API (GET/POST), gestion erreurs |
| **TOTAL** | **38+** | **Couverture complète du frontend** |

### 🧪 Détails des tests par domaine

#### **Tests d'authentification (LoginPage - 6 tests)**
```
✓ Affiche le formulaire de connexion avec email et password
✓ Met à jour les champs de saisie dynamiquement
✓ Soumet le formulaire avec identifiants corrects
✓ Sauvegarde le token dans localStorage après succès
✓ Affiche erreur si email/password incorrect
✓ Valide que les champs sont requis
```

**Cas testés :** Rendu, interaction, API, erreurs, validation

---

#### **Tests d'inscription (RegisterPage - 7 tests)**
```
✓ Affiche le formulaire d'inscription complet
✓ Valide la saisie des trois champs (username, email, password)
✓ Soumet les données au serveur correctement
✓ Affiche succès et redirige vers login
✓ Gère l'erreur "email déjà utilisé" (400)
✓ Gère l'erreur serveur injoignable (500)
✓ Requiert tous les champs obligatoires
```

**Cas testés :** Formulaire, création compte, erreurs serveur, validation

---

#### **Tests de navigation (Navbar - 8 tests)**
```
✓ Affiche le logo "VAULT-IT"
✓ Affiche le bouton "+ Ajouter"
✓ Affiche le bouton "Déconnexion"
✓ Appelle onAddClick quand on clique sur Ajouter
✓ Supprime le token du localStorage en déconnexion
✓ Redirige vers /login après déconnexion
✓ Logo est un lien fonctionnel vers /
✓ Les boutons sont accessibles au clavier
```

**Cas testés :** UI, interactions, localStorage, navigation, accessibilité

---

#### **Tests des services API (resourceService - 8+ tests)**
```
✓ getResources() - Appelle GET /resources
✓ getResources() - Retourne structure correcte
✓ getResources() - Gère erreurs API 500
✓ getResources() - Retourne tableau vide si zéro ressource
✓ createResource() - Appelle POST /resources
✓ createResource() - Retourne ressource créée avec ID
✓ createResource() - Gère erreur 400 (validation)
✓ createResource() - Gère erreur 401 (non authentifié)
```

**Cas testés :** Requêtes HTTP, réponses, gestion erreurs, intégration API

---

### 📝 Écrire un nouveau test

**Template simple :**
```javascript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import MyComponent from '../path/MyComponent';

describe('MyComponent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('affiche le titre', () => {
    render(<MyComponent />);
    expect(screen.getByText('Mon Titre')).toBeInTheDocument();
  });

  it('clique et change l\'état', async () => {
    render(<MyComponent />);
    fireEvent.click(screen.getByRole('button', { name: /cliquez/i }));
    
    await waitFor(() => {
      expect(screen.getByText('Après clique')).toBeInTheDocument();
    });
  });
});
```

### 🔍 Sélecteurs (du meilleur au pire)

```javascript
// ✅ MEILLEUR - Sémantique
screen.getByRole('button', { name: /submit/i })

// ✅ BON - Accessibilité
screen.getByPlaceholderText('Email')
screen.getByLabelText('Password')

// ✅ ACCEPTABLE - Texte visible
screen.getByText('Welcome')

// ❌ À ÉVITER - Implémentation
screen.getByTestId('btn-submit')
wrapper.find('.button')
container.querySelector('#id')
```

### 🎯 Bonnes pratiques

| ✅ À FAIRE | ❌ À ÉVITER |
|-----------|-----------|
| Tester le comportement utilisateur | Tester l'implémentation |
| `screen.getByRole()` | `getByTestId()` |
| Un test = une responsabilité | Tester 10 choses à la fois |
| Noms clairs : `affiche erreur` | Noms vagues : `test 1` |
| Mock les appels API | Vrais appels réseau |
| `await waitFor()` pour async | `setTimeout()` aléatoires |

### 📈 Couverture

```bash
npm run test -- --coverage
```

Cela génère un rapport HTML dans `coverage/index.html` avec :
- % de couverture par fichier
- Lignes non testées en détail
- Objectif : 80%+ sur code critique

### 🐛 Déboguer

**Afficher le HTML rendu :**
```javascript
it('mon test', () => {
  render(<MyComponent />);
  screen.debug(); // Affiche le HTML dans la console
});
```

**Voir tous les sélecteurs accessibles :**
```javascript
screen.logTestingPlaygroundURL();
```

---

## 🎨 Styling

Tailwind CSS v4 :
- Configuration : `tailwind.config.js`
- Classes utilitaires pour tous les composants
- Responsive design intégré

---

## 🛠️ Développement

### Ajouter une page

1. Créer `src/pages/NewPage.jsx`
2. Ajouter la route dans `src/App.jsx` :
```jsx
<Route path="/newpage" element={<NewPage />} />
```

### Ajouter un composant

1. Créer `src/components/NewComponent.jsx`
2. Importer et utiliser dans une page

### Appels API

```javascript
import api from '../services/api';

// GET
const response = await api.get('/api/resources');

// POST
await api.post('/api/endpoint', { data });
```

Le JWT du localStorage est ajouté automatiquement aux requêtes.

---

## 🐛 Dépannage

**Port 5173 utilisé :**
```bash
npm run dev -- --port 3000
```

**Erreurs de linting :**
```bash
npm run lint
```

**Dépendances manquantes :**
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Documentation

- [React](https://react.dev)
- [Vite](https://vite.dev)
- [React Router](https://reactrouter.com)
- [Tailwind](https://tailwindcss.com)
- [Axios](https://axios-http.com)
- [Vitest](https://vitest.dev)

---

## 📝 Licence

This project is licensed under the MIT License
