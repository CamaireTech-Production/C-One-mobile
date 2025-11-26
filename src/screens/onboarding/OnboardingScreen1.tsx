/**
 * Onboarding Screen 1 - La Centralisation
 */

import React from 'react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  return (
    <OnboardingSlide
      title={t('onboarding.slide1.title')}
      description={t('onboarding.slide1.description')}
      image={images.onboardingScreen1}
      step={1}
      totalSteps={3}
      onContinue={onContinue}
      onSignUp={onSignUp}
    />
  );
};

