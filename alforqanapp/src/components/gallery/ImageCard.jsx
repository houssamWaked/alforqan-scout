// src/components/gallery/ImageCard.jsx
import React, { memo } from 'react';
import { Image, Pressable } from 'react-native';

import { useThemedStyles } from '../../hooks/useThemedStyles';
import galleryStyles from '../../Styles/PhotoGallery';
import { GALLERY_TEXT } from '../../../constants/texts/galleryTexts';

function ImageCard({ img, onPress }) {
  const styles = useThemedStyles(galleryStyles);

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
        style={styles.image}
        accessible
        accessibilityLabel={img.caption || GALLERY_TEXT.imageAlt}
      />
    </Pressable>
  );
}

export default memo(ImageCard);
