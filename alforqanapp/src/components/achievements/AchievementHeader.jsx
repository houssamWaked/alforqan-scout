import React, { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import achievementsStyles from '../../Styles/AchievementsStyleSheet';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { useTheme } from '../../hooks/useTheme';
import { ACHIEVEMENTS_TEXT } from '../../../constants/texts/achievementTexts';

function AchievementHeader({ title, onBack }) {
  const styles = useThemedStyles(achievementsStyles);
  const { colors } = useTheme();

  return (
    <View style={styles.headerRow}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={onBack}
        accessibilityRole="button"
        accessibilityLabel={ACHIEVEMENTS_TEXT.backLabel}
        activeOpacity={0.8}
      >
        <Ionicons name="chevron-back" size={20} color={colors.text} />
      </TouchableOpacity>

      <Text style={styles.headerTitle} numberOfLines={2}>
        {title || ACHIEVEMENTS_TEXT.detailTitle}
      </Text>

      <View style={styles.headerSpacer} />
    </View>
  );
}

AchievementHeader.displayName = 'AchievementHeader';

export default memo(AchievementHeader);
