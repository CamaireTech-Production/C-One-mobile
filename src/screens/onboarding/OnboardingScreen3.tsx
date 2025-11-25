/**
 * Onboarding Screen 3 - Expertise locale
 */

import React from 'react';
import { images } from '../../config/images';
import { OnboardingSlide } from './components/OnboardingSlide';

interface OnboardingScreen3Props {
  onContinue: () => void;
  onSignUp?: () => void;
}

export const OnboardingScreen3: React.FC<OnboardingScreen3Props> = ({
  onContinue,
  onSignUp,
}) => {
  return (
    <OnboardingSlide
      title="Expertise locale"
      description="Découvrez des activités et des services locaux uniques, hors des sentiers battus."
      image={images.onboardingScreen3}
      step={3}
      totalSteps={3}
      onContinue={onContinue}
      onSignUp={onSignUp}
    />
  );
};
