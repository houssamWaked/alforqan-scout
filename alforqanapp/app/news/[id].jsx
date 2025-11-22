import React, { useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, RefreshControl } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import newsStyles from '../../src/Styles/NewsStyleSheet';
import { useThemedStyles } from '../../src/hooks/useThemedStyles';
import { useTheme } from '../../src/hooks/useTheme';
import { useNewsDetail } from '../../src/hooks/useNewsDetail';

import NewsHeader from '../../src/components/news/NewsHeader';
import NewsHero from '../../src/components/news/NewsHero';
import NewsContent from '../../src/components/news/NewsContent';
import NewsEmptyState from '../../src/components/news/NewsEmptyState';
import NewsErrorState from '../../src/components/news/NewsErrorState';
import NewsLoading from '../../src/components/news/NewsLoading';

export default function NewsDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const styles = useThemedStyles(newsStyles);
  const { colors } = useTheme();

  const { data, loading, error, refresh, refreshing } = useNewsDetail(id);

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const hasItem = !!data?.item;

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
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
        <NewsHeader title={data?.item?.title} onBack={handleBack} />

        {loading ? (
          <NewsLoading />
        ) : error ? (
          <NewsErrorState message={error} />
        ) : !hasItem ? (
          <NewsEmptyState />
        ) : (
          <>
            <NewsHero
              title={data.item.title}
              date={data.item.date}
              images={data.images}
              fallbackImage={data.item.image}
            />
            <NewsContent
              title={data.item.title}
              body={data.item.content}
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
