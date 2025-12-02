/**
 * HotelDetailScreen
 * Detail screen for a specific hotel
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

interface HotelDetailScreenParams {
  hotelId: string;
  title: string;
}

type HotelDetailScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'HotelDetail'>;

export const HotelDetailScreen: React.FC = () => {
  const { t } = useTranslation();
  const route = useRoute();
  const navigation = useNavigation<HotelDetailScreenNavigationProp>();
  const params = route.params as HotelDetailScreenParams;

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <ScreenBackground backgroundColor={colors.background.primary}>
      <DetailHeader
        title={params?.title || 'Détails Hôtel'}
        onBack={handleBack}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text style={styles.placeholderText}>
            Détails de l'hôtel {params?.hotelId}
          </Text>
          <Text style={styles.placeholderSubtext}>
            Cette page sera développée avec les détails complets de l'hôtel
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

