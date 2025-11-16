import React, { memo, useState } from 'react';
import {
  View,
  Image,
  ActivityIndicator,
  Text,
  Modal,
  Pressable,
} from 'react-native';

import galleryStyles from '../Styles/PhotoGallery';
import { useThemedStyles } from '../hooks/useThemedStyles';
import { useTheme } from '../hooks/useTheme';
import { GALLERY_TEXT } from '../../constants/texts/galleryTexts';

function PhotoGallery({ images, loading }) {
  const styles = useThemedStyles(galleryStyles);
  const { colors } = useTheme();
  const [activeImage, setActiveImage] = useState(null);

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
    <>
      <View style={styles.grid}>
        {images.map((img, index) => (
          <Pressable
            key={index}
            style={({ pressed }) => [
              styles.imageCard,
              pressed && { transform: [{ scale: 0.97 }] },
            ]}
            onPress={() => setActiveImage(img)}
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
        ))}
      </View>

      <Modal
        visible={!!activeImage}
        transparent
        animationType="fade"
        onRequestClose={() => setActiveImage(null)}
      >
        <Pressable
          style={styles.modalBackdrop}
          onPress={() => setActiveImage(null)}
        >
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
