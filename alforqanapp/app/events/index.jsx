import React, { useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ScrollView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import eventsStyles from '../../src/Styles/EventsStyleSheet';
import { useThemedStyles } from '../../src/hooks/useThemedStyles';
import { EVENTS, isUpcomingEvent } from '../../src/constants/events';
import EventCard from '../../src/components/events/EventCard';

const FILTERS = [
  { id: 'all', label: 'الكل' },
  { id: 'upcoming', label: 'القادمة' },
  { id: 'past', label: 'المنتهية' },
  { id: 'camp', label: 'المخيمات' },
  { id: 'competition', label: 'المسابقات' },
  { id: 'service', label: 'الخدمة' },
  { id: 'training', label: 'التدريب' },
];

export default function EventsListScreen() {
  const styles = useThemedStyles(eventsStyles);
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredEvents = useMemo(() => {
    if (!EVENTS || EVENTS.length === 0) return [];
    switch (activeFilter) {
      case 'upcoming':
        return EVENTS.filter((event) => isUpcomingEvent(event.date));
      case 'past':
        return EVENTS.filter((event) => !isUpcomingEvent(event.date));
      case 'camp':
      case 'competition':
      case 'service':
      case 'training':
        return EVENTS.filter((event) => event.type === activeFilter);
      case 'all':
      default:
        return EVENTS;
    }
  }, [activeFilter]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        {/* Hero section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>الفعاليات القادمة</Text>
          <Text style={styles.heroSubtitle}>
            المخيمات والمسابقات وأيام الخدمة في مكان واحد.
          </Text>
        </View>

        {/* Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContainer}
        >
          <View style={styles.filtersRow}>
            {FILTERS.map((filter) => {
              const isActive = activeFilter === filter.id;
              return (
                <TouchableOpacity
                  key={filter.id}
                  onPress={() => setActiveFilter(filter.id)}
                  style={[
                    styles.filterChip,
                    isActive && styles.filterChipActive,
                  ]}
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

        {/* Event list */}
        <View style={styles.listWrapper}>
          {filteredEvents.length === 0 ? (
            <View style={styles.emptyStateWrapper}>
              <Text style={styles.emptyStateText}>
                لا توجد فعاليات لهذا الفلتر حالياً.
              </Text>
            </View>
          ) : (
            <FlatList
              data={filteredEvents}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <EventCard event={item} styles={styles} />
              )}
              scrollEnabled={false}
              contentContainerStyle={styles.listContent}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
