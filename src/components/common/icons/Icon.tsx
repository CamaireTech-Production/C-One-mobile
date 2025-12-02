/**
 * Icon Component
 * Hybrid approach:
 * - FontAwesome6 solid: uses @expo/vector-icons
 * - FontAwesome6 regular: uses @fortawesome/react-native-fontawesome
 * - Material Icons: uses @expo/vector-icons (only filled icons, no outline variant support)
 * - MaterialCommunityIcons: uses @expo/vector-icons (alternative for Material Icons with more variants)
 * - Other families: uses @expo/vector-icons
 */

import React from 'react';
import { Ionicons, MaterialIcons, FontAwesome, FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { 
  faHouse, 
  faUser,
  faBell,
  faStar,
  faStarHalfStroke,
  // Add more regular icons as needed
} from '@fortawesome/free-regular-svg-icons';
import { colors } from '../../../theme';

export type IconFamily = 'ionicons' | 'material' | 'fontawesome' | 'fontawesome6' | 'materialcommunity';
export type FontAwesome6Style = 'solid' | 'regular' | 'light' | 'thin' | 'duotone' | 'brands';

// Map icon names to FontAwesome regular icons
const fa6RegularIconMap: Record<string, any> = {
  'house': faHouse,
  'user': faUser,
  'bell': faBell,
  'star': faStar,
  'star-half-stroke': faStarHalfStroke,
  // Add more mappings as needed
  // Note: Some icons like 'arrow-down-wide-short' and 'wallet' may only exist in solid variant
};

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  family?: IconFamily;
  fa6Style?: FontAwesome6Style; // Only used when family is 'fontawesome6'
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 20,
  color = colors.text.primary,
  family = 'ionicons',
  fa6Style = 'regular',
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
    case 'fontawesome6':
      // Hybrid approach: use @fortawesome/react-native-fontawesome for regular, @expo/vector-icons for solid
      if (fa6Style === 'regular') {
        const faIcon = fa6RegularIconMap[name];
        if (faIcon) {
          return <FontAwesomeIcon icon={faIcon} size={size} color={color} />;
        }
        // Fallback to @expo/vector-icons if icon not found in regular map
        return <FontAwesome6 {...iconProps} solid={false} />;
      }
      // For solid and other styles, use @expo/vector-icons
      return <FontAwesome6 {...iconProps} solid={fa6Style === 'solid'} />;
    case 'materialcommunity':
      return <MaterialCommunityIcons {...iconProps} />;
    case 'ionicons':
    default:
      return <Ionicons {...iconProps} />;
  }
};

