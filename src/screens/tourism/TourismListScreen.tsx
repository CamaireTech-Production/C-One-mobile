/**
 * TourismListScreen
 * List screen displaying all tourism places filtered by country/city
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
  BookableCard,
} from '../../components/common';
import { colors, spacing, typography } from '../../theme';
import { useTourismData } from '../../hooks';

interface TourismListScreenParams {
  countryId: string;
  countryName: string;
  cityId?: string;
  cityName?: string;
  categoryId?: string;
}

type TourismListScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'TourismList'>;

export const TourismListScreen: React.FC = () => {
  const { t } = useTranslation();
  const route = useRoute();
  const navigation = useNavigation<TourismListScreenNavigationProp>();
  const params = route.params as TourismListScreenParams;

  const { places, loading } = useTourismData(params.countryId, params.cityId);

  // Filter by category if provided
  const filteredPlaces = params.categoryId
    ? places.filter((place) => place.categoryId === params.categoryId)
    : places;

  const handleBack = () => {
    navigation.goBack();
  };

  const handlePlacePress = (placeId: string, placeTitle: string) => {
    navigation.navigate('TourismDetail', {
      placeId,
      title: placeTitle,
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
            <Text style={styles.loadingText}>Chargement des lieux touristiques...</Text>
          ) : filteredPlaces.length > 0 ? (
            <View style={styles.cardsList}>
              {filteredPlaces.map((place) => (
                <BookableCard
                  key={place.id}
                  id={place.id}
                  title={place.title}
                  imageUrl={place.imageUrl}
                  price={place.startingPrice || 0}
                  currency={place.currency}
                  priceUnit=""
                  distance={place.distance}
                  distanceUnit={place.distanceUnit}
                  duration={place.duration}
                  address={place.address}
                  onPress={() => handlePlacePress(place.id, place.title)}
                  variant="tourism"
                  style={styles.placeCard}
                />
              ))}
            </View>
          ) : (
            <Text style={styles.emptyText}>Aucun lieu touristique disponible</Text>
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
  cardsList: {
    gap: spacing.base,
  },
  placeCard: {
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

