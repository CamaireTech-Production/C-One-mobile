/**
 * PersonalInfoFormScreen
 * Full-screen personal information form for transport booking
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../../../types';

import {
  ScreenBackground,
  DetailHeader,
  Button,
} from '../../../components/common';
import {
  PersonalInfoForm,
  type PersonalInfoFormData,
} from '../../../components/transport/forms/PersonalInfoForm';
import { colors, spacing } from '../../../theme';
import { useHideTabBar } from '../../../hooks';

interface PersonalInfoFormScreenParams {
  transportType: 'flight' | 'train';
  onContinue?: (data: PersonalInfoFormData) => void;
  initialData?: Partial<PersonalInfoFormData>;
}

type PersonalInfoFormScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'PersonalInfoForm'
>;

const getDefaultData = (): PersonalInfoFormData => ({
  nom: '',
  prenom: '',
  dateNaissance: '',
  typeDocument: 'passport',
  numeroDocument: '',
  dateExpiration: '',
  paysEmission: '',
  nationalite: '',
});

export const PersonalInfoFormScreen: React.FC = () => {
  const { t } = useTranslation();
  const route = useRoute();
  const navigation = useNavigation<PersonalInfoFormScreenNavigationProp>();
  const params = route.params as PersonalInfoFormScreenParams;

  // Hide tab bar when this screen is focused
  useHideTabBar();

  const transportType = params.transportType || 'flight';
  const [formData, setFormData] = useState<PersonalInfoFormData>({
    ...getDefaultData(),
    ...params.initialData,
  });

  const handleBack = () => {
    navigation.goBack();
  };

  const handleContinue = () => {
    if (params.onContinue) {
      params.onContinue(formData);
    }
    navigation.goBack();
  };

  const isFormValid = () => {
    return (
      formData.nom.trim() !== '' &&
      formData.prenom.trim() !== '' &&
      formData.dateNaissance !== '' &&
      formData.numeroDocument.trim() !== '' &&
      formData.dateExpiration !== '' &&
      formData.paysEmission !== '' &&
      formData.nationalite !== ''
    );
  };

  const getTitle = () => {
    return transportType === 'flight' ? 'Réservation' : 'Réservation';
  };

  const getPrimaryColor = () => {
    return transportType === 'flight'
      ? colors.transport.flight.primary
      : colors.transport.train.primary;
  };

  return (
    <ScreenBackground backgroundColor={colors.background.primary}>
      <DetailHeader
        title={getTitle()}
        onBack={handleBack}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <PersonalInfoForm
          data={formData}
          onChange={setFormData}
          primaryColor={getPrimaryColor()}
        />

        <Button
          title="Continuer"
          onPress={handleContinue}
          variant="primary"
          size="large"
          fullWidth
          backgroundColor={getPrimaryColor()}
          style={styles.continueButton}
          disabled={!isFormValid()}
        />
      </ScrollView>
    </ScreenBackground>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.base,
    paddingBottom: spacing['4xl'],
  },
  continueButton: {
    marginTop: spacing.lg,
  },
});

