import React, { memo, useCallback } from 'react';
import { View, FlatList } from 'react-native';

import eventsStyles from '../../Styles/EventsStyleSheet';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import EventCard from './EventCard';

function EventsList({ events }) {
  const styles = useThemedStyles(eventsStyles);

  const renderItem = useCallback(
    ({ item }) => <EventCard event={item} />,
    []
  );

  const keyExtractor = useCallback(
    (item) => item?.id?.toString() ?? Math.random().toString(),
    []
  );

  return (
    <View style={styles.listWrapper}>
      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        scrollEnabled={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

EventsList.displayName = 'EventsList';

export default memo(EventsList);
