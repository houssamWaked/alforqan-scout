// src/components/home/NewsSection.jsx
import React, { memo, useCallback } from 'react';
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
  const { colors } = useTheme();

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

  if (loading && (!items || items.length === 0)) {
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

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{HOME_TEXT.newsSectionTitle}</Text>

      <FlatList
        data={items}
        horizontal
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.newsListContent}
      />
    </View>
  );
}

NewsSection.displayName = 'NewsSection';

export default memo(NewsSection);
