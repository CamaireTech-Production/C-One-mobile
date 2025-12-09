/**
 * RestaurantListScreen
 * List screen displaying all restaurants filtered by country/city
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
  RestaurantCard,
} from '../../components/common';
import { colors, spacing, typography } from '../../theme';
import { useRestaurantData } from '../../hooks';

interface RestaurantListScreenParams {
  countryId: string;
  countryName: string;
  cityId?: string;
  cityName?: string;
  categoryId?: string;
}

type RestaurantListScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'RestaurantList'>;

export const RestaurantListScreen: React.FC = () => {
  const { t } = useTranslation();
  const route = useRoute();
  const navigation = useNavigation<RestaurantListScreenNavigationProp>();
  const params = route.params as RestaurantListScreenParams;

  const { restaurants, loading } = useRestaurantData(params.countryId, params.cityId);

  // Filter by category if provided
  const filteredRestaurants = params.categoryId
    ? restaurants.filter((restaurant) => restaurant.categoryId === params.categoryId)
    : restaurants;

  const handleBack = () => {
    navigation.goBack();
  };

  const handleRestaurantPress = (restaurantId: string, restaurantTitle: string) => {
    navigation.navigate('RestaurantDetail', {
      restaurantId,
      title: restaurantTitle,
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
            <Text style={styles.loadingText}>Chargement des restaurants...</Text>
          ) : filteredRestaurants.length > 0 ? (
            <View style={styles.cardsList}>
              {filteredRestaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  id={restaurant.id}
                  title={restaurant.title}
                  subtitle={restaurant.subtitle}
                  imageUrl={restaurant.imageUrl}
                  rating={restaurant.rating}
                  pricePerTable={restaurant.pricePerTable}
                  currency={restaurant.currency}
                  distance={restaurant.distance}
                  distanceUnit={restaurant.distanceUnit}
                  duration={restaurant.duration}
                  address={restaurant.address}
                  onPress={() => handleRestaurantPress(restaurant.id, restaurant.title)}
                  style={styles.restaurantCard}
                />
              ))}
            </View>
          ) : (
            <Text style={styles.emptyText}>Aucun restaurant disponible</Text>
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
  restaurantCard: {
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

