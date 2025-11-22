import React, { memo } from 'react';
import { View, ActivityIndicator } from 'react-native';

import achievementsStyles from '../../Styles/AchievementsStyleSheet';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { useTheme } from '../../hooks/useTheme';

function AchievementsLoading() {
  const styles = useThemedStyles(achievementsStyles);
  const { colors } = useTheme();

  return (
    <View style={styles.loadingWrapper}>
      <ActivityIndicator color={colors.primary} />
    </View>
  );
}

AchievementsLoading.displayName = 'AchievementsLoading';

export default memo(AchievementsLoading);
