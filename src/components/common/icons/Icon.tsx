/**
 * Icon Component
 * Hybrid approach:
 * - FontAwesome6 solid: uses @expo/vector-icons
 * - FontAwesome6 regular: uses @fortawesome/react-native-fontawesome
 * - Material Icons: uses @expo/vector-icons (only filled icons, no outline variant support)
 * - MaterialCommunityIcons: uses @expo/vector-icons (alternative for Material Icons with more variants)
 * - Unicon: uses @iconscout/react-native-unicons
 *   - Documentation: https://iconscout.com/unicons
 *   - Icon Explorer (Line): https://iconscout.com/unicons/explore/line
 *   - Icon Explorer (Solid): https://iconscout.com/unicons/explore/solid
 *   - Icon Explorer (Monochrome): https://iconscout.com/unicons/explore/monochrome
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

// Unicon support - @iconscout/react-native-unicons
// Documentation: https://iconscout.com/unicons
// Icon names: https://iconscout.com/unicons/explore/line
// Note: Package index.js has errors with missing files, so we import icons individually
// Add icons to this map as needed - use static imports only (Metro doesn't support dynamic requires)

// Import commonly used Unicon icons statically
let UilPlane: any = null;
let UilPlaneArrival: any = null;
let UilPlaneDeparture: any = null;
let UilCalendarAlt: any = null;
let UilMapPin: any = null;
let UilMapPinAlt: any = null;
let UilLocationPinAlt: any = null;

try {
  UilPlane = require('@iconscout/react-native-unicons/icons/uil-plane').default;
  UilPlaneArrival = require('@iconscout/react-native-unicons/icons/uil-plane-arrival').default;
  UilPlaneDeparture = require('@iconscout/react-native-unicons/icons/uil-plane-departure').default;
  UilCalendarAlt = require('@iconscout/react-native-unicons/icons/uil-calendar-alt').default;
  UilMapPin = require('@iconscout/react-native-unicons/icons/uil-map-pin').default;
  UilMapPinAlt = require('@iconscout/react-native-unicons/icons/uil-map-pin-alt').default;
  UilLocationPinAlt = require('@iconscout/react-native-unicons/icons/uil-location-pin-alt').default;
} catch (e) {
  // Icons not available
}

// Map of icon names to their components
const uniconIconMap: Record<string, any> = {
  'plane': UilPlane,
  'plane-arrival': UilPlaneArrival,
  'plane-departure': UilPlaneDeparture,
  'calendar-alt': UilCalendarAlt,
  'map-pin': UilMapPin,
  'map-pin-alt': UilMapPinAlt,
  'location-pin-alt': UilLocationPinAlt,
  // Add more icons here as needed
};

export type IconFamily = 'ionicons' | 'material' | 'fontawesome' | 'fontawesome6' | 'materialcommunity' | 'unicon';
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
    case 'unicon':
      // Unicon support - @iconscout/react-native-unicons
      // This package uses LINE icons (outline style) by default
      // Icon names format: 'plane', 'calendar-alt', 'map-pin', etc.
      // Check available icons at: https://iconscout.com/unicons/explore/line
      // Note: Icons must be added to uniconIconMap above to be used
      const UniconComponent = uniconIconMap[name];
      if (UniconComponent) {
        return <UniconComponent size={size} color={color} />;
      }
      // Fallback to Ionicons if icon not found in map
      // To add a new icon, import it at the top and add it to uniconIconMap
      return <Ionicons {...iconProps} />;
    case 'ionicons':
    default:
      return <Ionicons {...iconProps} />;
  }
};

