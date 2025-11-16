import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import aboutStyles from '../../src/Styles/AboutUsStyleSheet';
import { useAboutUs } from '../../src/hooks/useAboutUs';
import AboutUsComponent from '../../src/components/AboutUsComponent';
import { useThemedStyles } from '../../src/hooks/useThemedStyles';

export default function AboutUsScreen() {
  const styles = useThemedStyles(aboutStyles);
  const aboutContent = useAboutUs();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
        <AboutUsComponent {...aboutContent} />
      </ScrollView>
    </SafeAreaView>
  );
}
