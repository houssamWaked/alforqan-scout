import React, { memo } from 'react';
import { View, Text } from 'react-native';

import achievementsStyles from '../../Styles/AchievementsStyleSheet';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { ACHIEVEMENTS_TEXT } from '../../../constants/texts/achievementTexts';

function AchievementContent({ title, description }) {
  const styles = useThemedStyles(achievementsStyles);
  const body = description || '';

  return (
    <View>
      <Text style={styles.sectionTitle}>
        {title || ACHIEVEMENTS_TEXT.detailTitle}
      </Text>
      <Text style={styles.bodyText}>{body}</Text>
    </View>
  );
}

AchievementContent.displayName = 'AchievementContent';

export default memo(AchievementContent);
