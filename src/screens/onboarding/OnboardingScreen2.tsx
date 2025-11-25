/**
 * Onboarding Screen 2 - La Simplicité
 */

import React from 'react';
import { images } from '../../config/images';
import { OnboardingSlide } from './components/OnboardingSlide';

interface OnboardingScreen2Props {
  onContinue: () => void;
  onSignUp?: () => void;
}

export const OnboardingScreen2: React.FC<OnboardingScreen2Props> = ({
  onContinue,
  onSignUp,
}) => {
  return (
    <OnboardingSlide
      title="la Simplicité"
      description="Une expérience fluide de la recherche au paiement sécurisé."
      image={images.onboardingScreen2}
      step={2}
      totalSteps={3}
      onContinue={onContinue}
      onSignUp={onSignUp}
    />
  );
};
