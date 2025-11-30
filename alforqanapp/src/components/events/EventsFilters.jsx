import React, { memo, useMemo } from 'react';
import { ScrollView, TouchableOpacity, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

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
          const iconName =
            filter.id === 'upcoming'
              ? 'time-outline'
              : filter.id === 'past'
              ? 'refresh-circle-outline'
              : filter.id === 'camp'
              ? 'bonfire-outline'
              : filter.id === 'competition'
              ? 'trophy-outline'
              : filter.id === 'service'
              ? 'hand-left-outline'
              : filter.id === 'training'
              ? 'school-outline'
              : 'sparkles-outline';
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

EventsFilters.displayName = 'EventsFilters';

export default memo(EventsFilters);
