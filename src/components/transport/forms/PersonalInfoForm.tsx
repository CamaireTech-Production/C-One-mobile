/**
 * PersonalInfoForm Component
 * Form for collecting passenger personal information
 * Fields: Nom, Prénom, Date de naissance, Type de document, Numéro de document, Date expiration, Pays émission, Nationalité
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing, typography } from '../../../theme';
import { TransportInputField } from './TransportInputField';
import { CalendarModal } from '../modals/CalendarModal';
import { Icon } from '../../common/icons/Icon';
import type { DocumentType } from '../../../types/transport';

export interface PersonalInfoFormData {
  nom: string;
  prenom: string;
  dateNaissance: string; // DD-MM-YYYY
  typeDocument: DocumentType;
  numeroDocument: string;
  dateExpiration: string; // DD-MM-YYYY
  paysEmission: string;
  nationalite: string;
}

export interface PersonalInfoFormProps {
  data: PersonalInfoFormData;
  onChange: (data: PersonalInfoFormData) => void;
  containerStyle?: ViewStyle;
  primaryColor?: string;
}

const DOCUMENT_TYPES: { value: DocumentType; label: string }[] = [
  { value: 'passport', label: 'Passeport' },
  { value: 'cni', label: 'CNI' },
];

// Mock countries list - in production, this would come from an API
const COUNTRIES = [
  'France', 'Cameroun', 'Canada', 'USA', 'UK', 'Allemagne', 'Italie', 'Espagne',
  'Belgique', 'Suisse', 'Maroc', 'Tunisie', 'Sénégal', 'Côte d\'Ivoire',
];

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  data,
  onChange,
  containerStyle,
  primaryColor = colors.primary.normal,
}) => {
  const { t } = useTranslation();
  const [showDateNaissanceModal, setShowDateNaissanceModal] = useState(false);
  const [showDateExpirationModal, setShowDateExpirationModal] = useState(false);
  const [showDocumentTypeModal, setShowDocumentTypeModal] = useState(false);
  const [showPaysEmissionModal, setShowPaysEmissionModal] = useState(false);
  const [showNationaliteModal, setShowNationaliteModal] = useState(false);

  const updateField = <K extends keyof PersonalInfoFormData>(
    field: K,
    value: PersonalInfoFormData[K]
  ) => {
    onChange({ ...data, [field]: value });
  };

  const handleDocumentTypeSelect = (type: DocumentType) => {
    updateField('typeDocument', type);
    setShowDocumentTypeModal(false);
  };

  const handleCountrySelect = (country: string, field: 'paysEmission' | 'nationalite') => {
    updateField(field, country);
    if (field === 'paysEmission') {
      setShowPaysEmissionModal(false);
    } else {
      setShowNationaliteModal(false);
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Nom */}
      <TransportInputField
        type="text"
        label="Nom"
        value={data.nom}
        onChangeText={(text) => updateField('nom', text)}
        placeholder="Entrer votre nom"
        containerStyle={styles.inputField}
        iconName="person-outline"
        iconFamily="ionicons"
        iconColor={primaryColor}
      />

      {/* Prénom */}
      <TransportInputField
        type="text"
        label="Prénom"
        value={data.prenom}
        onChangeText={(text) => updateField('prenom', text)}
        placeholder="Entrer votre prénom"
        containerStyle={styles.inputField}
        iconName="person-outline"
        iconFamily="ionicons"
        iconColor={primaryColor}
      />

      {/* Date de naissance */}
      <TransportInputField
        type="text"
        label="Date de naissance"
        value={data.dateNaissance}
        onPress={() => setShowDateNaissanceModal(true)}
        placeholder="DD-MM-YYYY"
        containerStyle={styles.inputField}
        iconName="calendar-outline"
        iconFamily="ionicons"
        iconColor={primaryColor}
        editable={false}
      />

      {/* Type de document */}
      <TransportInputField
        type="text"
        label="Type de document"
        value={DOCUMENT_TYPES.find(t => t.value === data.typeDocument)?.label || ''}
        onPress={() => setShowDocumentTypeModal(true)}
        placeholder="Sélectionner un type"
        containerStyle={styles.inputField}
        iconName="document-text-outline"
        iconFamily="ionicons"
        iconColor={primaryColor}
        editable={false}
      />

      {/* Numéro de document */}
      <TransportInputField
        type="text"
        label="Numéro de document"
        value={data.numeroDocument}
        onChangeText={(text) => updateField('numeroDocument', text)}
        placeholder="Entrer le numéro"
        containerStyle={styles.inputField}
        iconName="card-outline"
        iconFamily="ionicons"
        iconColor={primaryColor}
      />

      {/* Date d'expiration */}
      <TransportInputField
        type="text"
        label="Date d'expiration"
        value={data.dateExpiration}
        onPress={() => setShowDateExpirationModal(true)}
        placeholder="DD-MM-YYYY"
        containerStyle={styles.inputField}
        iconName="calendar-outline"
        iconFamily="ionicons"
        iconColor={primaryColor}
        editable={false}
      />

      {/* Pays d'émission */}
      <TransportInputField
        type="text"
        label="Pays d'émission"
        value={data.paysEmission}
        onPress={() => setShowPaysEmissionModal(true)}
        placeholder="Sélectionner un pays"
        containerStyle={styles.inputField}
        iconName="flag-outline"
        iconFamily="ionicons"
        iconColor={primaryColor}
        editable={false}
      />

      {/* Nationalité */}
      <TransportInputField
        type="text"
        label="Nationalité"
        value={data.nationalite}
        onPress={() => setShowNationaliteModal(true)}
        placeholder="Sélectionner une nationalité"
        containerStyle={styles.inputField}
        iconName="people-outline"
        iconFamily="ionicons"
        iconColor={primaryColor}
        editable={false}
      />

      {/* Date de naissance Modal */}
      <CalendarModal
        visible={showDateNaissanceModal}
        selectedDate={data.dateNaissance}
        onDateSelect={(date) => {
          updateField('dateNaissance', date);
          setShowDateNaissanceModal(false);
        }}
        onClose={() => setShowDateNaissanceModal(false)}
        primaryColor={primaryColor}
        maxDate={new Date()} // Can't be in the future
      />

      {/* Date d'expiration Modal */}
      <CalendarModal
        visible={showDateExpirationModal}
        selectedDate={data.dateExpiration}
        onDateSelect={(date) => {
          updateField('dateExpiration', date);
          setShowDateExpirationModal(false);
        }}
        onClose={() => setShowDateExpirationModal(false)}
        primaryColor={primaryColor}
        minDate={new Date()} // Must be in the future
      />

      {/* Document Type Modal */}
      <Modal
        visible={showDocumentTypeModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowDocumentTypeModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Type de document</Text>
              <TouchableOpacity
                onPress={() => setShowDocumentTypeModal(false)}
                activeOpacity={0.7}
              >
                <Icon name="close" size={24} color={colors.text.primary} family="ionicons" />
              </TouchableOpacity>
            </View>
            <ScrollView>
              {DOCUMENT_TYPES.map((type) => (
                <TouchableOpacity
                  key={type.value}
                  style={[
                    styles.modalOption,
                    data.typeDocument === type.value && styles.modalOptionSelected,
                  ]}
                  onPress={() => handleDocumentTypeSelect(type.value)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.modalOptionText,
                      data.typeDocument === type.value && styles.modalOptionTextSelected,
                    ]}
                  >
                    {type.label}
                  </Text>
                  {data.typeDocument === type.value && (
                    <Icon name="checkmark" size={20} color={primaryColor} family="ionicons" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Pays d'émission Modal */}
      <Modal
        visible={showPaysEmissionModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowPaysEmissionModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Pays d'émission</Text>
              <TouchableOpacity
                onPress={() => setShowPaysEmissionModal(false)}
                activeOpacity={0.7}
              >
                <Icon name="close" size={24} color={colors.text.primary} family="ionicons" />
              </TouchableOpacity>
            </View>
            <ScrollView>
              {COUNTRIES.map((country) => (
                <TouchableOpacity
                  key={country}
                  style={[
                    styles.modalOption,
                    data.paysEmission === country && styles.modalOptionSelected,
                  ]}
                  onPress={() => handleCountrySelect(country, 'paysEmission')}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.modalOptionText,
                      data.paysEmission === country && styles.modalOptionTextSelected,
                    ]}
                  >
                    {country}
                  </Text>
                  {data.paysEmission === country && (
                    <Icon name="checkmark" size={20} color={primaryColor} family="ionicons" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Nationalité Modal */}
      <Modal
        visible={showNationaliteModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowNationaliteModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Nationalité</Text>
              <TouchableOpacity
                onPress={() => setShowNationaliteModal(false)}
                activeOpacity={0.7}
              >
                <Icon name="close" size={24} color={colors.text.primary} family="ionicons" />
              </TouchableOpacity>
            </View>
            <ScrollView>
              {COUNTRIES.map((country) => (
                <TouchableOpacity
                  key={country}
                  style={[
                    styles.modalOption,
                    data.nationalite === country && styles.modalOptionSelected,
                  ]}
                  onPress={() => handleCountrySelect(country, 'nationalite')}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.modalOptionText,
                      data.nationalite === country && styles.modalOptionTextSelected,
                    ]}
                  >
                    {country}
                  </Text>
                  {data.nationalite === country && (
                    <Icon name="checkmark" size={20} color={primaryColor} family="ionicons" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputField: {
    marginBottom: spacing.md,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.background.primary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: spacing.base,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.base,
    paddingBottom: spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  modalTitle: {
    ...typography.styles.h4,
    color: colors.text.primary,
  },
  modalOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.base,
    borderRadius: 8,
    marginBottom: spacing.sm,
    backgroundColor: colors.background.tertiary,
  },
  modalOptionSelected: {
    backgroundColor: colors.primary.light,
  },
  modalOptionText: {
    ...typography.styles.bodyRegular16,
    color: colors.text.primary,
  },
  modalOptionTextSelected: {
    ...typography.styles.bodyMedium16,
    color: colors.primary.dark,
  },
});

