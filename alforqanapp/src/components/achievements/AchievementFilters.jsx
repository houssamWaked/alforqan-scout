import React, { memo, useMemo } from 'react';
import { ScrollView, TouchableOpacity, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import achievementsStyles from '../../Styles/AchievementsStyleSheet';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { getAchievementTypeIcon } from '../../constants/achievementTypes';

function AchievementFilters({ filters, activeFilter, onChange }) {
  const styles = useThemedStyles(achievementsStyles);
  const list = useMemo(
    () => (Array.isArray(filters) ? filters : []),
    [filters]
  );

  const handlers = useMemo(() => {
    const map = {};
    list.forEach((filter) => {
      map[filter.id] = () => {
        if (typeof onChange === 'function') {
          onChange(filter.id);
        }
      };
    });
    return map;
  }, [list, onChange]);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.filtersContainer}
    >
      <View style={styles.filtersRow}>
        {list.map((filter) => {
          const isActive = activeFilter === filter.id;
          const iconName = getAchievementTypeIcon(filter.id);
          return (
            <TouchableOpacity
              key={filter.id}
              onPress={handlers[filter.id]}
              style={[
                styles.tabButton,
                isActive && styles.tabButtonActive,
              ]}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel={filter.label}
            >
              <Ionicons
                name={iconName}
                size={16}
                style={[
                  styles.tabIcon,
                  isActive && styles.tabIconActive,
                ]}
              />
              <Text
                style={[
                  styles.tabText,
                  isActive && styles.tabTextActive,
                ]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}

AchievementFilters.displayName = 'AchievementFilters';

export default memo(AchievementFilters);
