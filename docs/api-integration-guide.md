# Guide d'Intégration des APIs Backend

## Vue d'ensemble

Ce guide décrit la méthode optimale pour intégrer les APIs backend dans l'application C-One Mobile sans perturber le design et la structure des écrans existants.

## Architecture Recommandée : Pattern en Couches

### Principe Fondamental

L'application utilise déjà une architecture basée sur des **hooks personnalisés** qui servent d'interface entre les écrans et les données. Cette abstraction permet de remplacer les données mockées par des appels API **sans modifier les écrans**.

```
┌─────────────┐
│   Screens   │  ← Ne change PAS
└──────┬──────┘
       │ utilise
┌──────▼──────┐
│    Hooks    │  ← Interface stable
└──────┬──────┘
       │ appelle
┌──────▼──────┐
│   Services   │  ← Change ici (mock → API)
└──────┬──────┘
       │ fait
┌──────▼──────┐
│  API Client │  ← Configuration centralisée
└─────────────┘
```

## Structure de Fichiers

### 1. Configuration API Client

**Fichier : `src/services/api/apiClient.ts`**

```typescript
// Configuration centralisée pour tous les appels API
// - Base URL
// - Interceptors (auth, erreurs)
// - Headers par défaut
```

**Responsabilités :**
- Configuration de l'URL de base
- Gestion de l'authentification (tokens)
- Intercepteurs pour erreurs globales
- Headers par défaut

### 2. Services par Domaine

**Structure : `src/services/api/[domain]/[domain]Service.ts`**

Exemples :
- `src/services/api/auth/authService.ts`
- `src/services/api/home/homeService.ts`
- `src/services/api/bookings/bookingsService.ts`

**Responsabilités :**
- Fonctions spécifiques par endpoint
- Transformation des données API → format app
- Gestion des erreurs spécifiques

### 3. Types TypeScript

**Fichier : `src/services/api/types.ts`**

```typescript
// Types pour les réponses API
// Types pour les requêtes API
// Types partagés entre services
```

## Stratégie d'Intégration Progressive

### Étape 1 : Créer l'API Client

1. Installer les dépendances nécessaires (axios ou fetch)
2. Créer `src/services/api/apiClient.ts`
3. Configurer base URL, interceptors, authentification

### Étape 2 : Créer le Premier Service

1. Choisir un écran simple (ex: HomeScreen)
2. Créer `src/services/api/home/homeService.ts`
3. Définir les types dans `src/services/api/types.ts`

### Étape 3 : Modifier le Hook Existant

**Avant (mock) :**
```typescript
// src/hooks/useHomeData.ts
export const useHomeData = () => {
  const [data, setData] = useState<HomeData | null>(null);
  // ... utilise homeData (mock)
}
```

**Après (API) :**
```typescript
// src/hooks/useHomeData.ts
export const useHomeData = () => {
  const [data, setData] = useState<HomeData | null>(null);
  // ... appelle homeService.getHomeData()
}
```

**Important :** L'interface du hook reste identique (`{ data, loading, refresh }`), donc les écrans ne changent pas.

### Étape 4 : Tester et Étendre

1. Tester l'intégration sur un écran
2. Vérifier que le design reste intact
3. Étendre aux autres écrans progressivement

## Exemple Concret : HomeScreen

### État Actuel

```typescript
// src/hooks/useHomeData.ts
import { homeData } from '../data/data';

export const useHomeData = () => {
  const [data, setData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulation avec timeout
    setTimeout(() => {
      setData(homeData);
      setLoading(false);
    }, 800);
  }, []);
  
  return { data, loading, refresh };
};
```

### Après Intégration API

```typescript
// src/services/api/home/homeService.ts
import { apiClient } from '../apiClient';

export const homeService = {
  async getHomeData(): Promise<HomeData> {
    const response = await apiClient.get('/api/home');
    return response.data;
  }
};
```

```typescript
// src/hooks/useHomeData.ts
import { homeService } from '../services/api/home/homeService';

export const useHomeData = () => {
  const [data, setData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await homeService.getHomeData();
        setData(result);
      } catch (error) {
        // Gestion d'erreur
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  return { data, loading, refresh };
};
```

**Résultat :** `HomeScreen.tsx` ne change **PAS** car il utilise toujours `useHomeData()` avec la même interface.

## Gestion des États de Chargement

Les écrans utilisent déjà des états `loading` pour afficher des skeletons :

```typescript
// HomeScreen.tsx
const { data, loading } = useHomeData();

{loading ? (
  <SkeletonHorizontalCards />
) : (
  <HorizontalCards>
    {data?.countries.map(...)}
  </HorizontalCards>
)}
```

Ces états continuent de fonctionner avec les APIs.

## Gestion des Erreurs

### Niveau API Client (Global)

```typescript
// apiClient.ts
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Gestion globale des erreurs
    // - 401 → Rediriger vers login
    // - 500 → Afficher message générique
    return Promise.reject(error);
  }
);
```

### Niveau Service (Spécifique)

```typescript
// homeService.ts
export const homeService = {
  async getHomeData(): Promise<HomeData> {
    try {
      const response = await apiClient.get('/api/home');
      return response.data;
    } catch (error) {
      // Gestion spécifique si nécessaire
      throw new Error('Impossible de charger les données');
    }
  }
};
```

### Niveau Hook (UI)

```typescript
// useHomeData.ts
export const useHomeData = () => {
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await homeService.getHomeData();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  return { data, loading, error, refresh };
};
```

## Checklist d'Intégration

Pour chaque écran à intégrer :

- [ ] Créer le service correspondant dans `src/services/api/[domain]/`
- [ ] Définir les types TypeScript pour les requêtes/réponses
- [ ] Modifier le hook existant pour utiliser le service
- [ ] Vérifier que l'interface du hook reste identique
- [ ] Tester que l'écran fonctionne sans modification
- [ ] Vérifier que le design reste intact
- [ ] Gérer les erreurs appropriées
- [ ] Tester les états de chargement (skeletons)

## Avantages de Cette Approche

1. **Pas de modification des écrans** : Les composants UI restent intacts
2. **Séparation des responsabilités** : Logique métier séparée de l'UI
3. **Testabilité** : Facile de tester les services indépendamment
4. **Maintenabilité** : Changements API centralisés
5. **Réutilisabilité** : Services utilisables par plusieurs hooks/écrans

## Notes Importantes

- **Ne jamais mettre de logique API directement dans les écrans**
- **Toujours passer par les hooks existants**
- **Maintenir l'interface des hooks stable**
- **Utiliser les états `loading` existants pour les skeletons**
- **Gérer les erreurs de manière centralisée quand possible**

## Prochaines Étapes

1. Créer la structure de base (`apiClient.ts`)
2. Intégrer un premier écran (ex: HomeScreen)
3. Étendre progressivement aux autres écrans
4. Ajouter la gestion d'authentification si nécessaire
5. Implémenter le cache/refresh si nécessaire

