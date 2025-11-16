import React from 'react';
import { View, Image, ActivityIndicator, Text } from 'react-native';

import galleryStyles from '../Styles/PhotoGallery';
import { useThemedStyles } from '../hooks/useThemedStyles';
import { useTheme } from '../hooks/useTheme';
import { GALLERY_TEXT } from '../../constants/texts/galleryTexts';

export default function PhotoGallery({ images, loading }) {
  const styles = useThemedStyles(galleryStyles);
  const { colors } = useTheme();

  if (loading) {
    return (
      <View style={styles.loadingWrapper}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!images || images.length === 0) {
    return <Text style={styles.emptyText}>{GALLERY_TEXT.emptyText}</Text>;
  }

  return (
    <View style={styles.grid}>
      {images.map((img, index) => (
        <View key={index} style={styles.imageCard}>
          <Image source={{ uri: img.image }} style={styles.image} />
        </View>
      ))}
    </View>
  );
}

