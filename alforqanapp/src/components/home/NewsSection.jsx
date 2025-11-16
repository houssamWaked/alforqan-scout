import React, { memo, useCallback } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useRouter } from 'expo-router';

import homeStyles from '../../Styles/HomeStyleSheet';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import NewsCard from './NewsCard';
import { NEWS_ITEMS } from '../../Data/news';

function NewsSection() {
  const styles = useThemedStyles(homeStyles);
  const router = useRouter();

  const handlePressNewsItem = useCallback(
    (id) => {
      router.push({
        pathname: '/news/[id]',
        params: { id },
      });
    },
    [router]
  );

  const renderItem = useCallback(
    ({ item }) => (
      <NewsCard item={item} onPress={() => handlePressNewsItem(item.id)} />
    ),
    [handlePressNewsItem]
  );

  if (!NEWS_ITEMS || NEWS_ITEMS.length === 0) {
    return null;
  }

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>أخبار الكشافة</Text>

      <FlatList
        data={NEWS_ITEMS}
        horizontal
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.newsListContent}
      />
    </View>
  );
}

export default memo(NewsSection);

