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

## 🎯 Prochaines étapes

- **Phase 2**: Design System (couleurs, typographie, spacing)
- **Phase 3**: Système images centralisé
- **Phase 4**: Composants de base
- **Phase 5**: Écrans d'authentification
- **Phase 6**: Animations

## 📝 Notes

- Utilisation d'Expo pour le développement et le testing
- Fonts custom : Urbanist (titles) + Satoshi Variable (body/forms)
- Design System basé sur les designs Figma

