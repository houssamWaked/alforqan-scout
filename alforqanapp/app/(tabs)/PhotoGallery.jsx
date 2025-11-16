import React from 'react';
import { ScrollView, Text, RefreshControl, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import galleryStyles from '../../src/Styles/PhotoGallery';
import { useThemedStyles } from '../../src/hooks/useThemedStyles';
import PhotoGallery from '../../src/components/PhotoGallery';
import { useGallery } from '../../src/hooks/useGallery';
import { GALLERY_TEXT } from '../../constants/texts/galleryTexts';

export default function PhotoGalleryScreen() {
  const styles = useThemedStyles(galleryStyles);
  const {
    filteredImages,
    loading,
    error,
    refreshing,
    refresh,
    filters,
    activeFilter,
    setActiveFilter,
  } = useGallery();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }
      >
        <Text style={styles.pageTitle}>{GALLERY_TEXT.pageTitle}</Text>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContainer}
        >
          {filters.map((filter) => {
            const isActive = activeFilter === filter.id;
            return (
              <TouchableOpacity
                key={filter.id}
                style={[
                  styles.filterChip,
                  isActive && styles.filterChipActive,
                ]}
                onPress={() => setActiveFilter(filter.id)}
              >
                <Text
                  style={[styles.filterText, isActive && styles.filterTextActive]}
                >
                  {filter.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <PhotoGallery images={filteredImages} loading={loading} />
      </ScrollView>
    </SafeAreaView>
  );
}
