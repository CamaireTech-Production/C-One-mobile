# Guide des Prompts Figma pour Cursor AI

## Vue d'ensemble

Ce guide fournit des templates de prompts optimisés pour reproduire fidèlement les designs Figma dans Cursor AI, en utilisant **uniquement** le design system existant et les composants réutilisables.

## Principe Fondamental

**NE JAMAIS mettre de valeurs en dur** (couleurs hex, fontFamily, fontSize, spacing numérique).  
**TOUJOURS utiliser** les tokens du design system (`colors`, `typography`, `spacing`) et les composants existants.

## Structure du Design System

### Fichiers de Référence

- **Couleurs** : `src/theme/colors.ts`
- **Typography** : `src/theme/typography.ts`
- **Spacing** : `src/theme/spacing.ts`
- **Composants** : `src/components/common/index.ts`
- **Export central** : `src/theme/index.ts`

### Import Standard

```typescript
import { colors, typography, spacing } from '@theme';
import { Button, Input, Card, Icon, Modal } from '@components/common';
```

## Template de Prompt de Base

### Structure Recommandée

```
[CONTEXTE]
[SCREENSHOT]
[RÈGLES STRICTES]
[MAPPING DESIGN SYSTEM]
[COMPOSANTS À RÉUTILISER]
[VÉRIFICATION]
```

---

## Template Complet

```
Je veux implémenter cette page depuis Figma (voir screenshot ci-joint).

**RÈGLES STRICTES :**
1. Utiliser UNIQUEMENT les composants existants de `@components/common`
2. Utiliser UNIQUEMENT les tokens du design system :
   - Couleurs : `colors` depuis `@theme` (NE PAS mettre de couleurs hex en dur comme #FF5733)
   - Typography : `typography.styles` depuis `@theme` (NE PAS mettre fontFamily/fontSize en dur)
   - Spacing : `spacing` depuis `@theme` (NE PAS mettre de valeurs numériques comme 16, 24, 32 en dur)
3. Si un élément n'existe pas dans le design system, l'ajouter D'ABORD dans le fichier approprié (`colors.ts`, `typography.ts`, ou `spacing.ts`) AVANT de l'utiliser
4. Réutiliser les composants existants : Button, Input, Card, Modal, Icon, etc.

**Structure de la page :**
[Décrire la structure : sections, composants visibles, layout]

**Mapping design system :**
- Titre principal → `typography.styles.h1` (Urbanist Bold 36px)
- Sous-titre → `typography.styles.h3` (Urbanist SemiBold 24px)
- Texte de description → `typography.styles.bodyRegular16` (Satoshi Regular 16px)
- Labels → `typography.styles.inputLabel` (Satoshi Medium 14px)
- Bouton primaire → `<Button variant="primary" size="large">` (composant existant)
- Fond de page → `colors.background.primary`
- Texte principal → `colors.text.primary`
- Texte secondaire → `colors.text.secondary`
- Espacement entre sections → `spacing.xl` (32px)
- Padding container → `spacing.lg` (24px)

**Composants à réutiliser :**
- `<Button>` pour les boutons
- `<Input>` pour les champs de formulaire
- `<Card>` pour les conteneurs avec élévation
- `<Icon>` pour les icônes
- `<Modal>` pour les modales si nécessaire

**Vérification avant génération :**
- [ ] Toutes les couleurs référencent `colors.*` (pas de hex en dur)
- [ ] Toutes les typography référencent `typography.styles.*` (pas de fontFamily/fontSize en dur)
- [ ] Tous les espacements référencent `spacing.*` (pas de valeurs numériques)
- [ ] Tous les composants utilisent ceux de `@components/common`
- [ ] Si un élément manque, il est signalé AVANT utilisation

IMPORTANT : Si tu vois une couleur/typography/spacing qui n'existe pas dans le design system, demande-moi d'abord avant de l'ajouter.
```

---

## Exemples de Prompts par Type de Page

### Exemple 1 : Page de Profil Utilisateur

```
Je veux implémenter cette page de profil utilisateur depuis Figma (voir screenshot).

**RÈGLES STRICTES :**
1. Utiliser UNIQUEMENT les composants de `@components/common` (Button, Input, Card, Icon, etc.)
2. Utiliser UNIQUEMENT les tokens du design system :
   - Couleurs : `colors` depuis `@theme` - NE PAS mettre de couleurs hex en dur
   - Typography : `typography.styles` depuis `@theme` - NE PAS mettre fontFamily/fontSize en dur
   - Spacing : `spacing` depuis `@theme` - NE PAS mettre de valeurs numériques (4, 8, 16, etc.) en dur
3. Si un élément n'existe pas, l'ajouter D'ABORD dans le design system AVANT utilisation

**Structure de la page :**
- Header avec avatar circulaire, nom utilisateur, et bouton d'édition
- Section "Informations personnelles" avec plusieurs champs Input
- Section "Préférences" avec des toggles
- Bouton "Sauvegarder" en bas de page

**Mapping design system :**
- Titre "Mon Profil" → `typography.styles.h2` (Urbanist Bold 30px)
- Nom utilisateur → `typography.styles.bodyBold18` (Satoshi Bold 18px)
- Labels des champs → `typography.styles.inputLabel` (Satoshi Medium 14px)
- Texte dans les inputs → `typography.styles.input` (Satoshi Regular 16px)
- Bouton "Sauvegarder" → `<Button variant="primary" size="large">` (composant existant)
- Bouton "Éditer" → `<Button variant="outline" size="medium">` (composant existant)
- Fond de la page → `colors.background.primary`
- Fond des sections → `colors.background.secondary`
- Texte principal → `colors.text.primary`
- Texte secondaire → `colors.text.secondary`
- Bordure des inputs → `colors.border.normal`
- Espacement entre sections → `spacing.xl` (32px)
- Padding du container → `spacing.lg` (24px)
- Gap entre éléments → `spacing.base` (16px)

**Composants à réutiliser :**
- `<Button>` pour les boutons d'action
- `<Input>` pour tous les champs de formulaire
- `<Card>` pour la section d'informations si nécessaire
- `<Icon>` pour l'icône d'édition et autres icônes

**Vérification avant génération :**
- [ ] Toutes les couleurs référencent `colors.*` (pas de hex en dur)
- [ ] Toutes les typography référencent `typography.styles.*` (pas de fontFamily/fontSize en dur)
- [ ] Tous les espacements référencent `spacing.*` (pas de valeurs numériques)
- [ ] Tous les composants utilisent ceux de `@components/common`
- [ ] Si un élément manque, il est signalé AVANT utilisation

IMPORTANT : Si tu vois une couleur qui n'est pas dans `colors.ts`, dis-moi laquelle et je l'ajouterai d'abord.
```

### Exemple 2 : Page de Liste avec Cards

```
Je veux implémenter cette page de liste d'hôtels depuis Figma (voir screenshot).

**RÈGLES STRICTES :**
1. Utiliser UNIQUEMENT les composants de `@components/common`
2. Utiliser UNIQUEMENT les tokens du design system (colors, typography, spacing)
3. Si un élément n'existe pas, l'ajouter D'ABORD dans le design system AVANT utilisation

**Structure de la page :**
- Header avec titre et bouton de filtre
- Barre de recherche en haut
- Liste verticale de cards d'hôtels avec image, titre, sous-titre, rating
- Chaque card est cliquable

**Mapping design system :**
- Titre de la page → `typography.styles.h1` (Urbanist Bold 36px)
- Titre des cards → `typography.styles.bodyBold18` (Satoshi Bold 18px)
- Sous-titre des cards → `typography.styles.bodyRegular14` (Satoshi Regular 14px)
- Rating → `typography.styles.bodyMedium14` (Satoshi Medium 14px)
- Bouton filtre → `<Button variant="outline" size="small">` (composant existant)
- Barre de recherche → `<SearchBar>` (composant existant)
- Cards → Utiliser `<Card>` ou `<HomeCard>` si approprié
- Fond de la page → `colors.background.primary`
- Fond des cards → `colors.background.primary`
- Texte principal → `colors.text.primary`
- Texte secondaire → `colors.text.secondary`
- Bordure des cards → `colors.border.light`
- Espacement entre cards → `spacing.base` (16px)
- Padding de la liste → `spacing.lg` (24px)
- Border radius des cards → Utiliser la valeur du composant Card existant

**Composants à réutiliser :**
- `<SearchBar>` pour la recherche
- `<Button>` pour le bouton de filtre
- `<Card>` ou `<HomeCard>` pour les cards d'hôtels
- `<Icon>` pour les icônes (étoiles, localisation, etc.)

**Vérification avant génération :**
- [ ] Toutes les couleurs référencent `colors.*`
- [ ] Toutes les typography référencent `typography.styles.*`
- [ ] Tous les espacements référencent `spacing.*`
- [ ] Tous les composants utilisent ceux de `@components/common`
```

### Exemple 3 : Modal de Confirmation

```
Je veux implémenter cette modal de confirmation depuis Figma (voir screenshot).

**RÈGLES STRICTES :**
1. Utiliser UNIQUEMENT les composants de `@components/common`
2. Utiliser UNIQUEMENT les tokens du design system
3. Si un élément n'existe pas, l'ajouter D'ABORD dans le design system AVANT utilisation

**Structure de la modal :**
- Overlay semi-transparent
- Container modal centré avec border radius
- Icône de confirmation en haut
- Titre et message
- Deux boutons : "Annuler" (secondary) et "Confirmer" (primary)

**Mapping design system :**
- Titre de la modal → `typography.styles.h3` (Urbanist SemiBold 24px)
- Message → `typography.styles.bodyRegular16` (Satoshi Regular 16px)
- Bouton "Confirmer" → `<Button variant="primary" size="medium">` (composant existant)
- Bouton "Annuler" → `<Button variant="outline" size="medium">` (composant existant)
- Utiliser le composant `<Modal>` existant si possible
- Fond de l'overlay → `rgba(0, 0, 0, 0.5)` (standard pour modals)
- Fond de la modal → `colors.background.primary`
- Texte → `colors.text.primary`
- Espacement interne → `spacing.lg` (24px)
- Gap entre boutons → `spacing.md` (12px)

**Composants à réutiliser :**
- `<Modal>` pour la structure de base
- `<Button>` pour les actions
- `<Icon>` pour l'icône de confirmation

**Vérification avant génération :**
- [ ] Utilise le composant Modal existant
- [ ] Toutes les couleurs référencent `colors.*`
- [ ] Toutes les typography référencent `typography.styles.*`
- [ ] Tous les espacements référencent `spacing.*`
```

---

## Gestion des Éléments Manquants

### Si une Couleur Manque

```
Je vois dans le design une couleur orange #FF6B35 qui n'existe pas dans colors.ts.

**Action requise :**
1. Ajoute d'abord cette couleur dans `src/theme/colors.ts` dans une section appropriée :
   ```typescript
   accent: {
     orange: '#FF6B35',
     // ... autres couleurs accent si nécessaire
   }
   ```
2. Ensuite, utilise `colors.accent.orange` dans le code

NE PAS utiliser `#FF6B35` directement dans le code.
```

### Si une Typography Manque

```
Je vois dans le design un style de texte qui n'existe pas dans typography.styles.

**Détails :**
- Font: Satoshi Variable
- Weight: Medium (500)
- Size: 22px
- Line Height: 33px (1.5)

**Action requise :**
1. Ajoute d'abord ce style dans `src/theme/typography.ts` :
   ```typescript
   bodyMedium22: {
     fontFamily: 'Satoshi-Medium',
     fontSize: 22,
     fontWeight: '500' as const,
     lineHeight: 33,
   }
   ```
2. Ensuite, utilise `typography.styles.bodyMedium22` dans le code

NE PAS mettre fontFamily/fontSize en dur.
```

### Si un Spacing Manque

```
Je vois dans le design un espacement de 20px qui n'existe pas dans spacing.ts.

**Action requise :**
1. Ajoute d'abord cet espacement dans `src/theme/spacing.ts` :
   ```typescript
   '5xl': 80,
   // ou un nom plus sémantique si approprié
   ```
2. Ensuite, utilise `spacing['5xl']` dans le code

NE PAS mettre `20` en dur.
```

---

## Checklist de Vérification

Avant de générer le code, vérifier :

- [ ] **Couleurs** : Toutes référencent `colors.*` (aucun hex en dur)
- [ ] **Typography** : Toutes référencent `typography.styles.*` (aucun fontFamily/fontSize en dur)
- [ ] **Spacing** : Toutes référencent `spacing.*` (aucune valeur numérique en dur)
- [ ] **Composants** : Utilisation des composants de `@components/common`
- [ ] **Éléments manquants** : Signalés AVANT utilisation
- [ ] **Imports** : Utilisation des alias (`@theme`, `@components`)

---

## Astuces Supplémentaires

### 1. Référencer les Fichiers du Design System

Ajoutez cette ligne dans votre prompt :

```
Référence le fichier `src/theme/index.ts` pour voir tous les tokens disponibles.
Référence `src/components/common/index.ts` pour voir tous les composants disponibles.
```

### 2. Mentionner les Composants Existants Similaires

Si vous voyez un composant similaire dans le code :

```
Cette page ressemble à HomeScreen.tsx. Réutilise la même structure et les mêmes patterns.
```

### 3. Spécifier les Animations

Si le design inclut des animations :

```
Utilise les hooks d'animation existants :
- `useFadeAnimation` pour les fade in/out
- `useScaleAnimation` pour les scale
- `AnimatedView` ou `AnimatedCard` pour les animations
```

### 4. Spécifier les États de Chargement

```
Ajoute des skeletons de chargement en utilisant les composants de `@components/skeleton` :
- `SkeletonBlock` pour les blocs
- `SkeletonCard` pour les cards
- `SkeletonText` pour le texte
```

---

## Erreurs Communes à Éviter

### ❌ Mauvais Exemple

```typescript
// NE PAS FAIRE
<View style={{ 
  backgroundColor: '#FF5733',  // ❌ Couleur en dur
  padding: 16,                  // ❌ Spacing en dur
  marginTop: 24                // ❌ Spacing en dur
}}>
  <Text style={{
    fontFamily: 'Satoshi-Bold', // ❌ FontFamily en dur
    fontSize: 18                // ❌ FontSize en dur
  }}>
    Titre
  </Text>
</View>
```

### ✅ Bon Exemple

```typescript
// FAIRE
import { colors, typography, spacing } from '@theme';

<View style={{ 
  backgroundColor: colors.primary.normal,  // ✅ Token du design system
  padding: spacing.base,                    // ✅ Token du design system
  marginTop: spacing.lg                    // ✅ Token du design system
}}>
  <Text style={typography.styles.bodyBold18}>  {/* ✅ Style du design system */}
    Titre
  </Text>
</View>
```

---

## Template Rapide (Version Courte)

Pour des pages simples :

```
Implémente cette page Figma (screenshot).

**Règles :**
- Utilise UNIQUEMENT `colors`, `typography.styles`, `spacing` depuis `@theme`
- Utilise UNIQUEMENT les composants de `@components/common`
- Pas de valeurs en dur

**Mapping :**
- Titre → `typography.styles.h2`
- Texte → `typography.styles.bodyRegular16`
- Bouton → `<Button variant="primary">`
- Fond → `colors.background.primary`
- Espacement → `spacing.lg`

Si un élément manque, demande-moi d'abord.
```

---

## Notes Finales

- **Toujours commencer par référencer le design system**
- **Demander confirmation avant d'ajouter de nouveaux tokens**
- **Préférer la réutilisation des composants existants**
- **Vérifier que le code généré respecte les règles avant de l'accepter**

