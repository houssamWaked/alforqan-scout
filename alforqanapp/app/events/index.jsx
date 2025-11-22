import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, Text, RefreshControl } from 'react-native';

import eventsStyles from '../../src/Styles/EventsStyleSheet';
import { useThemedStyles } from '../../src/hooks/useThemedStyles';
import { useTheme } from '../../src/hooks/useTheme';
import { useEvents } from '../../src/hooks/useEvents';
import EventsHero from '../../src/components/events/EventsHero';
import EventsFilters from '../../src/components/events/EventsFilters';
import EventsList from '../../src/components/events/EventsList';
import EventsLoading from '../../src/components/events/EventsLoading';
import EventsEmptyState from '../../src/components/events/EventsEmptyState';
import { EVENTS_TEXT } from '../../constants/texts/eventsTexts';

export default function EventsListScreen() {
  const styles = useThemedStyles(eventsStyles);
  const { colors } = useTheme();

  const {
    filteredEvents,
    loading,
    error,
    refresh,
    refreshing,
    filters,
    activeFilter,
    setActiveFilter,
  } = useEvents();

  const hasEvents = !!filteredEvents && filteredEvents.length > 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl
            refreshing={!!refreshing}
            onRefresh={refresh}
            tintColor={colors.primary}
          />
        }
      >
        <EventsHero />

        <EventsFilters
          filters={filters}
          activeFilter={activeFilter}
          onChange={setActiveFilter}
        />

        {loading && !hasEvents ? (
          <EventsLoading />
        ) : error ? (
          <Text style={styles.errorText}>{error || EVENTS_TEXT.listError}</Text>
        ) : hasEvents ? (
          <EventsList events={filteredEvents} />
        ) : (
          <EventsEmptyState />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
