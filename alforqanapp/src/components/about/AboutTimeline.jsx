import React, { memo } from 'react';
import { View, Text } from 'react-native';

import aboutStyles from '../../Styles/AboutUsStyleSheet';
import { useThemedStyles } from '../../hooks/useThemedStyles';

function AboutTimeline({ label, timeline }) {
  const styles = useThemedStyles(aboutStyles);
  if (!Array.isArray(timeline) || timeline.length === 0) return null;

  return (
    <View>
      <Text style={styles.sectionLabel}>{label}</Text>
      {timeline.map((entry) => (
        <View key={entry.year} style={styles.timelineCard}>
          <View style={styles.timelineBadge}>
            <Text style={styles.timelineYear}>{entry.year}</Text>
          </View>
          <View style={styles.timelineBody}>
            <Text style={styles.timelineTitle}>{entry.title}</Text>
            <Text style={styles.timelineDesc}>{entry.description}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

AboutTimeline.displayName = 'AboutTimeline';

export default memo(AboutTimeline);
