import React, { useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, RefreshControl } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import achievementsStyles from '../../src/Styles/AchievementsStyleSheet';
import { useThemedStyles } from '../../src/hooks/useThemedStyles';
import { useTheme } from '../../src/hooks/useTheme';
import { useAchievementDetail } from '../../src/hooks/useAchievementDetail';
import { ACHIEVEMENTS_TEXT } from '../../constants/texts/achievementTexts';

import AchievementHeader from '../../src/components/achievements/AchievementHeader';
import AchievementHero from '../../src/components/achievements/AchievementHero';
import AchievementMeta from '../../src/components/achievements/AchievementMeta';
import AchievementContent from '../../src/components/achievements/AchievementContent';
import AchievementsLoading from '../../src/components/achievements/AchievementsLoading';
import AchievementsErrorState from '../../src/components/achievements/AchievementsErrorState';
import AchievementDetailEmptyState from '../../src/components/achievements/AchievementDetailEmptyState';

export default function AchievementDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const styles = useThemedStyles(achievementsStyles);
  const { colors } = useTheme();

  const { data, loading, error, refresh, refreshing } =
    useAchievementDetail(id);

  const achievement = data?.achievement;

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const hasAchievement = !!achievement;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={!!refreshing}
            onRefresh={refresh}
            tintColor={colors.primary}
          />
        }
      >
        <AchievementHeader
          title={achievement?.title || ACHIEVEMENTS_TEXT.detailTitle}
          onBack={handleBack}
        />

        {loading ? (
          <AchievementsLoading />
        ) : error ? (
          <AchievementsErrorState
            message={error || ACHIEVEMENTS_TEXT.detailError}
          />
        ) : !hasAchievement ? (
          <AchievementDetailEmptyState />
        ) : (
          <>
            <AchievementHero
              title={achievement.title}
              badge={achievement.badge}
              year={achievement.year}
              images={data.images}
              fallbackImage={achievement.image}
            />
            <AchievementMeta badge={achievement.badge} year={achievement.year} />
            <AchievementContent
              title={achievement.title}
              description={achievement.description}
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
