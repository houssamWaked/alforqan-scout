import React, { memo } from 'react';
import { View, Text } from 'react-native';

import eventsStyles from '../../Styles/EventsStyleSheet';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { EVENTS_TEXT } from '../../../constants/texts/eventsTexts';

function EventEmptyState() {
  const styles = useThemedStyles(eventsStyles);

  return (
    <View style={styles.emptyWrapper}>
      <Text style={styles.emptyText}>{EVENTS_TEXT.detailEmpty}</Text>
    </View>
  );
}

EventEmptyState.displayName = 'EventEmptyState';

export default memo(EventEmptyState);
