# Guide de Génération d'APK - C-One Mobile

Guide simple pour générer les différents types d'APK selon vos besoins.

## 📱 Types de Builds Disponibles

### 1. **Development Build** (Développement)
**Profil :** `development`

**Commande :**
```bash
eas build --platform android --profile development
```

**Caractéristiques :**
- ✅ Nécessite Expo Dev Client installé
- ✅ Nécessite de scanner un QR code pour charger le code
- ✅ Hot reload et debugging activés
- ❌ Ne fonctionne pas comme une app standalone
- ⚠️ **Utilisation :** Pour développer et tester pendant le développement

**Quand l'utiliser :**
- Pendant le développement actif
- Quand vous voulez tester rapidement avec `expo start`
- Pour le debugging en temps réel

---

### 2. **Preview Build** (Test/Prévisualisation) ⭐ **RECOMMANDÉ POUR TESTER**
**Profil :** `preview`

**Commande :**
```bash
eas build --platform android --profile preview
```

**Caractéristiques :**
- ✅ APK standalone (fonctionne seul)
- ✅ Pas besoin d'Expo Go
- ✅ Pas besoin de QR code
- ✅ Installation directe sur téléphone
- ✅ Comportement proche de la production
- ⚠️ **Utilisation :** Pour tester l'app comme un utilisateur final

**Quand l'utiliser :**
- Pour tester avec VPN (géolocalisation)
- Pour tester avec des utilisateurs beta
- Pour valider le comportement final de l'app
- **C'est ce que vous voulez pour tester la géolocalisation avec VPN !**

---

### 3. **Production Build** (Production)
**Profil :** `production`

**Commande :**
```bash
eas build --platform android --profile production
```

**Caractéristiques :**
- ✅ APK/AAB optimisé pour le Play Store
- ✅ Version finale pour publication
- ✅ Signé avec la clé de production
- ✅ Auto-increment du versionCode
- ⚠️ **Utilisation :** Pour publier sur Google Play Store

**Quand l'utiliser :**
- Quand vous êtes prêt à publier sur le Play Store
- Pour créer la version finale de l'app

---

## 🚀 Étapes Rapides pour Générer un APK Preview

### 1. Générer le build
```bash
cd C-One-mobile
eas build --platform android --profile preview
```

### 2. Attendre la génération
- Le build se fait sur les serveurs Expo (5-15 minutes)
- Vous pouvez suivre la progression dans le terminal
- Un lien sera fourni à la fin

### 3. Télécharger l'APK
- Allez sur votre dashboard Expo : https://expo.dev
- Naviguez vers votre projet → Builds
- Téléchargez l'APK généré

### 4. Installer sur votre téléphone
- Transférez l'APK sur votre téléphone (USB, email, cloud)
- Ouvrez le fichier APK
- Autorisez l'installation depuis "Sources inconnues" si demandé
- Installez l'app

### 5. Tester
- Ouvrez l'app (elle fonctionne seule, sans Expo Go)
- Testez la géolocalisation avec votre VPN
- Vérifiez les logs dans le terminal si vous avez `expo start` en cours

---

## 📝 Notes Importantes

### Build Local vs Serveur
- **Local :** `--local` (nécessite macOS/Linux, plus rapide)
- **Serveur :** Sans `--local` (fonctionne sur Windows, plus lent mais plus simple)

### Pour Windows (votre cas)
```bash
# Utilisez sans --local
eas build --platform android --profile preview
```

### Pour iOS
```bash
eas build --platform ios --profile preview
```

---

## 🔍 Vérifier les Logs après Installation

Si vous voulez voir les logs de l'app installée :

1. Gardez `expo start` en cours dans le terminal
2. Connectez votre téléphone au même réseau WiFi
3. Les logs apparaîtront dans le terminal (si l'app est configurée pour ça)

**Note :** Avec un APK preview, les logs peuvent ne pas apparaître dans `expo start`. Pour voir les logs, utilisez :
- Android Studio Logcat
- `adb logcat` (Android Debug Bridge)

---

## ✅ Checklist pour Tester la Géolocalisation

- [ ] APK preview généré et installé
- [ ] VPN activé sur votre téléphone
- [ ] VPN connecté à un pays (Pays-Bas, Roumanie, Mexique, Japon, ou Cameroun)
- [ ] Permissions de localisation accordées dans les paramètres Android
- [ ] Ouvrir l'app et aller sur l'onglet "Ma position"
- [ ] Vérifier que les villes sont filtrées selon le pays du VPN

---

## 🆘 Problèmes Courants

### "Build failed"
- Vérifiez votre connexion internet
- Vérifiez que vous êtes connecté : `eas login`
- Vérifiez les logs sur https://expo.dev

### "APK ne s'installe pas"
- Autorisez l'installation depuis "Sources inconnues" dans les paramètres Android
- Vérifiez que l'APK n'est pas corrompu (re-téléchargez)

### "L'app crash au démarrage"
- Vérifiez les logs avec `adb logcat`
- Vérifiez que toutes les dépendances sont installées
- Essayez de régénérer le build

---

## 📚 Ressources

- [Documentation EAS Build](https://docs.expo.dev/build/introduction/)
- [Dashboard Expo](https://expo.dev)
- [EAS CLI Reference](https://docs.expo.dev/eas/)


