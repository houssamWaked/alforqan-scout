import React, { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import achievementsStyles from '../../Styles/AchievementsStyleSheet';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { ACHIEVEMENTS_TEXT } from '../../../constants/texts/achievementTexts';

function AchievementHeroControls({
  canGoPrev,
  canGoNext,
  onPrev,
  onNext,
  counterLabel,
  color,
}) {
  const styles = useThemedStyles(achievementsStyles);

  return (
    <View style={styles.heroControls}>
      <TouchableOpacity
        style={[
          styles.heroControlButton,
          !canGoPrev && styles.heroControlDisabled,
        ]}
        onPress={onPrev}
        disabled={!canGoPrev}
        accessibilityRole="button"
        accessibilityLabel={ACHIEVEMENTS_TEXT.galleryPrevLabel}
        activeOpacity={0.85}
      >
        <Ionicons name="chevron-back" size={18} color={color} />
      </TouchableOpacity>

      <Text style={styles.heroCounter}>{counterLabel}</Text>

      <TouchableOpacity
        style={[
          styles.heroControlButton,
          !canGoNext && styles.heroControlDisabled,
        ]}
        onPress={onNext}
        disabled={!canGoNext}
        accessibilityRole="button"
        accessibilityLabel={ACHIEVEMENTS_TEXT.galleryNextLabel}
        activeOpacity={0.85}
      >
        <Ionicons name="chevron-forward" size={18} color={color} />
      </TouchableOpacity>
    </View>
  );
}

AchievementHeroControls.displayName = 'AchievementHeroControls';

export default memo(AchievementHeroControls);
