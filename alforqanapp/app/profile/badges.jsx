import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import achievementStyles from '../../src/Styles/AchievementsStyleSheet';
import { useThemedStyles } from '../../src/hooks/useThemedStyles';
import { useAchievements } from '../../src/hooks/useAchievements';
import AchievementList from '../../src/components/achievements/AchievementList';
import SectionHeader from '../../src/components/SectionHeader';
import { ACHIEVEMENTS_TEXT } from '../../constants/texts/achievementTexts';

export default function ProfileBadgesScreen() {
  const styles = useThemedStyles(achievementStyles);
  const { achievements } = useAchievements();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
      >
        <SectionHeader
          title={ACHIEVEMENTS_TEXT.badgesTitle || ACHIEVEMENTS_TEXT.pageTitle}
          subtitle={ACHIEVEMENTS_TEXT.badgesSubtitle}
        />

        {achievements && achievements.length > 0 ? (
          <AchievementList achievements={achievements} />
        ) : (
          <View style={styles.emptyStateWrapper}>
            <Text style={styles.desc}>
              {ACHIEVEMENTS_TEXT.emptyProfileBadges ||
                'لا توجد شارات بعد. شارك في الأنشطة لتحصل على أول شارة لك!'}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

