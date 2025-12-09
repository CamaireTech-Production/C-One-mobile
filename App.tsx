import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import './src/i18n';
import { useFonts } from './src/hooks/useFonts';
import { AppNavigator } from './src/navigation/AppNavigator';
import { AuthProvider } from './src/services/auth/authContext';
import { TabBarVisibilityProvider } from './src/contexts/TabBarVisibilityContext';
import { colors } from './src/theme';

export default function App() {
  const { fontsLoaded } = useFonts();

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary.normal} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <TabBarVisibilityProvider>
          <StatusBar style="auto" />
          <AppNavigator />
        </TabBarVisibilityProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.primary,
  },
});
