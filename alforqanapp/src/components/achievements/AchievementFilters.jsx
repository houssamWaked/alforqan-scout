import React from 'react';
import { Text, TouchableOpacity, ScrollView } from 'react-native';
import stylesSheet from '../../Styles/AchievementsStyleSheet';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { ACHIEVEMENT_FILTERS } from '../../../constants/texts/achievementTexts';

export default function AchievementFilters({ activeFilter, setActiveFilter }) {
  const styles = useThemedStyles(stylesSheet);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.filtersContainer}
    >
      {ACHIEVEMENT_FILTERS.map((filter) => {
        const isActive = activeFilter === filter.id;
        return (
          <TouchableOpacity
            key={filter.id}
            style={[styles.filterChip, isActive && styles.filterChipActive]}
            onPress={() => setActiveFilter(filter.id)}
          >
            <Text
              style={[styles.filterText, isActive && styles.filterTextActive]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

