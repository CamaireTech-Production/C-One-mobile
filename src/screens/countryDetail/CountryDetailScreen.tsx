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
  Dimensions,
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
import {
  SkeletonHorizontalCard,
  SkeletonCategoryCard,
  SkeletonText,
  SkeletonCard,
} from '../../components/skeleton';

interface DetailScreenParams {
  id: string;
  title: string;
  imageUrl?: string;
  type: 'country' | 'city';
  countryCode: string;
  cityId?: string;
}

type DetailScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList>;

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
    navigation.navigate('HotelList', {
      countryId: countryCode,
      countryName: params?.title || '',
      cityId: cityId,
      cityName: isCity ? params?.title : undefined,
    });
  };

  const handleSeeAllTourism = () => {
    navigation.navigate('TourismList', {
      countryId: countryCode,
      countryName: params?.title || '',
      cityId: cityId,
      cityName: isCity ? params?.title : undefined,
    });
  };

  const handleSeeAllRestaurants = () => {
    navigation.navigate('RestaurantList', {
      countryId: countryCode,
      countryName: params?.title || '',
      cityId: cityId,
      cityName: isCity ? params?.title : undefined,
    });
  };

  const handleTransportPress = (transportId: string, transportType: 'plane' | 'train' | 'car', transportTitle: string) => {
    navigation.navigate('TransportDetail', {
      transportId,
      type: transportType,
      title: transportTitle,
    });
  };

  const handleHotelPress = (hotelId: string, hotelTitle: string) => {
    navigation.navigate('HotelDetail', {
      hotelId,
      title: hotelTitle,
    });
  };

  const handleTourismPlacePress = (placeId: string, placeTitle: string) => {
    navigation.navigate('TourismDetail', {
      placeId,
      title: placeTitle,
    });
  };

  const handleRestaurantPress = (restaurantId: string, restaurantTitle: string) => {
    navigation.navigate('RestaurantDetail', {
      restaurantId,
      title: restaurantTitle,
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'transport':
        return (
          <View style={styles.cardsContainer}>
            {transportsLoading ? (
              <>
                {[1, 2, 3].map((index) => (
                  <SkeletonCard
                    key={`transport-skeleton-${index}`}
                    width="48%"
                    height={180}
                    showImage={false}
                    lines={2}
                    style={styles.card}
                  />
                ))}
              </>
            ) : transports.length > 0 ? (
              transports.map((transport) => (
              <TransportCard
                  key={transport.id}
                type={transport.type}
                title={transport.title}
                description={transport.description}
                  onPress={() => handleTransportPress(transport.id, transport.type, transport.title)}
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
            {hotelsLoading ? (
              <>
                {/* Skeleton for Hotels populaires */}
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <SkeletonText width={150} height={20} />
                    <SkeletonText width={60} height={16} />
                  </View>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.horizontalCardsList}
                  >
                    {[1, 2, 3].map((index) => (
                      <SkeletonHorizontalCard
                        key={`hotel-skeleton-${index}`}
                        style={styles.hotelCardHorizontal}
                      />
                    ))}
                  </ScrollView>
                </View>

                {/* Skeleton for Autres */}
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <SkeletonText width={80} height={20} />
                    <SkeletonText width={60} height={16} />
                  </View>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.horizontalCardsList}
                  >
                    {[1, 2].map((index) => (
                      <SkeletonHorizontalCard
                        key={`other-hotel-skeleton-${index}`}
                        style={styles.hotelCardHorizontal}
                      />
                    ))}
                  </ScrollView>
                </View>
              </>
            ) : (
              <>
                {/* Hotels populaires */}
                {popularHotels.length > 0 && (
                  <View style={styles.section}>
                    {renderSectionHeader('Hotels populaires', handleSeeAllHotels)}
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={styles.horizontalCardsList}
                    >
                      {popularHotels.map((hotel) => (
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
                          style={styles.hotelCardHorizontal}
                        />
                      ))}
                    </ScrollView>
                  </View>
                )}

                {/* Autres hotels */}
                {otherHotels.length > 0 && (
                  <View style={styles.section}>
                    {renderSectionHeader('Autres', handleSeeAllHotels)}
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={styles.horizontalCardsList}
                    >
                      {otherHotels.map((hotel) => (
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
                          style={styles.hotelCardHorizontal}
                        />
                      ))}
                    </ScrollView>
                  </View>
                )}

                {!hotelsLoading && hotels.length === 0 && (
                  <Text style={styles.emptyText}>Aucun hôtel disponible</Text>
                )}
              </>
            )}
          </View>
        );

      case 'tourism':
        const popularPlaces = tourismPlaces.filter((p) => p.category === 'popular');
        const otherPlaces = tourismPlaces.filter((p) => p.category === 'other' || !p.category);

        return (
          <View style={styles.tabContent}>
            {tourismLoading ? (
              <>
                {/* Skeleton for Catégories */}
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <SkeletonText width={120} height={20} />
                    <SkeletonText width={20} height={16} />
                  </View>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.horizontalCardsList}
                  >
                    {[1, 2].map((index) => (
                      <SkeletonCategoryCard
                        key={`tourism-category-skeleton-${index}`}
                        showDescription
                        style={styles.categoryCardHorizontal}
                      />
                    ))}
                  </ScrollView>
                </View>

                {/* Skeleton for Places populaires */}
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <SkeletonText width={150} height={20} />
                    <SkeletonText width={60} height={16} />
                  </View>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.horizontalCardsList}
                  >
                    {[1, 2, 3].map((index) => (
                      <SkeletonHorizontalCard
                        key={`tourism-place-skeleton-${index}`}
                        style={styles.placeCardHorizontal}
                      />
                    ))}
                  </ScrollView>
                </View>
              </>
            ) : (
              <>
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
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={styles.horizontalCardsList}
                    >
                      {tourismCategories.map((category) => (
                        <TourismCategoryCard
                          key={category.id}
                          id={category.id}
                          title={category.title}
                          description={category.description}
                          imageUrl={category.imageUrl}
                          style={styles.categoryCardHorizontal}
                        />
                      ))}
                    </ScrollView>
                  </View>
                )}

                {/* Places populaires */}
                {popularPlaces.length > 0 && (
                  <View style={styles.section}>
                    {renderSectionHeader('Places populaires', handleSeeAllTourism)}
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={styles.horizontalCardsList}
                    >
                      {popularPlaces.map((place) => (
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
                          onPress={() => handleTourismPlacePress(place.id, place.title)}
                          style={styles.placeCardHorizontal}
                        />
                      ))}
                    </ScrollView>
                  </View>
                )}

                {!tourismLoading && tourismPlaces.length === 0 && (
                  <Text style={styles.emptyText}>Aucun lieu touristique disponible</Text>
                )}
              </>
            )}
          </View>
        );

      case 'restaurant':
        const popularRestaurants = restaurants.filter((r) => r.category === 'popular');
        const otherRestaurants = restaurants.filter((r) => r.category === 'other' || !r.category);

        return (
          <View style={styles.tabContent}>
            {restaurantsLoading ? (
              <>
                {/* Skeleton for Catégories */}
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <SkeletonText width={120} height={20} />
                    <SkeletonText width={20} height={16} />
                  </View>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.horizontalCardsList}
                  >
                    {[1, 2].map((index) => (
                      <SkeletonCategoryCard
                        key={`restaurant-category-skeleton-${index}`}
                        style={styles.categoryCardHorizontal}
                      />
                    ))}
                  </ScrollView>
                </View>

                {/* Skeleton for Plats Populaires */}
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <SkeletonText width={150} height={20} />
                    <SkeletonText width={60} height={16} />
                  </View>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.horizontalCardsList}
                  >
                    {[1, 2, 3].map((index) => (
                      <SkeletonHorizontalCard
                        key={`restaurant-skeleton-${index}`}
                        style={styles.restaurantCardHorizontal}
                      />
                    ))}
                  </ScrollView>
                </View>
              </>
            ) : (
              <>
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
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={styles.horizontalCardsList}
                    >
                      {restaurantCategories.map((category) => (
                        <RestaurantCategoryCard
                          key={category.id}
                          id={category.id}
                          title={category.title}
                          imageUrl={category.imageUrl}
                          style={styles.categoryCardHorizontal}
                        />
                      ))}
                    </ScrollView>
                  </View>
                )}

                {/* Plats Populaires */}
                {popularRestaurants.length > 0 && (
                  <View style={styles.section}>
                    {renderSectionHeader('Plats Populaires', handleSeeAllRestaurants)}
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={styles.horizontalCardsList}
                    >
                      {popularRestaurants.map((restaurant) => (
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
                          style={styles.restaurantCardHorizontal}
                        />
                      ))}
                    </ScrollView>
                  </View>
                )}

                {!restaurantsLoading && restaurants.length === 0 && (
                  <Text style={styles.emptyText}>Aucun restaurant disponible</Text>
                )}
              </>
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
  horizontalCardsList: {
    paddingRight: spacing.lg,
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
  hotelCardHorizontal: {
    width: Dimensions.get('window').width * 0.67,
    marginRight: spacing.base,
  },
  categoryCard: {
    marginBottom: spacing.base,
  },
  categoryCardHorizontal: {
    width: Dimensions.get('window').width * 0.67,
    marginRight: spacing.base,
  },
  placeCard: {
    marginBottom: spacing.base,
  },
  placeCardHorizontal: {
    width: Dimensions.get('window').width * 0.67,
    marginRight: spacing.base,
  },
  restaurantCard: {
    marginBottom: spacing.base,
  },
  restaurantCardHorizontal: {
    width: Dimensions.get('window').width * 0.67,
    marginRight: spacing.base,
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

