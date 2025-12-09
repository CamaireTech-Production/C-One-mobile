/**
 * ComingSoon Screen
 * Screen component that displays the ComingSoon component for unimplemented features
 */

import React from 'react';
import { ScreenBackground, ComingSoon } from '../../components/common';
import { colors } from '../../theme';

export const ComingSoonScreen: React.FC = () => {
  return (
    <ScreenBackground backgroundColor={colors.background.primary}>
      <ComingSoon />
    </ScreenBackground>
  );
};

