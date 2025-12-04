/**
 * FlightCard Component
 * Wrapper component for backward compatibility
 * Uses the general TransportCard component
 */

import React from 'react';
import { ViewStyle } from 'react-native';
import type { TransportOffer } from '../../../types/transport';
import { TransportCard } from './TransportCard';

interface FlightCardProps {
  offer: TransportOffer;
  onPress?: () => void;
  onReserve?: () => void;
  style?: ViewStyle;
}

export const FlightCard: React.FC<FlightCardProps> = (props) => {
  return <TransportCard {...props} />;
};
