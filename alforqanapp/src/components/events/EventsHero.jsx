import React, { memo } from 'react';
import { View, Text } from 'react-native';

import eventsStyles from '../../Styles/EventsStyleSheet';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { EVENTS_TEXT } from '../../../constants/texts/eventsTexts';

function EventsHero() {
  const styles = useThemedStyles(eventsStyles);

  return (
    <View style={styles.heroSection}>
      <Text style={styles.heroTitle}>{EVENTS_TEXT.pageTitle}</Text>
      <Text style={styles.heroSubtitle}>{EVENTS_TEXT.pageSubtitle}</Text>
    </View>
  );
}

EventsHero.displayName = 'EventsHero';

export default memo(EventsHero);
