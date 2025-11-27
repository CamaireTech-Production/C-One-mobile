# C-One Mobile

Application mobile de voyage tout-en-un développée avec React Native (Expo) et TypeScript. C-One centralise tous vos besoins de voyage dans une seule interface premium : réservations de vols, hôtels, voitures, activités et services locaux.

## 📱 À propos

C-One vise à créer une application de voyage complète, comparable à une "WeChat du voyage", offrant une expérience utilisateur fluide et moderne pour tous vos besoins de voyage.

## ✨ Fonctionnalités

### 🔐 Authentification
- **Onboarding** : 3 écrans d'introduction avec animations fluides
- **Connexion** : Email/mot de passe avec validation
- **Inscription** : Création de compte avec validation complète
- **Mot de passe oublié** : Processus en 3 étapes (email → code → réinitialisation)
- **Connexion sociale** : Support Google et Apple (à venir)

### 🎨 Design System
- **Couleurs** : Palette complète basée sur les designs Figma
- **Typographie** : Urbanist (titres) et Satoshi Variable (corps de texte)
- **Spacing** : Système basé sur une grille 4px
- **Shadows** : Élévations pour iOS et Android
- **Animations** : Transitions fluides et animations fade in/out

### 🧩 Composants réutilisables
- **Button** : Variants (Primary, Secondary, Outline, Text) avec états loading/disabled
- **Input** : Validation, erreurs, états focused
- **Card** : Container avec élévation optionnelle
- **Modal** : Variants (Success, Error, Info) avec animations
- **AppImage** : Gestion d'images avec placeholder et fallback
- **Skeleton Loaders** : Placeholders pour les états de chargement

## 🚀 Technologies

- **React Native** (Expo) - Framework mobile
- **TypeScript** - Typage statique
- **React Navigation** - Navigation entre écrans
- **React Native Reanimated** - Animations performantes
- **Formik + Yup** - Gestion et validation de formulaires
- **Expo Font** - Chargement de polices personnalisées

## 📋 Prérequis

- Node.js (v16 ou supérieur)
- npm ou yarn
- Expo CLI (`npm install -g expo-cli`)
- Un appareil iOS/Android ou un émulateur

## 🛠️ Installation

1. **Cloner le repository**
   ```bash
   git clone <repository-url>
   cd C-One-mobile
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Ajouter les polices personnalisées** (optionnel)
   - Téléchargez les polices Urbanist et Satoshi Variable
   - Placez-les dans `assets/fonts/` selon les instructions dans `assets/fonts/README.md`
   - Décommentez le code dans `src/hooks/useFonts.ts`

4. **Démarrer l'application**
   ```bash
   npm start
   ```

## 📱 Commandes disponibles

```bash
# Démarrer le serveur de développement
npm start

# Démarrer avec cache vidé
npm run start:clear

# Lancer sur Android
npm run android

# Lancer sur iOS
npm run ios

# Lancer sur Web
npm run web
```

## 📁 Structure du projet

```
C-One-mobile/
├── src/
│   ├── components/      # Composants réutilisables
│   │   ├── common/      # Composants de base (Button, Input, Card, etc.)
│   │   └── skeleton/    # Composants de chargement
│   ├── screens/         # Écrans de l'application
│   │   ├── auth/        # Écrans d'authentification
│   │   ├── onboarding/  # Écrans d'introduction
│   │   └── splash/      # Écran de démarrage
│   ├── navigation/      # Configuration de navigation
│   ├── theme/           # Design System (couleurs, typographie, spacing)
│   ├── hooks/           # Custom hooks React
│   ├── utils/           # Utilitaires et helpers
│   ├── types/           # Types TypeScript
│   └── assets/          # Images, polices, etc.
├── assets/              # Assets statiques
└── App.tsx             # Point d'entrée de l'application
```

## 🎯 Utilisation

### Importer des composants

```typescript
import { Button, Input, Card } from '@components/common';
import { colors, typography, spacing } from '@theme';
```

### Utiliser les animations

```typescript
import { AnimatedView, AnimatedCard } from '@components/common';

<AnimatedView delay={200}>
  <Text>Contenu animé</Text>
</AnimatedView>
```

### Utiliser les images

```typescript
import { Image } from '@components/media';
import { images } from '@config/images';

<Image source={images.splashBackground} />
```

## 🔧 Configuration

### Paths Aliases

Le projet utilise des alias pour simplifier les imports :

- `@components` → `src/components`
- `@media` → `src/components/media`
- `@screens` → `src/screens`
- `@navigation` → `src/navigation`
- `@theme` → `src/theme`
- `@config` → `src/config`
- `@hooks` → `src/hooks`
- `@utils` → `src/utils`
- `@types` → `src/types`

### TypeScript

Le projet utilise TypeScript en mode strict. Les types sont définis dans `src/types/` et exportés depuis `src/types/index.ts`.

## 📝 Notes de développement

- **Polices** : Les polices Urbanist et Satoshi Variable doivent être ajoutées manuellement dans `assets/fonts/`
- **Images** : Le système d'images est centralisé dans `src/assets/images/index.ts`
- **Validation** : Les schémas de validation sont définis dans `src/utils/validation.ts` avec Yup
- **Animations** : Les animations utilisent `react-native-reanimated` et l'API Animated de React Native
- **i18n** : Tous les textes passent par `i18next` (`src/i18n`). Utilisez `useTranslation` dans les composants, ajoutez vos traductions dans `src/i18n/locales`, et prévoyez un test/lint rapide pour empêcher le retour de chaînes codées en dur avant d'activer d'autres langues.

## 🚧 Fonctionnalités à venir

- Écrans principaux (Home, Search, Bookings, Profile)
- Intégration API backend
- Système de réservation
- Paiements sécurisés
- Géolocalisation
- Notifications push

## 📄 Licence

Ce projet est privé et propriétaire.

## 👥 Équipe

Développé par l'équipe C-One.

---

Pour plus d'informations, contactez l'équipe de développement.
