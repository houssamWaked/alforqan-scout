// src/components/gallery/PhotoGrid.jsx
import React, { useState, useCallback } from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  Modal,
  Pressable,
  Image,
} from 'react-native';

import { useThemedStyles } from '../../hooks/useThemedStyles';
import galleryStyles from '../../Styles/PhotoGallery';
import { useTheme } from '../../hooks/useTheme';
import ImageCard from './ImageCard';

export default function PhotoGrid({ images, loading }) {
  const styles = useThemedStyles(galleryStyles);
  const { colors } = useTheme();

  const [activeImage, setActiveImage] = useState(null);

  const open = useCallback((img) => setActiveImage(img), []);
  const close = useCallback(() => setActiveImage(null), []);

  if (loading) {
    return (
      <View style={styles.loadingWrapper}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <>
      {/* GRID */}
      <View style={styles.grid}>
        {images.map((img, i) => (
          <ImageCard key={i} img={img} onPress={open} />
        ))}
      </View>

      {/* MODAL */}
      <Modal
        visible={!!activeImage}
        transparent
        animationType="fade"
        onRequestClose={close}
      >
        <Pressable style={styles.modalBackdrop} onPress={close}>
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
