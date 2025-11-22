import React, { memo } from 'react';
import { View, Text } from 'react-native';

import achievementsStyles from '../../Styles/AchievementsStyleSheet';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { ACHIEVEMENTS_TEXT } from '../../../constants/texts/achievementTexts';

function AchievementMeta({ badge, year }) {
  const styles = useThemedStyles(achievementsStyles);

  if (!badge && !year) return null;

  return (
    <View style={styles.metaRow}>
      {badge ? (
        <View style={styles.metaBadge}>
          <Text style={styles.metaBadgeText}>
            {badge || ACHIEVEMENTS_TEXT.badgeLabel}
          </Text>
        </View>
      ) : null}
      {year ? <Text style={styles.metaYear}>{year}</Text> : null}
    </View>
  );
}

AchievementMeta.displayName = 'AchievementMeta';

export default memo(AchievementMeta);
