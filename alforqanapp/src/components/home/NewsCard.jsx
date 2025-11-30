import React, { memo, useCallback, useMemo } from 'react';
import { Text, Image, Pressable } from 'react-native';

import homeStyles from '../../Styles/HomeStyleSheet';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { useTheme } from '../../hooks/useTheme';

function NewsCard({ item, onPress }) {
  const styles = useThemedStyles(homeStyles);
  const { typography } = useTheme();
  const { title, date, image } = item;

  const imageSource = useMemo(() => {
    if (!image) return null;
    return typeof image === 'string' ? { uri: image } : image;
  }, [image]);

  const handlePress = useCallback(() => {
    if (typeof onPress === 'function') {
      onPress(item);
    }
  }, [item, onPress]);

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.eventCard,
        pressed && styles.eventCardPressed,
      ]}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      {imageSource && (
        <Image source={imageSource} style={styles.eventImage} />
      )}
      <Text
        style={[typography.headings.h3, styles.eventTitle]}
        numberOfLines={2}
      >
        {title}
      </Text>
      <Text style={[typography.body.small, styles.eventDate]}>{date}</Text>
    </Pressable>
  );
}

export default memo(NewsCard);

