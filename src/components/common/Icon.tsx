/**
 * Icon Component
 * Simple wrapper around @expo/vector-icons
 * Uses Ionicons by default, but supports other icon families
 */

import React from 'react';
import { Ionicons, MaterialIcons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../theme';

export type IconFamily = 'ionicons' | 'material' | 'fontawesome' | 'materialcommunity';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  family?: IconFamily;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 20,
  color = colors.text.primary,
  family = 'ionicons',
}) => {
  const iconProps = {
    name: name as any,
    size,
    color,
  };

  switch (family) {
    case 'material':
      return <MaterialIcons {...iconProps} />;
    case 'fontawesome':
      return <FontAwesome {...iconProps} />;
    case 'materialcommunity':
      return <MaterialCommunityIcons {...iconProps} />;
    case 'ionicons':
    default:
      return <Ionicons {...iconProps} />;
  }
};

