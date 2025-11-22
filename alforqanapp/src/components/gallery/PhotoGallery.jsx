import React, { memo, useState, useCallback } from 'react';
import {
  View,
  Image,
  ActivityIndicator,
  Text,
  Modal,
  Pressable,
} from 'react-native';

import galleryStyles from '../../Styles/PhotoGallery';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { useTheme } from '../../hooks/useTheme';
import { GALLERY_TEXT } from '../../../constants/texts/galleryTexts';

// Reusable ImageCard Component
const ImageCard = memo(({ img, styles, onPress }) => (
  <Pressable
    onPress={() => onPress(img)}
    style={({ pressed }) => [
      styles.imageCard,
      pressed && styles.imageCardPressed,
    ]}
    accessibilityRole="imagebutton"
    accessibilityLabel={GALLERY_TEXT.openImageLabel || 'عرض الصورة'}
  >
    <Image
      source={{ uri: img.image }}
      style={styles.image}
      accessible
      accessibilityLabel={img.caption || GALLERY_TEXT.imageAlt}
    />
  </Pressable>
));
ImageCard.displayName = 'ImageCard';
function PhotoGallery({ images, loading }) {
  const styles = useThemedStyles(galleryStyles);
  const { colors } = useTheme();
  const [activeImage, setActiveImage] = useState(null);

  const openImage = useCallback((img) => setActiveImage(img), []);
  const closeImage = useCallback(() => setActiveImage(null), []);

  // Loading state
  if (loading) {
    return (
      <View style={styles.loadingWrapper}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  // Empty state
  if (!images || images.length === 0) {
    return <Text style={styles.emptyText}>{GALLERY_TEXT.emptyText}</Text>;
  }

  return (
    <>
      <View style={styles.grid}>
        {images.map((img, index) => (
          <ImageCard
            key={index}
            img={img}
            styles={styles}
            onPress={openImage}
          />
        ))}
      </View>

      {/* Modal */}
      <Modal
        visible={!!activeImage}
        transparent
        animationType="fade"
        onRequestClose={closeImage}
      >
        <Pressable style={styles.modalBackdrop} onPress={closeImage}>
          <View style={styles.modalContent}>
            {activeImage && (
              <Image
                source={{ uri: activeImage.image }}
                style={styles.modalImage}
                resizeMode="contain"
              />
            )}
            {activeImage?.caption ? (
              <Text style={styles.modalCaption}>{activeImage.caption}</Text>
            ) : null}
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

export default memo(PhotoGallery);
