import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import contactStyles from '../../src/Styles/ContactUsStyleSheet';
import { useThemedStyles } from '../../src/hooks/useThemedStyles';
import ContactUsComponent from '../../src/components/ContactUsComponent';
import { useContactForm } from '../../src/hooks/useContactForm';

export default function ContactUsScreen() {
  const styles = useThemedStyles(contactStyles);
  const {
    name,
    email,
    message,
    submitting,
    error,
    success,
    setName,
    setEmail,
    setMessage,
    handleSubmit,
  } = useContactForm();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <ContactUsComponent
          name={name}
          email={email}
          message={message}
          submitting={submitting}
          error={error}
          success={success}
          onChangeName={setName}
          onChangeEmail={setEmail}
          onChangeMessage={setMessage}
          onSubmit={handleSubmit}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
