import React, { memo, useMemo } from 'react';
import { ScrollView, TouchableOpacity, Text, View } from 'react-native';

import achievementsStyles from '../../Styles/AchievementsStyleSheet';
import { useThemedStyles } from '../../hooks/useThemedStyles';

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
          return (
            <TouchableOpacity
              key={filter.id}
              onPress={handlers[filter.id]}
              style={[
                styles.filterChip,
                isActive && styles.filterChipActive,
              ]}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel={filter.label}
            >
              <Text
                style={[
                  styles.filterText,
                  isActive && styles.filterTextActive,
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
