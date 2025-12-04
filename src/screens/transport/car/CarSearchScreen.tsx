/**
 * CarSearchScreen
 * Map centered with ride-hailing services section
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../../../types';

import {
  ScreenBackground,
  DetailHeader,
} from '../../../components/common';
import {
  TransportMapView,
  RideHailingCard,
} from '../../../components/transport';
import { colors, spacing, typography } from '../../../theme';
import { useCarData, useGeolocation, useHideTabBar } from '../../../hooks';

interface CarSearchScreenParams {
  countryCode: string;
  cityId?: string;
  context?: 'client-location' | 'other-country';
}

type CarSearchScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'CarSearch'
>;

export const CarSearchScreen: React.FC = () => {
  const { t } = useTranslation();
  const route = useRoute();
  const navigation = useNavigation<CarSearchScreenNavigationProp>();
  const params = route.params as CarSearchScreenParams;

  // Hide tab bar when this screen is focused
  useHideTabBar();

  // Get user location
  const { location: geolocationLocation } = useGeolocation({ useCache: true });

  // Get car services data
  const { services, loading } = useCarData(
    params.countryCode,
    params.cityId
  );

  const handleBack = () => {
    navigation.goBack();
  };

  const handleServiceDownload = (serviceId: string) => {
    const service = services.find((s) => s.id === serviceId);
    if (service?.downloadUrl) {
      // TODO: Open download URL or app store
      console.log('Download service:', service.downloadUrl);
    }
  };

  return (
    <ScreenBackground backgroundColor={colors.transport.car.background}>
      <DetailHeader
        title="Réservation - voiture"
        onBack={handleBack}
        rightIconName="home"
        rightIconFamily="ionicons"
        onRightIconPress={() => navigation.navigate('HomeMain')}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Map View */}
        <View style={styles.mapContainer}>
          <TransportMapView
            origin={
              geolocationLocation
                ? {
                    latitude: geolocationLocation.latitude,
                    longitude: geolocationLocation.longitude,
                    name: geolocationLocation.city || 'Ma position',
                  }
                : undefined
            }
            destination={
              params.cityId
                ? {
                    latitude: 0, // Mock coordinates
                    longitude: 0,
                    name: params.cityId,
                  }
                : undefined
            }
          />
        </View>

        {/* Services Section */}
        <View style={styles.servicesSection}>
          <Text style={styles.sectionTitle}>Services de transport disponible</Text>

          {loading ? (
            <Text style={styles.loadingText}>Chargement des services...</Text>
          ) : services.length > 0 ? (
            services.map((service) => (
              <RideHailingCard
                key={service.id}
                service={service}
                onDownload={() => handleServiceDownload(service.id)}
                style={styles.serviceCard}
              />
            ))
          ) : (
            <Text style={styles.emptyText}>Aucun service disponible</Text>
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
  mapContainer: {
    margin: spacing.base,
    borderRadius: 12,
    overflow: 'hidden',
    ...colors.shadow.card,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  servicesSection: {
    padding: spacing.base,
  },
  sectionTitle: {
    ...typography.styles.h4,
    color: colors.text.primary,
    marginBottom: spacing.base,
  },
  serviceCard: {
    marginBottom: spacing.base,
  },
  loadingText: {
    ...typography.styles.bodyRegular16,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: spacing.lg,
  },
  emptyText: {
    ...typography.styles.bodyRegular16,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: spacing.lg,
  },
});

