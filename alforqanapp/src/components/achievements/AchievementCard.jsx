// components/achievements/AchievementCard.jsx
import React, { memo, useCallback, useMemo, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

import achievementsStyles from '../../Styles/AchievementsStyleSheet';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { useTheme } from '../../hooks/useTheme';
import { ACHIEVEMENTS_TEXT } from '../../../constants/texts/achievementTexts';

function AchievementCard({ achievement }) {
  const router = useRouter();
  const scale = useRef(new Animated.Value(1)).current;
  const styles = useThemedStyles(achievementsStyles);
  const { typography } = useTheme();

  const imageSource = useMemo(() => {
    if (!achievement?.image) return null;
    return typeof achievement.image === 'string'
      ? { uri: achievement.image }
      : achievement.image;
  }, [achievement?.image]);

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
    if (!achievement?.id) return;
    router.push({
      pathname: '/achievements/[id]',
      params: { id: String(achievement.id) },
    });
  }, [router, achievement?.id]);

  if (!achievement) return null;

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.88}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        accessibilityRole="button"
        accessibilityLabel={
          achievement.title || ACHIEVEMENTS_TEXT.detailTitle
        }
      >
        {imageSource ? (
          <Image
            source={imageSource}
            style={styles.cardImage}
            accessible
            accessibilityLabel={
              achievement.title || ACHIEVEMENTS_TEXT.detailTitle
            }
          />
        ) : null}

        <View style={styles.cardHeaderRow}>
          <View style={styles.badgeBubble}>
            <Ionicons
              name="ribbon-outline"
              size={16}
              style={styles.badgeIcon}
            />
            <Text style={[typography.label, styles.badgeText]}>
              {achievement.badge || ACHIEVEMENTS_TEXT.badgeLabel}
            </Text>
          </View>
          <Text style={[typography.body.small, styles.yearText]}>
            {achievement.year}
          </Text>
        </View>

        <View style={styles.cardHeaderRow}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons
              name={
                achievement.type === 'camp'
                  ? 'bonfire-outline'
                  : achievement.type === 'service'
                  ? 'hand-left-outline'
                  : achievement.type === 'competition'
                  ? 'trophy-outline'
                  : 'medal-outline'
              }
              size={16}
              style={styles.cardIcon}
            />
            <Text
              style={[typography.headings.h3, styles.cardTitle]}
              numberOfLines={2}
            >
              {achievement.title}
            </Text>
          </View>
        </View>

        <Text style={[typography.body.small, styles.cardDescription]} numberOfLines={2}>
          {achievement.description}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

AchievementCard.displayName = 'AchievementCard';

export default memo(AchievementCard);
