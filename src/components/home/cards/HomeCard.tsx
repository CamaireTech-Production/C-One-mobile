import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';

import { colors, spacing, typography } from '../../../theme';
import { Image } from '../../media';

type BaseCardProps = {
  onPress?: () => void;
};

type CountryCardProps = BaseCardProps & {
  type: 'country' | 'city';
  title: string;
  subtitle?: string;
  imageUrl: string;
};

type PlaceCardProps = BaseCardProps & {
  type: 'place';
  title: string;
  subtitle?: string;
  rating?: number;
  imageUrl: string;
};

export type BookingStatus = 'confirmed' | 'pending' | 'cancelled';

type BookingCardProps = BaseCardProps & {
  type: 'booking';
  title: string;
  subtitle?: string;
  code?: string;
  status?: BookingStatus;
  statusLabel?: string;
};

export type HomeCardProps =
  | CountryCardProps
  | PlaceCardProps
  | BookingCardProps;

export const HomeCard: React.FC<HomeCardProps> = (props) => {
  switch (props.type) {
    case 'country':
    case 'city':
      return <CountryCard {...props} />;
    case 'place':
      return <PlaceCard {...props} />;
    case 'booking':
      return <BookingCard {...props} />;
    default:
      return null;
  }
};

const CountryCard: React.FC<CountryCardProps> = ({
  title,
  subtitle,
  imageUrl,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.countryCard}
      activeOpacity={0.85}
      onPress={onPress}
    >
      <ImageBackground
        source={{ uri: imageUrl }}
        style={styles.countryImage}
        imageStyle={styles.countryImageInner}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.05)', 'rgba(0,0,0,0.6)']}
          style={StyleSheet.absoluteFillObject}
        />
        <View>
          <Text style={styles.countryTitle}>{title}</Text>
          {subtitle && <Text style={styles.countrySubtitle}>{subtitle}</Text>}
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const PlaceCard: React.FC<PlaceCardProps> = ({
  title,
  subtitle,
  rating,
  imageUrl,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.placeCard}
      activeOpacity={0.85}
      onPress={onPress}
    >
      <Image
        source={{ uri: imageUrl }}
        style={styles.placeImage}
        resizeMode="cover"
      />
      <View style={styles.placeContent}>
        <Text style={styles.placeTitle}>{title}</Text>
        {subtitle && <Text style={styles.placeSubtitle}>{subtitle}</Text>}
        {rating && (
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const BookingCard: React.FC<BookingCardProps> = ({
  title,
  subtitle,
  status = 'confirmed',
  code,
  statusLabel,
  onPress,
}) => {
  const { t } = useTranslation();
  const statusConfig = getStatusConfig(status);
  const label =
    statusLabel ||
    t(`home.bookings.status.${status}` as const, {
      defaultValue: t('home.bookings.status.confirmed'),
    });
  return (
    <TouchableOpacity
      style={styles.bookingCard}
      activeOpacity={0.85}
      onPress={onPress}
    >
      <View style={styles.bookingHeader}>
        <View>
          <Text style={styles.bookingTitle}>{title}</Text>
          {subtitle && <Text style={styles.bookingSubtitle}>{subtitle}</Text>}
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: statusConfig.background },
          ]}
        >
          <Text style={[styles.statusText, { color: statusConfig.color }]}>
            {label}
          </Text>
        </View>
      </View>
      {code && <Text style={styles.bookingCode}>{code}</Text>}
    </TouchableOpacity>
  );
};

const getStatusConfig = (status: BookingStatus) => {
  switch (status) {
    case 'pending':
      return {
        background: colors.yellow.light,
        color: colors.yellow.normal,
      };
    case 'cancelled':
      return {
        background: colors.error + '20',
        color: colors.error,
      };
    case 'confirmed':
    default:
      return {
        background: colors.success + '20',
        color: colors.success,
      };
  }
};

const styles = StyleSheet.create({
  countryCard: {
    width: 180,
    height: 160,
    borderRadius: 20,
    overflow: 'hidden',
  },
  countryImage: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: spacing.base,
  },
  countryImageInner: {
    borderRadius: 20,
  },
  countryTitle: {
    ...typography.styles.bodyBold18,
    color: colors.text.inverse,
  },
  countrySubtitle: {
    ...typography.styles.bodyRegular12,
    color: colors.text.inverse,
    opacity: 0.8,
    marginTop: spacing.xs / 2,
  },
  placeCard: {
    width: 240,
    borderRadius: 16,
    backgroundColor: colors.background.primary,
    overflow: 'hidden',
  },
  placeImage: {
    width: '100%',
    height: 140,
  },
  placeContent: {
    padding: spacing.base,
    gap: spacing.xs,
  },
  placeTitle: {
    ...typography.styles.bodyBold18,
    color: colors.text.primary,
  },
  placeSubtitle: {
    ...typography.styles.bodyRegular14,
    color: colors.text.secondary,
  },
  ratingBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: 999,
    backgroundColor: colors.background.tertiary,
  },
  ratingText: {
    ...typography.styles.bodyMedium14,
    color: colors.text.primary,
  },
  bookingCard: {
    padding: spacing.base,
    borderRadius: 16,
    backgroundColor: colors.background.primary,
    borderWidth: 1,
    borderColor: colors.border.light,
    marginBottom: spacing.sm,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookingTitle: {
    ...typography.styles.bodyBold16,
    color: colors.text.primary,
  },
  bookingSubtitle: {
    ...typography.styles.bodyRegular14,
    color: colors.text.secondary,
  },
  bookingCode: {
    ...typography.styles.caption,
    color: colors.text.secondary,
    marginTop: spacing.sm,
  },
  statusBadge: {
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.xs,
    borderRadius: 999,
  },
  statusText: {
    ...typography.styles.bodyBold14,
  },
});


