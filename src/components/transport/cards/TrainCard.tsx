/**
 * TrainCard Component
 * Wrapper component for backward compatibility
 * Uses the general TransportCard component
 */

import React from 'react';
import { ViewStyle } from 'react-native';
import type { TransportOffer } from '../../../types/transport';
import { TransportCard } from './TransportCard';

interface TrainCardProps {
  offer: TransportOffer;
  onPress?: () => void;
  onReserve?: () => void;
  style?: ViewStyle;
}

export const TrainCard: React.FC<TrainCardProps> = (props) => {
  return <TransportCard {...props} />;
};
