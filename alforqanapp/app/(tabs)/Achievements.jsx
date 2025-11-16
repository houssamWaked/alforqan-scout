// screens/AchievementsScreen.jsx
import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AchievementFilters from '../../src/components/achievements/AchievementFilters';
import AchievementList from '../../src/components/achievements/AchievementList';

import { useAchievements } from '../../src/hooks/useAchievements';
import stylesSheet from '../../src/Styles/AchievementsStyleSheet';
import { useThemedStyles } from '../../src/hooks/useThemedStyles';
import { ACHIEVEMENTS_TEXT } from '../../constants/texts/achievementTexts';
import SectionHeader from '../../src/components/SectionHeader';

export default function AchievementsScreen() {
  const { activeFilter, setActiveFilter, filteredAchievements } =
    useAchievements();
  const styles = useThemedStyles(stylesSheet);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
      >
        {/* Page Title */}
        <SectionHeader title={ACHIEVEMENTS_TEXT.pageTitle} />

        {/* Filters (All / Competitions / Camps / Service...) */}
        <AchievementFilters
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />

        {/* Achievements List */}
        <AchievementList achievements={filteredAchievements} />
      </ScrollView>
    </SafeAreaView>
  );
}
