import React from 'react';
import { View } from 'react-native';
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
      <View style={styles.listContent}>
        {achievements.map((item) => (
          <AchievementCard
            key={item.id.toString()}
            achievement={item}
            styles={styles}
          />
        ))}
      </View>
    </View>
  );
}
