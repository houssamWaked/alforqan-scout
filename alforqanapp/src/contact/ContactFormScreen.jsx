import React, { useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View, Text, TextInput } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import contactStyles from '../Styles/ContactUsStyleSheet';
import { useThemedStyles } from '../hooks/useThemedStyles';
import { useTheme } from '../hooks/useTheme';
import PrimaryButton from '../components/PrimaryButton';
import { CONTACT_TEXT } from '../../constants/texts/contactTexts';
import { sendContactMessage } from '../services/contactService';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactFormScreen() {
  const styles = useThemedStyles(contactStyles);
  const { colors } = useTheme();
  const { reason: initialReason } = useLocalSearchParams();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [reason] = useState(
    typeof initialReason === 'string' ? initialReason : 'سؤال عام'
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const validate = useCallback(() => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError(CONTACT_TEXT.errorRequired);
      return false;
    }

    if (!EMAIL_REGEX.test(email.trim())) {
      setError(CONTACT_TEXT.errorEmail);
      return false;
    }

    return true;
  }, [name, email, message]);

  const handleSubmit = useCallback(async () => {
    if (submitting) return;

    setError(null);
    setSuccess(null);

    if (!validate()) return;

    try {
      setSubmitting(true);
      await sendContactMessage({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        reason,
      });
      setSuccess(CONTACT_TEXT.successMessage);
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      console.error('sendContactMessage error:', err);
      setError(CONTACT_TEXT.errorGeneric);
    } finally {
      setSubmitting(false);
    }
  }, [email, message, name, reason, submitting, validate]);

  return (
    <SafeAreaView style={[styles.safeArea, { flex: 1 }]}>
      <ScrollView
        style={[styles.scroll, { flex: 1 }]}
        contentContainerStyle={[styles.container, { paddingBottom: 120 }]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <Text style={styles.formTitle}>{CONTACT_TEXT.formTitle}</Text>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>السبب</Text>
            <Text
              style={[
                styles.input,
                {
                  paddingVertical: 10,
                  borderWidth: 0,
                  backgroundColor: 'transparent',
                },
              ]}
            >
              {reason}
            </Text>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>{CONTACT_TEXT.nameLabel}</Text>
            <TextInput
              style={styles.input}
              placeholder={CONTACT_TEXT.namePlaceholder}
              placeholderTextColor={colors.subText}
              value={name}
              onChangeText={setName}
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
              onChangeText={setEmail}
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
              onChangeText={setMessage}
              placeholderTextColor={colors.subText}
              accessibilityLabel={CONTACT_TEXT.messageLabel}
            />
          </View>

          {error ? (
            <Text style={[styles.statusText, styles.errorText]}>{error}</Text>
          ) : null}
          {success ? (
            <Text style={[styles.statusText, styles.successText]}>
              {success}
            </Text>
          ) : null}

          <PrimaryButton
            label={
              submitting
                ? CONTACT_TEXT.submittingLabel
                : CONTACT_TEXT.submitLabel
            }
            onPress={handleSubmit}
            disabled={submitting}
            style={styles.submitButton}
            accessibilityLabel={CONTACT_TEXT.submitLabel}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
