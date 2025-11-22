import React, { memo } from 'react';
import { View, Text } from 'react-native';

import eventsStyles from '../../Styles/EventsStyleSheet';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { EVENTS_TEXT } from '../../../constants/texts/eventsTexts';

function EventsEmptyState() {
  const styles = useThemedStyles(eventsStyles);

  return (
    <View style={styles.emptyWrapper}>
      <Text style={styles.emptyText}>{EVENTS_TEXT.emptyList}</Text>
    </View>
  );
}

EventsEmptyState.displayName = 'EventsEmptyState';

export default memo(EventsEmptyState);
