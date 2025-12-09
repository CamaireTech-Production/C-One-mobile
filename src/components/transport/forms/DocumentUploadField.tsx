/**
 * DocumentUploadField Component
 * Dashed box with camera icon for document upload
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle, Image } from 'react-native';
import { colors, typography, spacing } from '../../../theme';
import { Icon } from '../../common/icons/Icon';

interface DocumentUploadFieldProps {
  label?: string;
  value?: string; // Image URI if document is uploaded
  onPress?: () => void;
  containerStyle?: ViewStyle;
}

export const DocumentUploadField: React.FC<DocumentUploadFieldProps> = ({
  label = 'Uploader votre pièce',
  value,
  onPress,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity
        style={[styles.uploadBox, value && styles.uploadBoxFilled]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        {value ? (
          <Image source={{ uri: value }} style={styles.image} resizeMode="cover" />
        ) : (
          <>
            <Icon name="camera-outline" size={32} color={colors.text.secondary} family="ionicons" />
            <Text style={styles.uploadText}>insérer une image</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.base,
  },
  label: {
    ...typography.styles.inputLabel,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  uploadBox: {
    borderWidth: 2,
    borderColor: colors.border.normal,
    borderStyle: 'dashed',
    borderRadius: 8,
    minHeight: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.tertiary,
  },
  uploadBoxFilled: {
    borderStyle: 'solid',
    borderColor: colors.primary.normal,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
  },
  uploadText: {
    ...typography.styles.bodyRegular14,
    color: colors.text.secondary,
    marginTop: spacing.sm,
  },
});

