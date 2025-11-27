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
  type DetailTabKey,
  type TransportType,
  type CarouselSlide,
} from '../../components/common';
import { colors, spacing, typography } from '../../theme';
import { images } from '../../config';

interface DetailScreenParams {
  id: string;
  title: string;
  imageUrl?: string;
}

type DetailScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'Detail'>;

export const DetailScreen: React.FC = () => {
  const { t } = useTranslation();
  const route = useRoute();
  const navigation = useNavigation<DetailScreenNavigationProp>();
  const params = route.params as DetailScreenParams;

  const [activeTab, setActiveTab] = useState<DetailTabKey>('transport');

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

  // Mock transport data - will be replaced with real data
  const transportData: Array<{
    type: TransportType;
    title: string;
    description: string;
  }> = [
    {
      type: 'plane',
      title: 'Avion',
      description: 'Réserver votre billet de vol en toute sécurité',
    },
    {
      type: 'train',
      title: 'Train',
      description: 'Réserver votre ticket de train en toute sécurité',
    },
    {
      type: 'car',
      title: 'voiture',
      description: 'Louez votre voiture en toute sécurité peu importe votre destination',
    },
  ];

  const handleBack = () => {
    navigation.goBack();
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'transport':
        return (
          <View style={styles.cardsContainer}>
            {transportData.map((transport, index) => (
              <TransportCard
                key={index}
                type={transport.type}
                title={transport.title}
                description={transport.description}
                style={styles.card}
              />
            ))}
          </View>
        );
      case 'hotel':
        return (
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholderText}>Hotels - À venir</Text>
          </View>
        );
      case 'tourism':
        return (
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholderText}>Tourisme - À venir</Text>
          </View>
        );
      case 'restaurant':
        return (
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholderText}>Restaurant - À venir</Text>
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
    marginTop: spacing.sm,
  },
  content: {
    padding: spacing.lg,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.xs,
  },
  card: {
    width: '48%',
  },
  placeholderContainer: {
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
  },
  placeholderText: {
    ...typography.styles.bodyRegular16,
    color: colors.text.secondary,
  },
});

