import React, { memo } from 'react';
import { View, Text } from 'react-native';

import eventsStyles from '../../Styles/EventsStyleSheet';
import { useThemedStyles } from '../../hooks/useThemedStyles';

function EventErrorState({ message }) {
  const styles = useThemedStyles(eventsStyles);
  if (!message) return null;

  return (
    <View style={styles.emptyWrapper}>
      <Text style={styles.errorText}>{message}</Text>
    </View>
  );
}

EventErrorState.displayName = 'EventErrorState';

export default memo(EventErrorState);
