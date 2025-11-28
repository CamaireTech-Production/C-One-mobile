# Documentation C-One Mobile

Ce dossier contient la documentation technique pour le développement de l'application C-One Mobile.

## Guides Disponibles

### 1. [Guide d'Intégration des APIs Backend](./api-integration-guide.md)

Guide complet pour intégrer les APIs backend dans l'application sans perturber le design des écrans existants.

**Contenu :**
- Architecture recommandée (pattern en couches)
- Structure de fichiers
- Stratégie d'intégration progressive
- Exemples concrets
- Gestion des erreurs et états de chargement
- Checklist d'intégration

### 2. [Guide des Prompts Figma pour Cursor AI](./figma-prompt-guide.md)

Templates de prompts optimisés pour reproduire fidèlement les designs Figma en utilisant uniquement le design system existant.

**Contenu :**
- Template de prompt de base
- Exemples par type de page
- Gestion des éléments manquants
- Checklist de vérification
- Erreurs communes à éviter

## Structure du Projet

Pour comprendre l'architecture du projet, consultez :
- `src/theme/` - Design system (colors, typography, spacing, shadows)
- `src/components/common/` - Composants réutilisables
- `src/services/` - Services API et logique métier
- `src/hooks/` - Hooks personnalisés pour la gestion d'état

## Bonnes Pratiques

1. **Design System** : Toujours utiliser les tokens du design system (`colors`, `typography`, `spacing`)
2. **Composants** : Réutiliser les composants existants de `@components/common`
3. **APIs** : Passer par les hooks existants, ne jamais mettre de logique API directement dans les écrans
4. **Types** : Utiliser TypeScript pour tous les nouveaux fichiers

