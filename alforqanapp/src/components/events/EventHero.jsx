import React, { memo, useMemo } from 'react';
import { View, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import eventsStyles from '../../Styles/EventsStyleSheet';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { getEventTypeLabel } from '../../constants/events';
import { EVENTS_TEXT } from '../../../constants/texts/eventsTexts';

function EventHero({ event }) {
  const styles = useThemedStyles(eventsStyles);
  const hasImage = !!event?.image;

  const imageSource = useMemo(() => {
    if (!event?.image) return null;
    return typeof event.image === 'string' ? { uri: event.image } : event.image;
  }, [event?.image]);

  return (
    <View style={styles.heroCard}>
      {hasImage && imageSource ? (
        <View>
          <Image
            source={imageSource}
            style={styles.heroImage}
            accessibilityLabel={event?.title || EVENTS_TEXT.detailTitleFallback}
          />

          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={styles.heroOverlay}
          >
            <View style={styles.heroTitleRow}>
              <Text style={styles.detailTitle} numberOfLines={2}>
                {event?.title || EVENTS_TEXT.detailTitleFallback}
              </Text>

              <View style={styles.detailTypeBadge}>
                <Text style={styles.detailTypeText}>
                  {getEventTypeLabel(event?.type)}
                </Text>
              </View>
            </View>

            <View style={styles.heroMetaRow}>
              <Text style={styles.heroMetaText}>
                {event?.date} | {event?.time}
              </Text>
              <Text style={styles.heroMetaText}>{event?.location}</Text>
            </View>
          </LinearGradient>
        </View>
      ) : (
        <View style={styles.heroFallback}>
          <Text style={styles.detailTitle}>
            {event?.title || EVENTS_TEXT.detailTitleFallback}
          </Text>
        </View>
      )}
    </View>
  );
}

EventHero.displayName = 'EventHero';

export default memo(EventHero);
