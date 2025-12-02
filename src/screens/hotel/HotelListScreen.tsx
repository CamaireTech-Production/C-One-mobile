/**
 * HotelListScreen
 * List screen displaying all hotels filtered by country/city
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
  HotelCard,
} from '../../components/common';
import { colors, spacing, typography } from '../../theme';
import { useHotelData } from '../../hooks';

interface HotelListScreenParams {
  countryId: string;
  countryName: string;
  cityId?: string;
  cityName?: string;
}

type HotelListScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'HotelList'>;

export const HotelListScreen: React.FC = () => {
  const { t } = useTranslation();
  const route = useRoute();
  const navigation = useNavigation<HotelListScreenNavigationProp>();
  const params = route.params as HotelListScreenParams;

  const { data: hotels, loading } = useHotelData(params.countryId, params.cityId);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleHotelPress = (hotelId: string, hotelTitle: string) => {
    navigation.navigate('HotelDetail', {
      hotelId,
      title: hotelTitle,
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
            <Text style={styles.loadingText}>Chargement des hôtels...</Text>
          ) : hotels.length > 0 ? (
            <View style={styles.cardsList}>
              {hotels.map((hotel) => (
                <HotelCard
                  key={hotel.id}
                  id={hotel.id}
                  title={hotel.title}
                  imageUrl={hotel.imageUrl}
                  rating={hotel.rating}
                  pricePerNight={hotel.pricePerNight}
                  currency={hotel.currency}
                  distance={hotel.distance}
                  distanceUnit={hotel.distanceUnit}
                  duration={hotel.duration}
                  address={hotel.address}
                  onPress={() => handleHotelPress(hotel.id, hotel.title)}
                  style={styles.hotelCard}
                />
              ))}
            </View>
          ) : (
            <Text style={styles.emptyText}>Aucun hôtel disponible</Text>
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
  hotelCard: {
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

