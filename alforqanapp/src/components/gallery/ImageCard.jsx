// src/components/gallery/ImageCard.jsx
import React, { memo } from 'react';
import { Image, Pressable, Text, View } from 'react-native';

import { useThemedStyles } from '../../hooks/useThemedStyles';
import galleryStyles from '../../Styles/PhotoGallery';
import { GALLERY_TEXT } from '../../../constants/texts/galleryTexts';
import { getGalleryCategoryLabel } from '../../constants/galleryCategories';

function ImageCard({ img, onPress, size = 'regular' }) {
  const styles = useThemedStyles(galleryStyles);
  const heightStyle = size === 'tall' ? styles.imageTall : null;

  return (
    <Pressable
      onPress={() => onPress(img)}
      style={({ pressed }) => [
        styles.imageCard,
        pressed && styles.imageCardPressed,
      ]}
      accessibilityRole="imagebutton"
      accessibilityLabel={GALLERY_TEXT.openImageLabel}
    >
      <Image
        source={{ uri: img.image }}
        style={[styles.image, heightStyle]}
        accessible
        accessibilityLabel={
          img.caption ||
          (img.category ? getGalleryCategoryLabel(img.category) : null) ||
          GALLERY_TEXT.imageAlt
        }
      />
      {img.category ? (
        <View style={styles.imageCategoryBadge}>
          <Text style={styles.imageCategoryText}>
            {getGalleryCategoryLabel(img.category)}
          </Text>
        </View>
      ) : null}
    </Pressable>
  );
}

export default memo(ImageCard);
