/**
 * DetailScreen
 * Detail screen for a country or city showing carousel, tabs, and transport cards
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../../types';

import {
  ScreenBackground,
  DetailHeader,
  DetailCarousel,
  DetailTabs,
  TransportCard,
  HotelCard,
  TourismCategoryCard,
  TourismPlaceCard,
  RestaurantCategoryCard,
  RestaurantCard,
  Icon,
  type DetailTabKey,
  type TransportType,
  type CarouselSlide,
} from '../../components/common';
import { colors, spacing, typography } from '../../theme';
import { images } from '../../config';
import {
  useHotelData,
  useTourismData,
  useRestaurantData,
  useTransportData,
} from '../../hooks';

interface DetailScreenParams {
  id: string;
  title: string;
  imageUrl?: string;
  type: 'country' | 'city';
  countryCode: string;
  cityId?: string;
}

type DetailScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'Detail'>;

export const DetailScreen: React.FC = () => {
  const { t } = useTranslation();
  const route = useRoute();
  const navigation = useNavigation<DetailScreenNavigationProp>();
  const params = route.params as DetailScreenParams;

  const [activeTab, setActiveTab] = useState<DetailTabKey>('transport');

  // Extract context for filtering
  const isCity = params?.type === 'city';
  const countryCode = params?.countryCode || '';
  const cityId = params?.cityId;

  // Fetch data using hooks
  const { data: hotels, loading: hotelsLoading } = useHotelData(countryCode, cityId);
  const { categories: tourismCategories, places: tourismPlaces, loading: tourismLoading } = useTourismData(countryCode, cityId);
  const { categories: restaurantCategories, restaurants, loading: restaurantsLoading } = useRestaurantData(countryCode, cityId);
  const { data: transports, loading: transportsLoading } = useTransportData(countryCode, cityId);

  // Mock carousel slides - will be replaced with real data
  const carouselSlides: CarouselSlide[] = [
    {
      image: images.detailBackground,
      description: 'Lorem ipsum dolor sit amet consectetur. Eget euismod volutpat augue consequat.',
      buttonLabel: "Explorer l'offre",
      onButtonPress: () => {
        // Handle button press
      },
    },
    {
      image: images.detailBackground,
      description: 'Lorem ipsum dolor sit amet consectetur. Eget euismod volutpat augue consequat.',
      buttonLabel: "Explorer l'offre",
      onButtonPress: () => {
        // Handle button press
      },
    },
    {
      image: images.detailBackground,
      description: 'Lorem ipsum dolor sit amet consectetur. Eget euismod volutpat augue consequat.',
      buttonLabel: "Explorer l'offre",
      onButtonPress: () => {
        // Handle button press
      },
    },
  ];

  // Helper function to render section header with "Voir tout" link
  const renderSectionHeader = (title: string, onSeeAll?: () => void) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {onSeeAll && (
        <TouchableOpacity
          onPress={onSeeAll}
          activeOpacity={0.7}
          style={styles.seeAllButton}
        >
          <Text style={styles.seeAllText}>Voir tout</Text>
          <Icon
            name="chevron-forward"
            size={16}
            color={colors.primary.normal}
            family="ionicons"
          />
        </TouchableOpacity>
      )}
    </View>
  );

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSeeAllHotels = () => {
    // TODO: Navigate to HotelListScreen (Phase 6)
    console.log('Navigate to HotelListScreen');
  };

  const handleSeeAllTourism = () => {
    // TODO: Navigate to TourismListScreen (Phase 6)
    console.log('Navigate to TourismListScreen');
  };

  const handleSeeAllRestaurants = () => {
    // TODO: Navigate to RestaurantListScreen (Phase 6)
    console.log('Navigate to RestaurantListScreen');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'transport':
        return (
          <View style={styles.cardsContainer}>
            {transportsLoading ? (
              <Text style={styles.loadingText}>Chargement...</Text>
            ) : transports.length > 0 ? (
              transports.map((transport) => (
                <TransportCard
                  key={transport.id}
                  type={transport.type}
                  title={transport.title}
                  description={transport.description}
                  style={styles.card}
                />
              ))
            ) : (
              <Text style={styles.emptyText}>Aucun transport disponible</Text>
            )}
          </View>
        );

      case 'hotel':
        const popularHotels = hotels.filter((h) => h.category === 'popular');
        const otherHotels = hotels.filter((h) => h.category === 'other' || !h.category);

        return (
          <View style={styles.tabContent}>
            {/* Hotels populaires */}
            {popularHotels.length > 0 && (
              <View style={styles.section}>
                {renderSectionHeader('Hotels populaires', handleSeeAllHotels)}
                <View style={styles.cardsList}>
                  {popularHotels.slice(0, 2).map((hotel) => (
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
                      style={styles.hotelCard}
                    />
                  ))}
                </View>
              </View>
            )}

            {/* Autres hotels */}
            {otherHotels.length > 0 && (
              <View style={styles.section}>
                {renderSectionHeader('Autres', handleSeeAllHotels)}
                <View style={styles.cardsList}>
                  {otherHotels.slice(0, 2).map((hotel) => (
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
                      style={styles.hotelCard}
                    />
                  ))}
                </View>
              </View>
            )}

            {hotelsLoading && (
              <Text style={styles.loadingText}>Chargement des hôtels...</Text>
            )}

            {!hotelsLoading && hotels.length === 0 && (
              <Text style={styles.emptyText}>Aucun hôtel disponible</Text>
            )}
          </View>
        );

      case 'tourism':
        const popularPlaces = tourismPlaces.filter((p) => p.category === 'popular');
        const otherPlaces = tourismPlaces.filter((p) => p.category === 'other' || !p.category);

        return (
          <View style={styles.tabContent}>
            {/* Catégories */}
            {tourismCategories.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Catégories</Text>
                  <Icon
                    name="chevron-forward"
                    size={16}
                    color={colors.text.secondary}
                    family="ionicons"
                  />
                </View>
                <View style={styles.cardsList}>
                  {tourismCategories.map((category) => (
                    <TourismCategoryCard
                      key={category.id}
                      id={category.id}
                      title={category.title}
                      description={category.description}
                      imageUrl={category.imageUrl}
                      style={styles.categoryCard}
                    />
                  ))}
                </View>
              </View>
            )}

            {/* Places populaires */}
            {popularPlaces.length > 0 && (
              <View style={styles.section}>
                {renderSectionHeader('Places populaires', handleSeeAllTourism)}
                <View style={styles.cardsList}>
                  {popularPlaces.slice(0, 2).map((place) => (
                    <TourismPlaceCard
                      key={place.id}
                      id={place.id}
                      title={place.title}
                      imageUrl={place.imageUrl}
                      startingPrice={place.startingPrice}
                      currency={place.currency}
                      distance={place.distance}
                      distanceUnit={place.distanceUnit}
                      duration={place.duration}
                      address={place.address}
                      style={styles.placeCard}
                    />
                  ))}
                </View>
              </View>
            )}

            {tourismLoading && (
              <Text style={styles.loadingText}>Chargement du tourisme...</Text>
            )}

            {!tourismLoading && tourismPlaces.length === 0 && (
              <Text style={styles.emptyText}>Aucun lieu touristique disponible</Text>
            )}
          </View>
        );

      case 'restaurant':
        const popularRestaurants = restaurants.filter((r) => r.category === 'popular');
        const otherRestaurants = restaurants.filter((r) => r.category === 'other' || !r.category);

        return (
          <View style={styles.tabContent}>
            {/* Catégories */}
            {restaurantCategories.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Catégories</Text>
                  <Icon
                    name="chevron-forward"
                    size={16}
                    color={colors.text.secondary}
                    family="ionicons"
                  />
                </View>
                <View style={styles.cardsList}>
                  {restaurantCategories.map((category) => (
                    <RestaurantCategoryCard
                      key={category.id}
                      id={category.id}
                      title={category.title}
                      imageUrl={category.imageUrl}
                      style={styles.categoryCard}
                    />
                  ))}
                </View>
              </View>
            )}

            {/* Plats Populaires */}
            {popularRestaurants.length > 0 && (
              <View style={styles.section}>
                {renderSectionHeader('Plats Populaires', handleSeeAllRestaurants)}
                <View style={styles.cardsList}>
                  {popularRestaurants.slice(0, 2).map((restaurant) => (
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
                      style={styles.restaurantCard}
                    />
                  ))}
                </View>
              </View>
            )}

            {restaurantsLoading && (
              <Text style={styles.loadingText}>Chargement des restaurants...</Text>
            )}

            {!restaurantsLoading && restaurants.length === 0 && (
              <Text style={styles.emptyText}>Aucun restaurant disponible</Text>
            )}
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <ScreenBackground backgroundColor={colors.background.primary}>
      <DetailHeader
        title={params?.title || 'Détails'}
        onBack={handleBack}
        onRightIconPress={() => {
          // Handle right icon press
        }}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <DetailCarousel slides={carouselSlides} />

        <DetailTabs
          value={activeTab}
          onChange={setActiveTab}
          style={styles.tabs}
        />

        <View style={styles.content}>
          {renderContent()}
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
  tabs: {
    // marginTop: spacing.sm,
  },
  content: {
    padding: spacing.lg,
  },
  tabContent: {
    gap: spacing.xl,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.base,
  },
  sectionTitle: {
    ...typography.styles.bodyMedium18,
    color: colors.text.primary,
    fontWeight: '600',
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  seeAllText: {
    ...typography.styles.bodyRegular14,
    color: colors.primary.normal,
  },
  cardsList: {
    gap: spacing.base,
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
  hotelCard: {
    marginBottom: spacing.base,
  },
  categoryCard: {
    marginBottom: spacing.base,
  },
  placeCard: {
    marginBottom: spacing.base,
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

