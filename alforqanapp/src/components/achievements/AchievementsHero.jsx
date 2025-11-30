import React, { memo } from 'react';
import { View, Text } from 'react-native';

import achievementsStyles from '../../Styles/AchievementsStyleSheet';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { useTheme } from '../../hooks/useTheme';
import { ACHIEVEMENTS_TEXT } from '../../../constants/texts/achievementTexts';

function AchievementsHero() {
  const styles = useThemedStyles(achievementsStyles);
  const { typography } = useTheme();

  return (
    <View style={styles.heroSection}>
      <Text style={[typography.headings.h1, styles.heroTitle]}>
        {ACHIEVEMENTS_TEXT.pageTitle}
      </Text>
      {ACHIEVEMENTS_TEXT.detailTitle ? (
        <Text style={[typography.body.small, styles.heroSubtitle]}>
          {ACHIEVEMENTS_TEXT.detailTitle}
        </Text>
      ) : null}
    </View>
  );
}

AchievementsHero.displayName = 'AchievementsHero';

export default memo(AchievementsHero);
