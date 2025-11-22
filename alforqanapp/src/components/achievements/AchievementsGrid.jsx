import React, { memo, useCallback } from 'react';
import { View, FlatList } from 'react-native';

import achievementsStyles from '../../Styles/AchievementsStyleSheet';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import AchievementCard from './AchievementCard';

function AchievementsGrid({ achievements }) {
  const styles = useThemedStyles(achievementsStyles);
  const data = achievements || [];

  const renderItem = useCallback(
    ({ item }) => <AchievementCard achievement={item} />,
    []
  );

  const keyExtractor = useCallback(
    (item) => item?.id?.toString() ?? Math.random().toString(),
    []
  );

  return (
    <View style={styles.gridWrapper}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        scrollEnabled={false}
        contentContainerStyle={styles.gridContent}
      />
    </View>
  );
}

AchievementsGrid.displayName = 'AchievementsGrid';

export default memo(AchievementsGrid);
