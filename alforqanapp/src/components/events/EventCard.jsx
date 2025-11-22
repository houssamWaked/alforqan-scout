import React, { memo, useCallback, useMemo, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, Animated } from 'react-native';
import { useRouter } from 'expo-router';

import { getEventTypeLabel } from '../../constants/events';
import eventsStyles from '../../Styles/EventsStyleSheet';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { EVENTS_TEXT } from '../../../constants/texts/eventsTexts';

function EventCard({ event }) {
  const router = useRouter();
  const scale = useRef(new Animated.Value(1)).current;
  const styles = useThemedStyles(eventsStyles);

  const imageSource = useMemo(() => {
    if (!event?.image) return null;
    return typeof event.image === 'string' ? { uri: event.image } : event.image;
  }, [event?.image]);

  const handlePressIn = useCallback(() => {
    Animated.spring(scale, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 20,
      bounciness: 6,
    }).start();
  }, [scale]);

  const handlePressOut = useCallback(() => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 6,
    }).start();
  }, [scale]);

  const handlePress = useCallback(() => {
    if (!event?.id) return;
    router.push(`/events/${event.id}`);
  }, [router, event?.id]);

  if (!event) return null;

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.88}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        accessibilityRole="button"
        accessibilityLabel={event.title || EVENTS_TEXT.detailTitleFallback}
      >
        {imageSource ? (
          <Image
            source={imageSource}
            style={styles.cardImage}
            accessible
            accessibilityLabel={event.title || EVENTS_TEXT.detailTitleFallback}
          />
        ) : null}

        <View style={styles.cardContent}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle} numberOfLines={2}>
              {event.title}
            </Text>
            <View style={styles.cardTypeBadge}>
              <Text style={styles.cardTypeText}>
                {getEventTypeLabel(event.type)}
              </Text>
            </View>
          </View>

          <View style={styles.cardMetaRow}>
            <Text style={styles.cardMetaText}>
              {event.date} | {event.time}
            </Text>
            <Text style={styles.cardMetaText}>{event.location}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

EventCard.displayName = 'EventCard';

export default memo(EventCard);
