import React from 'react';
import { View, FlatList } from 'react-native';
import AchievementCard from './AchievementCard';
import stylesSheet from '../../Styles/AchievementsStyleSheet';
import { useThemedStyles } from '../../hooks/useThemedStyles';

export default function AchievementList({ achievements }) {
  const styles = useThemedStyles(stylesSheet);

  if (!achievements || achievements.length === 0) {
    return <View style={styles.emptyStateWrapper} />;
  }

  return (
    <View style={styles.listWrapper}>
      <FlatList
        data={achievements}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <AchievementCard achievement={item} styles={styles} />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
