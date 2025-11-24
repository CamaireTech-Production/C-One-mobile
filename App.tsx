import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>C-One Mobile</Text>
            <Text style={styles.subtitle}>Phase 1: Setup Initial</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>✅ Projet Initialisé</Text>
            <Text style={styles.sectionText}>
              • Expo avec TypeScript{'\n'}
              • React Navigation configuré{'\n'}
              • Structure de dossiers créée{'\n'}
              • TypeScript avec paths aliases
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📦 Dépendances Installées</Text>
            <Text style={styles.sectionText}>
              • @react-navigation/native{'\n'}
              • react-native-reanimated{'\n'}
              • react-native-skeleton-placeholder{'\n'}
              • expo-font{'\n'}
              • formik + yup{'\n'}
              • react-native-safe-area-context
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📁 Structure Créée</Text>
            <Text style={styles.sectionText}>
              • src/components/{'\n'}
              • src/screens/{'\n'}
              • src/theme/{'\n'}
              • src/navigation/{'\n'}
              • src/services/{'\n'}
              • src/assets/
            </Text>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Prêt pour la Phase 2: Design System 🎨
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7f9',
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#288cbe',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#333538',
    opacity: 0.7,
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e698f',
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 14,
    color: '#333538',
    lineHeight: 22,
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  footerText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#288cbe',
  },
});
