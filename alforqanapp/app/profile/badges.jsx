import React from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import achievementStyles from '../../src/Styles/AchievementsStyleSheet';
import { useThemedStyles } from '../../src/hooks/useThemedStyles';
import { useTheme } from '../../src/hooks/useTheme';
import { useAchievements } from '../../src/hooks/useAchievements';
import AchievementsGrid from '../../src/components/achievements/AchievementsGrid';
import AchievementsLoading from '../../src/components/achievements/AchievementsLoading';
import AchievementsErrorState from '../../src/components/achievements/AchievementsErrorState';
import AchievementsEmptyState from '../../src/components/achievements/AchievementsEmptyState';
import SectionHeader from '../../src/components/SectionHeader';
import { ACHIEVEMENTS_TEXT } from '../../constants/texts/achievementTexts';

export default function ProfileBadgesScreen() {
  const styles = useThemedStyles(achievementStyles);
  const { colors } = useTheme();

  const { data, loading, error, refresh, refreshing } = useAchievements();
  const hasAchievements = !!data && data.length > 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={!!refreshing}
            onRefresh={refresh}
            tintColor={colors.primary}
          />
        }
      >
        <SectionHeader
          title={ACHIEVEMENTS_TEXT.badgesTitle || ACHIEVEMENTS_TEXT.pageTitle}
          subtitle={ACHIEVEMENTS_TEXT.badgesSubtitle}
        />

        {loading && !hasAchievements ? (
          <AchievementsLoading />
        ) : error ? (
          <AchievementsErrorState
            message={error || ACHIEVEMENTS_TEXT.listError}
          />
        ) : hasAchievements ? (
          <AchievementsGrid achievements={data} />
        ) : (
          <AchievementsEmptyState
            message={
              ACHIEVEMENTS_TEXT.emptyProfileBadges || ACHIEVEMENTS_TEXT.emptyList
            }
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
