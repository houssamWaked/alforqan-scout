import React, { memo, useCallback, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, Animated } from 'react-native';
import { useRouter } from 'expo-router';

import { getEventTypeLabel } from '../../constants/events';

function EventCard({ event, styles }) {
  const router = useRouter();
  const scale = useRef(new Animated.Value(1)).current;

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

  if (!styles || !event) return null;

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.88}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        accessibilityRole="button"
        accessibilityLabel={event.title}
      >
        {event.image && (
          <Image
            source={{ uri: event.image }}
            style={styles.cardImage}
            accessible
            accessibilityLabel={event.title}
          />
        )}

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
              {event.date} A� {event.time}
            </Text>
            <Text style={styles.cardMetaText}>{event.location}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default memo(EventCard);

