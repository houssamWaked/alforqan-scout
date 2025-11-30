import React, { memo } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';

import eventsStyles from '../../Styles/EventsStyleSheet';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { EVENTS_TEXT } from '../../../constants/texts/eventsTexts';

function EventGallery({ images }) {
  const styles = useThemedStyles(eventsStyles);
  const validImages = Array.isArray(images)
    ? images.filter(Boolean)
    : [];

  if (!validImages.length) return null;

  return (
    <View style={styles.gallerySection}>
      <Text style={styles.sectionTitle}>{EVENTS_TEXT.galleryTitle}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.galleryScroll}
      >
        {validImages.map((img, idx) => (
          <View key={`${idx}-${img}`} style={styles.galleryImageWrapper}>
            <Image
              source={{ uri: img }}
              style={styles.galleryImage}
              accessibilityLabel={EVENTS_TEXT.galleryImageAlt}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

EventGallery.displayName = 'EventGallery';

export default memo(EventGallery);

