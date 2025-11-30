// src/components/gallery/PhotoGrid.jsx
import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  Modal,
  Pressable,
  Image,
  TouchableOpacity,
} from 'react-native';

import { useThemedStyles } from '../../hooks/useThemedStyles';
import galleryStyles from '../../Styles/PhotoGallery';
import { useTheme } from '../../hooks/useTheme';
import ImageCard from './ImageCard';

export default function PhotoGrid({ images = [], loading = false }) {
  const styles = useThemedStyles(galleryStyles);
  const { colors } = useTheme();

  const [activeImage, setActiveImage] = useState(null);

  const open = useCallback((img) => setActiveImage(img), []);
  const close = useCallback(() => setActiveImage(null), []);

  const normalizedImages = useMemo(
    () => (Array.isArray(images) ? images : []),
    [images]
  );

  const featured = useMemo(() => normalizedImages[0], [normalizedImages]);
  const rest = useMemo(
    () => normalizedImages.slice(1),
    [normalizedImages]
  );

  // Simple two-column masonry distribution
  const columns = useMemo(() => {
    const colA = [];
    const colB = [];
    rest.forEach((img, index) => {
      const target = index % 2 === 0 ? colA : colB;
      target.push({ ...img, tall: index % 3 === 0 });
    });
    return [colA, colB];
  }, [rest]);

  if (loading) {
    return (
      <View style={styles.loadingWrapper}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <>
      {/* FEATURED */}
      {featured ? (
        <TouchableOpacity
          onPress={() => open(featured)}
          activeOpacity={0.9}
          style={styles.featuredCard}
        >
          <Image
            source={{ uri: featured.image }}
            style={styles.featuredImage}
            resizeMode="cover"
          />
          {featured.caption ? (
            <View style={styles.featuredOverlay}>
              <Text style={styles.featuredCaption}>
                {featured.caption}
              </Text>
            </View>
          ) : null}
        </TouchableOpacity>
      ) : null}

      {/* MASONRY GRID */}
      <View style={styles.masonryRow}>
        {columns.map((col, colIndex) => (
          <View key={`column-${colIndex}`} style={styles.masonryColumn}>
            {col.map((img, i) => {
              const cardKey = img?.id ?? `${colIndex}-${i}-${img?.image ?? 'img'}`;
              return (
                <ImageCard
                  key={cardKey}
                  img={img}
                  onPress={open}
                  size={img?.tall ? 'tall' : 'regular'}
                />
              );
            })}
          </View>
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
