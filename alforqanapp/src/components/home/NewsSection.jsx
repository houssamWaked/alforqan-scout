// src/components/home/NewsSection.jsx
import React, { memo, useCallback, useMemo } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

import homeStyles from '../../Styles/HomeStyleSheet';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { useTheme } from '../../hooks/useTheme';
import NewsCard from './NewsCard';
import { NEWS_TEXT } from '../../../constants/texts/newsTexts';
import { HOME_TEXT } from '../../../constants/texts/homeTexts';

function NewsSection({ items, loading, error }) {
  const styles = useThemedStyles(homeStyles);
  const router = useRouter();
  const { colors, typography } = useTheme();

  const sanitizedItems = useMemo(
    () => (Array.isArray(items) ? items.filter(Boolean) : []),
    [items]
  );

  const handlePressNewsItem = useCallback(
    (item) => {
      if (!item?.id) return;
      router.push({
        pathname: '/news/[id]',
        params: { id: item.id },
      });
    },
    [router]
  );

  const renderItem = useCallback(
    ({ item }) => <NewsCard item={item} onPress={handlePressNewsItem} />,
    [handlePressNewsItem]
  );

  if (loading && sanitizedItems.length === 0) {
    return (
      <View style={styles.sectionContainer}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.errorText}>{NEWS_TEXT.listError}</Text>
      </View>
    );
  }

  if (sanitizedItems.length === 0) {
    return null;
  }

  return (
    <View style={styles.sectionContainer}>
      <Text style={[typography.headings.h2, styles.sectionTitle]}>
        {HOME_TEXT.newsSectionTitle}
      </Text>

      <FlatList
        data={sanitizedItems}
        horizontal
        renderItem={renderItem}
        keyExtractor={(item, index) =>
          item?.id ? String(item.id) : `news-${index}`
        }
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.newsListContent}
        accessibilityLabel={HOME_TEXT.newsSectionTitle}
        initialNumToRender={4}
        maxToRenderPerBatch={6}
        removeClippedSubviews
      />
    </View>
  );
}

NewsSection.displayName = 'NewsSection';

export default memo(NewsSection);
