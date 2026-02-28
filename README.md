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

Tests avec Vitest et React Testing Library.

```bash
npm run test
```

Fichiers de tests :
- `src/__tests__/LoginPage.test.jsx` - Tests page connexion
- `src/__tests__/Dashboard.test.jsx` - Tests tableau de bord
- `src/__tests__/AddResourceModal.test.jsx` - Tests modal

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
