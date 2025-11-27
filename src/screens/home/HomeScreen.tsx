/**
 * Home Screen
 * Displays travel content leveraging the local data provider until backend is ready.
 */

import React, { useMemo, useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import {
  ScreenBackground,
  Tabs,
  Icon,
} from '../../components/common';
import {
  HomeCard,
  SkeletonHorizontalCards,
  SkeletonBookingList,
} from '../../components/home';
import { colors, typography, spacing } from '../../theme';
import { useHomeData } from '../../hooks';
import { Image } from '../../components/media';
import { images } from '../../config';

export const HomeScreen: React.FC = () => {
  const { t } = useTranslation();
  const { data, loading } = useHomeData();

  const [countryTab, setCountryTab] = useState('others');
  const [activeFilter, setActiveFilter] = useState('transport');

  const filterOptions = useMemo(
    () =>
      data?.filters.map((filter) => ({
        key: filter.id,
        label: t(filter.labelKey),
      })) || [],
    [data?.filters, t]
  );

  return (
    <ScreenBackground backgroundColor={colors.background.primary}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>
              {t('home.header.greeting')}
            </Text>
            <Text style={styles.headerSubtitle}>
              {t('home.header.subtitle')}
            </Text>
            <Text style={styles.headerUser}>{data?.hero.userName}</Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButtonActive} activeOpacity={0.7}>
              <Icon name="smart-toy" size={20} color={colors.primary.normal} family="material" />
            </TouchableOpacity>
          </View>
        </View>

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
            onChange={setCountryTab}
            variant="underline"
            gap={spacing.xs}
            activeTabStyle={styles.activeTab}
            inactiveTabStyle={styles.inactiveTab}
            activeTextStyle={styles.activeTabText}
            inactiveTextStyle={styles.inactiveTabText}
          />
        </View>

        {/* World Map Section with Location Animation */}
        <WorldMapSection />

        {/* Search Section */}
        <View style={styles.searchSection}>
          <View style={styles.searchInputWrapper}>
            <Icon name="search" size={20} color={colors.text.secondary} />
            <TextInput
              placeholder={t('home.search.placeholder')}
              placeholderTextColor={colors.text.tertiary}
              style={styles.searchInput}
            />
          </View>
        </View>

        <Section
          title={t('home.sections.countries')}
          loading={loading}
          skeleton={<SkeletonHorizontalCards />}
        >
          <HorizontalCards>
            {data?.countries.map((country) => (
              <HomeCard
                key={country.id}
                type="country"
                title={t(country.labelKey)}
                subtitle={countryTab === 'position' ? t('home.tabs.myPosition') : undefined}
                imageUrl={country.imageUrl}
              />
            ))}
          </HorizontalCards>
        </Section>

        <Section
          title={t('home.sections.cities')}
          loading={loading}
          skeleton={<SkeletonHorizontalCards />}
        >
          <HorizontalCards>
            {data?.cities.map((city) => (
              <HomeCard
                key={city.id}
                type="city"
                title={t(city.labelKey)}
                imageUrl={city.imageUrl}
              />
            ))}
          </HorizontalCards>
        </Section>

        <Section
          title={t('home.sections.popular')}
          loading={loading}
          skeleton={<SkeletonHorizontalCards itemWidth={240} itemHeight={220} />}
        >
          <HorizontalCards>
            {data?.popularPlaces.map((place) => (
              <HomeCard
                key={place.id}
                type="place"
                title={t(place.titleKey)}
                subtitle={t(place.cityKey)}
                rating={place.rating}
                imageUrl={place.imageUrl}
              />
            ))}
          </HorizontalCards>
        </Section>

        <View style={styles.filterCard}>
          {filterOptions.length > 0 && (
            <Tabs
              options={filterOptions}
              value={activeFilter}
              onChange={setActiveFilter}
              variant="pill"
              fullWidth={false}
            />
          )}
        </View>

        <Section
          title={t('home.sections.bookings')}
          loading={loading}
          skeleton={<SkeletonBookingList />}
        >
          <View style={styles.bookingsList}>
            {data?.recentBookings.map((booking) => (
              <HomeCard
                key={booking.id}
                type="booking"
                title={t(booking.titleKey)}
                subtitle={t(booking.subtitleKey)}
                code={booking.code}
                status={booking.status}
              />
            ))}
          </View>
        </Section>
      </ScrollView>
    </ScreenBackground>
  );
};


interface SectionProps {
  title: string;
  children: React.ReactNode;
  loading: boolean;
  skeleton: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({
  title,
  children,
  loading,
  skeleton,
}) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
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
const WorldMapSection: React.FC = () => {
  const scaleAnim1 = useRef(new Animated.Value(1)).current;
  const scaleAnim2 = useRef(new Animated.Value(1)).current;
  const scaleAnim3 = useRef(new Animated.Value(1)).current;
  const opacityAnim1 = useRef(new Animated.Value(0.6)).current;
  const opacityAnim2 = useRef(new Animated.Value(0.4)).current;
  const opacityAnim3 = useRef(new Animated.Value(0.2)).current;

  useEffect(() => {
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
  }, []);

  return (
    <View style={styles.worldMapContainer}>
      <Image
        source={images.worldMap || { uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800' }}
        style={styles.worldMapImage}
        resizeMode="cover"
      />
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
          <Icon name="location" size={24} color={colors.primary.normal} family="ionicons" />
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
    paddingBottom: spacing['4xl'],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing['2xl'],
  },
  headerTextContainer: {
    flex: 1,
    marginRight: spacing.base,
  },
  headerTitle: {
    ...typography.styles.h3,
    color: colors.text.primary,
  },
  headerSubtitle: {
    ...typography.styles.bodyRegular16,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  headerUser: {
    ...typography.styles.bodyBold16,
    color: colors.text.primary,
    marginTop: spacing.xs,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'center',
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
  sectionTitle: {
    ...typography.styles.bodyBold18,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  horizontalScroll: {
    gap: spacing.base,
  },
  worldMapContainer: {
    marginTop: spacing.xl,
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: colors.background.tertiary,
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
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary.normal,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  searchSection: {
    marginTop: spacing.lg,
  },
  filterCard: {
    marginTop: spacing.xl,
    padding: spacing.lg,
    borderRadius: 16,
    backgroundColor: colors.background.secondary,
    gap: spacing.md,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border.light,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
    backgroundColor: colors.background.primary,
  },
  searchInput: {
    flex: 1,
    ...typography.styles.bodyRegular16,
    color: colors.text.primary,
  },
  bookingsList: {
    gap: spacing.sm,
  },
});


