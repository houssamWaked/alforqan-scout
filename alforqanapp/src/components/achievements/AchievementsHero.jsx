import React, { memo } from 'react';
import { View, Text } from 'react-native';

import achievementsStyles from '../../Styles/AchievementsStyleSheet';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { ACHIEVEMENTS_TEXT } from '../../../constants/texts/achievementTexts';

function AchievementsHero() {
  const styles = useThemedStyles(achievementsStyles);

  return (
    <View style={styles.heroSection}>
      <Text style={styles.heroTitle}>{ACHIEVEMENTS_TEXT.pageTitle}</Text>
      {ACHIEVEMENTS_TEXT.detailTitle ? (
        <Text style={styles.heroSubtitle}>{ACHIEVEMENTS_TEXT.detailTitle}</Text>
      ) : null}
    </View>
  );
}

AchievementsHero.displayName = 'AchievementsHero';

export default memo(AchievementsHero);
