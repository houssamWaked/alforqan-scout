import React, { memo } from 'react';
import { View, Text } from 'react-native';

import achievementsStyles from '../../Styles/AchievementsStyleSheet';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { useTypography } from '../../hooks/useTypography';

function AchievementsErrorState({ message }) {
  const styles = useThemedStyles(achievementsStyles);
  const typography = useTypography();
  if (!message) return null;

  return (
    <View style={styles.emptyWrapper}>
      <Text style={[typography.body.small, styles.errorText]}>
        {message}
      </Text>
    </View>
  );
}

AchievementsErrorState.displayName = 'AchievementsErrorState';

export default memo(AchievementsErrorState);
