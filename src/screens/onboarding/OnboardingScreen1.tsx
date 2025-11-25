/**
 * Onboarding Screen 1 - La Centralisation
 */

import React from 'react';
import { images } from '../../config/images';
import { OnboardingSlide } from './components/OnboardingSlide';

interface OnboardingScreen1Props {
  onContinue: () => void;
  onSignUp?: () => void;
}

export const OnboardingScreen1: React.FC<OnboardingScreen1Props> = ({
  onContinue,
  onSignUp,
}) => {
  return (
    <OnboardingSlide
      title="la Centralisation"
      description="Mettez fin au casse-tête de la planification. Vols, hôtels, activités et plus. Tout organisé pour vous."
      image={images.onboardingScreen1}
      step={1}
      totalSteps={3}
      onContinue={onContinue}
      onSignUp={onSignUp}
    />
  );
};

