/**
 * Onboarding Screen 2 - La Simplicité
 */

import React from 'react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  return (
    <OnboardingSlide
      title={t('onboarding.slide2.title')}
      description={t('onboarding.slide2.description')}
      image={images.onboardingScreen2}
      step={2}
      totalSteps={3}
      onContinue={onContinue}
      onSignUp={onSignUp}
    />
  );
};
