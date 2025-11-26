/**
 * Home Screen
 * Displays travel content leveraging the local data provider until backend is ready.
 */

import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
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
          <TouchableIcon />
        </View>

        <View style={styles.sectionSpacing}>
          <Tabs
            options={[
              { key: 'others', label: t('home.tabs.otherCountries') },
              { key: 'position', label: t('home.tabs.myPosition') },
            ]}
            value={countryTab}
            onChange={setCountryTab}
            variant="segmented"
          />
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

const TouchableIcon = () => (
  <View style={styles.iconButton}>
    <Icon name="notifications-outline" size={20} color={colors.text.primary} />
  </View>
);

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
  sectionSpacing: {
    marginTop: spacing.xl,
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


