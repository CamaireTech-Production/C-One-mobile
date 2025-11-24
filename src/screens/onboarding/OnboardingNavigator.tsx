/**
 * Onboarding Navigator
 * Handles navigation between the 3 onboarding screens
 */

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { OnboardingScreen1, OnboardingScreen2, OnboardingScreen3 } from './index';
import { colors } from '../../theme';

interface OnboardingNavigatorProps {
  onComplete: () => void;
}

export const OnboardingNavigator: React.FC<OnboardingNavigatorProps> = ({
  onComplete,
}) => {
  const [currentScreen, setCurrentScreen] = useState(1);

  const handleContinue = () => {
    if (currentScreen < 3) {
      setCurrentScreen(currentScreen + 1);
    } else {
      onComplete();
    }
  };

  return (
    <View style={styles.container}>
      {currentScreen === 1 && <OnboardingScreen1 onContinue={handleContinue} />}
      {currentScreen === 2 && <OnboardingScreen2 onContinue={handleContinue} />}
      {currentScreen === 3 && <OnboardingScreen3 onContinue={handleContinue} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
});

