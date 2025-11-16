import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import contactStyles from '../Styles/ContactUsStyleSheet';
import { useThemedStyles } from '../hooks/useThemedStyles';
import { useTheme } from '../hooks/useTheme';
import { CONTACT_TEXT } from '../../constants/texts/contactTexts';

const SOCIAL_ITEMS = [
  { id: 'whatsapp', icon: 'logo-whatsapp' },
  { id: 'instagram', icon: 'logo-instagram' },
  { id: 'youtube', icon: 'logo-youtube' },
];

export default function ContactUsComponent({
  name,
  email,
  message,
  submitting,
  error,
  success,
  onChangeName,
  onChangeEmail,
  onChangeMessage,
  onSubmit,
}) {
  const styles = useThemedStyles(contactStyles);
  const { colors } = useTheme();

  const buttonStyle = [
    styles.submitButton,
    submitting && styles.submitButtonDisabled,
  ];

  return (
    <View>
      <Text style={styles.pageTitle}>{CONTACT_TEXT.pageTitle}</Text>

      <View style={styles.card}>
        <Text style={styles.formTitle}>{CONTACT_TEXT.formTitle}</Text>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>{CONTACT_TEXT.nameLabel}</Text>
          <TextInput
            style={styles.input}
            placeholder={CONTACT_TEXT.namePlaceholder}
            value={name}
            onChangeText={onChangeName}
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>{CONTACT_TEXT.emailLabel}</Text>
          <TextInput
            style={styles.input}
            placeholder={CONTACT_TEXT.emailPlaceholder}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={onChangeEmail}
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>{CONTACT_TEXT.messageLabel}</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder={CONTACT_TEXT.messagePlaceholder}
            multiline
            value={message}
            onChangeText={onChangeMessage}
          />
        </View>

        {error ? (
          <Text style={[styles.statusText, styles.errorText]}>{error}</Text>
        ) : null}
        {success ? (
          <Text style={[styles.statusText, styles.successText]}>{success}</Text>
        ) : null}

        <TouchableOpacity
          style={buttonStyle}
          onPress={onSubmit}
          disabled={submitting}
        >
          <Text style={styles.submitButtonText}>
            {submitting ? CONTACT_TEXT.submittingLabel : CONTACT_TEXT.submitLabel}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.socialCard}>
        <Text style={styles.socialTitle}>{CONTACT_TEXT.socialTitle}</Text>
        <View style={styles.socialRow}>
          {SOCIAL_ITEMS.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.socialIconButton}
              activeOpacity={0.8}
            >
              <Ionicons
                name={item.icon}
                size={22}
                color={colors.primary}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

