import React, { memo, useCallback, useMemo } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

import eventsStyles from '../../Styles/EventsStyleSheet';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { useTheme } from '../../hooks/useTheme';
import { getEventTypeIcon, getEventTypeLabel } from '../../constants/events';

function EventsList({ events }) {
  const styles = useThemedStyles(eventsStyles);
  const { typography } = useTheme();
  const router = useRouter();

  const sanitizedEvents = useMemo(
    () => (Array.isArray(events) ? events.filter(Boolean) : []),
    [events]
  );
  const featured = useMemo(() => sanitizedEvents[0], [sanitizedEvents]);
  const rest = useMemo(() => sanitizedEvents.slice(1), [sanitizedEvents]);

  const openEvent = useCallback(
    (id) => {
      if (!id) return;
      router.push(`/events/${id}`);
    },
    [router]
  );

  const formatDateParts = useCallback((dateString) => {
    if (!dateString || typeof dateString !== 'string')
      return { day: '', month: '' };
    const parts = dateString.split('-');
    if (parts.length === 3) {
      return { day: parts[2], month: `${parts[1]}/${parts[0]}` };
    }
    return { day: dateString, month: '' };
  }, []);

  return (
    <View style={styles.listWrapper}>
      {featured ? (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => openEvent(featured.id)}
          style={styles.featuredCard}
          accessibilityRole="button"
          accessibilityLabel={featured.title}
          accessibilityHint={featured.date}
        >
          {featured.image ? (
            <Image
              source={
                typeof featured.image === 'string'
                  ? { uri: featured.image }
                  : featured.image
              }
              style={styles.featuredImage}
              resizeMode="cover"
              accessible
              accessibilityLabel={featured.title}
            />
          ) : null}
          <View style={styles.featuredOverlay}>
            <View style={styles.featuredMetaRow}>
              <View style={styles.featuredChip}>
                <Text style={styles.featuredChipText}>
                  {getEventTypeLabel(featured.type)}
                </Text>
              </View>
              <Text style={styles.featuredDateText}>{featured.date}</Text>
            </View>
            <Text style={[typography.headings.h2, styles.featuredTitle]}>
              {featured.title}
            </Text>
          </View>
        </TouchableOpacity>
      ) : null}

      {rest.length > 0 ? (
        <View style={styles.timelineWrapper}>
          <View style={styles.timelineLine} />
          {rest.map((item, index) => {
            const { day, month } = formatDateParts(item?.date);
            const itemKey = item?.id ? `event-${item.id}` : `event-${index}`;
            return (
              <View key={itemKey} style={styles.timelineItem}>
                <View style={styles.timelineBadge}>
                  <Text style={styles.timelineDay}>{day}</Text>
                  <Text style={styles.timelineMonth}>{month}</Text>
                </View>
                <TouchableOpacity
                  activeOpacity={0.88}
                  onPress={() => openEvent(item.id)}
                  style={styles.timelineCard}
                  accessibilityRole="button"
                  accessibilityLabel={item?.title}
                  accessibilityHint={item?.date}
                >
                  {item.image ? (
                    <Image
                      source={
                        typeof item.image === 'string'
                          ? { uri: item.image }
                          : item.image
                      }
                      style={styles.timelineImage}
                      accessible
                      accessibilityLabel={item?.title}
                    />
                  ) : null}
                  <View style={styles.timelineContent}>
                    <View style={styles.timelineHeader}>
                      <Ionicons
                        name={getEventTypeIcon(item.type)}
                        size={16}
                        style={styles.timelineIcon}
                      />
                      <Text
                        style={[typography.headings.h3, styles.timelineTitle]}
                        numberOfLines={2}
                      >
                        {item.title}
                      </Text>
                    </View>
                    <Text style={[typography.body.small, styles.timelineMeta]}>
                      {item?.date || ''} {item?.time ? `| ${item.time}` : ''}
                    </Text>
                    <Text style={[typography.body.small, styles.timelineMeta]}>
                      {item?.location || ''}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      ) : null}

    </View>
  );
}

EventsList.displayName = 'EventsList';

export default memo(EventsList);
