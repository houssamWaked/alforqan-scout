import React, { memo } from 'react';
import { View, Text } from 'react-native';

import achievementsStyles from '../../Styles/AchievementsStyleSheet';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { ACHIEVEMENTS_TEXT } from '../../../constants/texts/achievementTexts';

function AchievementDetailEmptyState() {
  const styles = useThemedStyles(achievementsStyles);

  return (
    <View style={styles.emptyWrapper}>
      <Text style={styles.emptyText}>{ACHIEVEMENTS_TEXT.notFoundMessage}</Text>
    </View>
  );
}

AchievementDetailEmptyState.displayName = 'AchievementDetailEmptyState';

export default memo(AchievementDetailEmptyState);
