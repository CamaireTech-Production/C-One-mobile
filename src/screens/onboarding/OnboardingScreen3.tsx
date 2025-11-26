/**
 * Onboarding Screen 3 - Expertise locale
 */

import React from 'react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  return (
    <OnboardingSlide
      title={t('onboarding.slide3.title')}
      description={t('onboarding.slide3.description')}
      image={images.onboardingScreen3}
      step={3}
      totalSteps={3}
      onContinue={onContinue}
      onSignUp={onSignUp}
    />
  );
};
