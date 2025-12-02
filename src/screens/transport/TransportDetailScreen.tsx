/**
 * TransportDetailScreen
 * Detail screen for a specific transport option
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

interface TransportDetailScreenParams {
  transportId: string;
  type: 'plane' | 'train' | 'car';
  title: string;
}

type TransportDetailScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'TransportDetail'>;

export const TransportDetailScreen: React.FC = () => {
  const { t } = useTranslation();
  const route = useRoute();
  const navigation = useNavigation<TransportDetailScreenNavigationProp>();
  const params = route.params as TransportDetailScreenParams;

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <ScreenBackground backgroundColor={colors.background.primary}>
      <DetailHeader
        title={params?.title || 'Détails Transport'}
        onBack={handleBack}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text style={styles.placeholderText}>
            Détails du transport {params?.transportId}
          </Text>
          <Text style={styles.placeholderSubtext}>
            Cette page sera développée avec les détails complets du transport
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

