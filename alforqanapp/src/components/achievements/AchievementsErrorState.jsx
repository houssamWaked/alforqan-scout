import React, { memo } from 'react';
import { View, Text } from 'react-native';

import achievementsStyles from '../../Styles/AchievementsStyleSheet';
import { useThemedStyles } from '../../hooks/useThemedStyles';

function AchievementsErrorState({ message }) {
  const styles = useThemedStyles(achievementsStyles);
  if (!message) return null;

  return (
    <View style={styles.emptyWrapper}>
      <Text style={styles.errorText}>{message}</Text>
    </View>
  );
}

AchievementsErrorState.displayName = 'AchievementsErrorState';

export default memo(AchievementsErrorState);
