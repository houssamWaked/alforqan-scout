import React, { memo } from 'react';
import { View, Text } from 'react-native';

import achievementsStyles from '../../Styles/AchievementsStyleSheet';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { ACHIEVEMENTS_TEXT } from '../../../constants/texts/achievementTexts';

function AchievementsEmptyState({ message }) {
  const styles = useThemedStyles(achievementsStyles);

  return (
    <View style={styles.emptyWrapper}>
      <Text style={styles.emptyText}>
        {message || ACHIEVEMENTS_TEXT.emptyList}
      </Text>
    </View>
  );
}

AchievementsEmptyState.displayName = 'AchievementsEmptyState';

export default memo(AchievementsEmptyState);
