// components/achievements/AchievementCard.jsx
import React, { memo, useCallback, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, Animated } from 'react-native';

function AchievementCard({ achievement, styles }) {
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

  if (!styles) return null;

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.88}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        accessibilityRole="button"
        accessibilityLabel={achievement.title}
      >
        {achievement.image && (
          <Image
            source={{ uri: achievement.image }}
            style={styles.cardImage}
            accessible
            accessibilityLabel={achievement.title}
          />
        )}

        <View style={styles.cardHeaderRow}>
          <View style={styles.badgeBubble}>
            <Text style={styles.badgeText}>{achievement.badge}</Text>
          </View>
          <Text style={styles.yearText}>{achievement.year}</Text>
        </View>

        <Text style={styles.cardTitle} numberOfLines={2}>
          {achievement.title}
        </Text>

        <Text style={styles.cardDescription} numberOfLines={2}>
          {achievement.description}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default memo(AchievementCard);
