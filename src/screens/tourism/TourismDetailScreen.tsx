/**
 * TourismDetailScreen
 * Detail screen for a specific tourism place
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../../types';

import {
  ScreenBackground,
  DetailHeader,
} from '../../components/common';
import { colors, spacing, typography } from '../../theme';

interface TourismDetailScreenParams {
  placeId: string;
  title: string;
}

type TourismDetailScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'TourismDetail'>;

export const TourismDetailScreen: React.FC = () => {
  const { t } = useTranslation();
  const route = useRoute();
  const navigation = useNavigation<TourismDetailScreenNavigationProp>();
  const params = route.params as TourismDetailScreenParams;

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <ScreenBackground backgroundColor={colors.background.primary}>
      <DetailHeader
        title={params?.title || 'Détails Lieu'}
        onBack={handleBack}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text style={styles.placeholderText}>
            Détails du lieu {params?.placeId}
          </Text>
          <Text style={styles.placeholderSubtext}>
            Cette page sera développée avec les détails complets du lieu touristique
          </Text>
        </View>
      </ScrollView>
    </ScreenBackground>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing['4xl'],
  },
  content: {
    padding: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 400,
  },
  placeholderText: {
    ...typography.styles.bodyMedium18,
    color: colors.text.primary,
    marginBottom: spacing.base,
  },
  placeholderSubtext: {
    ...typography.styles.bodyRegular16,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});

