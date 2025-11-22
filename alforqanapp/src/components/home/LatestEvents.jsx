// src/components/home/LatestEvents.jsx
import React, { memo, useCallback, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';

import homeStyles from '../../Styles/HomeStyleSheet';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { HOME_TEXT } from '../../../constants/texts/homeTexts';

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const EventItem = memo(function EventItem({ item, styles }) {
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

  return (
    <AnimatedTouchableOpacity
      style={[styles.eventCard, { transform: [{ scale }] }]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.85}
      accessibilityRole="button"
      accessibilityLabel={item.title}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.eventImage}
        accessible
        accessibilityLabel={item.title}
      />
      <Text style={styles.eventTitle}>{item.title}</Text>
      <Text style={styles.eventDate}>{item.date}</Text>
    </AnimatedTouchableOpacity>
  );
});

function LatestEvents({ events }) {
  const styles = useThemedStyles(homeStyles);

  const renderItem = useCallback(
    ({ item }) => <EventItem item={item} styles={styles} />,
    [styles]
  );

  if (!events || events.length === 0) {
    return null;
  }

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{HOME_TEXT.latestEventsTitle}</Text>
      <FlatList
        data={events}
        horizontal
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

LatestEvents.displayName = 'LatestEvents';

export default memo(LatestEvents);
