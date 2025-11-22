import React, { memo } from 'react';
import { View, Text } from 'react-native';

import aboutStyles from '../../Styles/AboutUsStyleSheet';
import { useThemedStyles } from '../../hooks/useThemedStyles';

function AboutSections({ title, sections }) {
  const styles = useThemedStyles(aboutStyles);

  return (
    <View style={styles.introCard}>
      {title ? <Text style={styles.screenTitle}>{title}</Text> : null}
      {Array.isArray(sections)
        ? sections.map((section) => (
            <View key={section.title} style={styles.sectionBlock}>
              <Text style={styles.sectionLabel}>{section.title}</Text>
              <Text style={styles.sectionText}>{section.description}</Text>
            </View>
          ))
        : null}
    </View>
  );
}

AboutSections.displayName = 'AboutSections';

export default memo(AboutSections);
