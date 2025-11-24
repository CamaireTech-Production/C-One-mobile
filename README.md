# C-One Mobile App

Application mobile de voyage tout-en-un développée avec React Native (Expo) et TypeScript.

## 🚀 Setup

### Prérequis
- Node.js 18+
- npm ou yarn
- Expo Go app sur votre téléphone (pour tester)

### Installation

```bash
npm install
```

### Ajout des polices

Les polices **Urbanist** et **Satoshi Variable** doivent être ajoutées manuellement :

1. Téléchargez les fichiers de polices depuis Figma ou Google Fonts
2. Placez-les dans `assets/fonts/` avec les noms suivants :

**Urbanist:**
- `Urbanist-Regular.ttf`
- `Urbanist-Medium.ttf`
- `Urbanist-SemiBold.ttf`
- `Urbanist-Bold.ttf`

**Satoshi Variable:**
- `Satoshi-Regular.otf`
- `Satoshi-Medium.otf`
- `Satoshi-Bold.otf`

3. Mettez à jour `app.json` pour inclure les polices (Expo les chargera automatiquement)

### Lancer l'application

```bash
npm start
```

Puis scannez le QR code avec Expo Go (iOS) ou l'app Expo (Android).

## 📁 Structure du Projet

```
src/
├── components/        # Composants réutilisables
│   ├── common/       # Button, Input, Card, Modal
│   ├── navigation/   # BottomNav, Header
│   └── skeleton/     # Skeleton loaders
├── screens/          # Écrans complets
│   ├── auth/         # Login, Signup, ForgotPassword
│   ├── onboarding/  # 3 écrans d'onboarding
│   └── main/         # Home, Hotels, etc.
├── navigation/       # Configuration navigation
├── theme/            # Design System (colors, typography, spacing)
├── services/         # API & Backend logic
├── store/            # État global (Zustand/Context)
├── hooks/            # Custom hooks
├── utils/            # Helpers & utilities
└── types/            # TypeScript types
```

## 🎨 Design System

Le Design System est centralisé dans `src/theme/` :

- **Colors**: Palette de couleurs extraite de Figma
- **Typography**: Urbanist (titres) et Satoshi Variable (corps, formulaires)
- **Spacing**: Système basé sur 4px
- **Shadows**: Élévations pour cards et modals

## 📦 Dépendances Principales

- `@react-navigation/native` - Navigation
- `react-native-reanimated` - Animations fade in/out
- `react-native-skeleton-placeholder` - Skeleton loaders
- `expo-font` - Chargement des polices custom

## 🔄 Prochaines Étapes

1. ✅ Setup initial et Design System
2. ⏳ Composants de base (Button, Input, Card, Modal)
3. ⏳ Écrans d'auth (Onboarding → Login → Signup)

