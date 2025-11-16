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
    <SafeAreaView style={[styles.safeArea, { flex: 1 }]}>
      <ScrollView
        style={[styles.scroll, { flex: 1 }]}
        contentContainerStyle={[
          styles.container,
          { paddingBottom: 120 }, // keeps last section above tab bar
        ]}
        showsVerticalScrollIndicator={false}
      >
        <AboutUsComponent {...aboutContent} />
      </ScrollView>
    </SafeAreaView>
  );
}
