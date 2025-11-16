import React, { memo } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import contactStyles from '../Styles/ContactUsStyleSheet';
import { useThemedStyles } from '../hooks/useThemedStyles';
import { useTheme } from '../hooks/useTheme';
import { CONTACT_TEXT } from '../../constants/texts/contactTexts';
import PrimaryButton from './PrimaryButton';

const SOCIAL_ITEMS = [
  { id: 'whatsapp', icon: 'logo-whatsapp' },
  { id: 'instagram', icon: 'logo-instagram' },
  { id: 'youtube', icon: 'logo-youtube' },
];

function ContactUsComponent({
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
            placeholderTextColor={colors.subText}
            value={name}
            onChangeText={onChangeName}
            autoCorrect={false}
            textContentType="name"
            accessibilityLabel={CONTACT_TEXT.nameLabel}
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>{CONTACT_TEXT.emailLabel}</Text>
          <TextInput
            style={styles.input}
            placeholder={CONTACT_TEXT.emailPlaceholder}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="emailAddress"
            value={email}
            onChangeText={onChangeEmail}
            placeholderTextColor={colors.subText}
            accessibilityLabel={CONTACT_TEXT.emailLabel}
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
            placeholderTextColor={colors.subText}
            accessibilityLabel={CONTACT_TEXT.messageLabel}
          />
        </View>

        {error ? (
          <Text style={[styles.statusText, styles.errorText]}>{error}</Text>
        ) : null}
        {success ? (
          <Text style={[styles.statusText, styles.successText]}>{success}</Text>
        ) : null}

        <PrimaryButton
          label={
            submitting
              ? CONTACT_TEXT.submittingLabel
              : CONTACT_TEXT.submitLabel
          }
          onPress={onSubmit}
          disabled={submitting}
          style={styles.submitButton}
          accessibilityLabel={CONTACT_TEXT.submitLabel}
        />
      </View>

      <View style={styles.socialCard}>
        <Text style={styles.socialTitle}>{CONTACT_TEXT.socialTitle}</Text>
        <View style={styles.socialRow}>
          {SOCIAL_ITEMS.map((item) => (
            <Pressable
              key={item.id}
              style={({ pressed }) => [
                styles.socialIconButton,
                pressed && { transform: [{ scale: 0.95 }] },
              ]}
              onPress={() => {}}
              accessibilityRole="button"
              accessibilityLabel={item.id}
            >
              <Ionicons name={item.icon} size={22} color={colors.primary} />
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
}

export default memo(ContactUsComponent);
