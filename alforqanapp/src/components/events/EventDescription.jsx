import React, { memo } from 'react';
import { View, Text } from 'react-native';

import eventsStyles from '../../Styles/EventsStyleSheet';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { EVENTS_TEXT } from '../../../constants/texts/eventsTexts';

function EventDescription({ description }) {
  const styles = useThemedStyles(eventsStyles);
  if (!description) return null;

  return (
    <View>
      <Text style={styles.sectionTitle}>{EVENTS_TEXT.descriptionTitle}</Text>
      <Text style={styles.bodyText}>{description}</Text>
    </View>
  );
}

EventDescription.displayName = 'EventDescription';

export default memo(EventDescription);
