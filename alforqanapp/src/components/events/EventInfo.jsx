import React, { memo } from 'react';
import { View, Text } from 'react-native';

import eventsStyles from '../../Styles/EventsStyleSheet';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { EVENTS_TEXT } from '../../../constants/texts/eventsTexts';

function EventInfo({ event }) {
  const styles = useThemedStyles(eventsStyles);
  if (!event) return null;

  return (
    <View style={styles.infoSection}>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>{EVENTS_TEXT.dateLabel}</Text>
        <Text style={styles.infoValue}>{event.date}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>{EVENTS_TEXT.timeLabel}</Text>
        <Text style={styles.infoValue}>{event.time}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>{EVENTS_TEXT.locationLabel}</Text>
        <Text style={styles.infoValue}>{event.location}</Text>
      </View>

      {event.leader ? (
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>{EVENTS_TEXT.leaderLabel}</Text>
          <Text style={styles.infoValue}>{event.leader}</Text>
        </View>
      ) : null}
    </View>
  );
}

EventInfo.displayName = 'EventInfo';

export default memo(EventInfo);
