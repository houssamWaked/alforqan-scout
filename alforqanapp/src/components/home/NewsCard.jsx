import React, { memo } from 'react';
import { Text, Image, Pressable } from 'react-native';

import homeStyles from '../../Styles/HomeStyleSheet';
import { useThemedStyles } from '../../hooks/useThemedStyles';

function NewsCard({ item, onPress }) {
  const styles = useThemedStyles(homeStyles);
  const { title, date, image } = item;

  const handlePress = () => {
    if (typeof onPress === 'function') {
      onPress();
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.eventCard,
        pressed && { transform: [{ scale: 0.97 }], opacity: 0.95 },
      ]}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      <Image source={image} style={styles.eventImage} />
      <Text style={styles.eventTitle} numberOfLines={2}>
        {title}
      </Text>
      <Text style={styles.eventDate}>{date}</Text>
    </Pressable>
  );
}

export default memo(NewsCard);

