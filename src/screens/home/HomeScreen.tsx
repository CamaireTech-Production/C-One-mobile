/**
 * Home Screen
 * Displays travel content leveraging the local data provider until backend is ready.
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
  AppState,
  AppStateStatus,
  Animated as RNAnimated,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../../types';

import {
  ScreenBackground,
  Tabs,
  Icon,
  SearchBar,
  GeolocationConfirmationModal,
  GeolocationAlertModal,
  type GeolocationAlertType,
} from '../../components/common';
import { HomeCard, SkeletonHorizontalCards } from '../../components/home';
import { colors, typography, spacing } from '../../theme';
import { useHomeData, useGeolocation } from '../../hooks';
import { Image } from '../../components/media';
import { images } from '../../config';
import { SkeletonBlock } from '../../components/skeleton';
import { HomeCity } from '../../data/data';
import { useAuth } from '../../services/auth/authContext';

type HomeScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'HomeMain'>;

export const HomeScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { data, loading } = useHomeData();
  const { user } = useAuth();

  const [countryTab, setCountryTab] = useState('others');
  
  // Geolocation state
  const {
    status: geolocationStatus,
    location: geolocationLocation,
    error: geolocationError,
    getCurrentLocation,
    clearError: clearGeolocationError,
    recheckPermissions,
  } = useGeolocation({ useCache: true });

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertType, setAlertType] = useState<GeolocationAlertType>('unknown');
  const [filteredCities, setFilteredCities] = useState<HomeCity[]>([]);
  const [hasRequestedLocation, setHasRequestedLocation] = useState(false);
  const [hasShownConfirmationForCurrentLocation, setHasShownConfirmationForCurrentLocation] = useState(false);

  // Scroll animation for sticky search bar
  const scrollY = useRef(new Animated.Value(0)).current;
  const HEADER_HEIGHT = 120; // Approximate height of header section
  const SEARCH_STICKY_OFFSET = HEADER_HEIGHT; // When search bar should stick

  // Mapping country IDs to ISO country codes (temporary - should be in data.ts)
  const getCountryCode = (countryId: string): string => {
    const countryCodeMap: Record<string, string> = {
      'usa': 'US',
      'canada': 'CA',
      'france': 'FR',
      'uk': 'GB',
      'germany': 'DE',
      'italy': 'IT',
      'spain': 'ES',
      'japan': 'JP',
      'australia': 'AU',
    };
    return countryCodeMap[countryId] || countryId.toUpperCase();
  };

  const handleCountryPress = (countryId: string, countryName: string, countryImageUrl?: string) => {
    navigation.navigate('Detail', {
      id: countryId,
      title: countryName,
      imageUrl: countryImageUrl,
      type: 'country',
      countryCode: getCountryCode(countryId),
    });
  };

  const handleCityPress = (cityId: string, cityName: string, cityImageUrl?: string, cityCountryCode?: string) => {
    navigation.navigate('Detail', {
      id: cityId,
      title: cityName,
      imageUrl: cityImageUrl,
      type: 'city',
      countryCode: cityCountryCode || '',
      cityId: cityId,
    });
  };

  // Filter cities by country code
  const filterCitiesByCountry = useCallback((countryCode?: string) => {
    if (!data || !countryCode) {
      console.log('🏠 [HomeScreen] No data or country code, showing all cities');
      setFilteredCities(data?.cities || []);
      return;
    }

    console.log('🏠 [HomeScreen] Filtering cities. Total cities:', data.cities.length);
    console.log('🏠 [HomeScreen] Looking for country code:', countryCode);
    
    const filtered = data.cities.filter(
      (city) => city.countryCode?.toUpperCase() === countryCode.toUpperCase()
    );
    
    console.log('🏠 [HomeScreen] Filtered cities result:', {
      filteredCount: filtered.length,
      filteredCities: filtered.map(c => ({
        id: c.id,
        labelKey: c.labelKey,
        countryCode: c.countryCode,
      })),
      allCitiesWithCodes: data.cities.map(c => ({
        id: c.id,
        countryCode: c.countryCode,
      })),
    });
    
    setFilteredCities(filtered.length > 0 ? filtered : data.cities);
    
    if (filtered.length === 0) {
      console.warn('🏠 [HomeScreen] No cities found for country code, showing all cities');
    }
  }, [data]);

  // Handle geolocation errors
  const handleGeolocationError = useCallback(() => {
    let alertType: GeolocationAlertType = 'unknown';
    
    // Determine alert type based on status and error message
    if (geolocationStatus === 'denied') {
      alertType = 'permissionDenied';
    } else if (geolocationError) {
      if (geolocationError.includes('refusé') || geolocationError.includes('refusée')) {
        alertType = 'permissionDenied';
      } else if (geolocationError.includes('désactivés') || geolocationError.includes('désactivé')) {
        alertType = 'locationDisabled';
      } else if (geolocationError.includes('réseau') || geolocationError.includes('internet')) {
        alertType = 'networkError';
      } else if (geolocationError.includes('Timeout') || geolocationError.includes('trop de temps')) {
        alertType = 'timeout';
      }
    } else if (geolocationStatus === 'error') {
      alertType = 'unknown';
    }
    
    setAlertType(alertType);
    setShowAlertModal(true);
  }, [geolocationStatus, geolocationError]);

  // Request location when "position" tab is selected
  const handleRequestLocation = useCallback(async () => {
    console.log('🏠 [HomeScreen] Requesting location...');
    setHasRequestedLocation(true);
    
    try {
      const location = await getCurrentLocation();
      
      console.log('🏠 [HomeScreen] Location received:', {
        hasLocation: !!location,
        countryCode: location?.countryCode,
        countryName: location?.countryName,
        city: location?.city,
        coordinates: location ? {
          latitude: location.latitude,
          longitude: location.longitude,
        } : null,
      });
      
      if (location && location.countryCode) {
        console.log('🏠 [HomeScreen] Filtering cities for country code:', location.countryCode);
        // Filter cities based on country code
        filterCitiesByCountry(location.countryCode);
        
        // Show confirmation modal if we have a city name and haven't shown it yet
        if (location.city && !hasShownConfirmationForCurrentLocation) {
          console.log('🏠 [HomeScreen] Showing confirmation modal for city:', location.city);
          setShowConfirmationModal(true);
          setHasShownConfirmationForCurrentLocation(true);
        }
      } else {
        console.warn('🏠 [HomeScreen] No location or country code found:', {
          hasLocation: !!location,
          hasCountryCode: !!location?.countryCode,
        });
        // No location retrieved - check if it's an error or just no data
        // Only show alert if there's an actual error status and no cached location
        if ((geolocationStatus === 'denied' || geolocationStatus === 'error') && !geolocationLocation) {
          handleGeolocationError();
        }
      }
    } catch (error) {
      console.error('🏠 [HomeScreen] Error requesting location:', error);
      // Only show error if we don't have a cached location
      if (!geolocationLocation) {
        handleGeolocationError();
      }
    }
  }, [getCurrentLocation, filterCitiesByCountry, hasShownConfirmationForCurrentLocation, geolocationStatus, geolocationLocation, handleGeolocationError]);

  // Handle tab change
  const handleTabChange = (tab: string) => {
    setCountryTab(tab);
    
    // When switching to "position" tab
    if (tab === 'position') {
      // If we already have a location (from cache), show confirmation modal
      if (geolocationLocation?.city && !hasShownConfirmationForCurrentLocation) {
        filterCitiesByCountry(geolocationLocation.countryCode);
        setShowConfirmationModal(true);
        setHasShownConfirmationForCurrentLocation(true);
      } else if (!hasRequestedLocation) {
        // Otherwise, request location
        handleRequestLocation();
      }
    } else {
      // Reset confirmation flag when switching away from position tab
      setHasShownConfirmationForCurrentLocation(false);
    }
  };

  // Handle confirmation modal actions
  const handleConfirmLocation = () => {
    setShowConfirmationModal(false);
    // Location is already saved in cache, cities are already filtered
    setHasShownConfirmationForCurrentLocation(true);
  };

  const handleCancelLocation = () => {
    setShowConfirmationModal(false);
    // User rejected, show all cities
    setFilteredCities(data?.cities || []);
    setHasShownConfirmationForCurrentLocation(true);
  };

  // Handle alert modal close
  const handleAlertClose = () => {
    setShowAlertModal(false);
    clearGeolocationError();
  };

  // Initialize cities when data is loaded
  useEffect(() => {
    if (data) {
      // If we have a cached location, filter cities immediately
      if (geolocationLocation?.countryCode) {
        filterCitiesByCountry(geolocationLocation.countryCode);
      } else {
        setFilteredCities(data.cities);
      }
    }
  }, [data, geolocationLocation, filterCitiesByCountry]);

  // Handle geolocation status changes - only show alert if we don't have a valid location
  useEffect(() => {
    // Only show alert modal if:
    // 1. We have requested location
    // 2. Status is error or denied
    // 3. We don't have a valid cached location
    if (
      (geolocationStatus === 'error' || geolocationStatus === 'denied') &&
      hasRequestedLocation &&
      !geolocationLocation
    ) {
      handleGeolocationError();
    }
  }, [geolocationStatus, geolocationError, hasRequestedLocation, geolocationLocation, handleGeolocationError]);

  // Reset confirmation flag when location changes (new location detected)
  useEffect(() => {
    if (geolocationLocation?.city) {
      // Reset flag when we get a new location (different from cached one)
      // This allows showing confirmation modal again for new locations
      const locationKey = `${geolocationLocation.latitude}-${geolocationLocation.longitude}`;
      // We'll track this via a ref or state if needed, but for now, 
      // we'll rely on the hasShownConfirmationForCurrentLocation flag
    }
  }, [geolocationLocation]);

  // Re-check permissions when app comes back to foreground
  useEffect(() => {
    const subscription = AppState.addEventListener('change', async (nextAppState: AppStateStatus) => {
      // When app comes back to foreground (from background)
      if (nextAppState === 'active') {
        // Only recheck if we're on the position tab and have an alert modal showing
        if (countryTab === 'position' && showAlertModal) {
          const hasPermission = await recheckPermissions();
          
          if (hasPermission) {
            // Permissions are now granted, hide alert modal and retry location
            setShowAlertModal(false);
            clearGeolocationError();
            setHasRequestedLocation(false);
            setHasShownConfirmationForCurrentLocation(false);
            
            // Small delay to ensure state is updated before retrying
            setTimeout(() => {
              handleRequestLocation();
            }, 100);
          }
        }
      }
    });

    return () => {
      subscription.remove();
    };
  }, [countryTab, showAlertModal, recheckPermissions, clearGeolocationError, handleRequestLocation]);

  // Handle scroll event
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false } // We need to use translateY which requires false
  );

  // Animated value for search bar position
  const searchBarTranslateY = scrollY.interpolate({
    inputRange: [0, SEARCH_STICKY_OFFSET],
    outputRange: [0, -SEARCH_STICKY_OFFSET],
    extrapolate: 'clamp',
  });

  // Animated value for search bar opacity (fade in when sticky)
  const searchBarOpacity = scrollY.interpolate({
    inputRange: [SEARCH_STICKY_OFFSET - 20, SEARCH_STICKY_OFFSET],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <ScreenBackground backgroundColor={colors.background.primary}>
      {/* Fixed Header */}
      <View style={styles.fixedHeader}>
        <View style={styles.header}>
          <View style={styles.headerTextContainer}>
            {loading ? (
              <View style={styles.headerSkeleton}>
                <SkeletonBlock width={140} height={16} />
                <SkeletonBlock width={200} height={28} style={styles.headerSkeletonPrimary} />
              </View>
            ) : (
              <>
                <Text style={styles.headerGreeting}>
                  {t('home.header.greeting')}
                </Text>
                <View style={styles.headerUserContainer}>
                  <Text style={styles.headerUser}>
                    @{user?.name || data?.hero.userName || 'Utilisateur'}
                  </Text>
                  <Text style={styles.headerEmoji}>👋</Text>
                </View>
              </>
            )}
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButtonActive} activeOpacity={0.7}>
              <Icon name="smart-toy" size={20} color={colors.primary.normal} family="material" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Sticky Search Bar (shown when scrolled) */}
      <Animated.View
        style={[
          styles.stickySearchBar,
          {
            transform: [{ translateY: searchBarTranslateY }],
            opacity: searchBarOpacity,
          },
        ]}
        pointerEvents="box-none"
      >
        {!loading && (
          <View style={styles.stickySearchBarContainer}>
            <SearchBar
              placeholder={t('home.search.placeholder')}
              styleConfig={{
                backgroundColor: colors.background.searhbarbg,
                borderColor: colors.primary.light,
                borderWidth: 1,
                borderRadius: 100,
                iconColor: colors.grey.normal,
                iconSize: 20,
                separatorColor: colors.border.light,
                placeholderColor: colors.text.tertiary,
                textColor: colors.text.primary,
                textStyle: typography.styles.bodyRegular16,
                dotColor: colors.text.tertiary,
                dotSize: 4,
                paddingHorizontal: spacing.base,
                paddingVertical: spacing.md,
                gap: spacing.sm,
                minHeight: 56,
              }}
              showSeparator
              showDot
              leftIconName="search"
              leftIconFamily="ionicons"
            />
          </View>
        )}
      </Animated.View>

      <Animated.ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* Spacer for fixed header */}
        <View style={styles.headerSpacer} />

        <View style={styles.sectionSpacing}>
          <Tabs
            options={[
              { 
                key: 'others', 
                label: t('home.tabs.otherCountries'),
                icon: countryTab === 'others' ? (
                  <Icon name="check-circle-outline" size={18} color={colors.primary.normal} family="materialcommunity" />
                ) : (
                  <Icon name="circle-outline" size={18} color={colors.text.secondary} family="materialcommunity" />
                ),
                iconPosition: 'left',
              },
              { 
                key: 'position', 
                label: t('home.tabs.myPosition'),
                icon: countryTab === 'position' ? (
                  <Icon name="check-circle-outline" size={18} color={colors.primary.normal} family="materialcommunity" />
                ) : (
                  <Icon name="circle-outline" size={18} color={colors.text.secondary} family="materialcommunity" />
                ),
                iconPosition: 'left',
              },
            ]}
            value={countryTab}
            onChange={handleTabChange}
            variant="underline"
            gap={spacing.xs}
            activeTabStyle={styles.activeTab}
            inactiveTabStyle={styles.inactiveTab}
            activeTextStyle={styles.activeTabText}
            inactiveTextStyle={styles.inactiveTabText}
          />
        </View>

        {/* World Map Section with Location Animation */}
        <WorldMapSection loading={loading} />

        {/* Search Section */}
        <View style={styles.searchSection}>
          {loading ? (
            <SkeletonBlock width="100%" height={56} borderRadius={32} />
          ) : (
            <SearchBar
              placeholder={t('home.search.placeholder')}
              styleConfig={{
                backgroundColor: colors.background.searhbarbg,
                borderColor: colors.primary.light,
                borderWidth: 1,
                borderRadius: 100,
                iconColor: colors.grey.normal,
                iconSize: 20,
                separatorColor: colors.border.light,
                placeholderColor: colors.text.tertiary,
                textColor: colors.text.primary,
                textStyle: typography.styles.bodyRegular16,
                dotColor: colors.text.tertiary,
                dotSize: 4,
                paddingHorizontal: spacing.base,
                paddingVertical: spacing.md,
                gap: spacing.sm,
                minHeight: 56,
              }}
              showSeparator
              showDot
              leftIconName="search"
              leftIconFamily="ionicons"
            />
          )}
        </View>

        {countryTab === 'others' && (
          <Section
            title={t('home.sections.countries')}
            loading={loading}
            skeleton={<SkeletonHorizontalCards />}
            showChevron
          >
            <HorizontalCards>
              {data?.countries.map((country) => (
                <HomeCard
                  key={country.id}
                  type="country"
                  title={t(country.labelKey)}
                  imageUrl={country.imageUrl}
                  onPress={() => handleCountryPress(country.id, t(country.labelKey), country.imageUrl)}
                />
              ))}
            </HorizontalCards>
          </Section>
        )}

        {countryTab === 'position' && (
          <Section
            title={t('home.sections.cities')}
            loading={loading || (geolocationStatus === 'requesting' && hasRequestedLocation)}
            skeleton={<SkeletonHorizontalCards />}
            showChevron
          >
            <HorizontalCards>
              {(filteredCities.length > 0 ? filteredCities : data?.cities || []).map((city) => (
                <HomeCard
                  key={city.id}
                  type="city"
                  title={t(city.labelKey)}
                  imageUrl={city.imageUrl}
                  onPress={() => handleCityPress(city.id, t(city.labelKey), city.imageUrl, city.countryCode)}
                />
              ))}
            </HorizontalCards>
          </Section>
        )}

        {/* Geolocation Modals */}
        <GeolocationConfirmationModal
          visible={showConfirmationModal}
          cityName={geolocationLocation?.city || t('home.sections.cities')}
          onConfirm={handleConfirmLocation}
          onCancel={handleCancelLocation}
          onClose={handleCancelLocation}
        />

        <GeolocationAlertModal
          visible={showAlertModal}
          alertType={alertType}
          onClose={handleAlertClose}
        />
      </Animated.ScrollView>
    </ScreenBackground>
  );
};


interface SectionProps {
  title: string;
  children: React.ReactNode;
  loading: boolean;
  skeleton: React.ReactNode;
  showChevron?: boolean;
  onChevronPress?: () => void;
}

const Section: React.FC<SectionProps> = ({
  title,
  children,
  loading,
  skeleton,
  showChevron = false,
  onChevronPress,
}) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {showChevron && (
        <TouchableOpacity
          style={styles.sectionHeaderAction}
          activeOpacity={0.7}
          onPress={onChevronPress}
        >
          <Icon name="chevron-forward" size={16} color={colors.text.secondary} />
        </TouchableOpacity>
      )}
    </View>
    {loading ? skeleton : children}
  </View>
);

const HorizontalCards: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.horizontalScroll}
  >
    {children}
  </ScrollView>
);

// World Map Section with Location Animation
interface WorldMapSectionProps {
  loading: boolean;
}

const WorldMapSection: React.FC<WorldMapSectionProps> = ({ loading }) => {
  const { t } = useTranslation();
  const scaleAnim1 = useRef(new Animated.Value(1)).current;
  const scaleAnim2 = useRef(new Animated.Value(1)).current;
  const scaleAnim3 = useRef(new Animated.Value(1)).current;
  const opacityAnim1 = useRef(new Animated.Value(0.6)).current;
  const opacityAnim2 = useRef(new Animated.Value(0.4)).current;
  const opacityAnim3 = useRef(new Animated.Value(0.2)).current;

  useEffect(() => {
    if (loading) {
      return;
    }

    const createPulseAnimation = (scale: Animated.Value, opacity: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.parallel([
          Animated.sequence([
            Animated.timing(scale, {
              toValue: 2.5,
              duration: 2000,
              delay,
              useNativeDriver: true,
            }),
            Animated.timing(scale, {
              toValue: 1,
              duration: 0,
              useNativeDriver: true,
            }),
          ]),
          Animated.sequence([
            Animated.timing(opacity, {
              toValue: 0,
              duration: 2000,
              delay,
              useNativeDriver: true,
            }),
            Animated.timing(opacity, {
              toValue: opacity === opacityAnim1 ? 0.6 : opacity === opacityAnim2 ? 0.4 : 0.2,
              duration: 0,
              useNativeDriver: true,
            }),
          ]),
        ])
      );
    };

    const anim1 = createPulseAnimation(scaleAnim1, opacityAnim1, 0);
    const anim2 = createPulseAnimation(scaleAnim2, opacityAnim2, 400);
    const anim3 = createPulseAnimation(scaleAnim3, opacityAnim3, 800);

    anim1.start();
    anim2.start();
    anim3.start();

    return () => {
      anim1.stop();
      anim2.stop();
      anim3.stop();
    };
  }, [loading, opacityAnim1, opacityAnim2, opacityAnim3, scaleAnim1, scaleAnim2, scaleAnim3]);

  if (loading) {
    return (
      <View style={styles.worldMapSkeletonWrapper}>
        <SkeletonBlock width="100%" height={300} borderRadius={0} />
      </View>
    );
  }

  return (
    <View style={styles.worldMapContainer}>
      <Image
        source={images.worldMap || { uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800' }}
        style={styles.worldMapImage}
        resizeMode="cover"
      />
      {/* Search label text on map */}
      <View style={styles.searchLabelOnMap}>
        <Text style={styles.searchLabelText}>{t('home.search.label')}</Text>
      </View>
      <View style={styles.locationPinContainer}>
        {/* Pulse circles */}
        <Animated.View
          style={[
            styles.pulseCircle,
            {
              transform: [{ scale: scaleAnim1 }],
              opacity: opacityAnim1,
            },
          ]}
        />
        <Animated.View
          style={[
            styles.pulseCircle,
            {
              transform: [{ scale: scaleAnim2 }],
              opacity: opacityAnim2,
            },
          ]}
        />
        <Animated.View
          style={[
            styles.pulseCircle,
            {
              transform: [{ scale: scaleAnim3 }],
              opacity: opacityAnim3,
            },
          ]}
        />
        {/* Location pin */}
        <View style={styles.locationPin}>
          <Icon name="location-outline" size={40} color={colors.primary.normal} family="ionicons" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingTop: 0, // Remove top padding since we have headerSpacer
    paddingBottom: spacing['4xl'],
  },
  fixedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: colors.background.primary,
    paddingTop: spacing['2xl'],
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  headerSpacer: {
    height: 120, // Same as HEADER_HEIGHT to prevent content from going under header
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stickySearchBar: {
    position: 'absolute',
    top: 120, // HEADER_HEIGHT value
    left: 0,
    right: 0,
    zIndex: 99,
    paddingHorizontal: spacing.lg,
  },
  stickySearchBarContainer: {
    backgroundColor: colors.background.primary,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
  },
  headerTextContainer: {
    flex: 1,
    marginRight: spacing.base,
  },
  headerGreeting: {
    ...typography.styles.bodyRegular16,
    color: colors.text.secondary,
  },
  headerUserContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  headerUser: {
    ...typography.styles.h3,
    color: colors.text.secondary,
  },
  headerEmoji: {
    fontSize: 20,
    marginLeft: spacing.xs / 2,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'center',
  },
  headerSkeleton: {
    gap: spacing.xs,
  },
  headerSkeletonPrimary: {
    marginTop: spacing.xs,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border.light,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.primary,
  },
  iconButtonActive: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary.light,
  },
  sectionSpacing: {
    marginTop: spacing.xl,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderRadius: 0,
    borderBottomColor: colors.primary.normal,
    paddingBottom: spacing.sm,
  },
  inactiveTab: {
    borderBottomWidth: 0,
  },
  activeTabText: {
    color: colors.primary.normal,
    fontWeight: '600',
  },
  inactiveTabText: {
    color: colors.text.secondary,
    fontWeight: '400',
  },
  section: {
    marginTop: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.styles.bodyBold18,
    color: colors.text.primary,
  },
  sectionHeaderAction: {
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xs,
  },
  horizontalScroll: {
    gap: spacing.base,
    paddingRight: spacing.lg,
  },
  worldMapSkeletonWrapper: {
    marginTop: spacing.sm,
    marginHorizontal: -spacing.lg,
    height: 300,
  },
  worldMapContainer: {
    marginTop: spacing.sm,
    marginHorizontal: -spacing.lg,
    height: 320,
    borderRadius: 0,
    overflow: 'hidden',
    position: 'relative',
  },
  worldMapImage: {
    width: '100%',
    height: '100%',
    opacity: 0.3,
  },
  locationPinContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -20,
    marginLeft: -20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pulseCircle: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.primary.normal,
    backgroundColor: 'transparent',
  },
  locationPin: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchLabelOnMap: {
    position: 'absolute',
    bottom: spacing.lg,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  searchLabelText: {
    ...typography.styles.bodyBold30,
    color: colors.text.map,
  },
  searchSection: {
    marginTop: spacing.sm,
  },
  filterCard: {
    marginTop: spacing.xl,
    padding: spacing.lg,
    borderRadius: 16,
    backgroundColor: colors.background.secondary,
    gap: spacing.md,
  },
  bookingsList: {
    gap: spacing.sm,
  },
});


