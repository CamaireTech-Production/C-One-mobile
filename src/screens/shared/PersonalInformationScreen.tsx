/**
 * PersonalInformationScreen
 * Form for personal information + document upload
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
import type { HomeStackParamList } from '../../types';

import {
  ScreenBackground,
  DetailHeader,
  Button,
  Input,
} from '../../components/common';
import { DocumentUploadField } from '../../components/transport';
import { colors, spacing, typography } from '../../theme';
import { TouchableOpacity } from 'react-native';

interface PersonalInformationScreenParams {
  bookingDetails?: any;
  returnTo?: string;
}

type PersonalInformationScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'PersonalInformation'
>;

export const PersonalInformationScreen: React.FC = () => {
  const { t } = useTranslation();
  const route = useRoute();
  const navigation = useNavigation<PersonalInformationScreenNavigationProp>();
  const params = route.params as PersonalInformationScreenParams;

  // Form state
  const [fullName, setFullName] = useState<string>('');
  const [documentType, setDocumentType] = useState<string>('passport');
  const [documentId, setDocumentId] = useState<string>('');
  const [expirationDate, setExpirationDate] = useState<string>('');
  const [documentImage, setDocumentImage] = useState<string | undefined>();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleContinue = () => {
    // Navigate to payment screen
    navigation.navigate('Payment', {
      bookingDetails: params.bookingDetails,
      personalInfo: {
        fullName,
        documentType,
        documentId,
        expirationDate,
        documentImage,
      },
    });
  };

  const handleDocumentUpload = () => {
    // TODO: Implement document image picker
    console.log('Upload document');
    // For now, set a mock image URI
    setDocumentImage('https://via.placeholder.com/400x300');
  };

  return (
    <ScreenBackground backgroundColor={colors.background.primary}>
      <DetailHeader
        title="Informations personnelles"
        onBack={handleBack}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Full Name */}
        <Input
          label="Nom et prénom"
          value={fullName}
          onChangeText={setFullName}
          placeholder="Entrer votre nom complet"
          containerStyle={styles.inputContainer}
        />

        {/* Document Type */}
        <View style={styles.section}>
          <Text style={styles.label}>Type de document</Text>
          <View style={styles.radioGroup}>
            <TouchableOpacity
              style={[
                styles.radioOption,
                documentType === 'passport' && styles.radioOptionSelected,
              ]}
              onPress={() => setDocumentType('passport')}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.radioText,
                  documentType === 'passport' && styles.radioTextSelected,
                ]}
              >
                Passeport
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.radioOption,
                documentType === 'cni' && styles.radioOptionSelected,
              ]}
              onPress={() => setDocumentType('cni')}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.radioText,
                  documentType === 'cni' && styles.radioTextSelected,
                ]}
              >
                CNI
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Document ID */}
        <Input
          label="ID du document"
          value={documentId}
          onChangeText={setDocumentId}
          placeholder="Entrer l'ID du document"
          containerStyle={styles.inputContainer}
        />

        {/* Expiration Date */}
        <Input
          label="Date d'expiration"
          value={expirationDate}
          onChangeText={setExpirationDate}
          placeholder="DD-MM-YYYY"
          containerStyle={styles.inputContainer}
        />

        {/* Document Upload */}
        <DocumentUploadField
          label="Uploader votre pièce"
          value={documentImage}
          onPress={handleDocumentUpload}
        />

        {/* Continue Button */}
        <Button
          title="Continuer"
          onPress={handleContinue}
          variant="primary"
          size="large"
          fullWidth
          style={styles.continueButton}
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
  inputContainer: {
    marginBottom: spacing.base,
  },
  section: {
    marginBottom: spacing.base,
  },
  label: {
    ...typography.styles.inputLabel,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  radioGroup: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  radioOption: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.base,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border.normal,
    alignItems: 'center',
  },
  radioOptionSelected: {
    borderColor: colors.primary.normal,
    backgroundColor: colors.primary.light,
  },
  radioText: {
    ...typography.styles.bodyRegular16,
    color: colors.text.primary,
  },
  radioTextSelected: {
    ...typography.styles.bodyMedium16,
    color: colors.primary.normal,
  },
  continueButton: {
    marginTop: spacing.lg,
  },
});

