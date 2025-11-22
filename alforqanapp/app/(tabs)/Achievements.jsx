import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, RefreshControl } from 'react-native';

import achievementsStyles from '../../src/Styles/AchievementsStyleSheet';
import { useThemedStyles } from '../../src/hooks/useThemedStyles';
import { useTheme } from '../../src/hooks/useTheme';
import { useAchievements } from '../../src/hooks/useAchievements';

import AchievementsHero from '../../src/components/achievements/AchievementsHero';
import AchievementFilters from '../../src/components/achievements/AchievementFilters';
import AchievementsGrid from '../../src/components/achievements/AchievementsGrid';
import AchievementsLoading from '../../src/components/achievements/AchievementsLoading';
import AchievementsEmptyState from '../../src/components/achievements/AchievementsEmptyState';
import AchievementsErrorState from '../../src/components/achievements/AchievementsErrorState';
import { ACHIEVEMENTS_TEXT } from '../../constants/texts/achievementTexts';

export default function AchievementsScreen() {
  const styles = useThemedStyles(achievementsStyles);
  const { colors } = useTheme();

  const {
    filteredAchievements,
    loading,
    error,
    refresh,
    refreshing,
    filters,
    activeFilter,
    setActiveFilter,
  } = useAchievements();

  const hasAchievements =
    !!filteredAchievements && filteredAchievements.length > 0;

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
        <AchievementsHero />

        <AchievementFilters
          filters={filters}
          activeFilter={activeFilter}
          onChange={setActiveFilter}
        />

        {loading && !hasAchievements ? (
          <AchievementsLoading />
        ) : error ? (
          <AchievementsErrorState
            message={error || ACHIEVEMENTS_TEXT.listError}
          />
        ) : hasAchievements ? (
          <AchievementsGrid achievements={filteredAchievements} />
        ) : (
          <AchievementsEmptyState />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
