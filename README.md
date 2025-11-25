# C-One Mobile

Application mobile de voyage tout-en-un développée avec React Native (Expo) et TypeScript.

## 🚀 Phase 1: Setup Initial - COMPLÉTÉE

### ✅ Réalisations

- **Projet Expo** initialisé avec TypeScript
- **Dépendances** installées :
  - React Navigation (Stack + Bottom Tabs)
  - React Native Reanimated (animations)
  - React Native Skeleton Placeholder
  - Expo Font (fonts custom)
  - Formik + Yup (validation)
  - React Native Safe Area Context

- **Structure de dossiers** créée :
  ```
  src/
  ├── components/     # Composants réutilisables
  ├── screens/        # Écrans de l'application
  ├── navigation/     # Configuration navigation
  ├── theme/          # Design System
  ├── services/       # API & Backend logic
  ├── store/          # État global
  ├── hooks/          # Custom hooks
  ├── utils/          # Helpers & utilities
  ├── types/          # TypeScript types
  └── assets/         # Images, fonts, etc.
  ```

- **TypeScript** configuré avec :
  - Strict mode activé
  - Paths aliases (@components, @screens, etc.)
  - Babel plugin module-resolver

## 🎨 Phase 2: Design System - COMPLÉTÉE

### ✅ Réalisations

- **Couleurs** (`src/theme/colors.ts`) :
  - Palette Primary Blue complète (normal, light, dark, darker)
  - Palette Grey pour text/borders
  - Palette Secondary Blue pour backgrounds
  - Palette Yellow pour accents
  - Couleurs sémantiques (success, error, warning, info)
  - Couleurs pour backgrounds, text, borders

- **Typographie** (`src/theme/typography.ts`) :
  - Urbanist pour les titres (H1, H2, H3, H4)
  - Satoshi Variable pour body, forms, buttons
  - Tailles, poids, line-heights définis
  - Styles prêts à l'emploi (h1, h2, body, button, etc.)

- **Spacing** (`src/theme/spacing.ts`) :
  - Système basé sur 4px (xs: 4, sm: 8, md: 12, base: 16, lg: 24, xl: 32, etc.)

- **Shadows** (`src/theme/shadows.ts`) :
  - Small, Medium, Large, XLarge
  - Compatible iOS et Android

- **Fonts** (`src/hooks/useFonts.ts`) :
  - Hook configuré pour charger Urbanist et Satoshi
  - Fallback sur system fonts en attendant les fichiers

- **Export centralisé** (`src/theme/index.ts`) :
  - Tous les éléments du design system exportés depuis un seul point

## 📱 Commandes

```bash
# Démarrer l'application
npm start

# Lancer sur Android
npm run android

# Lancer sur iOS
npm run ios

# Lancer sur Web
npm run web
```

## 🖼️ Phase 3: Système Images Centralisé - COMPLÉTÉE

### ✅ Réalisations

- **Structure images** (`src/assets/images/`) :
  - Organisation par catégories (auth, common, onboarding)
  - Exports centralisés avec types TypeScript
  - Helper function `getImage()` pour accès dynamique

- **Composant AppImage** (`src/components/common/AppImage.tsx`) :
  - Placeholder automatique pendant le chargement
  - Gestion d'erreur avec image de fallback
  - Animation fade in/out
  - Loading indicator optionnel
  - Support URLs et require() local

- **Usage** :
  ```typescript
  import { AppImage } from '@components/common';
  import { images } from '@assets/images';
  
  // Avec image locale
  <AppImage source={images.auth.splash1} />
  
  // Avec URL
  <AppImage source="https://example.com/image.jpg" />
  ```

## 🧩 Phase 4: Composants de Base - COMPLÉTÉE

### ✅ Réalisations

- **Button** (`src/components/common/Button.tsx`) :
  - Variants : Primary, Secondary, Outline, Text
  - Sizes : Small, Medium, Large
  - États : Disabled, Loading
  - Support fullWidth
  - Animations avec activeOpacity

- **Input** (`src/components/common/Input.tsx`) :
  - États : Default, Focused, Error
  - Label et hint text
  - Validation avec messages d'erreur
  - Border color change selon l'état

- **Card** (`src/components/common/Card.tsx`) :
  - Container réutilisable
  - Shadow/elevation optionnelle
  - Border radius et padding selon design system

- **Modal** (`src/components/common/Modal.tsx`) :
  - Variants : Success, Error, Info
  - Animations fade in/out et scale
  - Boutons primaires et secondaires
  - Backdrop cliquable pour fermer

- **Skeleton Loaders** (`src/components/skeleton/`) :
  - SkeletonCard : Pour cards avec image et texte
  - SkeletonText : Pour lignes de texte
  - Personnalisable (width, height, lines)

- **AppImage** (`src/components/common/AppImage.tsx`) :
  - Placeholder automatique
  - Gestion d'erreur avec fallback
  - Animation fade in

## 🔐 Phase 5: Écrans d'Authentification - COMPLÉTÉE

### ✅ Réalisations

- **3 Écrans Onboarding** (`src/screens/onboarding/`) :
  - OnboardingScreen1 : "La Centralisation"
  - OnboardingScreen2 : "La Simplicité"
  - OnboardingScreen3 : "Expertise locale"
  - Pagination avec indicateurs visuels
  - Utilisation d'AppImage pour les images
  - OnboardingNavigator pour gérer la navigation

- **Login Screen** (`src/screens/auth/login/LoginScreen.tsx`) :
  - Validation avec messages d'erreur
  - Social login buttons (Google, Apple)
  - Lien "Mot de passe oublié"
  - Lien vers Signup
  - États loading et disabled

- **Signup Screen** (`src/screens/auth/signup/SignUpScreen.tsx`) :
  - Validation complète (username, email, password, confirm)
  - Messages d'erreur détaillés
  - Social login buttons
  - Lien vers Login

- **Forgot Password Screen** (`src/screens/auth/forgotPassword/ForgotPasswordScreen.tsx`) :
  - **Étape 1** : Saisie email
  - **Étape 2** : Vérification code à 4 chiffres (inputs individuels avec auto-focus)
  - **Étape 3** : Réinitialisation mot de passe
  - Navigation entre étapes
  - Bouton "Renvoyer le code"

- **Schémas de Validation Yup** (`src/utils/validation.ts`) :
  - `loginSchema` : Email + Password
  - `signupSchema` : Username + Email + Password + Confirm
  - `forgotPasswordEmailSchema` : Email
  - `forgotPasswordCodeSchema` : Code 4 chiffres
  - `resetPasswordSchema` : New password + Confirm

- **Navigation Complète** (`src/navigation/AppNavigator.tsx`) :
  - Stack Navigator avec transitions fade
  - Flow : Onboarding → Login/Signup → ForgotPassword
  - Gestion de l'état d'authentification
  - Navigation conditionnelle selon l'état

- **App.tsx** mis à jour :
  - Utilise AppNavigator au lieu de l'écran de démonstration
  - Chargement des fonts avant affichage

## 🎬 Phase 6: Animations - COMPLÉTÉE

### ✅ Réalisations

- **Hooks d'animation réutilisables** (`src/hooks/`) :
  - `useFadeAnimation` : Animation fade in/out avec contrôle manuel
  - `useScaleAnimation` : Animation scale avec support spring
  - `useSlideAnimation` : Animation slide depuis différentes directions

- **Composants animés** (`src/components/common/`) :
  - `AnimatedCard` : Card avec animations fade + scale
  - `AnimatedView` : View générique avec fade in
  - `AnimatedList` : Liste avec animations progressives pour les items

- **Utilitaires d'animation** (`src/utils/animations.ts`) :
  - Fonctions helper pour créer des animations (fade, scale, spring)
  - Support pour stagger, sequence, parallel animations

- **Transitions d'écran** :
  - Transitions fade entre écrans dans `AppNavigator`
  - Durée d'animation configurée (300ms)

- **Animations appliquées** :
  - ✅ SplashScreen : Animations séquentielles (background → logo)
  - ✅ Onboarding screens : Animations progressives pour titre, description, bouton
  - ✅ LoginScreen : Animations fade in pour sections (titre, formulaire, social, liens)
  - ✅ Modal : Animations fade + scale existantes améliorées

### 📖 Usage

```typescript
// Utiliser AnimatedView pour fade in
import { AnimatedView } from '@components/common';

<AnimatedView delay={200}>
  <Text>Contenu animé</Text>
</AnimatedView>

// Utiliser AnimatedCard pour cards animées
import { AnimatedCard } from '@components/common';

<AnimatedCard delay={100} animationType="both">
  <Text>Card avec fade + scale</Text>
</AnimatedCard>

// Utiliser les hooks directement
import { useFadeAnimation } from '@hooks';

const { fadeAnim, fadeIn, fadeOut } = useFadeAnimation({
  duration: 300,
  delay: 100,
});
```

## 🎯 Prochaines étapes

- **Phase 7**: Écrans principaux (Home, Search, Bookings, Profile)
- **Phase 8**: Intégration API et services backend

## 📝 Notes

- Utilisation d'Expo pour le développement et le testing
- Fonts custom : Urbanist (titles) + Satoshi Variable (body/forms)
- Design System basé sur les designs Figma

