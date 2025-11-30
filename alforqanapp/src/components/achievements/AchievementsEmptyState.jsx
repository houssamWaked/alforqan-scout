import React, { memo } from 'react';
import { View, Text } from 'react-native';

import achievementsStyles from '../../Styles/AchievementsStyleSheet';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { useTypography } from '../../hooks/useTypography';
import { ACHIEVEMENTS_TEXT } from '../../../constants/texts/achievementTexts';

function AchievementsEmptyState({ message }) {
  const styles = useThemedStyles(achievementsStyles);
  const typography = useTypography();

  return (
    <View style={styles.emptyWrapper}>
      <View style={styles.emptyCard}>
        <View style={styles.emptyArt}>
          <View style={styles.emptyArtInner} />
        </View>
        <Text
          style={[typography.headings.h3, styles.emptyText]}
        >
          {message || ACHIEVEMENTS_TEXT.emptyList}
        </Text>
      </View>
    </View>
  );
}

AchievementsEmptyState.displayName = 'AchievementsEmptyState';

export default memo(AchievementsEmptyState);
