/**
 * TransportListScreen
 * List screen displaying all transport options filtered by country/city
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
  TransportCard,
} from '../../components/common';
import { colors, spacing, typography } from '../../theme';
import { useTransportData } from '../../hooks';

interface TransportListScreenParams {
  countryId: string;
  countryName: string;
  cityId?: string;
  cityName?: string;
}

type TransportListScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'TransportList'>;

export const TransportListScreen: React.FC = () => {
  const { t } = useTranslation();
  const route = useRoute();
  const navigation = useNavigation<TransportListScreenNavigationProp>();
  const params = route.params as TransportListScreenParams;

  const { data: transports, loading } = useTransportData(params.countryId, params.cityId);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleTransportPress = (transportId: string, transportType: 'plane' | 'train' | 'car', transportTitle: string) => {
    navigation.navigate('TransportDetail', {
      transportId,
      type: transportType,
      title: transportTitle,
    });
  };

  const title = params.cityName || params.countryName;

  return (
    <ScreenBackground backgroundColor={colors.background.primary}>
      <DetailHeader
        title={title}
        onBack={handleBack}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {loading ? (
            <Text style={styles.loadingText}>Chargement des transports...</Text>
          ) : transports.length > 0 ? (
            <View style={styles.cardsContainer}>
              {transports.map((transport) => (
                <TransportCard
                  key={transport.id}
                  type={transport.type}
                  title={transport.title}
                  description={transport.description}
                  onPress={() => handleTransportPress(transport.id, transport.type, transport.title)}
                  style={styles.card}
                />
              ))}
            </View>
          ) : (
            <Text style={styles.emptyText}>Aucun transport disponible</Text>
          )}
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
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    flexBasis: '48%',
    maxWidth: '48%',
    marginBottom: spacing.base,
  },
  loadingText: {
    ...typography.styles.bodyRegular16,
    color: colors.text.secondary,
    textAlign: 'center',
    padding: spacing.xl,
  },
  emptyText: {
    ...typography.styles.bodyRegular16,
    color: colors.text.secondary,
    textAlign: 'center',
    padding: spacing.xl,
  },
});

