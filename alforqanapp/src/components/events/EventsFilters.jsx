import React, { memo, useMemo } from 'react';
import { ScrollView, TouchableOpacity, Text, View } from 'react-native';

import eventsStyles from '../../Styles/EventsStyleSheet';
import { useThemedStyles } from '../../hooks/useThemedStyles';

function EventsFilters({ filters, activeFilter, onChange }) {
  const styles = useThemedStyles(eventsStyles);

  const handlers = useMemo(() => {
    const list = Array.isArray(filters) ? filters : [];
    const map = {};
    list.forEach((filter) => {
      map[filter.id] = () => {
        if (typeof onChange === 'function') {
          onChange(filter.id);
        }
      };
    });
    return map;
  }, [filters, onChange]);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.filtersContainer}
    >
      <View style={styles.filtersRow}>
        {filters.map((filter) => {
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

EventsFilters.displayName = 'EventsFilters';

export default memo(EventsFilters);
